# ObraBien — Domain Model v1

## Qué es este documento

Durante el Sprint UX-03 ("Sistema de Terminaciones Exteriores") el
análisis fue creciendo hasta dejar de ser específico de fachadas: las
entidades que se fueron aprobando (catálogo de materiales, checklist
en capas, evidencia visual, tolerancia/medición, defectos, guías de
resolución) no son exclusivas de una fachada — aplican, por
construcción, a **cualquier** pregunta de checklist del sistema. Antes
de seguir agregando piezas nuevas, este documento consolida en un solo
lugar **todo lo ya aprobado hasta ahora** — lo que existía antes de
UX-03 y lo que UX-03 fue aprobando etapa por etapa — como el modelo de
dominio técnico completo de ObraBien.

**Reglas de este documento** (cumplidas explícitamente):
- No agrega ninguna entidad nueva. Todo lo que aparece acá ya fue
  aprobado en el schema actual o en alguno de los cuatro documentos de
  UX-03 (`Sprint-UX03-Analisis.md`, `Sprint-UX03-Diseno-Experiencia.md`,
  `Sprint-UX03-Diseno-Experiencia-Ajustes.md`,
  `Sprint-UX03-Diseno-Experiencia-Ajustes-2.md`).
- No propone ninguna funcionalidad nueva.
- No implementa nada — no hay una sola línea de schema ni de código
  tocada por este documento.
- No está centrado en fachadas — el dominio se presenta completo, con
  fachada como un caso particular dentro de él, no como el tema
  central.

Todo lo marcado **(existente)** ya está en `prisma/schema.prisma` hoy,
en producción. Todo lo marcado **(UX-03, aprobado)** fue diseñado y
aprobado durante este sprint, sin implementar todavía.

---

## 1. Mapa del dominio, por área

### 1.1 Identidad y tenancy (existente)

- **`Organization`** — unidad multi-tenant raíz de todo el sistema
  (`type`: PARTICULAR/INMOBILIARIA/CONSTRUCTORA, `plan`).
- **`User`** — pertenece a una `Organization`, con `role`
  (PROPIETARIO/COLABORADOR/ADMIN_ORGANIZACION/EDITOR_CONTENIDO/
  SUPER_ADMIN). `EDITOR_CONTENIDO` es, en la práctica, el rol que
  administraría el contenido de catálogo/biblioteca descrito más abajo.
- **`Account`/`Session`/`VerificationToken`/`PasswordResetToken`** —
  infraestructura de autenticación (NextAuth + recuperación de
  contraseña). No forman parte del dominio técnico de inspección, se
  listan por completitud.

### 1.2 Inspección — el proceso que se ejecuta (existente)

- **`Inspection`** — una recepción de vivienda concreta. Cuelga de
  `Organization`, tiene `status` (DRAFT/IN_PROGRESS/COMPLETED/CLOSED,
  con `COMPLETED` reservado y nunca escrito según
  `PRODUCT_DECISIONS.md`) y las características de la propiedad
  (tipo, dormitorios, baños, features booleanas).
- **`RoomInstance`** — un recinto real dentro de una `Inspection`
  ("Dormitorio 2"), con su copia editable de nombre y — donde aplica —
  el material elegido (`floorMaterial`, `wallCoveringMaterial`, ver
  1.4).
- **`ElementInstance`** — un elemento real dentro de un `RoomInstance`
  ("Ventana"), con `status` (PENDING/CORRECT/OBSERVED) derivado de sus
  observaciones.
- **`Observation`** — la respuesta real a una pregunta de checklist
  para un `ElementInstance`: `status` (CORRECT/OBSERVATION),
  `comment`, `priority`, y el ciclo de vida de postventa
  (`lifecycleStatus`: PENDIENTE/EN_REPARACION/RESUELTO/VERIFICADO).
  **Es, conceptualmente, la "Respuesta"** en la cadena
  Pregunta→Respuesta→Defecto aprobada en UX-03 — no se creó una tabla
  nueva para eso, ya existía.
- **`Photo`** — evidencia real capturada durante la inspección,
  atada a una `Observation`, con `kind` (EVIDENCIA/REPARACION).
- **`Report`** — el informe final de una `Inspection` al cerrarse:
  PDF, firmas, y un `snapshot` congelado (JSON) de todo lo anterior en
  ese momento, para que cambios futuros al catálogo no alteren un
  informe ya emitido.
- **`InspectionCollaborator`/`InspectionInvite`** — acceso externo
  puntual a una inspección (constructora invitada).
- **`Notification`** — aviso de cambios de ciclo de vida de una
  `Observation` (postventa).

### 1.3 Catálogo maestro — el contenido editorial que define QUÉ se
pregunta (existente + UX-03)

- **`RoomTemplate`** — tipo de recinto del catálogo ("Cocina",
  "Exterior"), con reglas de aplicabilidad (`requiredFeature`,
  `appliesToCasa`/`appliesToDepto`).
- **`ElementTemplate`** — tipo de elemento dentro de un
  `RoomTemplate` ("Ventana", "Fachada"), con `materialSlot`
  (FLOOR/WALL — y **FACADE, nuevo valor aprobado en UX-03**),
  `isMaterialVariant` (si es una variante que solo se activa por
  reasignación, no al crear la inspección) y `lacksNormativeBacking`
  (si el checklist es de observación general, sin respaldo normativo
  verificado — ej. gas, piscina, y la mayoría de terminaciones
  exteriores sin ficha CDT).
- **`ChecklistItemTemplate`** — la pregunta en sí ("¿La silicona está
  continua?"), con `helpText`, condicionantes existentes
  (`requiresShower`/`requiresBathtub`) **y, aprobado en UX-03, un
  modelo de tres capas**: una pregunta puede ser base de una familia
  (visible para cualquier material de esa familia) o extensión de uno
  o varios materiales puntuales dentro de esa familia, vía relación
  N:N con el catálogo de materiales (1.4). Este mismo mecanismo ya
  existe hoy para ducha/tina — UX-03 lo extiende a material, no
  inventa uno nuevo.

### 1.4 Selección de material — dos patrones que coexisten hoy

- **Piso y muros/cielos (existente)**: `FloorMaterial` y
  `WallCoveringMaterial` son **enums cerrados**, con mapas de
  label/slug en `material-selection.ts`. Agregar un material nuevo acá
  requiere migración de schema (nuevo valor de enum).
- **Fachada (UX-03, aprobado)**: catálogo en **tabla**, no enum —
  `FacadeFinishOption` (slug, label, `familySlug`, orden, activo).
  Agregar un material nuevo es una fila, no una migración. Esta es la
  decisión "Opción B" ya aprobada en el plan de UX-02 y confirmada en
  UX-03.
- En ambos casos, la elección vive en `RoomInstance` (para fachada:
  `facadeFinishOptionId`, mismo patrón que `floorMaterial`, porque
  "Exterior" ya es un `RoomInstance` real) y el mecanismo de
  reasignación (`ElementInstance.elementTemplateId` apunta al
  `ElementTemplate` correspondiente tras responder la pregunta) es
  **el mismo motor para los tres slots**, sin duplicar lógica.
- Nota, sin proponer cambiarlo acá: hoy conviven dos formas de
  modelar "catálogo de material" (enum vs. tabla) porque nacieron en
  momentos distintos del proyecto. Queda registrado como observación
  del estado actual, no como una decisión a tomar en este documento.

### 1.5 Biblioteca técnica — el contenido de referencia (existente)

- **`LibraryCategory`** — agrupación amplia ("Pinturas", "Ventanas").
- **`LibraryArticle`** — la ficha técnica de una categoría o familia,
  con `quickCheckItems` (lista rápida) y `body` (texto de referencia).
  Vinculada desde `ElementTemplate.referenceLibraryArticleId`.

### 1.6 Conocimiento técnico y evidencia visual (UX-03, aprobado)

- **`MaterialKnowledgeItem`** — conocimiento general de un material
  específico (`FacadeFinishOption`), tipado por `kind`
  (TEXTO/IMAGEN/VIDEO/NORMA/TOLERANCIA/RECOMENDACION), con
  `structuredData` (JSON) para lo que no amerita columna propia.
  Complementa al `LibraryArticle` de la familia, no lo reemplaza.
- **`InspectionEvidence`** — recursos visuales usados durante la
  inspección (imágenes correctas/incorrectas, video, PDF), con
  `polarity` (CORRECTA/INCORRECTA/NEUTRA) y resolución en cascada:
  por pregunta puntual (`ChecklistItemTemplate`) → por material
  (`FacadeFinishOption`) → por artículo de familia (`LibraryArticle`).
  Generaliza el mecanismo actual de pares Bien/Mal
  (`goodBadExamplesByArticleSlug`) y deja resuelta, de paso, la
  necesidad de "ejemplos por pregunta" que había quedado pendiente en
  UX-02.

### 1.7 Tolerancia y medición (UX-03, aprobado)

- **`ToleranceSpec`** — define, para una `ChecklistItemTemplate`
  puntual, si la pregunta se responde por medición en vez de por
  juicio binario: unidad, tipo de comparación (máximo/mínimo/rango),
  umbral(es), fuente normativa (ficha CDT u otra) e instrucción de
  cómo medir. Opcional — la mayoría de las preguntas del sistema
  siguen siendo juicio binario simple, sin `ToleranceSpec`.
- **`Measurement`** — el valor medido realmente durante una inspección
  puntual, 1:1 con la `Observation` que genera, con el `result`
  (CONFORME/NO_CONFORME) **calculado y guardado** al momento de medir
  — no recalculado después si el `ToleranceSpec` cambia, mismo
  principio que ya usa `Report.snapshot`.

### 1.8 Defectos y resolución (UX-03, aprobado)

- **`DefectType`** — catálogo de tipos de defecto técnico, transversal
  a familia o específico de un material.
- **`ObservationDefect`** — tabla puente N:N entre `Observation` y
  `DefectType`: una respuesta no conforme puede derivar en cero, uno o
  varios defectos; una respuesta conforme nunca los tiene (regla
  impuesta en la capa de aplicación, igual que hoy se restringe el
  panel de "reportar un problema" a la rama negativa). Incluye
  `source` (MANUAL/IA_SUGERIDA) y `confidence`, preparado para cuando
  exista análisis de foto por IA.
- **`ResolutionGuide`** — guía de resolución asociada a un
  `DefectType` (1:N), segmentada por `audience`
  (PROPIETARIO/CONSTRUCTORA/AMBOS). Reemplaza a la idea original de
  "recomendación" simple de texto.
- **`ResolutionGuideStep`** — el contenido real de una guía, tipado
  por `kind` (PROCEDIMIENTO/MATERIAL/VIDEO/NORMATIVA/ENLACE/RECURSO),
  mismo patrón de núcleo común + tipo + datos estructurados que
  `MaterialKnowledgeItem` — deliberadamente no unificadas en una sola
  tabla polimórfica todavía (ver `Ajustes-2.md`, sección 3.3).

---

## 2. Diagrama consolidado (conceptual, todo el dominio)

```
Organization ──< User

Organization ──< Inspection ──< RoomInstance ──< ElementInstance ──< Observation ──< Photo
                     │                │                  │                │
                     │                │                  │                ├──< Measurement (si hubo ToleranceSpec)
                     │                │                  │                └──< ObservationDefect >── DefectType
                     │                │                  │                                             │
                     │                │                  │                                             └──< ResolutionGuide ──< ResolutionGuideStep
                     │                │                  │
                     │                │                  └──► ElementTemplate ◄── RoomTemplate
                     │                │                          │
                     │                │                          └──< ChecklistItemTemplate ──< ToleranceSpec?
                     │                │                                       │  ▲
                     │                │                                       │  └── extensión N:N ──┐
                     │                │                                                                │
                     │                └── floorMaterial / wallCoveringMaterial (enum)                  │
                     │                └── facadeFinishOptionId ──────────────────────────► FacadeFinishOption
                     │                                                                        │  (familySlug)
                     │                                                                        ├──< MaterialKnowledgeItem
                     │                                                                        └──< InspectionEvidence
                     │
                     ├──< InspectionCollaborator / InspectionInvite
                     └──── Report (snapshot congelado)

LibraryCategory ──< LibraryArticle ──< InspectionEvidence (fallback general)
                          ▲
                          └── referenceLibraryArticleId (desde ElementTemplate)
```

Lectura del diagrama: todo lo que cuelga de `ChecklistItemTemplate`
hacia abajo y de `FacadeFinishOption`/`DefectType` hacia la derecha es
lo aprobado en UX-03; todo lo demás ya existía. El punto de unión
entre ambos mundos es `Observation` — sigue siendo la misma entidad de
siempre, solo que ahora puede colgar de una medición y puede derivar
en uno o más defectos, en vez de ser solo texto libre.

---

## 3. Qué queda fuera, a propósito

- No se incluye ningún dato de contenido real (no hay `DefectType`,
  `FacadeFinishOption` ni `ChecklistItemTemplate` de fachada
  cargados — eso es Etapa 3 de UX-03, todavía no abierta).
- No se decide la migración de `good-bad-examples.ts` ni de
  `tolerances-manual.ts` a las tablas nuevas — quedó anotado como
  extensión natural en su documento correspondiente, no como tarea de
  este modelo.
- No se resuelve la duda de la sección 1.4 sobre unificar el patrón
  enum/tabla de selección de material — es una observación del estado
  actual, no una decisión pendiente de este documento.
- No se implementa ninguna migración de Prisma ni ningún componente.

---

## 4. Próximo paso

Este documento queda como fuente de verdad del modelo de dominio
técnico completo de ObraBien, consolidando todo lo aprobado hasta
ahora. Con tu aprobación, decides si:

1. Retomamos UX-03 en su Etapa 3 (especificación visual — copy,
   contenido inicial de familias/materiales de fachada, primeras
   filas reales de `DefectType`/`ResolutionGuide`), o
2. Pasamos directamente a implementación (migración de schema +
   Server Actions + UI), usando este documento como referencia
   general del dominio en vez de retomar el hilo específico de
   fachadas primero.

No implementé nada. Quedo a la espera de tu decisión.
