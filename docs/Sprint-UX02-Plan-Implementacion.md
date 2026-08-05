# Sprint UX-02 — Plan de Implementación

Construido sobre `Sprint-UX02-Analisis.md` (Etapa 1, ya aprobado) y el
orden de prioridad que confirmaste. Sigue sin haber código escrito —
este documento define **qué se va a construir y en qué orden**, no lo
construye todavía. Cada bloque indica: dependencias, impacto técnico
concreto (archivos/schema), reutilización, riesgos, y si necesita una
Etapa 2 de diseño propia antes de tocar código.

---

## Mapa de dependencias entre prioridades

```
P0 (bug biblioteca) ── independiente, primero por ser bug

P1a (Cambiar recinto) ── independiente

P1b (Observaciones) ─┐
                      ├─ comparten la necesidad de un punto de acción
P2  (Eliminar)       ─┘  por fila en InspectionListItem (ver nota abajo)

P2b (Revestimientos, estructura) ── bloquea a:
    └─ P2c (Marmolina) ── no se toca hasta que P2b esté aprobada e implementada

P3 (Bien/Mal por pregunta) ── requiere su propia Etapa 2 (diseño)
    antes de estimarse en detalle — no se agenda código todavía

P4 (Desktop del resto del sistema) ── no es una tarea de build en
    este sprint; es un criterio que aplica a P1b (pantalla nueva) y
    queda registrado como principio para el resto del roadmap

P5 (Paleta) ── bloqueado: necesito acceso a los repos de Marketplace
    y Calculadoras antes de poder avanzar
```

**Nota sobre la sinergia P1b/P2**: tanto "Observaciones" (llegar desde
`/inspecciones` a un proyecto puntual) como "Eliminar inspección"
necesitan un punto de acción por fila en `InspectionListItem` — hoy es
un `<Link>` plano, sin ningún affordance de acción. Conviene
resolver **una sola vez** cómo se accede a acciones/destinos
secundarios por proyecto (menú contextual, swipe, botón secundario —
decisión de Etapa 2, no asumida acá) y que ambas prioridades lo
reutilicen, en vez de construir dos mecanismos de entrada distintos.
Por eso van juntas en la Etapa 2 de diseño, aunque se implementen en
dos pasos de código separados.

---

## PRIORIDAD 1 · P0 — Corregir la biblioteca técnica (bug)

**Causa raíz** (confirmada en el análisis): `goodBadExamplesByCategorySlug`
(`src/lib/library/good-bad-examples.ts`) tiene una sola entrada
`pinturas` con **dos** pares en el mismo arreglo — uno etiquetado
"Interior" y otro "Exterior". `ElementInspectionExperience.tsx:60`
busca por `categorySlug` (nunca por elemento), así que cualquier
elemento cuya ficha técnica caiga en la categoría "pinturas" — sea
interior o exterior — recibe los dos pares completos.

**Por qué es un bug aislado**: de las 9 categorías con ejemplos
Bien/Mal, **solo "pinturas" mezcla dos ámbitos distintos** (interior
vs. exterior) dentro de una misma categoría. Las otras 8 no tienen
esta ambigüedad.

**Impacto técnico propuesto** (sin implementar todavía):
1. `get-element-instance-data.ts` — agregar un campo adicional a
   `ElementInstanceData` con el **slug del artículo** (no solo el de
   categoría), leyendo `referenceLibraryArticle.slug` — dato que ya se
   consulta pero hoy no se expone. Cambio aditivo, no rompe el shape
   existente.
2. `good-bad-examples.ts` — separar la entrada `pinturas` en dos
   claves nuevas (`pintura-interior` / `pintura-exterior`, mismos
   slugs que ya usa `libraryArticleSlug` en el seed), dejando las
   otras 8 categorías intactas.
3. `ElementInspectionExperience.tsx` — la búsqueda de ejemplos prueba
   primero por slug de artículo (si existe una entrada específica) y
   cae a `categorySlug` como hoy para el resto de categorías, que no
   la necesitan.

**Reutilización**: `GoodBadExamplesSection` no cambia — sigue
recibiendo el mismo shape de `GoodBadExample[]`, solo cambia de dónde
se obtiene el arreglo correcto.

**Riesgo**: bajo. Cambio acotado a 3 archivos, sin migración de
schema, sin tocar el checklist ni la lógica de negocio. No requiere
Etapa 2 de diseño — es corrección de datos, no de experiencia.

**Verificación**: revisar en vivo que "Fachada" (`pintura-exterior`)
ya no muestre el par "Interior", y que un muro interior con pintura
siga mostrando solo su propio par — más una pasada rápida por las
otras 8 categorías para confirmar que no cambiaron.

---

## PRIORIDAD 2 · P1 — "Cambiar recinto"

**Objetivo confirmado**: no se toca el algoritmo de recorrido — sigue
sugiriendo "siguiente pendiente" como hoy. Se agrega un **atajo**,
principalmente para móvil, para saltar a cualquier recinto sin pasar
por la lista completa.

**Estado de partida**: el índice completo de recintos ya existe y ya
se usa — es el `<aside>` construido en el Sprint D1-D4 (Screen 2),
hoy visible solo desde 1024px (`RoomListRow` + `getRoomsListData`,
ya consultados en `recintos/[roomId]/page.tsx`).

**Impacto técnico propuesto**: exponer ese mismo índice en móvil,
detrás de una acción explícita en vez de estar siempre visible (en
1024px+ hay espacio para mostrarlo permanente; en móvil no) — por
ejemplo, un botón "Cambiar recinto" en el header que abre el mismo
listado en una hoja/panel. La forma exacta (bottom sheet, modal,
panel deslizante) es una decisión de Etapa 2 breve, no de arquitectura
— los datos y el componente de fila ya existen.

**Dependencias**: ninguna. No depende de P0 ni de nada más en esta
lista.

**Reutilización**: `RoomListRow`, `getRoomsListData` — el mismo par
que ya alimenta el índice de escritorio. Ningún dato nuevo.

**Riesgo**: bajo — es exponer en un contexto (móvil) algo que ya
existe en otro (escritorio), no construir un mecanismo nuevo. El
único cuidado real es no introducir un segundo lugar que calcule "cuál
es el recinto actual" — debe seguir siendo el mismo dato que ya
resuelve el índice de escritorio, para no duplicar lógica.

**¿Toca una pantalla congelada?** Sí — `recintos/[roomId]` es parte
del Milestone 1. Se modifica acá porque este sprint es uno de los tres
caminos permitidos explícitamente por esa regla.

---

## PRIORIDAD 3 · P1 — Pantalla independiente de Observaciones

**Flujo confirmado**: `Inspecciones → Seleccionar proyecto →
Observaciones → Actualizar estado → Volver`. Parte de `/inspecciones`
(la lista de **todos** los proyectos), no de Inicio (que solo conoce
la inspección "activa") — esto importa: la pantalla debe funcionar
para cualquier inspección, no solo la que está en curso.

**Estado de partida**: no existe la ruta. `ObservationsSummaryList` y
`ObservationLifecycleModal` ya están desacoplados de `/resumen` —
reciben `inspectionId` + datos por props, no dependen de su markup.
`getObservationsSummaryData(inspectionId)` ya existe y no necesita
cambios.

**Impacto técnico propuesto**:
1. Ruta nueva `src/app/inspecciones/[inspectionId]/observaciones/page.tsx`
   — reutiliza `ObservationsSummaryList` + `ObservationLifecycleModal`
   + `getObservationsSummaryData` tal cual.
2. Punto de entrada desde `InspectionListItem` (ver nota de sinergia
   con P2 arriba) — cómo se llega desde la fila del proyecto es la
   pieza de diseño de esta prioridad, no la pantalla en sí.
3. **Aplicar ya el criterio de escritorio de la Prioridad 7 (P4)** a
   esta pantalla nueva desde el día uno — sería contradictorio abrir
   una pantalla nueva hoy con el patrón `max-width: 480px` que se
   acaba de pedir dejar de usar hacia adelante.

**Dependencias**: ninguna dura sobre el resto de la lista, pero
comparte la decisión de "acción por fila" con P2 (ver mapa de
dependencias).

**Reutilización**: alta — es, de las 8 prioridades, la que más
reutiliza sin tocar ningún componente existente.

**Riesgo**: bajo-medio. El riesgo no está en los componentes (ya
probados en `/resumen`) sino en definir bien el punto de entrada desde
`/inspecciones` sin duplicar la navegación que ya existe desde Inicio.

---

## PRIORIDAD 4 · P2 — Eliminar inspección

**Patrón confirmado**: menú contextual → confirmación → eliminación
definitiva, "igual que el resto del sistema" — el precedente real más
cercano es `deleteRoomInstance`/`deleteElementInstance`
(`actions.ts:759,838`): borran `Photo` y llaman `del()` de Vercel Blob
antes de borrar filas, y el modal de confirmación con acción
irreversible ya tiene precedente en `CloseInspectionModal` (sin la
parte de firma, que no aplica acá).

**Impacto técnico propuesto**:
1. `deleteInspection` (Server Action nueva en `actions.ts`) — mismo
   patrón de cascada manual + limpieza de Blob, pero con más
   superficie: `Photo` (por cada `Observation`), `Observation`,
   `ElementInstance`, `RoomInstance`, `Report` (incluye `pdfStorageKey`
   y URLs de firma en Blob), `InspectionInvite`,
   `InspectionCollaborator`, y recién ahí `Inspection`. Todo dentro de
   una transacción, como ya se hace para recintos/elementos.
2. Componente de menú contextual — **no existe hoy ningún primitivo de
   menú/dropdown en `components/ui/`** — se crea uno nuevo, reutilizable
   (candidato también para el punto de entrada de P1b, ver sinergia).
3. Modal de confirmación — texto explícito de "esta acción no se puede
   deshacer", mismo tono que `CloseInspectionModal`.

**Dependencias**: ninguna dura, pero conviene resolver el mecanismo de
"acción por fila" en conjunto con P1b (mismo componente de menú,
un solo punto de decisión de diseño).

**Reutilización**: el patrón de limpieza en cascada + Blob ya existe
dos veces en el código (recintos, elementos) — esta sería la tercera
aplicación del mismo patrón, no uno nuevo.

**Riesgo**: medio. No por complejidad técnica (el patrón ya está
probado dos veces) sino por superficie — es el borrado con más tablas
relacionadas de todo el sistema hasta ahora, y el primero que también
borra un `Report` con PDF y firmas en Blob. Requiere probarse con una
inspección de prueba completa (con fotos, observaciones, informe
generado) antes de darse por cerrado, no solo con datos vacíos.

---

## PRIORIDAD 5 · P2 — Revestimientos exteriores (estructura primero)

**Decisión que pediste explícitamente**: arquitectura primero,
Marmolina después — y la arquitectura debe soportar agregar tipos
nuevos "sin rehacer el modelo".

**Esto es, en sí mismo, una decisión de arquitectura que no puedo
tomar por mi cuenta** (regla permanente del proyecto: cambios de
arquitectura se proponen primero, no se ejecutan directo). Hay dos
caminos reales, con implicancias distintas, y quiero que elijas antes
de que diseñe el detalle:

**Opción A — Extender el patrón existente (enum + mapas)**
Mismo mecanismo que ya usan `FloorMaterial`/`WallCoveringMaterial`:
un nuevo valor de enum por cada tipo de revestimiento, más una entrada
en los mapas de label/slug (`material-selection.ts`). Consistente con
la arquitectura actual, migración aditiva y de bajo riesgo por cada
tipo nuevo — pero cada tipo nuevo (Graniplast, SmartPanel, etc.)
sigue requiriendo una migración de schema (agregar un valor de enum),
aunque sea pequeña.

**Opción B — Catálogo en tabla (nuevo modelo `FacadeFinishOption` o
similar)**
Los tipos de terminación viven como filas de una tabla, no como
valores de enum — agregar "Graniplast" el día de mañana sería una
fila nueva, no una migración de schema. Más flexible a largo plazo,
pero es un cambio de patrón más grande: hoy **ningún** selector de
material del sistema funciona así (todos son enum), así que sería el
primer precedente de este tipo — más superficie de diseño (¿quién
puede agregar opciones? ¿tiene versión "activa/inactiva"?) antes de
empezar a construir.

**En ambos casos, además**: se necesita un `MaterialSlot` nuevo (hoy
solo `FLOOR`/`WALL`), una columna donde guardar la elección (hoy vive
en `RoomInstance`, pero fachada no es un "recinto" en el sentido que
usa esa tabla hoy — puede requerir modelarse distinto), y texto de
pregunta propio en `RoomMaterialQuestion.tsx` (hoy hardcodeado a piso/
muro).

**Dependencias**: Marmolina (lo que sigue después de esto) queda
completamente bloqueado hasta que esta estructura esté aprobada e
implementada — no se toca antes.

**Riesgo**: alto si se decide sin resolver primero la pregunta
Opción A vs. B — es la pieza de mayor impacto en el modelo de datos de
todo el sprint.

**Necesito tu decisión sobre A vs. B antes de poder detallar más esta
prioridad.**

---

## PRIORIDAD 6 · P3 — Imágenes Bien/Mal por pregunta

**Confirmado por ti**: no se implementa todavía — primero una
propuesta de diseño (Etapa 2), dado que toca la pantalla más protegida
del sistema.

**Lo que ya sabemos del análisis**: hoy no existe ningún dato que
asocie un ejemplo Bien/Mal específico a una pregunta específica del
checklist — la relación hoy es plana (elemento → categoría →
ejemplos). La Etapa 2 tiene que resolver, como mínimo:
- Qué dato nuevo asocia ejemplo↔pregunta (¿en el `ChecklistItemTemplate`?
  ¿en una tabla de relación nueva?).
- Qué pasa con las preguntas que **no** tienen apoyo visual — el
  criterio "solo donde aporte valor técnico" implica que la ausencia
  de imagen es un estado válido y esperado, no un vacío a rellenar.
- Cómo se mueve la lógica de renderizado desde
  `ElementInspectionExperience` (hoy dueña del bloque completo) hacia
  `ElementChecklist`/`ChecklistItemCard` sin romper el resto de la
  pantalla protegida.

**No se agenda código en este plan** — el siguiente paso de esta
prioridad es abrir su propia Etapa 1→2 cuando le toque el turno, no
antes.

---

## PRIORIDAD 7 · P4 — Desktop del resto del sistema (criterio, no tarea)

**Confirmado por ti**: no es una pantalla para implementar en este
sprint — es un criterio a aplicar de ahora en adelante. Alcance
aclarado: Biblioteca, Inspecciones, Observaciones (la nueva, P1b),
Perfil, y pantallas futuras — explícitamente **no** las 6 del
Milestone 1.

**Cómo entra a este plan**: no como una prioridad de build propia,
sino como un requisito aplicado a **Prioridad 3 (Observaciones)** —
es la única pantalla nueva de este sprint, así que es la primera
oportunidad real de aplicar el criterio en vez de sumar deuda nueva.
El resto de las pantallas mencionadas (Biblioteca, Inspecciones,
Perfil) quedan registradas como backlog para un futuro sprint de
responsive, no de este.

---

## PRIORIDAD 8 · P5 — Paleta visual del ecosistema ObraBien

**Aclaración recibida**: la fuente de verdad no es D1 — son los
proyectos ya existentes del ecosistema (Marketplace y Calculadoras),
usando los tokens de `DESIGN_SYSTEM_OBRABIEN.md` como base de
comparación. Documentar diferencias primero, no cambiar colores
todavía.

**Bloqueo real**: no tengo acceso a los repositorios de Marketplace ni
de Calculadoras desde este entorno — este proyecto (ObraBien
Inspección) es el único código al que puedo leer directamente. No
puedo "documentar todas las diferencias" sin poder ver el otro lado de
la comparación.

**Lo que necesito de ti para desbloquear esto** (cualquiera de estas
opciones sirve):
- Acceso a los repositorios de Marketplace/Calculadoras (ruta local,
  o agregarlos como referencia).
- O una exportación de sus tokens de color reales (archivo CSS/JSON,
  captura de su design system, o los valores hex directamente).
- O URLs de las apps desplegadas, para poder inspeccionar los colores
  reales en vivo si no hay acceso al código.

Sin uno de esos tres, esta prioridad no puede avanzar más allá de este
punto — no voy a comparar contra mi memoria ni contra supuestos.

---

## Orden recomendado de ejecución

Mantiene tu orden de prioridad, con los puntos de decisión tuya
insertados donde bloquean el avance:

1. **P0** — implementar directo (bug, sin bloqueos).
2. **P1a (Cambiar recinto)** — implementar directo (sin bloqueos).
3. **Etapa 2 breve, conjunta**: mecanismo de "acción por fila" en
   `InspectionListItem` (sirve a P1b y P2 a la vez) → luego
   **P1b (Observaciones)** → luego **P2 (Eliminar)**.
4. **P2b (Revestimientos)** — pausado hasta que confirmes Opción A o
   B. **P2c (Marmolina)** no arranca hasta que P2b esté implementada.
5. **P3 (Bien/Mal por pregunta)** — su propia Etapa 1→2, se agenda
   cuando le toque el turno según este orden, no antes.
6. **P4 (Desktop)** — se aplica como criterio dentro del paso 3
   (Observaciones), no como paso propio.
7. **P5 (Paleta)** — bloqueado hasta que compartas acceso a
   Marketplace/Calculadoras; no ocupa un lugar en la secuencia de
   código hasta entonces.

**Necesito de ti, antes de abrir la Etapa 2 de cualquier punto**:
- Confirmar si empezamos por P0 solo, o P0 + P1a juntos (ambos sin
  bloqueos, pueden ir en paralelo si prefieres agruparlos).
- Opción A vs. B para la arquitectura de revestimientos exteriores
  (Prioridad 5).
- Acceso a Marketplace/Calculadoras para la Prioridad 8.

No implementé nada de esto — queda a la espera de tu aprobación de
este plan y de las tres decisiones pendientes.

---

## Decisiones confirmadas (post-aprobación del plan)

1. **Revestimientos exteriores (Prioridad 5): Opción B — catálogo en
   tabla, no enum.** Debe soportar, entre otros: Pintura lisa,
   Marmolina, Graniplast, Revestimiento texturado, Fibrocemento,
   SmartPanel, Piedra, Enchapes, y futuros — sin migración por cada
   tipo nuevo. Sigue sin implementarse — el diseño de este catálogo se
   aborda cuando le toque su turno en el orden de ejecución.
2. **Paleta del ecosistema (Prioridad 8): fuera de este sprint.** Pasa
   a ser un sprint independiente, para no bloquear la validación
   funcional. No ocupa lugar en la secuencia de UX-02.
3. **Arquitectura de "acciones por inspección" (sinergia P1b/P2):
   aprobada como componente único y extensible**, no como una
   solución puntual para Observaciones/Eliminar. Debe dejar espacio
   para crecer hacia Duplicar, Compartir, Archivar, Exportar, etc. sin
   duplicar el mecanismo — se construye **antes** de Observaciones y
   de Eliminar, pero solo con las acciones que este sprint realmente
   necesita (no se implementan las acciones futuras todavía).
4. **Orden de ejecución confirmado: por etapas, con parada obligatoria
   entre cada una.** Arranca únicamente con **Etapa 1 — P0**. Al
   terminar, compilar, verificar y mostrar el diff exacto, me detengo
   y espero aprobación antes de continuar a la siguiente etapa — no
   se encadenan etapas automáticamente.
