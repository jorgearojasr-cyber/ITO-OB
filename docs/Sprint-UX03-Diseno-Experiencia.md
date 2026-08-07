# Sprint UX-03 — Sistema de Terminaciones Exteriores

## Etapa 2 — Diseño (arquitectura revisada + catálogo de defectos)

Continúa sobre `Sprint-UX03-Analisis.md` (Etapa 1, aprobada), con dos
ajustes que pediste sobre la propuesta original: (1) reemplazar el
modelo "`ElementTemplate`/`LibraryArticle` por familia" por un modelo
de tres capas (Familia → checklist base → Material → extensiones), y
(2) analizar — sin implementar — si conviene un catálogo de defectos
técnicos pensando en observaciones automáticas, informes, estadísticas
e IA a futuro.

Sigue sin haber código escrito. Este documento define el modelo de
datos definitivo a proponer y dos análisis; no construye nada.

---

## 1. Modelo de checklist en tres capas

### 1.1 Por qué la propuesta original (un `ElementTemplate` por familia)
se quedaba corta

Un solo `ElementTemplate` por familia resuelve la duplicación, pero
mezcla en la misma tabla (`ChecklistItemTemplate`) preguntas que
aplican a **todos** los materiales de la familia con preguntas que
solo tienen sentido para **uno**. Ejemplo concreto de la familia A
(húmeda-sobre-estuco): "¿La superficie está a plomo y sin
ondulaciones?" aplica a Pintura, Marmolina, Graniplast y Texturado por
igual — pero "¿El grano de la textura es uniforme en toda la
superficie?" **solo** tiene sentido si el material tiene grano
(Marmolina/Graniplast/Texturado), no en Pintura lisa. Con un único
`ElementTemplate` por familia, esa pregunta quedaría visible también
para quien eligió Pintura lisa, o habría que excluirla a mano con
lógica ad-hoc en el componente — justo el tipo de parche que se quiere
evitar.

### 1.2 Modelo propuesto: la familia aporta la base, el material aporta
la extensión

Se mantiene **un `ElementTemplate` por familia** (6-8, ver sección 3)
— eso no cambia, y sigue siendo el que `ElementInstance` referencia
tras `setRoomMaterial` (cero cambios al motor de reasignación que ya
existe). Lo que cambia es `ChecklistItemTemplate`: hoy pertenece
únicamente a un `ElementTemplate`; se le agrega una columna nullable
que la ata, opcionalmente, a un material específico del catálogo:

```prisma
model ChecklistItemTemplate {
  id                  String           @id @default(cuid())
  elementTemplateId   String
  elementTemplate     ElementTemplate  @relation(fields: [elementTemplateId], references: [id])
  question            String
  helpText            String?
  order               Int              @default(0)
  requiresShower      Boolean          @default(false)
  requiresBathtub     Boolean          @default(false)
  // null = pregunta base, visible para cualquier material de la
  // familia. Si se asigna, la pregunta es una extensión exclusiva de
  // ESE material -- solo aparece cuando el RoomInstance.facadeFinishOptionId
  // coincide. Mismo mecanismo de columna-condicional que ya usan
  // requiresShower/requiresBathtub, aplicado a material en vez de a
  // equipamiento del recinto.
  facadeFinishOptionId String?
  facadeFinishOption   FacadeFinishOption? @relation(fields: [facadeFinishOptionId], references: [id])
  ...
}
```

Esto es literalmente el mismo patrón que **ya existe** en el código
para `requiresShower`/`requiresBathtub` (`get-element-instance-data.ts`,
`visibleChecklistItemTemplates`): una columna condicional nullable que
filtra qué preguntas se muestran según el estado del `RoomInstance`.
No es un mecanismo nuevo — es el mismo mecanismo, aplicado a un caso
distinto. La función de filtrado se extiende con una condición más:

```
visible = (sin condición de ducha/tina, o se cumple) 
      AND (facadeFinishOptionId es null, o coincide con RoomInstance.facadeFinishOptionId)
```

**Resultado**: el checklist final que ve el usuario es *base de la
familia + extensiones del material elegido*, calculado en el momento
de la carga — nunca se duplica ni se copia nada. Agregar una pregunta
exclusiva a un material nuevo (o a uno ya existente) es una fila nueva
en `ChecklistItemTemplate` con `facadeFinishOptionId` seteado — dato,
no migración, consistente con la Opción B ya aprobada para el
catálogo.

### 1.3 Ejemplo concreto (familia A, 4 materiales)

Con este modelo, el `ElementTemplate` "Fachada — Húmeda sobre estuco"
tendría algo así (ilustrativo, el copy final es Etapa 3):

| Pregunta | `facadeFinishOptionId` |
|---|---|
| ¿La superficie está a plomo, sin ondulaciones al pasar la regla? | *(base — todas)* |
| ¿Hay fisuras de retracción visibles en el estuco? | *(base — todas)* |
| ¿El color es uniforme en toda la superficie, sin manchas ni escurrimientos? | Pintura lisa |
| ¿El grano de la textura es uniforme, sin parches de otra mano? | Marmolina, Graniplast, Texturado *(3 filas, una por material — ver 1.4)* |

### 1.4 Extensión compartida por más de un material dentro de la misma
familia

El ejemplo anterior expone un caso real: Marmolina, Graniplast y
Texturado comparten la pregunta de "grano uniforme" entre ellos pero
no con Pintura. Con `facadeFinishOptionId` como columna simple
(1 pregunta → 1 material), ese caso requeriría 3 filas casi idénticas
— exactamente la duplicación que se quiere evitar, solo que ahora a
nivel de extensión en vez de a nivel de familia completa.

Dos formas de resolverlo, con una recomendación:

- **(a) Columna simple (1:1 pregunta↔material)** — más simple de
  entender y de consultar, pero obliga a duplicar la pregunta cuando
  varios materiales de la familia comparten una extensión (como el
  caso de grano en A).
- **(b) Relación N:N vía tabla intermedia**
  (`ChecklistItemTemplateFacadeFinish`, o un array `facadeFinishOptionIds`
  si se prefiere evitar una tabla puente) — una sola fila de
  "¿grano uniforme?" puede aplicar a Marmolina + Graniplast +
  Texturado a la vez. Más fiel a los casos reales encontrados en la
  Etapa 1 (ver 3.3/3.4, donde Graniplast y Texturado son casi
  idénticos a Marmolina).

**Recomendación**: (b), porque el propio análisis de Etapa 1 ya
identificó que la superposición entre materiales de una misma familia
es la norma, no la excepción (Graniplast ≈ Marmolina; Enchapes ≈
Piedra). Optar por (a) generaría duplicación real desde el primer
material que se cargue. El costo de (b) es una tabla puente más, algo
ya asumido en otras partes del modelo (ej. `InspectionCollaborator`
como tabla puente `Inspection`↔`User`).

### 1.5 `LibraryArticle`: mismo problema, solución más liviana

Un artículo completo por material (13) duplicaría contenido casi
idéntico dentro de una familia; un artículo único por familia (la
propuesta original) perdería matices específicos de un material (ej.
la recomendación de protección UV que solo aplica a Madera). En vez de
crear `LibraryArticle` por material, se propone una tabla de **notas
técnicas** cortas, atadas al material, que se muestran como
complemento del artículo de familia (no lo reemplazan):

```prisma
model MaterialTechnicalNote {
  id                    String              @id @default(cuid())
  facadeFinishOptionId  String
  facadeFinishOption    FacadeFinishOption  @relation(fields: [facadeFinishOptionId], references: [id])
  title                 String              // "Protección contra humedad"
  body                  String              // 1-2 frases, no un artículo completo
  order                 Int                 @default(0)
}
```

El `LibraryArticle` de familia sigue siendo la fuente de la Ficha
técnica y los ejemplos Bien/Mal (reutilizando `goodBadExamplesByArticleSlug`
tal cual existe hoy, ahora indexado por el slug del artículo de
familia). `MaterialTechnicalNote` es un complemento breve, no una
segunda jerarquía de contenido — evita que la biblioteca técnica
termine con 13 fichas parcialmente redundantes.

### 1.6 Impacto en el resto del sistema

- `setRoomMaterial`: sin cambios de lógica, solo el mapeo
  material→`ElementTemplate` pasa a resolverse vía `familySlug` del
  material elegido en vez de vía slug directo del material.
- `get-element-instance-data.ts`: la función de filtrado de checklist
  gana una condición más (sección 1.2), reutilizando la misma forma
  que ya tiene para ducha/tina.
- `ElementInspectionExperience.tsx`: sin cambios — sigue resolviendo
  biblioteca/ejemplos por `articleSlug`, ahora el slug de familia en
  vez de material.
- `RoomMaterialQuestion.tsx`: la pregunta para el slot `FACADE` debe
  mostrar las opciones agrupadas visualmente por familia (13 botones
  sueltos sin agrupar sería una mala experiencia) — esto es contenido
  de Etapa 3 (especificación visual), no de este documento.

---

## 2. Catálogo de defectos técnicos — análisis (no implementar)

### 2.1 El problema que resolvería

Hoy `Observation.comment` es texto libre y `Observation.priority` es
el único campo estructurado. Eso alcanza para el flujo actual
(persona registra, constructora lee), pero es un callejón sin salida
para tres cosas que mencionas como futuras: **informes automáticos**
que necesiten agrupar hallazgos por tipo, **estadísticas** ("¿cuál es
el defecto más frecuente en fachadas de Marmolina a nivel de toda la
base de inspecciones?"), e **IA** que en el futuro sugiera un defecto
a partir de una foto — ninguna de las tres se puede construir sobre
texto libre sin antes clasificarlo, y clasificar texto libre
retroactivamente es mucho más caro que capturarlo ya clasificado desde
el origen.

### 2.2 Qué se está considerando (no confundir con lo del punto 1)

Este catálogo es conceptualmente **distinto** del catálogo de
preguntas de checklist. Una `ChecklistItemTemplate` es "¿qué se le
pregunta al usuario?" (fija, la redacta el equipo). Un `DefectType`
sería "¿qué problema concreto se está registrando?" (una
clasificación de la respuesta, no de la pregunta) — varias preguntas
distintas podrían derivar en el mismo tipo de defecto, y una misma
pregunta podría admitir más de un defecto posible como respuesta.
Ejemplo: tanto "¿el color es uniforme?" (Pintura) como "¿el grano es
uniforme?" (Marmolina) podrían resolver, si la respuesta es negativa,
en el mismo `DefectType` "acabado-irregular", mientras que otras
observaciones bajo la misma pregunta podrían clasificarse como
"mancha"/"escurrimiento" en vez de "irregularidad".

### 2.3 Propuesta de forma (preparatoria, sin construir)

```prisma
model DefectType {
  id                   String    @id @default(cuid())
  slug                 String    @unique          // "grieta-retraccion", "delaminacion"
  label                String                     // "Grieta de retracción"
  // Un defecto puede ser transversal a una familia completa (ej.
  // "grieta de retracción" aplica a toda la familia A) o exclusivo
  // de un material (ej. "delaminación" es propio de EIFS) -- ambos
  // niveles nullable, igual que familySlug/facadeFinishOptionId en
  // el catálogo de materiales, para no forzar una relación que no
  // siempre existe.
  familySlug           String?
  facadeFinishOptionId String?
  facadeFinishOption   FacadeFinishOption? @relation(fields: [facadeFinishOptionId], references: [id])
  typicalPriority      Priority?                  // sugerencia, no obliga
  description          String?
}
```

Y en `Observation`, un campo **aditivo y opcional**, sin tocar nada
del flujo actual:

```prisma
model Observation {
  ...
  comment      String?      // sigue existiendo, sin cambios
  priority     Priority?    // sigue existiendo, sin cambios
  defectTypeId String?      // NUEVO, opcional
  defectType   DefectType?  @relation(fields: [defectTypeId], references: [id])
  ...
}
```

### 2.4 Por qué esto y no solo ampliar `aiMetadata` (que ya existe)

`Observation.aiMetadata`/`Photo.aiMetadata` (`Json?`) ya son puntos de
extensión pensados para IA, y podrían "guardar" un defecto detectado
sin ningún cambio de schema. La diferencia real es **consultabilidad**:
un valor dentro de un `Json` no se puede agrupar/filtrar/contar de
forma eficiente en SQL a través de miles de inspecciones (se puede,
mal). Un `DefectType` con FK sí — es la diferencia entre "la IA anotó
algo en un campo libre" y "el sistema puede responder cuántas
observaciones de tipo grieta-retracción hay en fachadas de Marmolina
esta temporada". Si el objetivo declarado incluye estadísticas e
informes automáticos (no solo IA), el campo estructurado es
necesario — `aiMetadata` seguiría existiendo igual, para guardar
detalles no estructurados (confianza del modelo, bounding box de la
foto, etc.), complementario al `defectTypeId`, no reemplazándolo.

### 2.5 Cómo se llenaría en la práctica (sin decidirlo ahora)

Dos caminos no excluyentes, ninguno para construir en este sprint:

1. **Manual, asistido**: al marcar "Reportar un problema" en
   `ChecklistItemCard`, en vez de (o adicional a) texto libre, se
   ofrece un selector corto de 3-5 `DefectType` típicos para esa
   pregunta/material — la persona sigue pudiendo escribir su propio
   comentario, pero el sistema ya queda con un dato estructurado.
2. **Automático, IA (fase futura ya prevista en el roadmap)**: un
   análisis de foto sugiere un `defectTypeId` con una confianza,
   guardada en `aiMetadata`, y la persona confirma o corrige — el
   campo estructurado en `Observation` queda igual sea cual sea el
   origen (manual o sugerido).

### 2.6 Recomendación

Dejar esta sección como **diseño de referencia, no como tarea de este
sprint**. La única decisión que pido ahora es si el rumbo general te
parece correcto (catálogo de defectos como entidad propia, distinta
del catálogo de preguntas, con FK opcional desde `Observation`) — el
detalle de qué `DefectType` exactos existen por familia/material es
contenido, se puede construir junto con el checklist en la Etapa 3 sin
tocar schema otra vez si la forma general ya está aprobada.

---

## 3. Familias resultantes (confirmación de la Etapa 1, sin cambios)

Se mantienen las 6 familias + 2 agregados de la Etapa 1, ahora con el
modelo de tres capas ya no generan ningún cambio en el conteo de
`ElementTemplate` (6-8, uno por familia) — el ajuste de esta etapa
vive enteramente en `ChecklistItemTemplate`/`LibraryArticle`, no en
cuántos `ElementTemplate` existen:

1. Húmeda sobre estuco — Pintura lisa, Marmolina, Graniplast, Texturado
2. Placa atornillada — Fibrocemento, SmartPanel
3. Mampostería/piedra — Piedra, Enchapes
4. Madera
5. Hormigón visto
6. EIFS
7. Estuco (visto, sin terminación encima)
8. Ladrillo a la vista

---

## 4. Qué falta decidir antes de Etapa 3 (especificación visual)

1. **¿Apruebas el modelo de tres capas de la sección 1** (familia =
   `ElementTemplate` con checklist base + material = filas de
   `ChecklistItemTemplate` con `facadeFinishOptionId`, opción N:N
   recomendada en 1.4)?
2. **¿Apruebas `MaterialTechnicalNote`** como forma liviana de
   contenido específico por material (sección 1.5), en vez de un
   `LibraryArticle` por material?
3. **¿Apruebas el rumbo general del catálogo de defectos** (sección 2)
   como diseño de referencia para dejar preparado — sin construirlo
   en este sprint, sin definir todavía el listado real de
   `DefectType`?
4. Las 4 preguntas abiertas de la Etapa 1 (agrupación de familias,
   Estuco/Ladrillo, "Otro" como escape) siguen abiertas — si no las
   mencionas, las doy por aprobadas tal como quedaron en ese
   documento.

No implementé nada. Queda a la espera de tu revisión antes de avanzar
a la Etapa 3 (especificación visual: copy final por pregunta, diseño
de la pantalla de selección de material agrupada por familia, y —si
apruebas el punto 3— el listado inicial de `DefectType` por familia).
