# Sprint UX-02 — Primera ronda de validación con usuario real — Análisis

Nace de la primera validación funcional real sobre la app desplegada
en Vercel (iPad + computador), ya en la Fase 2 — Validación del
Producto. Este documento aplica la regla de triage obligatoria
(`ROADMAP_OBRABIEN.md`) a cada uno de los 9 puntos, identifica
dependencias reales contra el código actual, y propone un orden de
implementación. **No se escribió código para producir este
documento** — todo lo citado abajo es lectura directa del repositorio.

Nota de gobernanza: varios puntos tocan pantallas ya **congeladas**
por el Milestone 2 ("Fase 1 — Implementación visual completada").
Abrir este sprint explícito es exactamente el tercer camino permitido
por esa regla de congelamiento — no es una excepción informal, es el
mecanismo previsto.

---

## 1 · Eliminar inspección (menú contextual + confirmación)

**Triage: Hallazgo de usuario** (capacidad ausente, detectada en uso
real — no hay evidencia de que fuera una exclusión deliberada).

**Estado actual**: no existe ningún `deleteInspection` en
`src/lib/inspections/actions.ts` — solo existen `deleteRoomInstance`
(línea 759) y `deleteElementInstance` (línea 838), y ambas siguen el
mismo patrón: borran `Photo` a mano, llaman `del()` de Vercel Blob
sobre cada URL, borran `Observation`/`ElementInstance`, y recién ahí
borran el padre. `InspectionListItem.tsx` es un `<Link>` plano, sin
menú ni affordance de borrado.

**Impacto real**: en `prisma/schema.prisma`, ninguna relación de
`Inspection` hacia sus hijos (`RoomInstance`, `ElementInstance`,
`Observation`, `Report`, `InspectionInvite`, `InspectionCollaborator`)
tiene `onDelete: Cascade` — un `prisma.inspection.delete()` directo
fallaría por restricción de llave foránea. Además, `Report` guarda
`pdfStorageKey` y URLs de firma en Blob, y cada `Observation` puede
tener `Photo` en Blob — todo eso queda huérfano si no se limpia
explícitamente, mismo riesgo que ya se resolvió para recintos/
elementos.

**Dependencias**: ninguna con el resto de la lista. Autocontenido.

**Complejidad real**: media — no es solo UI. Requiere una Server
Action nueva que replique el patrón de limpieza en cascada +
Blob ya usado en `deleteRoomInstance`/`deleteElementInstance`, más un
componente de menú contextual (no existe ningún componente de menú/
dropdown reutilizable en `components/ui/` hoy — se crearía uno nuevo)
y un modal de confirmación (`CloseInspectionModal.tsx` es el
precedente más cercano de "acción irreversible con confirmación").

---

## 2 · Biblioteca técnica mostrando contenido que no corresponde

**Triage: Bug.** No es una preferencia de diseño — es una
inconsistencia objetiva entre lo que el propio sistema ya sabe
(`libraryArticleSlug` por elemento) y lo que efectivamente se
renderiza.

**Causa raíz confirmada**: `ElementLibraryCard` (la ficha técnica,
"CÓMO REVISARLO") **sí está bien scoped** — a "Fachada" se le asigna
`libraryArticleSlug: "pintura-exterior"` en `prisma/seed.ts:655`,
distinto del `"pintura-interior"` que reciben los muros interiores. El
problema está en `GoodBadExamplesSection` — el bloque "BIEN HECHO VS.
MAL HECHO", que **no** se filtra por elemento sino por
`categorySlug` (`ElementInspectionExperience.tsx:60`), y la entrada
`pinturas` de `goodBadExamplesByCategorySlug`
(`src/lib/library/good-bad-examples.ts:130-151`) contiene **ambos**
pares, interior y exterior, en un mismo arreglo — por eso Fachada
muestra los dos (confirmado en vivo durante la verificación del
Sprint D1-D4, Screen 4).

**Dependencias**: ninguna. Es el hallazgo más aislado y de menor
riesgo de toda la lista — toca datos (mapeo de ejemplos), no el
layout de la pantalla protegida.

---

## 3 y 4 · Marmolina + estructura general de revestimientos exteriores

Se analizan juntos porque comparten el mismo mecanismo — implementar
el punto 3 sin el punto 4 significaría reescribir el mismo código dos
veces.

**Triage: Decisión estratégica** (extensión de catálogo + de
arquitectura de datos, no un bug ni un hallazgo de UX puntual).

**Mecanismo existente confirmado**: `MaterialSlot` (schema) solo tiene
`FLOOR`/`WALL`. `ElementTemplate.materialSlot` + `isMaterialVariant`
marca plantillas variante que **no se instancian** al crear la
inspección (`actions.ts:62`) — se reasignan después vía
`setRoomMaterial` (`actions.ts:517-551`), que valida contra
`FLOOR_MATERIAL_LABELS`/`WALL_MATERIAL_LABELS` y resuelve el
`ElementTemplate` correcto vía `FLOOR_MATERIAL_SLUG`/
`WALL_MATERIAL_SLUG` (`src/lib/inspections/material-selection.ts:7-37`).

**Lo que es aditivo y de bajo riesgo**: agregar "Marmolina" como un
nuevo valor del enum `WallCoveringMaterial` (o el que corresponda) más
una entrada nueva en los mapas de label/slug — mismo patrón que ya
existe, migración de schema aditiva (nuevo valor de enum, no rompe
nada existente).

**Lo que NO es aditivo**: un `MaterialSlot` nuevo específico para
revestimiento de fachada (el punto 4 pide soportar fibrocemento,
piedra, enchapes — es decir, una categoría de material distinta a
"muro interior") requiere: nuevo valor de `MaterialSlot`, una columna
nueva donde guardar esa elección (hoy vive en `RoomInstance` para
piso/muro — fachada no es hoy un "recinto" con esa misma noción),
nuevo mapa de label/slug, texto de pregunta propio en
`RoomMaterialQuestion.tsx` (hoy la copy está hardcodeada para piso/
muro, línea 22), y plantillas de elemento variante nuevas en el seed.

**Dependencias**: el punto 3 depende del diseño del punto 4 — conviene
resolver la estructura general primero y que "Marmolina" sea su primer
valor real, no al revés.

---

## 5 · Pantalla independiente de Observaciones

**Triage: Decisión estratégica** (nueva pantalla en la navegación
principal, no un ajuste visual ni un bug).

**Estado actual**: el tile "Observaciones" de `QuickAccessGrid`
(línea 105-110) hoy enlaza a `/resumen` — no existe ninguna ruta
`/inspecciones/{id}/observaciones`. Buena noticia para el riesgo de
esta pieza: `ObservationsSummaryList.tsx` y
`ObservationLifecycleModal.tsx` **ya están desacoplados** de la página
de Resumen — reciben datos por props (`inspectionId` +
`ObservationsSummaryData`), no hacen fetching propio ni dependen de
markup de `/resumen`. Reutilizables tal cual en una ruta nueva.

**Dependencias**: ninguna dura. Es, de las piezas "grandes", la de
menor riesgo real — el trabajo es sobre todo de ruteo y navegación, no
de lógica nueva.

**Nota de alcance**: el flujo pedido es *Proyecto → Observaciones →
Actualizar estado* — esto implica decidir desde dónde se llega
("Proyecto" = ¿Inicio? ¿`/inspecciones`?), pregunta de diseño a
resolver en la Etapa 2 de este punto, no algo que deba asumirse acá.

---

## 6 · Imágenes Bien/Mal inmediatamente antes de la pregunta

**Triage: Hallazgo de usuario** — pero toca **la pantalla más
protegida del sistema** (Ficha de Elemento, congelada en el Milestone
2, y ya señalada explícitamente como "la más protegida" en la reserva
técnica del cierre D1-D4).

**Estado actual confirmado**: hoy todos los ejemplos Bien/Mal del
elemento se renderizan en **un solo bloque**, antes de empezar el
checklist (`ElementInspectionExperience.tsx`: `ElementLibraryCard`
línea 83 → `GoodBadExamplesSection` línea 85 → `ElementChecklist`
línea 87). No hay ninguna asociación hoy entre un ejemplo específico y
una pregunta específica del checklist — moverlos a "antes de la
pregunta correspondiente" significa mover la lógica de renderizado de
ejemplos **desde el wrapper hacia adentro de `ElementChecklist`/
`ChecklistItemCard`**, no un simple reacomodo de layout.

**Complejidad real, no obvia**: hoy no existe ningún dato que diga
"este ejemplo Bien/Mal corresponde a esta pregunta del checklist" — la
relación hoy es elemento→categoría→ejemplos, plana. Implementar esto
tal como se pide (imágenes solo donde aportan valor técnico, no en
todas las preguntas) requiere primero decidir **qué dato nuevo**
asocia un ejemplo a una pregunta puntual — es una decisión de modelo
de datos, no solo de UI.

**Dependencias**: depende de resolver esa asociación pregunta↔ejemplo
antes de tocar el componente. Es, de los 9 puntos, el que más
justifica pasar por una Etapa 2 (diseño) explícita antes de
implementar, dado que toca la pantalla protegida y no tiene un dato
existente que lo resuelva directo.

---

## 7 · "Cambiar recinto" — salto directo sin recorrido secuencial

**Triage: Hallazgo de usuario** — gap concreto entre desktop y móvil.

**Estado actual confirmado**: `recintos/[roomId]/page.tsx` ya tiene un
`<aside>` con el índice completo de recintos (construido en el
Sprint D1-D4, Screen 2) — pero es **solo de escritorio**
(`@media (min-width: 1024px)` en `page.module.css`). En móvil, el
único camino para cambiar de recinto es volver a la lista
(`backHref`) o la sugerencia de `RoomCompletionBanner` (que solo
aparece al 100%).

**Dependencias**: ninguna — el dato y el componente (`RoomListRow`,
`getRoomsListData`) ya existen y ya se usan en esta misma pantalla.
Es, de las piezas de UX, la de menor esfuerzo real: es exponer en
móvil algo que ya se construyó para escritorio, no crear nada desde
cero.

**Nota de gobernanza**: esta pantalla está congelada — se modifica
acá porque este sprint es exactamente uno de los tres caminos
permitidos, no una excepción silenciosa.

---

## 8 · Revisión del layout Desktop en pantallas "tipo móvil centrado"

**Triage: Decisión estratégica** — y de alcance **todavía no
definido**.

Las 6 pantallas del Milestone 1 (Inicio, Recintos, Lista Global,
Ficha de Elemento, Resumen, Mis Fotos) ya recibieron tratamiento
responsive completo y están congeladas — no debería ser a esas 6 a
las que este punto se refiere. El resto de la app (Bienvenida, wizard
de Nueva inspección, hub de Editar inspección, `/biblioteca`,
`/fotos`... espera, Mis Fotos ya se cubrió — me refiero a `/kit-inspeccion`,
`/notificaciones`, `/perfil`, `/login`/`/registro`, el modal de firmas)
**sigue con el patrón `max-width: 480px` centrado sin layout de
escritorio propio**, documentado como limitación conocida desde el
Sprint 1.

**No puedo proponer una implementación priorizada de este punto sin
que definas qué pantallas exactas entran en el alcance** — es la
única pieza de las 9 donde el análisis de código no basta; es una
decisión de alcance de producto.

---

## 9 · Unificar la paleta con "el resto del ecosistema ObraBien"

**Triage: pendiente — necesita tu aclaración antes de clasificarse.**

`DESIGN_SYSTEM_OBRABIEN.md` documenta `src/styles/tokens.css` como la
**única fuente de verdad vigente** de color para este proyecto —
confirmado explícitamente durante la conciliación del Sprint D1-D4
(se descartó el color derivado de capturas de "Claude Design" a favor
del real). No tengo, dentro de este repositorio, ninguna referencia a
qué es "el resto del ecosistema ObraBien" ni sus tokens oficiales —
no es un producto que viva en este código.

**Riesgo si se asume mal**: cambiar la paleta sin una fuente
verificable podría deshacer, sin querer, una decisión ya cerrada y
aprobada en el Sprint D1-D4. **No voy a adivinar cuál es la paleta
"oficial del ecosistema"** — necesito que me indiques dónde vive esa
definición (¿otro repositorio? ¿un brand book? ¿una app específica?)
antes de que esto pueda entrar a un plan de implementación.

---

## Plan de implementación propuesto (prioridad, no orden de fechas)

| # | Punto | Triage | Dependencias | Riesgo/esfuerzo | Bloqueado por |
|---|---|---|---|---|---|
| **P0** | 2. Biblioteca — ejemplos mezclados | Bug | Ninguna | Bajo | — |
| **P1** | 7. Cambiar recinto en móvil | Hallazgo | Ninguna (componente ya existe) | Bajo | — |
| **P1** | 5. Pantalla independiente de Observaciones | Decisión estratégica | Ninguna dura | Medio (sobre todo ruteo) | Definir punto de entrada ("Proyecto") |
| **P2** | 1. Eliminar inspección | Hallazgo | Ninguna | Medio (cascada + Blob + menú nuevo) | — |
| **P2** | 4. Estructura de revestimientos exteriores | Decisión estratégica | Ninguna | Medio-alto (schema) | — |
| **P2** | 3. Marmolina | Decisión estratégica | **Depende de #4** | Bajo, una vez resuelto #4 | Resolver #4 primero |
| **P3** | 6. Imágenes Bien/Mal por pregunta | Hallazgo | Depende de definir el dato pregunta↔ejemplo | Alto (pantalla protegida) | Etapa 2 de diseño propia |
| **P4** | 8. Revisión desktop del resto de pantallas | Decisión estratégica | — | Indefinible aún | **Definir qué pantallas** |
| **P5** | 9. Unificar paleta con el ecosistema | Sin triage | — | Indefinible aún | **Definir qué es "el ecosistema" y su fuente de tokens** |

**Por qué este orden**: P0 es un bug real y aislado — se corrige antes
que cualquier decisión de diseño nueva, sin necesidad de Etapa 2. P1
son las dos piezas de mayor valor con menor riesgo real (componentes y
datos ya existen). P2 agrupa lo que sí requiere tocar arquitectura
(schema, Blob, cascada) pero está bien acotado. P3 es la única pieza
que exige diseño explícito antes de tocar código, por tocar la
pantalla protegida sin un dato existente que resuelva la asociación
pedida. P4 y P5 no entran a un plan de implementación todavía —
requieren una decisión tuya primero.

No implementé nada de esto — queda a la espera de tu confirmación del
orden y de las dos aclaraciones pendientes (P4, P5) antes de abrir la
Etapa 2 de cualquier punto.
