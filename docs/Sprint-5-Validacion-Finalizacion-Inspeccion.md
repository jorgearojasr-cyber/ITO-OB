# Sprint 5 — Finalización de la Inspección — Etapa 4: Validación

Objetivo: validar la experiencia diseñada (Etapa 2) y especificada
(Etapa 3, *"Especificación Visual v1"*, artifact
`c28d0c49-6f3e-4fd3-af3e-e7732718b338`) contra el **código real
actual**, antes de escribir ninguna línea de implementación. Como la
pantalla de cierre todavía no existe, el "flujo observado" de cada
escenario es, en varios casos, el comportamiento de **hoy** — lo que
confirma exactamente qué debe resolver la Etapa 5, y permite detectar
riesgos reales antes de tocar código, no después.

Esta etapa presta atención especial al punto 4 pedido explícitamente
por el usuario al aprobar la Etapa 3: confirmar que el pill de estado
del informe nunca se adelanta al momento en que el `Report` está
efectivamente disponible.

Sin implementación en esta etapa — solo lectura de código y análisis.

---

## Escenario 1 — Estado del pill al aterrizar en la pantalla de cierre

**Flujo esperado** (spec Etapa 3): al terminar de firmar, la pantalla
de cierre muestra el pill de estado del informe reflejando el estado
real del `Report` en ese instante.

**Flujo observado** (`actions.ts:1246-1298`): `closeInspection` crea el
`Report` con `status: "PENDING"` dentro de la misma transacción que
cierra la inspección, y **recién después** de responder al cliente
dispara `after(() => generateReportPdf(report.id))` — la generación
real ocurre en segundo plano, fuera del ciclo de request/response.
`closeInspection` retorna únicamente `{ success: true }`, sin el
objeto `Report` ni su estado. Consecuencia directa: **en el 100% de
los casos reales, en el instante exacto en que el cliente recibe la
confirmación de `closeInspection`, el `Report` es `PENDING`** — nunca
puede ser `READY` todavía, porque `generateReportPdf` física y
literalmente no ha corrido aún.

**Problemas encontrados**: ninguno bloqueante, pero una implicancia de
diseño concreta: el estado inicial del pill en la nueva pantalla debe
asumirse **siempre** "Generando…" por defecto — no debe inferirse ni
leerse de la respuesta de `closeInspection` (ese dato no existe ahí).
Cualquier implementación que muestre "Informe listo" en el primer
render de la pantalla de cierre estaría, por construcción, mintiendo.

**Severidad**: N/A (confirma un requisito de implementación, no un
defecto).

**Recomendación**: la Etapa 5 debe leer el estado real del `Report`
desde el servidor (mismo patrón que ya usa `informe/page.tsx`), nunca
asumir un estado inicial optimista.

---

## Escenario 2 — El pill pasa de "Generando" a "Informe listo" sin adelantarse

**Flujo esperado** (pedido explícito del usuario, punto 4): el cambio
de estado del pill está sincronizado con el estado real del sistema en
todo momento, nunca antes.

**Flujo observado**: el único mecanismo de sincronización que existe
hoy en todo el proyecto es el de `InformeToolbar` — polling con
`router.refresh()` cada 3 segundos mientras `report.status ===
"PENDING"`, más un timer puramente cosmético (`isSlow`, 90s) que solo
cambia el texto a "Esto se está demorando…", **sin marcar nunca un
estado "listo" por sí mismo**. El cambio real de `Generando → Listo`
solo ocurre cuando `router.refresh()` vuelve a consultar el servidor y
`Report.status` efectivamente ya es `READY` en la base de datos — no
hay ningún camino en el código actual donde el cliente decida por su
cuenta que el informe está listo.

**Riesgo real identificado para la Etapa 5**: si la pantalla de cierre
nueva se implementara con una animación de **tiempo fijo** (por
ejemplo, "después de N segundos, mostrar 'Informe listo'" para que la
secuencia se sienta prolija), eso violaría directamente el punto 4 —
el PDF puede tardar más de lo esperado o fallar, y un tiempo fijo
mostraría "listo" antes de que lo esté. **No existe hoy, en ningún
punto del código, un patrón de estado optimista de este tipo** — el
riesgo es que se introduzca recién en la implementación de esta
pantalla nueva si no se reutiliza el mecanismo de polling real ya
probado.

**Severidad**: **Media-Alta** — no es un defecto existente, pero es el
riesgo de implementación más directo frente al punto 4 del encargo.

**Recomendación**: la pantalla de cierre debe reutilizar el mismo
mecanismo de polling contra el estado real de `Report` que ya usa
`InformeToolbar` (o vivir dentro del mismo Server Component de
`/informe`, ver Escenario 5) — nunca una animación de duración fija
para representar "listo".

---

## Escenario 3 — El usuario permanece en la pantalla de cierre y la generación falla o se demora

**Flujo esperado**: si el `Report` termina en `FAILED` (falla real o
timeout), el pill debe eventualmente reflejarlo, sin quedar
indefinidamente en "Generando…".

**Flujo observado**: la reconciliación `PENDING → FAILED` tras 90s
(`STALE_PENDING_THRESHOLD_MS`) vive **exclusivamente** dentro del
render de `informe/page.tsx` (`isReportStale`, líneas 25-29 y 68-72) —
es una mutación que ocurre como efecto colateral de cargar esa página
específica, ya señalada como problema #2 en el análisis del Sprint 4.
**No hay ningún cron, cola ni proceso activo que la dispare por su
cuenta.**

**Problema encontrado**: si la pantalla de cierre es una vista nueva y
separada que no vuelve a cargar `/informe` mientras el usuario espera
ahí, esa reconciliación **nunca se dispara** — un fallo real de
generación quedaría invisible: el pill seguiría mostrando "Generando…"
para siempre en el cliente, aunque el servidor internamente nunca
llegue a marcarlo `FAILED` porque nadie disparó esa lectura.

**Severidad**: **Alta** — riesgo concreto de que la pantalla de cierre
quede "colgada" visualmente ante una falla real, exactamente el tipo
de problema que este sprint busca evitar.

**Recomendación**: la Etapa 5 debe decidir explícitamente uno de dos
caminos — (a) que el polling de la pantalla de cierre dispare la misma
lógica de reconciliación (moverla a una Server Action reutilizable en
vez de dejarla atada al render de `informe/page.tsx`), o (b) que la
pantalla de cierre sea, técnicamente, un estado inicial de la propia
`informe/page.tsx` — ver Escenario 5. Cualquiera de las dos evita
duplicar el umbral de 90s en una tercera constante independiente
(ya hay dos hoy, señalado como inconsistencia en el Sprint 4).

---

## Escenario 4 — El titular "Terminaste de recorrer tu vivienda" frente a un cierre con elementos pendientes

**Flujo esperado** (spec Etapa 3, revisada): un titular que confirma,
en lenguaje humano, que la persona **terminó** su recorrido.

**Flujo observado** (`CloseInspectionSection.tsx`,
`actions.ts:1246-1261`): **no existe ninguna validación de
completitud** antes de permitir cerrar una inspección. La sección
"Cerrar inspección" se muestra en `/resumen` con la única condición
`inspection.status !== "CLOSED" && canManage` — sin mirar
`progress.percent` en ningún punto. `closeInspection` en el servidor
tampoco lo verifica: solo exige que la inspección no esté ya cerrada y
que el rol pueda gestionarla. **Un usuario puede cerrar una inspección
con elementos todavía `PENDING`.**

**Problema encontrado**: el titular "Terminaste de recorrer tu
vivienda" da por sentado un recorrido 100% completo que el sistema no
garantiza. Si alguien cierra con, por ejemplo, 70% de avance, el
titular estaría afirmando algo que no ocurrió.

**Severidad**: Media — no bloquea la implementación del caso general
(la gran mayoría de cierres reales ocurren con el recorrido completo,
como confirmó el propio recorrido en vivo del Sprint UX-01), pero es
una inconsistencia real entre lo que dice la pantalla y lo que el
sistema permite.

**Recomendación**: no corresponde resolverlo en esta etapa (sería
diseño, no validación) — se deja como **pregunta abierta explícita
para la Etapa 5**: o bien el titular se redacta de forma que no
presuponga 100% ("Terminaste tu recorrido" sin adjetivos de
completitud, dejando que el recap de abajo hable de números reales),
o bien se decide —como cambio de producto, fuera del alcance visual de
este sprint— exigir cierta completitud antes de permitir cerrar. Esta
segunda opción es una decisión de arquitectura/negocio y no debe
asumirse sin aprobación explícita.

---

## Escenario 5 — El recap de recintos/elementos/observaciones frente a un cierre incompleto

**Flujo esperado**: la card de recap (Etapa 3, anotación 4a) muestra
conteos reales del recorrido.

**Flujo observado**: `getInformeData` (`get-informe-data.ts:107,139`)
ya calcula `percent` como `doneElements / totalElements` — el dato de
completitud real está disponible. El wireframe de la Etapa 3 muestra
"45 Elementos" sin distinguir revisados de pendientes.

**Problema encontrado**: mismo origen que el Escenario 4 — si el
cierre fue parcial, mostrar el total de elementos sin indicar cuántos
se revisaron realmente sería, otra vez, más optimista que la realidad.

**Severidad**: Baja — el dato para corregirlo ya existe
(`doneElements`/`totalElements`, o el equivalente ya usado por
`InspectionSynthesisCard` del Sprint 4), no requiere cálculo nuevo.

**Recomendación**: al redactar el recap en la Etapa 5, usar el mismo
criterio de "revisados" que ya usa el resto del recorrido (Resumen,
Inicio) en vez de mostrar totales crudos — coherente además con
resolver el Escenario 4 sin necesidad de bloquear el cierre.

---

## Escenario 6 — Dónde vive técnicamente la nueva pantalla de cierre

**Flujo esperado**: la transición de `CloseInspectionModal` hacia la
pantalla de cierre, y de ahí hacia `/informe`, se siente continua.

**Flujo observado**: hoy `CloseInspectionModal.handleConfirm` llama
`closeInspection` y hace `router.push` directo a `/informe`
(navegación de cliente) — no existe ninguna ruta intermedia.

**Problema encontrado**: no es un defecto, es una decisión de
implementación todavía abierta que **condiciona directamente cómo se
resuelven los Escenarios 2 y 3**: si la pantalla de cierre es (a) una
ruta nueva independiente (ej. algo como `/cierre`) que luego navega a
`/informe`, necesita su propio mecanismo de lectura/polling del
`Report`, duplicando parte de lo que ya hace `informe/page.tsx`; si es
(b) un estado inicial dentro de la propia `informe/page.tsx` /
`InformeToolbar` (mostrar la pantalla de cierre en vez del documento
mientras `isClosed` es reciente o el `Report` sigue `PENDING`),
reutiliza directamente la reconciliación y el polling ya existentes,
sin duplicar umbrales ni lógica.

**Severidad**: N/A para el diseño (no bloquea la Etapa 3), pero
**bloquea el detalle de implementación de la Etapa 5** hasta que se
decida.

**Recomendación**: mi lectura del código real favorece la opción (b) —
integrar el cierre como el estado inicial de `/informe` en vez de una
ruta nueva — porque evita duplicar la reconciliación de 90s
(Escenario 3) y el polling (Escenario 2) en dos lugares distintos.
Pero es una decisión de arquitectura de implementación, así que queda
explícitamente para tu confirmación antes de la Etapa 5, no asumida
acá.

---

## Resumen de la validación

| # | Escenario | Problemas | Severidad | Bloquea Etapa 5 |
|---|---|---|---|---|
| 1 | Estado inicial del pill | Ninguno — confirma que debe asumirse "Generando" siempre | N/A | No |
| 2 | Sincronización sin adelantarse | Riesgo real si se implementa con tiempo fijo en vez de polling | **Media-Alta** | No, pero condiciona el diseño de implementación |
| 3 | Falla o demora mientras se espera | La reconciliación de 90s no se dispara si la pantalla no recarga `/informe` | **Alta** | **Sí — requiere decisión (Escenario 6)** |
| 4 | Titular frente a cierre incompleto | El sistema permite cerrar sin 100% de avance; el titular lo presupone | Media | **Sí — requiere tu decisión** |
| 5 | Recap frente a cierre incompleto | Mismo origen que #4, dato ya disponible | Baja | No |
| 6 | Dónde vive la pantalla de cierre | Decisión de implementación abierta, condiciona #2 y #3 | N/A | **Sí — requiere tu decisión** |

**Tres puntos requieren tu decisión antes de la Etapa 5**:

1. **Escenario 6**: ¿la pantalla de cierre es una ruta nueva o el
   estado inicial de `/informe`? Mi recomendación, ya justificada
   arriba, es la segunda opción — reutiliza el polling y la
   reconciliación ya existentes sin duplicarlos.
2. **Escenario 4**: ¿el titular debe redactarse sin presuponer 100% de
   avance, o corresponde evaluar (fuera de este sprint) exigir cierta
   completitud antes de cerrar? No asumo ninguna de las dos — ambas
   son decisiones tuyas.
3. Confirmación explícita del punto que ya pediste: el pill **nunca**
   debe implementarse con una animación de duración fija — siempre
   debe leer el estado real del `Report` vía el mismo mecanismo de
   polling que ya usa `InformeToolbar` (Escenario 2).

Todos los demás escenarios validan correctamente contra el código real
y contra los 10 principios de la Etapa 2 (incluidos los dos permanentes
agregados tras la aprobación de la Etapa 2) — no se encontró ningún
otro problema que requiera ajustar la spec visual antes de
implementar.
