# Sprint UX-03 — Sistema de Terminaciones Exteriores

## Etapa 2 (ajustes 2) — Evidencia, Tolerancia y Resolution Guide

Complementa `Sprint-UX03-Diseno-Experiencia.md` y
`Sprint-UX03-Diseno-Experiencia-Ajustes.md` (ambos aprobados), con los
tres análisis pedidos antes de abrir la Etapa 3. Sigue sin haber
código escrito.

---

## 1. Evidencia — ¿merece existir como concepto independiente?

### 1.1 Lo que hoy se confunde bajo un mismo nombre

Antes de decidir si separar "evidencia" hace falta distinguir tres
cosas que hoy, entre lo ya construido y lo propuesto en las etapas
anteriores, corren el riesgo de mezclarse:

1. **`Photo`** (ya existe) — la evidencia **real**, capturada por la
   persona durante una inspección concreta, atada a una `Observation`
   puntual. No es catálogo, es dato de una inspección.
2. **Los pares Bien/Mal actuales** (`good-bad-examples.ts`,
   `GoodBadExample[]`) — imágenes **de referencia**, no capturadas por
   nadie durante una inspección, mostradas para enseñar qué se espera
   ver. Hoy viven hardcodeadas en un archivo TypeScript, con
   `imageUrl` sin usar (placeholder de ícono).
3. **`MaterialKnowledgeItem`** (Etapa 2, ajustes) — conocimiento
   general del material, con `kind: IMAGEN/VIDEO` entre sus tipos.

Tu pregunta apunta directo al punto 2: los "apoyos visuales usados
durante la inspección" (imágenes correctas, incorrectas, video, PDF)
son, en la práctica, la versión evolucionada de los pares Bien/Mal —
hoy estático, sin persistencia real ni variedad de formato.

### 1.2 Por qué sí conviene separarlo de `MaterialKnowledgeItem`

`MaterialKnowledgeItem` no tiene ninguna noción de "correcto vs.
incorrecto" — es contenido de lectura general (una nota, una norma,
una tolerancia). El recurso que pides ahora tiene una propiedad que
ningún tipo de `MaterialKnowledgeItem` necesita: **polaridad** (¿este
recurso muestra lo correcto o lo incorrecto?). Forzarlo dentro de
`MaterialKnowledgeItem` significaría agregar un campo de polaridad que
solo tiene sentido para 2 de sus 6 tipos (`IMAGEN`/`VIDEO`) y queda
sin sentido para el resto (`NORMA`, `TOLERANCIA`, `TEXTO`,
`RECOMENDACION`) — señal clara de que es un concepto distinto, no una
variante del mismo.

### 1.3 Un hallazgo importante: esto también responde una prioridad
pendiente de UX-02

El Plan de Implementación de UX-02 (Prioridad 6 / P3, "Imágenes
Bien/Mal por pregunta") quedó explícitamente pausada porque hoy **no
existe ningún dato que asocie un ejemplo Bien/Mal a una pregunta
específica del checklist** — la relación es plana (elemento →
categoría/artículo → ejemplos), nunca por pregunta puntual. Ese
problema es exactamente el que resuelve diseñar bien esta entidad
ahora: si se construye con capacidad de asociarse a distintos niveles
de especificidad, UX-03 deja resuelta de paso una tarea que UX-02
había dejado pendiente para "su propia Etapa 1→2 cuando le toque el
turno" — sin que este sprint tenga que absorber esa implementación,
solo dejar la arquitectura lista para cuando corresponda.

### 1.4 Forma propuesta (preparatoria, sin construir)

```prisma
model InspectionEvidence {
  id                    String                @id @default(cuid())
  kind                  EvidenceKind
  // NEUTRA para recursos que no son un par bien/mal (ej. un PDF de
  // ficha técnica del fabricante) -- CORRECTA/INCORRECTA para el caso
  // de uso principal (mostrar el estándar esperado vs. el defecto).
  polarity              EvidencePolarity      @default(NEUTRA)
  mediaUrl              String
  caption               String?
  order                 Int                   @default(0)

  // Nivel de especificidad -- los tres son nullable y mutuamente
  // no excluyentes a nivel de schema, pero en la práctica cada
  // recurso se asocia a UNO. Mismo criterio de resolución en cascada
  // que ya usa goodBadExamplesByArticleSlug hoy (más específico
  // gana, cae al nivel más general si no hay uno puntual):
  checklistItemTemplateId String?             // más específico -- por pregunta
  checklistItemTemplate   ChecklistItemTemplate? @relation(fields: [checklistItemTemplateId], references: [id])
  facadeFinishOptionId    String?             // por material
  facadeFinishOption      FacadeFinishOption?    @relation(fields: [facadeFinishOptionId], references: [id])
  libraryArticleId        String?             // más general -- por familia/artículo
  libraryArticle          LibraryArticle?        @relation(fields: [libraryArticleId], references: [id])

  createdAt             DateTime              @default(now())
}

enum EvidenceKind {
  IMAGEN
  VIDEO
  PDF
}

enum EvidencePolarity {
  CORRECTA
  INCORRECTA
  NEUTRA
}
```

Esto también sirve, sin cambio de forma, para las 9 categorías que ya
tienen pares Bien/Mal hoy (ventanas, puertas, cerámicas, etc.) — sería
la vía natural para migrar `good-bad-examples.ts` de archivo estático
a datos reales el día que se decida hacerlo (no en este sprint).

### 1.5 Qué NO se decide acá

No se decide todavía si esta entidad reemplaza por completo el archivo
`good-bad-examples.ts` actual (probablemente sí, a futuro, pero es una
migración de datos, no una decisión de arquitectura de UX-03) ni se
sube ningún recurso real. Solo se dejan la forma y el criterio de
asociación en cascada listos para cuando corresponda cargarlos.

---

## 2. Tolerancia — Pregunta → Medición → Tolerancia → Resultado → Defecto

### 2.1 El problema real que describes

Hoy toda `ChecklistItemTemplate` se responde con un juicio binario
humano (`Observation.status`: CORRECT/OBSERVATION) — la persona mira y
decide. Pero varias de las tolerancias reales del Manual CDT (las que
ya están transcritas en `tolerances-manual.ts`) no son un juicio, son
una **medición contra un umbral**: Ficha 8 (Estucos) exige
verticalidad ±5 mm por piso y planeidad ±5 mm con regla — eso se mide
con un instrumento, no se aprecia a ojo. Hoy esa medición, si ocurre,
queda perdida dentro de un comentario de texto libre, igual que un
defecto no estructurado quedaría perdido si no existiera `DefectType`.

### 2.2 Mapeo de tu cadena a lo que ya existe (y lo que falta)

```
Pregunta     = ChecklistItemTemplate           (ya existe)
Medición     = Measurement                     (NUEVO)
Tolerancia   = ToleranceSpec                   (NUEVO)
Resultado    = Measurement.result              (NUEVO, campo derivado)
Defecto      = ObservationDefect → DefectType  (ya aprobado, Ajustes 1)
```

Igual que con "Respuesta" en el análisis anterior, no todo el tramo es
tabla nueva — el resultado de la medición sigue desembocando en la
misma `Observation` que ya existe, y de ahí en la misma cadena de
`ObservationDefect`/`DefectType` ya aprobada. Lo nuevo es **lo que
pasa antes** de que exista una `Observation`, no después.

### 2.3 Forma propuesta

```prisma
// Define QUÉ se mide y contra QUÉ umbral, para una pregunta puntual.
// Es opcional a propósito -- la mayoría de las preguntas del sistema
// (ej. "¿el enchufe está alineado?") siguen siendo juicio binario sin
// medición, y eso está bien. Solo las preguntas que de verdad tienen
// una tolerancia numérica detrás llevan esta relación.
model ToleranceSpec {
  id                      String                @id @default(cuid())
  checklistItemTemplateId String                @unique
  checklistItemTemplate   ChecklistItemTemplate @relation(fields: [checklistItemTemplateId], references: [id])
  unit                    ToleranceUnit         // MM, PORCENTAJE, GRADOS...
  comparisonType          ToleranceComparison   // MAXIMO, MINIMO, RANGO
  thresholdValue          Float?                // usado si MAXIMO/MINIMO
  minValue                Float?                // usado si RANGO
  maxValue                Float?                // usado si RANGO
  // Trazabilidad de dónde sale el número -- Ficha 8 CDT, criterio de
  // fabricante, etc. Null cuando el material no tiene respaldo
  // normativo (mismo espíritu que lacksNormativeBacking).
  referenceSource         String?
  instructionText         String?               // cómo medir, ej. "regla de 1,2 m apoyada en el muro"
}

// La medición real, capturada durante una inspección puntual --
// relación 1:1 con Observation porque una medición SIEMPRE termina
// generando (o confirmando) una respuesta a la pregunta.
model Measurement {
  id              String            @id @default(cuid())
  observationId   String            @unique
  observation     Observation       @relation(fields: [observationId], references: [id])
  toleranceSpecId String
  toleranceSpec   ToleranceSpec     @relation(fields: [toleranceSpecId], references: [id])
  value           Float
  // Resultado calculado y GUARDADO al momento de medir, no derivado
  // en cada lectura -- si el ToleranceSpec cambia después (ej. se
  // corrige un umbral mal cargado), las mediciones ya tomadas no
  // deben cambiar de resultado retroactivamente. Mismo principio que
  // ya usa Report.snapshot para el PDF congelado al cerrar la
  // inspección -- un hecho de un momento dado no se recalcula solo
  // porque el catálogo cambió después.
  result          ToleranceResult
  measuredAt      DateTime          @default(now())
}

enum ToleranceUnit {
  MM
  PORCENTAJE
  GRADOS
}

enum ToleranceComparison {
  MAXIMO
  MINIMO
  RANGO
}

enum ToleranceResult {
  CONFORME
  NO_CONFORME
}
```

### 2.4 Por qué `ToleranceSpec` cuelga de `ChecklistItemTemplate` y no
de `FacadeFinishOption` directamente

Reutiliza exactamente el modelo de tres capas ya aprobado (Ajustes 1):
como una `ChecklistItemTemplate` ya puede ser una pregunta base de
familia o una extensión de un material puntual, la tolerancia hereda
automáticamente ese mismo nivel de especificidad sin agregar una
dimensión nueva de asociación. Ejemplo: la tolerancia de verticalidad
(±5 mm) se define una sola vez en la pregunta base de la familia
"húmeda sobre estuco" — Pintura, Marmolina, Graniplast y Texturado la
heredan igual, sin duplicar el `ToleranceSpec` cuatro veces.

### 2.5 Cómo interactúa con el flujo de checklist actual

No reemplaza el flujo binario — lo antecede cuando corresponde:

1. `ChecklistItemCard` (o su evolución) detecta si la pregunta tiene
   `ToleranceSpec` asociado.
2. Si lo tiene, en vez de (o antes de) los botones "Está bien"/
   "Reportar un problema", se pide el valor medido.
3. El sistema calcula `result` comparando contra el `ToleranceSpec` y
   lo guarda en `Measurement.result` — y ese resultado puede
   **sugerir** automáticamente el `Observation.status`
   (`NO_CONFORME` → sugiere `OBSERVATION`), pero la persona sigue
   pudiendo confirmar/ajustar, igual que hoy nadie pierde control
   sobre la respuesta final.
4. De ahí en adelante, el flujo ya aprobado no cambia: si queda como
   `OBSERVATION`, se pueden asociar `ObservationDefect` igual que
   cualquier otra observación negativa.

### 2.6 Relación con el Manual CDT ya transcrito

`ToleranceSpec` es, a futuro, el lugar natural para migrar
`tolerances-manual.ts`/`tolerances-by-category.ts` de archivos
estáticos a datos reales — mismo argumento que ya se usó para
`DefectType` y `MaterialKnowledgeItem` (estructura consultable en vez
de texto fijo). No se decide esa migración ahora; se deja notado
porque es la extensión natural del mismo razonamiento.

### 2.7 Qué NO se decide acá

No se define todavía qué preguntas concretas del sistema (más allá de
verticalidad/planeidad, ya con ficha CDT) ameritan medición en vez de
juicio binario — eso es contenido de Etapa 3 en adelante, material por
material.

---

## 3. `TechnicalRecommendation` → Resolution Guide

### 3.1 El mismo problema que ya se resolvió una vez, repetido

Esto es estructuralmente idéntico al motivo por el que
`MaterialTechnicalNote` evolucionó a `MaterialKnowledgeItem`: un solo
campo `title` + `body` no alcanza para contener procedimientos,
materiales necesarios, video, normativa y enlaces — son tipos de
contenido heterogéneos, no variaciones de texto. Pedir eso con la
forma actual de `TechnicalRecommendation` llevaría, de nuevo, a
agregar columnas nuevas cada vez que aparece un tipo de contenido
distinto.

### 3.2 Separar "guía" (contenedor) de "pasos/recursos" (contenido)

Se propone dividir en dos, replicando **la misma forma** que
`MaterialKnowledgeItem` ya resolvió para el conocimiento de material —
no un patrón nuevo, el mismo patrón aplicado a un segundo caso:

```prisma
// El contenedor -- reemplaza a TechnicalRecommendation, mismo punto
// de enganche (DefectType, 1:N, con audience). Lo que cambia es que
// ya no carga el contenido directamente, lo delega a sus items.
model ResolutionGuide {
  id           String                    @id @default(cuid())
  defectTypeId String
  defectType   DefectType                @relation(fields: [defectTypeId], references: [id])
  title        String
  summary      String?                   // resumen corto, para vista rápida (informe, notificación)
  audience     RecommendationAudience    @default(AMBOS)
  order        Int                       @default(0)

  steps        ResolutionGuideStep[]
}

// El contenido real -- mismo espíritu que MaterialKnowledgeItem
// (núcleo común + kind + structuredData extensible), aplicado acá a
// pasos de resolución en vez de conocimiento de material.
model ResolutionGuideStep {
  id                String              @id @default(cuid())
  resolutionGuideId String
  resolutionGuide   ResolutionGuide     @relation(fields: [resolutionGuideId], references: [id])
  kind              ResolutionStepKind
  title             String
  body              String?
  mediaUrl          String?             // video, o URL de un PDF de referencia
  linkUrl           String?             // enlace externo (ficha de fabricante, norma pública, etc.)
  structuredData    Json?               // ej. lista de materiales con cantidad, sin forzar columnas
  order             Int                 @default(0)
}

enum ResolutionStepKind {
  PROCEDIMIENTO
  MATERIAL
  VIDEO
  NORMATIVA
  ENLACE
  RECURSO
}
```

### 3.3 Por qué dos tablas separadas y no una sola con `parentId` nulo

Se evaluó fusionar `ResolutionGuideStep` y `MaterialKnowledgeItem` en
una única tabla polimórfica genérica de "contenido tipado", ya que
ambas resuelven el mismo problema de forma casi idéntica. Se descarta
por ahora — no porque esté mal, sino porque el costo no se justifica
todavía: Prisma no maneja relaciones polimórficas de forma nativa (se
resuelve con columnas "dueño" opcionales tipo
`facadeFinishOptionId`/`resolutionGuideId` ambas nullable en la misma
fila, lo cual es más frágil que dos tablas claras), y hoy solo hay dos
consumidores del patrón. Si en el futuro aparece un tercer caso que
necesite la misma forma, ahí sí conviene evaluar unificarlas — por
ahora, mantener el mismo *patrón* en dos tablas paralelas da la
consistencia que se busca sin pagar el costo de una relación
polimórfica prematura.

### 3.4 Impacto en lo ya aprobado

Ningún cambio a la relación con `DefectType` (sigue 1:N) ni a
`audience` — el ajuste es puramente de nombre y de dónde vive el
contenido (contenedor + pasos, en vez de un solo campo de texto). Los
puntos de enganche descritos en el documento anterior (informe
automático, postventa, IA) siguen aplicando igual, ahora con más
capacidad de detalle en cada uno.

### 3.5 Qué NO se decide acá

No se redacta ninguna guía de resolución real, ni se decide el
listado de `ResolutionStepKind` como cerrado (podría sumarse alguno
más al llegar a contenido real) — eso es Etapa 3 en adelante.

---

## 4. Modelo consolidado actualizado

```
FacadeFinishOption (material)
 ├─ familySlug ──► ElementTemplate (familia, checklist base)
 │                   └─ ChecklistItemTemplate (base + extensiones N:N por material)
 │                         ├─ ToleranceSpec? (si la pregunta se mide, no se juzga)
 │                         └─ InspectionEvidence[] (bien/mal por pregunta -- nivel más específico)
 ├─ MaterialKnowledgeItem[] (texto/imagen/video/norma/tolerancia/recomendación del material)
 └─ InspectionEvidence[] (bien/mal por material -- nivel intermedio)

LibraryArticle (familia)
 └─ InspectionEvidence[] (bien/mal por familia -- nivel más general, fallback actual)

ChecklistItemTemplate ──► Observation (la "Respuesta")
                            ├─ Measurement? (si hubo ToleranceSpec: valor + resultado)
                            └─ ObservationDefect[] (N:N) ──► DefectType
                                                               └─ ResolutionGuide[] (por audiencia)
                                                                     └─ ResolutionGuideStep[] (procedimiento/material/video/normativa/enlace/recurso)
```

---

## 5. Qué falta decidir antes de Etapa 3

1. ¿Apruebas `InspectionEvidence` como concepto independiente de
   `MaterialKnowledgeItem`, con resolución en cascada
   pregunta→material→artículo de familia?
2. ¿Apruebas `ToleranceSpec`/`Measurement` como capa opcional antes de
   `Observation`, con el resultado guardado (no recalculado) al
   momento de medir?
3. ¿Apruebas el renombre `TechnicalRecommendation` → `ResolutionGuide`
   + `ResolutionGuideStep`, manteniendo la relación 1:N con
   `DefectType`?
4. ¿Estás de acuerdo con **no** unificar `MaterialKnowledgeItem` y
   `ResolutionGuideStep` en una tabla polimórfica única por ahora
   (sección 3.3), dejándolo como posible revisión futura si aparece
   un tercer caso similar?

Con estos tres análisis, el modelo de datos completo de UX-03 queda
consolidado: catálogo de materiales, checklist en tres capas,
evidencia visual, tolerancia/medición, defectos y guía de resolución
— todo aditivo sobre el schema actual, sin tocar ningún mecanismo ya
construido (reasignación de `ElementInstance`, filtrado de checklist
condicional, `lacksNormativeBacking`, snapshot del informe). No
implementé nada. Quedo a la espera de tu revisión antes de recién ahí
abrir la Etapa 3.
