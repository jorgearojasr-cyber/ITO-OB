# Sprint 3 — Flujo de Recintos — Etapa 4: Validación

Objetivo: validar la experiencia diseñada (Etapa 2) y especificada
(Etapa 3) contra el **código real actual**, antes de escribir
ninguna línea de implementación. Como `RoomCompletionBanner` y las
extensiones de `get-room-instance-data.ts` todavía no existen, el
"flujo observado" de cada escenario es, en varios casos, el
comportamiento de **hoy** — lo que confirma exactamente qué debe
cambiar la Etapa 5, y permite detectar ambigüedades o riesgos reales
antes de tocar código, no después.

Sin implementación en esta etapa — solo lectura de código y análisis.

---

## Escenario 1 — Usuario nuevo que inicia el primer recinto

**Flujo esperado** (spec Etapa 3): tras crear una inspección → pasa
por `/bienvenida` → toca "Comenzar inspección" → aterriza en el
primer recinto (`order` más bajo) con: subtítulo de proyecto/unidad,
píldora "Recinto 1 de N", `backHref` hacia la lista de recintos, y
lista de elementos todos `Pendiente`.

**Flujo observado** (código actual, verificado en
`recintos/[roomId]/page.tsx:24` y `get-room-instance-data.ts`):
llega correctamente al primer recinto (el `redirect` de
`createInspection` → `/bienvenida` → `continueHref` ya apunta al
`firstRoomId` correcto, confirmado en el Sprint 2b). Una vez ahí, el
`BackHeader` se renderiza **sin `subtitle`** y con `backHref="/"` —
ninguno de los dos elementos de orientación de la Etapa 3 existe
todavía.

**Problemas encontrados**: ninguno nuevo — es exactamente el vacío
que la Etapa 5 debe llenar, ya anticipado en la spec. No se encontró
ningún obstáculo real en los datos: `getRoomInstanceData` puede
calcular "posición 1 de N" con una sola query adicional a
`roomInstance.findMany` ordenada por `order`, mismo patrón que ya usa
`get-rooms-list-data.ts`.

**Severidad**: N/A (gap esperado, no un defecto).

**Recomendación**: ninguna — confirma que la Etapa 5 puede
implementarse tal como está especificada, sin ajustes a la spec.

---

## Escenario 2 — Usuario que abandona la aplicación y vuelve posteriormente

**Flujo esperado** (principio 8): al reanudar, aterriza en el recinto
correcto con la misma orientación completa que tendría en cualquier
otra visita — sin pantalla especial de "bienvenido de vuelta", sin
pérdida de contexto.

**Flujo observado**: reanudar ya funciona correctamente hoy a nivel
de datos — no hay ningún componente de sesión/`localStorage`
involucrado en el recorrido de recintos; todo se recalcula en vivo
desde Postgres en cada carga (`RoomInstance`/`ElementInstance`
persistidos, sin caché de cliente). El camino real de reanudación es
Inicio → "Continuar recorrido" → `nextStep.roomInstanceId`
(`get-inicio-data.ts:111-120`, sin cambios de este sprint), que
recalcula el primer recinto con al menos un elemento `PENDING`, en
orden. Verificado un caso límite: si el usuario abandonó justo dentro
de un recinto que **ya estaba 100% completo** sin haber avanzado al
siguiente, `nextStep` de Inicio salta ese recinto y lo lleva
directamente al **próximo recinto pendiente**, no al que dejó
completo — comportamiento correcto y consistente con "se camina hacia
adelante" (principio 1), pero significa que el
`RoomCompletionBanner` de ese recinto ya completado no vuelve a
mostrarse en el camino de reanudación normal (solo sería visible si
el usuario navegara manualmente de vuelta a ese recinto específico
vía la lista).

**Problemas encontrados**: ninguno bloqueante. Un matiz a documentar,
no un defecto: el banner de cierre es *visitable*, no
*necesariamente visto* — su función (confirmar cierre + sugerir
avance) ya la cumple `nextStep` de Inicio por otro camino cuando el
usuario reanuda desde ahí.

**Severidad**: Baja (comportamiento correcto, solo vale la pena
documentarlo para que no se lea como un bug en la Etapa 6).

**Recomendación**: ninguna corrección — sí documentar explícitamente
este matiz en la Etapa 6, para que quede claro que es intencional.

---

## Escenario 3 — Usuario que completa un recinto y continúa automáticamente al siguiente mediante `RoomCompletionBanner`

**Flujo esperado**: al responder el último ítem pendiente de un
elemento y volver al recinto (link ya existente "Elemento revisado —
Volver a…"), el recinto se renderiza con `percent === 100` y aparece
`RoomCompletionBanner` con un único CTA hacia el **siguiente recinto
pendiente en el orden** (no necesariamente el de índice+1 — ver
matiz abajo).

**Flujo observado**: hoy, al completar el último elemento, el usuario
vuelve al recinto y ve únicamente la lista de elementos con todos los
chips en `Correcto`/`Con observación` — sin ningún banner, mensaje ni
CTA (confirmado, hallazgo #3 de la Etapa 1). No existe ningún cálculo
de "siguiente recinto" en `get-room-instance-data.ts` hoy.

**Problemas encontrados**: **una ambigüedad real en la propia spec de
la Etapa 3**, detectada recién en esta validación. La sección 1
(inventario de componentes) de la spec visual describe el dato como
"el siguiente recinto **pendiente** en orden" — es decir, el próximo
recinto con al menos un elemento sin revisar, saltando recintos ya
completos que estén de por medio (mismo criterio que ya usa
`nextStep` de Inicio). Pero el wireframe de la sección 7 y el flujo
de la sección 4 no distinguen explícitamente ese caso de un simple
"recinto siguiente por índice" — si un usuario completó recintos
fuera de orden (por ejemplo, saltó a un recinto más adelante desde la
lista antes de terminar uno anterior), ¿el banner debería sugerir el
recinto inmediatamente después en el orden aunque ya esté completo, o
saltar hasta el próximo con trabajo pendiente? La spec no lo deja
inequívoco para ese caso específico, aunque el criterio dominante
(coherente con Inicio) apunta a "próximo pendiente en orden".

**Severidad**: Media — no bloquea la implementación del caso general
(recorrido en orden, sin saltos), que es el uso esperado según el
principio 1 ("se camina"), pero sí puede producir un CTA que apunte a
un recinto ya completo si el usuario navegó fuera de orden — momento
en que el banner dejaría de cumplir su propósito ("nunca obliga a
decidir", principio 7) porque llevaría a un lugar sin nada que hacer.

**Recomendación**: antes de implementar, confirmar explícitamente que
`RoomCompletionBanner` debe calcular "el próximo recinto, en orden,
que tenga al menos un elemento `PENDING`" (mismo algoritmo que
`nextStep` de `get-inicio-data.ts:111-113`), no simplemente el
recinto de índice+1 — y que, si no queda ningún recinto pendiente en
todo el orden restante (todos los demás ya completos), el banner debe
comportarse igual que el caso "último recinto" (Escenario 4), llevando
a `/resumen`, aunque técnicamente no sea el último en la lista.

---

## Escenario 4 — Usuario que llega al último recinto y recibe el CTA "Ir al resumen"

**Flujo esperado**: al completar el recinto de mayor `order` de la
inspección (o, según la recomendación del Escenario 3, el último con
elementos pendientes), el banner muestra "Ir al resumen" en vez de un
siguiente recinto.

**Flujo observado**: la ruta `/inspecciones/[inspectionId]/resumen`
existe y ya está en uso activo por el resto de la app (confirmado:
`src/app/inspecciones/[inspectionId]/resumen/page.tsx`, referenciada
también desde `InspectionListItem.tsx` para inspecciones
`COMPLETADA` o de colaboradores externos) — no es una ruta nueva ni
un destino sin construir. No hay ningún obstáculo de datos: saber si
un recinto es "el último con trabajo pendiente" es el mismo cálculo
del Escenario 3, aplicado sobre el conjunto vacío.

**Problemas encontrados**: ninguno bloqueante, sujeto a que se resuelva
la recomendación del Escenario 3 (si "último" se define por índice o
por "sin más pendientes"). Caso límite verificado: una inspección de
un solo recinto — ese recinto ya nace siendo "el último", así que
completarlo debe mostrar "Ir al resumen" desde la primera vez que se
complete, sin pasar nunca por el caso "hay un siguiente recinto". La
spec no lo contradice, pero tampoco lo menciona explícitamente.

**Severidad**: Baja (caso límite infrecuente — el seed real de la app
usa inspecciones de 9-11 recintos — pero válido de todas formas dado
que el modelo de datos no impide una inspección con un solo recinto).

**Recomendación**: ninguna corrección de diseño — solo dejar
constancia en la Etapa 3 (o en la implementación) de que el caso de
un único recinto es simplemente el caso general con N=1, sin rama
especial que programar.

---

## Escenario 5 — Usuario que navega utilizando el botón de regreso hacia la lista de recintos

**Flujo esperado**: desde el detalle de cualquier recinto, el botón
de volver del `BackHeader` lleva a `/inspecciones/{id}/recintos`
(lista), sin importar si el usuario llegó ahí desde Inicio,
Bienvenida, la propia lista, o un `RoomCompletionBanner`.

**Flujo observado**: hoy `backHref="/"` es fijo
(`recintos/[roomId]/page.tsx:24`) — el botón de volver siempre lleva
a Inicio, nunca a la lista. Confirmado también que `BottomNav`
persiste en la pantalla (`active="inspecciones"`), así que el acceso
a Inicio nunca desaparece del todo — el cambio de `backHref` no deja
al usuario "atrapado" sin salida a Inicio, solo cambia cuál es el
camino más corto desde el botón de la cabecera.

**Problemas encontrados**: ninguno técnico. Se confirma que la
pregunta abierta de la Etapa 1 ("¿cómo distinguir el origen de la
navegación?") queda **resuelta por diseño, no por código**: la spec
de la Etapa 3 decidió deliberadamente no rastrear el origen — el
botón de volver siempre va a la lista de recintos, sin importar de
dónde vino el usuario. Es una simplificación consciente (evita tener
que pasar un parámetro de origen por todas las rutas de entrada al
recinto), consistente con el principio 4 (la lista es una de las dos
capas de orientación, siempre un destino válido).

**Severidad**: N/A (sin defecto — decisión de diseño ya tomada y
consistente).

**Recomendación**: ninguna. Válido confirmar en la Etapa 6, al cerrar
el sprint, que ningún flujo dependía implícitamente de que
`backHref` fuera `"/"` (búsqueda rápida confirma que no: no hay
ningún otro archivo que lea o dependa del valor de `backHref` de esta
página específica).

---

## Resumen de la validación

| # | Escenario | Problemas | Severidad | Bloquea Etapa 5 |
|---|---|---|---|---|
| 1 | Primer recinto | Ninguno (gap esperado) | N/A | No |
| 2 | Interrupción y reanudación | Matiz a documentar (banner "visitable", no "visto") | Baja | No |
| 3 | Completar y continuar automáticamente | Ambigüedad real: ¿próximo por índice o próximo pendiente? | **Media** | **Sí — requiere confirmación antes de implementar** |
| 4 | Último recinto → resumen | Caso límite de inspección de 1 recinto, no bloqueante | Baja | No |
| 5 | Volver a la lista de recintos | Ninguno — decisión de diseño ya resuelta | N/A | No |

**Único punto que requiere tu decisión antes de la Etapa 5**: el
Escenario 3. Mi recomendación, ya justificada arriba, es que
`RoomCompletionBanner` calcule "el próximo recinto, en orden, con
algún elemento `PENDING`" — el mismo algoritmo que ya usa `nextStep`
en Inicio — en vez de simplemente el recinto de índice+1. Esto
mantiene el principio 7 ("nunca obliga a decidir") válido incluso
cuando el usuario no siguió el orden estrictamente, y reutiliza un
patrón ya probado en producción (Sprint 2a) en vez de inventar uno
nuevo.

Todos los demás escenarios validan correctamente contra el código
real y contra los 8 principios de la Etapa 2 — no se encontró ningún
otro problema que requiera ajustar la spec visual antes de
implementar.
