# Sprint UX-03 — Sistema de Terminaciones Exteriores

## Etapa 2 (ajustes) — Trazabilidad Pregunta→Respuesta→Defecto,
## Recomendación Técnica y evolución de `MaterialTechnicalNote`

Complementa `Sprint-UX03-Diseno-Experiencia.md` (Etapa 2, aprobada),
con tres ajustes pedidos antes de abrir la Etapa 3. Sigue sin haber
código escrito — es análisis de arquitectura, para asegurar que el
modelo aguante estas funciones futuras sin rediseño, no para
construirlas ahora.

---

## 1. Trazabilidad Pregunta → Respuesta → Defecto

### 1.1 Por qué el diseño de la Etapa 2 se queda corto

En la Etapa 2 propuse `Observation.defectTypeId` como FK **directa y
única**. Dos problemas reales con eso, ambos señalados por tu ajuste:

1. **Un `Observation` con `status: CORRECT` no debería poder tener
   defecto asociado** — con una columna simple no hay nada que lo
   impida a nivel de datos, solo a nivel de disciplina de quien
   escribe el código.
2. **Un solo hallazgo puede tener más de un problema técnico a la
   vez.** Ejemplo real de la Etapa 1: en EIFS, una misma observación
   negativa en "¿la esquina del vano está bien resuelta?" puede
   implicar simultáneamente *fisura diagonal* y *sello faltante en el
   encuentro* — son dos `DefectType` distintos, no uno.

### 1.2 Dónde vive cada cosa (y por qué no hace falta una tabla nueva
para "Respuesta")

Tu esquema es `Pregunta → Respuesta → Defecto`. Mapeado a lo que ya
existe en el schema:

- **Pregunta** = `ChecklistItemTemplate` (ya existe).
- **Respuesta** = `Observation` (ya existe — es literalmente la
  respuesta a una `ChecklistItemTemplate`, con su `status`
  CORRECT/OBSERVATION). No hace falta un modelo nuevo para
  "Respuesta": ya está.
- **Defecto** = `DefectType` (propuesto en Etapa 2) + una relación
  **N:N** con `Observation` en vez de la FK simple.

```prisma
model Observation {
  id       String            @id @default(cuid())
  ...
  status   ObservationStatus // CORRECT | OBSERVATION -- ya existe
  comment  String?
  priority Priority?
  ...
  defects  ObservationDefect[]   // NUEVO, reemplaza el defectTypeId simple de la Etapa 2
}

// Tabla puente explícita (no array) porque conviene poder guardar,
// a futuro, metadata propia de CADA asociación observación↔defecto
// -- ej. de dónde salió (manual vs. sugerida por IA), sin ensuciar
// ni Observation ni DefectType con columnas que solo tienen sentido
// para esa relación puntual.
model ObservationDefect {
  id            String      @id @default(cuid())
  observationId String
  observation   Observation @relation(fields: [observationId], references: [id])
  defectTypeId  String
  defectType    DefectType  @relation(fields: [defectTypeId], references: [id])
  // Origen del vínculo -- de qué manera se asoció este defecto a esta
  // observación. MANUAL hoy (única vía posible); IA_SUGERIDA queda
  // preparado para cuando exista análisis de foto, sin requerir
  // cambiar esta tabla cuando llegue ese momento.
  source        DefectLinkSource @default(MANUAL)
  confidence    Float?      // solo tiene sentido si source = IA_SUGERIDA
  createdAt     DateTime    @default(now())

  @@unique([observationId, defectTypeId])
}

enum DefectLinkSource {
  MANUAL
  IA_SUGERIDA
}
```

### 1.3 Cómo se impone la regla "CORRECT nunca tiene defecto"

A nivel de base de datos no conviene forzarlo con una constraint
cruzada entre tablas (Postgres no tiene un `CHECK` nativo simple que
mire una tabla relacionada) — se impone donde ya se imponen hoy reglas
equivalentes: en la Server Action. `saveChecklistAnswer` (o quien
maneje la creación/edición de `Observation`) simplemente no ofrece la
opción de asociar `ObservationDefect` cuando `status = CORRECT`, y la
UI (`ChecklistItemCard`) solo muestra el selector de defectos dentro
del panel "Reportar un problema" — que hoy **ya** solo aparece cuando
la respuesta es negativa. Es decir: la restricción real ya existe en
la experiencia actual (el panel de defecto/comentario/prioridad ya
está condicionado a la rama "no está bien"); este ajuste solo
reutiliza esa misma rama para adjuntar `DefectType`, no crea una
superficie nueva que haya que restringir.

### 1.4 Qué gana el sistema con esto (trazabilidad real)

Con esta cadena completa, una consulta como *"de todas las
inspecciones con fachada de Marmolina, ¿qué defectos aparecieron y en
qué pregunta se originaron"* es directa: `ChecklistItemTemplate →
Observation → ObservationDefect → DefectType`, filtrando por
`RoomInstance.facadeFinishOptionId`. Sin este camino, esa pregunta
requeriría interpretar texto libre a mano, inspección por inspección.

---

## 2. Recomendación Técnica

### 2.1 Qué resolvería

Hoy, cuando alguien reporta un problema, el sistema registra el
hallazgo pero no dice nada sobre qué hacer al respecto — ni al
propietario en el momento, ni a la constructora en el informe, ni en
el flujo de postventa cuando se actualiza el ciclo de vida de una
observación (`ObservationLifecycleModal`, ya existe). Una
`TechnicalRecommendation` cierra ese hueco: texto de "qué revisar/qué
corregir" asociado al **tipo de defecto**, no a la observación
puntual — se redacta una vez por `DefectType` y aplica a todas las
observaciones futuras de ese tipo, en cualquier inspección.

### 2.2 Forma propuesta (preparatoria, sin construir)

```prisma
model TechnicalRecommendation {
  id           String     @id @default(cuid())
  defectTypeId String
  defectType   DefectType @relation(fields: [defectTypeId], references: [id])
  title        String                    // "Sellar encuentro con malla de refuerzo"
  body         String                    // recomendación en lenguaje simple, para el propietario
  // Distingue el destinatario -- el mismo defecto puede necesitar una
  // frase distinta según a quién se le muestra (propietario vs.
  // constructora en el informe técnico) -- evita forzar un solo texto
  // a servir dos audiencias distintas.
  audience     RecommendationAudience @default(AMBOS)
  order        Int        @default(0)
}

enum RecommendationAudience {
  PROPIETARIO
  CONSTRUCTORA
  AMBOS
}
```

Relación **1 `DefectType` → N `TechnicalRecommendation`** (no N:N):
un defecto puede tener más de una recomendación (ej. una para el
propietario en el momento, otra más técnica para la constructora en
el informe), pero cada recomendación pertenece a un solo tipo de
defecto — mantiene la redacción enfocada y evita que una
recomendación genérica termine aplicándose mal a un defecto que no
calzaba del todo.

### 2.3 Dónde engancharía (sin implementarlo ahora)

- **Informe automático**: al listar una observación en el PDF
  (`InformeElementRow`, ya existe), si tiene `ObservationDefect`
  asociados, se puede listar la(s) `TechnicalRecommendation` con
  `audience` CONSTRUCTORA/AMBOS a continuación del hallazgo — hoy el
  informe solo muestra el comentario libre de quien inspeccionó.
- **Sugerencia de reparación**: en el flujo de postventa
  (`ObservationLifecycleModal`), al avanzar el ciclo de vida de una
  observación, se le puede mostrar a la constructora la recomendación
  asociada como guía, no solo el comentario original.
- **IA**: si a futuro un modelo sugiere un `DefectType` a partir de
  una foto (ver `ObservationDefect.source = IA_SUGERIDA`), la
  recomendación técnica sale gratis — ya está atada al tipo de
  defecto, no hay que generarla de nuevo por observación.
- **Postventa/estadística**: permite responder "de los defectos más
  frecuentes, ¿cuál es la recomendación estándar?", útil tanto para
  contenido de biblioteca como para justificar por qué una prioridad
  quedó en ALTA.

### 2.4 Qué NO se decide en este documento

No se redacta ninguna recomendación real todavía, ni se decide si
`audience` es la única dimensión de segmentación necesaria (podría
sumarse a futuro, por ejemplo, urgencia sugerida de reparación) — eso
es contenido de Etapa 3 en adelante, no de este análisis.

---

## 3. Evolución de `MaterialTechnicalNote` → conocimiento técnico del
material

### 3.1 Por qué el nombre y la forma de la Etapa 2 ya no alcanzan

`MaterialTechnicalNote` (Etapa 2) fue diseñada como texto corto
único (`title` + `body`) — sirve para "protección UV en Madera", pero
no para una foto de referencia, un video, una tolerancia numérica
estructurada o una cita normativa. Pedir eso hoy con esa forma
significaría, otra vez, ir agregando columnas nuevas cada vez que
aparece un tipo de contenido distinto — el mismo problema estructural
que ya se evitó en el catálogo de materiales al elegir Opción B.

### 3.2 Modelo propuesto: contenido tipado con un núcleo común

Se generaliza a una entidad de **conocimiento técnico del material**,
con un núcleo de campos comunes a cualquier tipo de contenido, y un
campo de metadata específico por tipo (mismo patrón ya usado en
`Photo.aiMetadata`/`Observation.aiMetadata`: extensible sin migrar
cada vez que aparece un caso nuevo):

```prisma
model MaterialKnowledgeItem {
  id                    String                    @id @default(cuid())
  facadeFinishOptionId  String
  facadeFinishOption    FacadeFinishOption        @relation(fields: [facadeFinishOptionId], references: [id])
  kind                  MaterialKnowledgeKind
  title                 String
  // Contenido de texto libre -- aplica directo a TEXTO/NORMA/
  // RECOMENDACION; para IMAGEN/VIDEO es la descripción o caption,
  // no el archivo en sí.
  body                  String?
  // URL del recurso en Blob storage -- solo aplica a IMAGEN/VIDEO.
  mediaUrl              String?
  // Datos propios de cada tipo que no valdría la pena convertir en
  // columnas (ej. { "valorMm": 5, "referencia": "regla de 1,2 m" }
  // para TOLERANCIA, o { "duracionSeg": 42 } para VIDEO) -- mismo
  // patrón de extensibilidad sin migración que aiMetadata.
  structuredData        Json?
  order                 Int                       @default(0)
  createdAt             DateTime                  @default(now())
}

enum MaterialKnowledgeKind {
  TEXTO
  IMAGEN
  VIDEO
  NORMA
  TOLERANCIA
  RECOMENDACION
}
```

### 3.3 Relación con lo que ya existe (sin duplicar responsabilidades)

- **`LibraryArticle` de familia** sigue siendo la ficha técnica
  principal y la fuente de los ejemplos Bien/Mal
  (`goodBadExamplesByArticleSlug`) — `MaterialKnowledgeItem` no lo
  reemplaza, lo complementa a nivel de material específico dentro de
  esa familia.
- **`TechnicalRecommendation`** (sección 2) vive atada a `DefectType`,
  no a `FacadeFinishOption` — son ejes distintos: una recomendación
  responde "qué hacer si aparece este defecto", una nota de
  conocimiento de tipo `RECOMENDACION` respondería algo más general
  como "cómo mantener este material en el tiempo", sin depender de
  que haya ocurrido un defecto. Vale la pena mantenerlos separados en
  vez de fusionarlos — resuelven preguntas distintas del usuario
  (antes de que algo falle vs. después de que ya falló).
- **Tolerancias del Manual CDT** (`tolerances-manual.ts`,
  `tolerances-by-category.ts`) siguen siendo la fuente para los 2
  materiales con ficha real (Pintura, Estuco). `MaterialKnowledgeItem`
  con `kind: TOLERANCIA` es el lugar natural para los 11 materiales
  restantes que **no** tienen ficha CDT — no se inventa una tolerancia
  falsa, se documenta lo que exista (fabricante, criterio interno,
  etc.) de forma explícita y con su propia fuente, en vez de forzarla
  dentro de las tablas pensadas para el manual oficial.

### 3.4 Qué NO se decide en este documento

No se decide todavía si esto reemplaza por completo a
`MaterialTechnicalNote` (recomendación: sí, `MaterialKnowledgeItem`
con `kind: TEXTO` cubre exactamente el mismo caso de uso, así que no
tendría sentido mantener las dos tablas) ni se carga ningún contenido
real — eso es Etapa 3 en adelante.

---

## 4. Modelo consolidado (referencia rápida)

```
FacadeFinishOption (material, catálogo Opción B)
 ├─ familySlug ──────────────► ElementTemplate (familia, checklist base)
 │                                └─ ChecklistItemTemplate (base + extensiones N:N por material)
 ├─ MaterialKnowledgeItem[] (texto/imagen/video/norma/tolerancia/recomendación del material)
 └─ (referenciado por Observation vía RoomInstance.facadeFinishOptionId)

ChecklistItemTemplate ──► Observation (la "Respuesta")
                             └─ ObservationDefect (N:N) ──► DefectType
                                                              └─ TechnicalRecommendation[] (por audiencia)
```

---

## 5. Qué falta decidir antes de Etapa 3

1. ¿Apruebas `ObservationDefect` como tabla puente N:N (con
   `source`/`confidence` ya previstos para IA) en vez de la FK simple
   de la Etapa 2?
2. ¿Apruebas `TechnicalRecommendation` 1:N desde `DefectType`, con
   `audience` como única segmentación por ahora?
3. ¿Apruebas que `MaterialKnowledgeItem` reemplace directamente a
   `MaterialTechnicalNote` (mismo rol, forma más general), en vez de
   mantener ambas?
4. Todo lo aprobado en Etapa 1 y Etapa 2 sigue vigente sin cambios —
   este documento solo agrega las tres piezas de arriba.

No implementé nada. Con tu aprobación de estos tres puntos, la Etapa 3
(especificación visual) queda con el modelo de datos completo y
cerrado, sin necesidad de volver a tocar schema por sorpresas de
contenido más adelante.
