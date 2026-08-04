# Sprint 3 — Flujo de Recintos — Etapa 1: Análisis del código existente

Ver `ROADMAP_OBRABIEN.md`. Mismo nivel de rigor que los análisis de
Sprint 1 (Elemento) y Sprint 2a/2b (Inicio, Bienvenida): solo lo que
existe hoy en el repositorio, verificado leyendo el código real. Sin
propuestas de diseño ni de solución — eso corresponde a una Etapa 2
futura.

**Alcance**: el flujo completo de Recintos, dos pantallas:
- Lista de recintos: `src/app/inspecciones/[inspectionId]/recintos/page.tsx`
- Detalle de un recinto: `src/app/inspecciones/[inspectionId]/recintos/[roomId]/page.tsx`

Archivos involucrados en total:
```
src/app/inspecciones/[inspectionId]/recintos/page.tsx (+ .module.css)
src/app/inspecciones/[inspectionId]/recintos/[roomId]/page.tsx (+ .module.css)
src/components/recinto/RoomListRow.tsx (+ .module.css)
src/components/recinto/RoomProgressBar.tsx (+ .module.css)
src/components/recinto/ElementListItem.tsx (+ .module.css)
src/components/recinto/element-icons.tsx
src/lib/inspections/get-rooms-list-data.ts
src/lib/inspections/get-room-instance-data.ts
```

Nota de nomenclatura: el segmento dinámico se llama `[roomId]` en el
filesystem, pero en el código (variables, nombre de función) se le
llama `roomInstanceId` — es un `RoomInstance.id`, no un
`RoomTemplate.id`.

---

## 1. Arquitectura actual

Mismo patrón arquitectónico que Inicio y Elemento: Server Components
puros para ambas pantallas (cero Client Components en todo el flujo —
todo lo interactivo del recorrido vive en la pantalla de Elemento), un
`get-*-data.ts` dedicado por pantalla que concentra el cálculo, y
componentes presentacionales sin lógica propia de datos.

**Cómputo de progreso**: no hay ningún campo de estado/progreso
persistido en `RoomInstance` (`prisma/schema.prisma:431-450` — solo
`floorMaterial`, `wallCoveringMaterial`, `hasShower`, `hasBathtub`
como datos de contexto, ninguno participa del cálculo de progreso). El
`done`/`total`/`percent` de cada recinto se calcula **siempre en
vivo**, a partir de `ElementInstance.status !== "PENDING"` — el mismo
criterio y la misma fórmula que ya usa el hero de Inicio para el
progreso de toda la inspección. Es arquitectura consistente con el
resto de la app, pero el cómputo está **duplicado línea por línea**
entre `get-rooms-list-data.ts:31-41` y `get-room-instance-data.ts:54-67`,
sin ninguna función compartida entre ambos.

**Autorización**: ambos `get-*` validan por `organizationId` directo
(no `inspectionAccessWhere`), consistente con lo ya documentado en
`src/lib/auth/inspection-access.ts:3-9` — un colaborador externo
(`InspectionCollaborator`) nunca tiene acceso al recorrido de
recintos, solo a `/resumen` y `/elementos/[id]` (confirmado también
por comentario explícito en `InspectionListItem.tsx:17-19`). Es
intencional, no una omisión.

**Preguntas de material/ducha-tina**: aunque conceptualmente son "por
recinto" (se guardan en `RoomInstance.floorMaterial`/
`wallCoveringMaterial`/`hasShower`/`hasBathtub`), su lógica vive
enteramente en el flujo de **Elemento**, no en el de Recinto —
`RoomMaterialQuestion.tsx`/`ShowerTubQuestion.tsx` están en
`src/components/elemento/`, y el gatillo que decide mostrarlas se
calcula en `getElementInstanceData`, evaluado cada vez que se abre un
elemento específico, no al entrar al recinto. Responder estas
preguntas no cambia `ElementInstance.status` ni el contador de
progreso del recinto — solo destraba el checklist del elemento
correspondiente.

## 2. Componentes

| Componente | Rol | Notas |
|---|---|---|
| `recintos/page.tsx` | Lista — Server Component | Query propia de `Inspection` (proyecto/unidad para el subtítulo) + `getRoomsListData`. Dos validaciones de la misma inspección en el mismo render (ver §7). |
| `recintos/[roomId]/page.tsx` | Detalle — Server Component | `getRoomInstanceData` + render de `RoomProgressBar` + lista de `ElementListItem`. |
| `RoomListRow.tsx` | Fila de la lista | Recibe `name, done, total, percent, href`; calcula `pending`/`isDone` **en el componente**, único cálculo derivado fuera de un `get-*` en todo el flujo. Badge "Completo" (verde) o "N pendientes" (naranjo). |
| `RoomProgressBar.tsx` | Barra del detalle | Puramente presentacional — texto "N de M elementos revisados" + barra lineal propia (no usa `ProgressRing`). |
| `ElementListItem.tsx` | Fila de elemento dentro del recinto | Ícono (`ElementIcon`) + nombre + `StatusChip` (reutilizado tal cual de `components/ui/`) + chevron. |
| `element-icons.tsx` | Mapa slug → ícono | 17 slugs mapeados explícitamente de ~39 en uso real (`prisma/seed.ts`); el resto cae en el ícono genérico "estructura". Strokes SVG hardcodeados en hex, no en tokens. |
| `get-rooms-list-data.ts` | Data de la lista | `roomInstance.findMany` + cómputo de progreso por recinto. |
| `get-room-instance-data.ts` | Data del detalle | `roomInstance.findFirst` + elementos + cómputo de progreso del recinto (fórmula duplicada respecto al anterior). |

## 3. Flujo

**Lista de recintos**: `requireSession` → validar inspección (dos
veces, ver §7) → `getRoomsListData` → si `rooms.length === 0`,
`EmptyState` sin `action`; si hay recintos, una `RoomListRow` por
recinto, en orden (`order asc`), cada una linkeando al detalle.

**Detalle de un recinto**: `requireSession` (dentro de
`getRoomInstanceData`) → `roomInstance.findFirst` con sus elementos →
si no existe, `notFound()` → render de `RoomProgressBar` + lista
completa y plana de `ElementListItem` (uno por cada `ElementInstance`,
sin agrupar, sin paginar).

**Dentro de un elemento** (ya cubierto en detalle por el Sprint 1):
tres ramas mutuamente excluyentes — `materialQuestion` /
`showerTubQuestion` / checklist normal — evaluadas por elemento, no
por recinto.

## 4. Navegación

**Hacia el detalle de un recinto** (saltándose la lista):
- `NextStepCard`/`HeroProgressCard` de Inicio (Sprint 2a) → `nextStep.roomInstanceId`.
- `/bienvenida` (Sprint 2b) → `firstRoomId` recalculado de forma independiente (comentario explícito en `actions.ts:472-474` reconociendo que hay dos fuentes del "primer recinto" sin compartir cómputo).
- `InspectionListItem.tsx:20-23` (listado general de inspecciones) → `inspection.firstRoomId`, excepto colaboradores externos o inspecciones `COMPLETADA`, que van a `/resumen`.
- `createInspection` → redirige a `/bienvenida`, que a su vez enlaza al primer recinto (no hay redirect directo a recintos desde la creación).

**Hacia la lista de recintos**: casi exclusivamente desde flujos de
*edición* de la inspección — el tile "Recintos" de `QuickAccessGrid`
en Inicio, y los tres formularios de editar tipo/características/
distribución, que vuelven a `/recintos` al terminar. Ningún CTA de
"continuar inspección" (Inicio, Bienvenida, listado de inspecciones)
pasa por la lista — todos saltan directo al recinto pendiente.

**Recinto → elemento**: lista plana de links, un `ElementListItem` por
`ElementInstance`, sin indicar cuántos ítems de checklist tiene cada
uno.

**Recinto → siguiente recinto**: **no existe.** Ningún prev/next entre
recintos en ningún punto — toda transición pasa por Inicio (siguiendo
el `nextStep` del hero) o por volver a la lista completa.

**Elemento → recinto**: sí existe (Sprint 1) — botón "✓ Elemento
revisado — Volver a {roomName}" cuando se responden todos los ítems
visibles del checklist.

**Recinto → nada (backHref fijo)**: el `BackHeader` del detalle de
recinto tiene `backHref="/"` fijo — va directo a Inicio, nunca a la
lista de recintos, sin importar desde dónde haya llegado el usuario.

## 5. Oportunidades UX (observadas, no resueltas)

Listadas como observación pura — ninguna decisión tomada:

1. El botón de volver del detalle de recinto podría reflejar el
   origen real de la navegación (lista de recintos vs. Inicio/
   Bienvenida) en vez de ir siempre a `/`.
2. Podría existir alguna forma de moverse entre recintos sin pasar por
   Inicio o por la lista completa.
3. El momento en que un recinto llega a 100% podría tener algún
   tratamiento propio dentro de su misma pantalla, de forma simétrica
   a como ya lo tiene el elemento.
4. El `BackHeader` del detalle de recinto podría llevar algún
   subtítulo o indicador de contexto (proyecto/unidad, posición dentro
   del recorrido), como ya lo tiene la lista.
5. El estado de cero elementos en un recinto podría usar `EmptyState`
   (ya disponible e importado en la lista, no usado en el detalle).
6. El `EmptyState` de "Aún no hay recintos" podría usar el slot
   `action` que el propio componente ya soporta.
7. El mapa de íconos de elemento podría ampliarse — hoy la mayoría de
   los slugs reales caen en el ícono genérico.
8. El color de la barra de progreso podría unificarse entre la lista
   (verde) y el detalle (naranjo) para la misma señal.

## 6. Reutilización posible

Ya usado tal cual en este flujo: `BackHeader`, `StatusChip`,
`EmptyState` (solo en la lista).

Disponible en el resto de la app pero **no usado** en Recintos hoy:
`ProgressRing` (Recintos usa una barra lineal propia en vez del
anillo circular ya establecido en Inicio y Elemento),
`DonJoseLuisAvatar`/`DonJoseLuisCard`/`DonJoseLuisPresence` (no
aparece en ningún punto del flujo de Recintos), los patrones de
tarjeta de `QuickAccessGrid`/`LibraryCarousel` de Inicio (no aplican
directamente — `RoomListRow` es estructuralmente más cercano a
`InspectionListItem`, que también usa barra de progreso + badge +
chevron).

## 7. Problemas encontrados (código, no opinión)

1. **`backHref="/"` fijo en el detalle de recinto** — salta siempre la
   lista de recintos, sin importar el origen de la navegación.
2. **Sin navegación recinto→recinto** — cada transición entre recintos
   pasa obligatoriamente por Inicio o por la lista completa.
3. **Recinto 100% completo sin tratamiento propio** — a diferencia del
   elemento (botón "Elemento revisado — Volver a…"), terminar el
   último elemento de un recinto no produce ningún mensaje, banner ni
   CTA dentro de esa misma pantalla.
4. **Sin subtítulo/contexto en el `BackHeader` del detalle** — la
   lista sí muestra proyecto/unidad; el detalle de un recinto
   específico no muestra nada equivalente.
5. **Cero elementos en un recinto sin estado vacío** — `EmptyState`
   existe y se usa en la lista, pero no en el detalle.
6. **Colores inconsistentes para la misma métrica** — verde en
   `RoomListRow`, naranjo en `RoomProgressBar`, mismo concepto de
   "porcentaje de elementos revisados" del mismo recinto.
7. **Mapa de íconos incompleto** — 17 de ~39 slugs reales tienen ícono
   propio; el resto (`iluminacion`, `muros-y-cielos`, `guardapolvos`,
   `cornisas`, `instalacion-de-gas`, etc.) cae en el ícono genérico de
   "estructura".
8. **`EmptyState` de "Aún no hay recintos" sin `action`**, pese a que
   el propio componente soporta ese slot y ya se usó con éxito en
   otros estados vacíos de la app (Sprint 2a).
9. **Doble query de autorización redundante** en `/recintos/page.tsx`
   — una en la page, otra idéntica dentro de `getRoomsListData`, ambas
   validando lo mismo contra `Inspection`.
10. **Cómputo de progreso duplicado línea por línea** entre
    `get-rooms-list-data.ts` y `get-room-instance-data.ts`, sin una
    función compartida.
11. **Cálculo del "primer recinto" duplicado** entre `createInspection`
    (al decidir el redirect a `/bienvenida`) y
    `get-inspection-welcome-data.ts` (al resolver el link "Continuar")
    — reconocido en un comentario del propio código como riesgo si el
    criterio de orden cambiara en un solo lugar.

## 8. Preguntas abiertas

1. ¿Debe existir navegación recinto→recinto (prev/next), o es
   intencional forzar que cada transición pase por una vista de
   conjunto (Inicio o la lista)?
2. ¿Qué debería pasar visualmente cuando un recinto llega a 100%?
3. ¿A dónde debería volver el botón de `BackHeader` del detalle de
   recinto — y cómo se distinguiría el origen real de la navegación
   (hoy el código no lo registra en ningún lado)?
4. ¿Corresponde ampliar el mapa de íconos de `element-icons.tsx`, o el
   ícono genérico es una decisión aceptada para elementos misceláneos?
5. ¿Debe unificarse el color de la barra de progreso entre lista y
   detalle, o hay una intención (no documentada) detrás de la
   diferencia?
6. ¿Corresponde un `action` en el `EmptyState` de "Aún no hay
   recintos", pese a que hoy es un estado prácticamente inalcanzable
   (`createInspection` siempre crea recintos junto con la inspección)?
7. ¿Debe el detalle de recinto mostrar contexto de posición (ej.
   "Recinto 2 de 8") o el nombre del proyecto/unidad, igual que ya lo
   hace la lista?
8. ¿Aparece Don José Luis en algún punto de este flujo, o se mantiene
   ausente aquí como hasta ahora?
