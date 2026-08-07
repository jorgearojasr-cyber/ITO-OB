# ObraBien — Technical Implementation Backlog

## Qué es este documento

Descompone `ObraBien-Domain-Model-v1.md` (aprobado, fuente de verdad)
en épicas técnicas implementables, ordenadas por dependencia real. Es
un roadmap de implementación, no la implementación en sí.

**Reglas de este documento** (cumplidas explícitamente):
- No implementa nada — cero migraciones, cero código.
- No modifica el Domain Model — todas las entidades citadas acá son
  exactamente las ya aprobadas, sin agregar ni quitar ninguna.
- No propone entidades nuevas.
- Cada épica indica explícitamente su superficie técnica: migración
  Prisma, Server Actions, UI, y contenido editorial — para que
  cualquier épica pueda convertirse en un sprint sin sorpresas de
  alcance.

Solo se descompone lo **nuevo** (aprobado en UX-03, todavía no
construido). Lo que ya existe en producción (`Organization`, `User`,
`Inspection`, `RoomInstance`/`ElementInstance`, `Observation`,
`Photo`, `Report`, `LibraryCategory`/`LibraryArticle`, los enums
`FloorMaterial`/`WallCoveringMaterial`, etc.) no requiere backlog —
solo se menciona cuando una épica nueva lo modifica o lo extiende.

---

## 1. Mapa de dependencias entre épicas

```
E0 (Fundación: FACADE + catálogo de materiales)
 │
 ├─► E1 (Motor de pregunta de material, generalizado)
 │     │
 │     └─► E2 (Checklist en tres capas: familias + extensiones)
 │           │
 │           ├─► E3 (Biblioteca de familia + MaterialKnowledgeItem)
 │           │
 │           ├─► E4 (Evidencia visual — InspectionEvidence)
 │           │
 │           ├─► E5 (Tolerancia y medición)
 │           │
 │           └─► E6 (Catálogo de defectos y trazabilidad)
 │                 │
 │                 └─► E7 (Resolution Guide)
 │                       │
 └───────────────────────┴─► E8 (Integración en Informe y Postventa)
```

E3, E4, E5 y E6 son independientes entre sí una vez cerrada E2 —
pueden ejecutarse en cualquier orden o en paralelo si el equipo lo
permite. E7 depende solo de E6. E8 es la única épica que depende de
prácticamente todas las anteriores y por eso va al final.

---

## 2. Épicas

### E0 — Fundación: slot FACADE y catálogo de materiales

**Objetivo**: dejar instalado el tercer slot de material y su
catálogo, sin todavía generar ningún checklist ni contenido.

| Superficie | Detalle |
|---|---|
| **Prisma** | Nuevo valor `MaterialSlot.FACADE`. Nueva tabla `FacadeFinishOption` (id, slug, label, familySlug, order, active). Nueva columna `RoomInstance.facadeFinishOptionId` (nullable, FK). |
| **Server Actions** | Ninguna todavía — la tabla existe pero nada la usa. |
| **UI** | Ninguna todavía. |
| **Contenido editorial** | Ninguno todavía — el catálogo se puebla recién en E2, junto con las familias. |

**Riesgo/complejidad**: bajo. Es aditivo puro, no toca ningún flujo
existente. Bloquea a todo lo demás porque `familySlug`,
`facadeFinishOptionId` y el propio slot `FACADE` son referenciados por
prácticamente todas las épicas siguientes.

---

### E1 — Motor de pregunta de material, generalizado

**Objetivo**: que el mecanismo que hoy resuelve Piso/Muros sirva para
Fachada sin bifurcaciones hardcodeadas — un motor de 3 slots, no 2 + 1
caso especial.

| Superficie | Detalle |
|---|---|
| **Prisma** | Ninguna. |
| **Server Actions** | `setRoomMaterial` (`actions.ts`) deja de asumir 2 slots: para `FACADE`, valida contra `FacadeFinishOption` en vez de contra un enum, y reasigna `ElementInstance.elementTemplateId` al `ElementTemplate` de la **familia** (`familySlug`) del material elegido, no a un slug 1:1 material→template como hoy pasa con piso/muro. |
| **UI** | `RoomMaterialQuestion.tsx`: el título ya no es un `if (slot === "FLOOR")`/`else` — pasa a resolverse desde una tabla de configuración por slot (3 entradas). Las opciones de `FACADE` se muestran agrupadas visualmente por familia (13 opciones sueltas sin agrupar es mala experiencia), a diferencia de los 4-6 botones planos que bastan hoy para piso/muro. `get-element-instance-data.ts`: el cálculo de `materialQuestion` dejar de ser un ternario de 2 ramas, pasa a resolver por slot desde la misma tabla de configuración. |
| **Contenido editorial** | Ninguno — el copy de la pregunta ("¿Qué terminación tiene la fachada?") se define acá, pero sin contenido de familias/materiales todavía (eso es E2). |

**Riesgo/complejidad**: medio. Es el único cambio de este backlog que
toca un flujo ya en producción (piso/muro) — aunque el objetivo es no
alterar su comportamiento, cualquier generalización de una bifurcación
hardcodeada a una tabla de configuración necesita verificación
explícita de que Piso y Muros siguen funcionando exactamente igual que
hoy antes de darse por cerrada.

---

### E2 — Checklist en tres capas (familias + extensiones)

**Objetivo**: que exista contenido real de checklist para fachada,
usando el modelo aprobado (familia = base compartida, material =
extensiones N:N).

| Superficie | Detalle |
|---|---|
| **Prisma** | Nueva tabla puente N:N entre `ChecklistItemTemplate` y `FacadeFinishOption` (extensiones por material). Sin cambios a `ChecklistItemTemplate` en sí más allá de esa relación. |
| **Server Actions** | `get-element-instance-data.ts`: la función que filtra qué preguntas se muestran gana una condición más (mismo mecanismo que ya usa `requiresShower`/`requiresBathtub`): pregunta visible si no tiene extensión asociada (base) o si tiene una extensión que coincide con el material elegido del `RoomInstance`. |
| **UI** | Ninguna nueva — `ChecklistItemCard`/`ElementChecklist` ya renderizan cualquier `ChecklistItemTemplate` que les llegue, sin necesidad de saber si es base o extensión. |
| **Contenido editorial** | El grueso de esta épica: sembrar 6-8 `ElementTemplate` (uno por familia, `materialSlot: FACADE`, `isMaterialVariant: true`) con su checklist base; sembrar las 13 filas de `FacadeFinishOption` con su `familySlug`; sembrar las preguntas de extensión (ej. "grano uniforme" para Marmolina+Graniplast+Texturado) vía la tabla puente. |

**Riesgo/complejidad**: medio-alto en contenido (13 materiales, 6-8
familias, preguntas base + extensiones a redactar con criterio
técnico), bajo en código (reutiliza mecanismos ya existentes).

---

### E3 — Biblioteca de familia + `MaterialKnowledgeItem`

**Objetivo**: contenido de referencia técnica por familia y notas
específicas por material.

| Superficie | Detalle |
|---|---|
| **Prisma** | Nueva tabla `MaterialKnowledgeItem` (kind, title, body, mediaUrl, structuredData, facadeFinishOptionId). |
| **Server Actions** | Ninguna de escritura nueva en este alcance (contenido se siembra, no se edita desde la app todavía). Lectura: extender la consulta que hoy trae `referenceLibraryArticle` en `get-element-instance-data.ts` para incluir también los `MaterialKnowledgeItem` del material elegido del recinto. |
| **UI** | `ElementLibraryCard`/`ElementInspectionExperience`: sección adicional para mostrar los `MaterialKnowledgeItem` del material (si existen), debajo de la ficha de familia — mismo patrón visual que la ficha actual, sin rediseño. |
| **Contenido editorial** | Un `LibraryArticle` nuevo por familia (6-8) reutilizando el patrón actual (título, resumen, body, `quickCheckItems`). `MaterialKnowledgeItem` inicial para los materiales que lo ameriten (ej. nota de protección UV en Madera). |

**Riesgo/complejidad**: bajo. Extiende un patrón ya maduro
(`referenceLibraryArticle`) sin tocar su forma.

---

### E4 — Evidencia visual (`InspectionEvidence`)

**Objetivo**: reemplazar/complementar el archivo estático
`good-bad-examples.ts` con contenido real y con capacidad de
asociarse a nivel de pregunta puntual, no solo de artículo.

| Superficie | Detalle |
|---|---|
| **Prisma** | Nueva tabla `InspectionEvidence` (kind, polarity, mediaUrl, caption, order, con FKs opcionales a `ChecklistItemTemplate`, `FacadeFinishOption` y `LibraryArticle`). |
| **Server Actions** | Nueva función de resolución en cascada (pregunta → material → artículo), análoga a la que hoy resuelve `goodBadExamplesByArticleSlug`/`goodBadExamplesByCategorySlug` en `ElementInspectionExperience.tsx`, pero consultando la tabla nueva en vez de un objeto en memoria. |
| **UI** | `GoodBadExamplesSection`: sin cambios de props/forma (ya recibe `GoodBadExample[]`) — solo cambia de dónde viene el arreglo. Si se decide mantener también el archivo estático como fallback para las 9 categorías no-fachada que ya lo usan, esa convivencia debe decidirse explícitamente al abrir esta épica (no está resuelta acá, es una decisión de alcance del sprint que la ejecute). |
| **Contenido editorial** | El más pesado en esfuerzo real de esta épica: fotos/videos/PDFs reales por familia, material y — donde aporte — por pregunta puntual, subidos a Blob storage. Sin este contenido, la tabla existe pero queda vacía. |

**Riesgo/complejidad**: alto en esfuerzo de contenido (fotografía/video
real de referencia), bajo-medio en código. Candidata a ejecutarse en
paralelo a E5/E6 porque no depende de ellas, pero conviene
presupuestar su tiempo de contenido por separado del resto.

---

### E5 — Tolerancia y medición

**Objetivo**: que las preguntas que lo ameritan (verticalidad,
planeidad) se respondan con una medición real en vez de un juicio
binario.

| Superficie | Detalle |
|---|---|
| **Prisma** | Nuevas tablas `ToleranceSpec` (1:1 con `ChecklistItemTemplate`) y `Measurement` (1:1 con `Observation`, FK a `ToleranceSpec`). Nuevos enums `ToleranceUnit`, `ToleranceComparison`, `ToleranceResult`. |
| **Server Actions** | Extender el flujo de `saveChecklistAnswer` (o una acción hermana dedicada) para: detectar si la pregunta tiene `ToleranceSpec`, aceptar un valor numérico, calcular `result` contra el umbral y guardarlo en `Measurement` (no recalculado después), y usar ese resultado para **sugerir** (no forzar) el `status` de la `Observation`. |
| **UI** | `ChecklistItemCard`: variante de entrada cuando la pregunta tiene `ToleranceSpec` — campo numérico con su unidad, en vez de (o antes de) los botones binarios actuales. Requiere diseño de esa variante, no es solo backend. |
| **Contenido editorial** | `ToleranceSpec` para las preguntas con respaldo CDT real (verticalidad/planeidad de la familia húmeda-sobre-estuco y de Estuco visto, Fichas 8/23 ya transcritas). El resto de familias sin ficha quedan sin `ToleranceSpec` (siguen como juicio binario, igual que hoy) — no se inventa un umbral sin fuente. |

**Riesgo/complejidad**: medio-alto. Es la única épica que cambia la
forma de interacción del checklist para las preguntas que la usan
(nueva variante de UI en un componente ya complejo,
`ChecklistItemCard`), aunque el alcance real (cuántas preguntas la
necesitan) es acotado.

---

### E6 — Catálogo de defectos y trazabilidad

**Objetivo**: que una respuesta no conforme pueda asociarse a uno o
más tipos de defecto estructurados, no solo a texto libre.

| Superficie | Detalle |
|---|---|
| **Prisma** | Nueva tabla `DefectType`. Nueva tabla puente `ObservationDefect` (N:N `Observation`↔`DefectType`, con `source`/`confidence`). Nuevo enum `DefectLinkSource`. |
| **Server Actions** | El flujo de "Reportar un problema" (dentro de `saveChecklistAnswer` o su acción asociada) gana la posibilidad de recibir una lista de `defectTypeId` y crear las filas `ObservationDefect` correspondientes, con `source: MANUAL`. Debe quedar explícitamente restringido a observaciones con `status: OBSERVATION` (regla de aplicación, no de schema, como ya quedó definido en el análisis). |
| **UI** | `ChecklistItemCard`: dentro del panel ya existente de "Reportar un problema", un selector corto de `DefectType` relevantes a esa pregunta/material (multi-selección), antes o junto al comentario libre — el comentario libre no desaparece. |
| **Contenido editorial** | Taxonomía inicial de `DefectType` por familia/material, basada directamente en los "observaciones típicas" ya documentados en `Sprint-UX03-Analisis.md` para cada uno de los 13 materiales — ese trabajo de contenido ya está hecho a nivel de texto, falta convertirlo en filas. |

**Riesgo/complejidad**: medio. El modelo de datos es simple (N:N); el
trabajo real está en definir qué lista corta de defectos mostrar por
pregunta sin saturar la UI (curaduría de contenido, no complejidad
técnica).

---

### E7 — Resolution Guide

**Objetivo**: que cada tipo de defecto tenga una guía de resolución
estructurada, disponible para mostrarse donde corresponda.

| Superficie | Detalle |
|---|---|
| **Prisma** | Nuevas tablas `ResolutionGuide` (FK `DefectType`, `audience`) y `ResolutionGuideStep` (FK `ResolutionGuide`, `kind`, contenido). Nuevos enums `RecommendationAudience`, `ResolutionStepKind`. |
| **Server Actions** | Función de lectura que, dado uno o más `defectTypeId` de una observación, trae sus `ResolutionGuide` filtrando por `audience` según quién esté mirando (propietario vs. constructora). |
| **UI** | Superficie a decidir según dónde se quiera mostrar primero (no se decide en este backlog, es alcance del sprint que la ejecute) — candidatos naturales: `ObservationLifecycleModal` (postventa) e `InformeElementRow` (informe final), ambos ya existentes. |
| **Contenido editorial** | Redacción de guías reales por `DefectType` ya cargado en E6 — sin `DefectType` poblado (E6), esta épica no tiene sobre qué escribir. |

**Riesgo/complejidad**: bajo-medio en código (lectura simple); el
volumen de contenido depende directamente de cuántos `DefectType`
haya quedado definidos en E6.

---

### E8 — Integración en Informe y Postventa

**Objetivo**: que el informe final y el flujo de postventa reflejen
todo lo construido en E5-E7, no solo el texto libre actual.

| Superficie | Detalle |
|---|---|
| **Prisma** | Ninguna — épica de solo lectura sobre lo ya migrado. |
| **Server Actions** | `get-informe-data.ts` extendido para incluir `Measurement`/`ObservationDefect`/`ResolutionGuide` (audiencia CONSTRUCTORA/AMBOS) junto a cada observación del snapshot. |
| **UI** | `InformeElementRow`: mostrar valor medido + resultado cuando exista `Measurement`; listar `DefectType` y su `ResolutionGuide` resumido cuando existan. `ObservationLifecycleModal`: mostrar la guía de resolución (audiencia CONSTRUCTORA) como apoyo al avanzar el ciclo de vida. |
| **Contenido editorial** | Ninguno nuevo — reutiliza el contenido ya cargado en E3-E7. |

**Riesgo/complejidad**: medio. Toca dos pantallas ya maduras y
protegidas (`Report`/`informe`, postventa) — cualquier cambio ahí
requiere la misma disciplina de verificación que ya se aplicó en
sprints anteriores sobre esas pantallas.

---

## 3. Resumen de superficie técnica por tipo (vista transversal)

| Tipo de cambio | Épicas que lo requieren |
|---|---|
| Migración Prisma | E0, E2, E3, E4, E5, E6, E7 |
| Server Actions | E1, E2 (lectura), E3 (lectura), E4, E5, E6, E7, E8 |
| UI | E1, E3, E4, E5, E6, E7 (a definir), E8 |
| Contenido editorial | E2, E3, E4, E5, E6, E7 |

Solo **E0** es migración pura sin ningún otro tipo de cambio, y solo
**E8** no requiere ninguna migración — todas las demás combinan al
menos tres de los cuatro tipos, razón por la cual ninguna épica de
este backlog es candidata a "solo backend" o "solo contenido": cada
una necesita coordinarse en las mismas dimensiones que ya se coordinan
en cada sprint de este proyecto.

---

## 4. Qué no resuelve este backlog, a propósito

- No decide fechas ni asignación de sprints — es el orden de
  dependencias, no un calendario.
- No decide si E3-E6 se ejecutan en paralelo o en serie — solo
  confirma que **pueden** ir en paralelo una vez cerrada E2.
- No resuelve las preguntas de alcance marcadas explícitamente dentro
  de E4 (convivencia con `good-bad-examples.ts`) y E7 (dónde se
  muestra primero la guía) — quedan para cuando esa épica puntual se
  abra como sprint.
- No modifica `ObraBien-Domain-Model-v1.md` ni agrega entidades — todo
  lo listado acá ya estaba aprobado ahí.

No implementé nada. Este documento queda listo para convertirse en
sprints — la decisión de cuál abrir primero (retomar E0/E1 como
continuación natural de UX-03, o priorizar otra épica) queda en tus
manos.
