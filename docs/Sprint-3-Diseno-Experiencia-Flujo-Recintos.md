# Sprint 3 — Flujo de Recintos — Etapa 2: Diseño de la experiencia

Rol: Product Designer. Sin código, sin wireframes, sin definición de
componentes ni layout — eso corresponde a la Etapa 3. Insumo: Etapa 1
(`Sprint-3-Analisis-Flujo-Recintos.md`).

Este documento responde, en orden de prioridad, las 6 preguntas que
el usuario definió como eje del diseño. Los hallazgos menores de la
Etapa 1 (colores inconsistentes, cómputo duplicado, `EmptyState` sin
usar, iconografía incompleta) se retoman al final, como
consideraciones a resolver en la implementación — **no** como
motores del diseño.

---

## 1. ¿Cómo se siente el usuario avanzando por la vivienda?

Hoy la arquitectura ya cuenta una historia correcta que la
experiencia visual no termina de transmitir: **una casa no es una
lista de tareas, es un lugar que se recorre caminando**. El usuario
real está físicamente de pie, moviéndose de un recinto a otro con el
teléfono en la mano — el recorrido de la app debería sentirse como
ese caminar, no como tildar casilleros en un formulario largo.

Eso implica un cambio de tono, no de estructura: cada recinto no es
"un ítem más de una lista que hay que vaciar", es "el lugar en el que
estoy parado ahora mismo". La sensación deseada es de **avance físico
y continuo** — cada recinto terminado debe sentirse como un paso
dado, no como una fila tachada. Hoy, en cambio, el detalle de un
recinto se ve y se comporta igual al principio, a la mitad y al final
del recorrido: no hay ninguna señal de que el usuario avanzó, salvo
los chips de estado acumulándose en la lista de elementos.

## 2. ¿Cómo cambia naturalmente de un recinto al siguiente?

Hoy no cambia — la Etapa 1 confirmó que no existe ningún camino
directo entre recintos; todo pasa por Inicio o por la lista completa
(hallazgo #2). Eso rompe exactamente el "caminar" del punto 1: en la
vida real, nadie vuelve a la puerta de entrada para saber a qué pieza
entrar después de terminar la que está revisando — simplemente cruza
al siguiente lugar.

El cambio de recinto debería sentirse como una **continuación del
mismo gesto** que ya cierra un recinto (ver punto 3), no como una
decisión nueva ni una interrupción de vuelta a una pantalla distinta.
El recorrido tiene un orden natural ya definido en el modelo de datos
(`RoomInstance.order`) — la experiencia debería apoyarse en ese orden
existente para sugerir "lo que sigue" en el momento justo en que el
usuario termina lo que tiene enfrente, en lugar de obligarlo a
salir a buscarlo.

Esto no significa eliminar la lista de recintos ni el rol de Inicio
— ambos siguen sirviendo para "quiero ver el conjunto" o "quiero ir a
un recinto específico fuera de orden" (ver también punto 6). Lo que
falta es el camino corto para el caso más común: seguir el orden
sugerido sin desviarse.

## 3. ¿Qué experiencia recibe al completar un recinto?

Hoy, nada — hallazgo #3 de la Etapa 1: terminar el último elemento de
un recinto no produce ningún mensaje, banner ni CTA en esa pantalla.
El único indicio de "recinto completo" vive en otro lugar (la lista),
nunca en el momento y el lugar donde realmente ocurre el cierre.

Esto contrasta con un patrón que la app ya probó y que funciona: el
elemento sí celebra su propio cierre ("✓ Elemento revisado — Volver a
{recinto}"). El recinto merece un momento equivalente, con la
diferencia de que su "vuelta" natural no es hacia atrás (al recinto,
que ya no tiene sentido — ya se completó) sino **hacia adelante**, al
recinto que sigue: es el punto exacto donde la respuesta al punto 2
se materializa. Completar un recinto no es un final, es una
transición — la experiencia debe sentirse como "seguir caminando",
no como "cerrar un capítulo y tener que decidir qué hacer después".

Un caso a tener presente para la Etapa 3, no a resolver acá: qué pasa
cuando el recinto completado es el **último** de la inspección — ese
cierre ya no puede apuntar "al siguiente recinto" y necesita su
propio desenlace (probablemente hacia el resumen o el informe), pero
eso es detalle de especificación, no de esta etapa.

## 4. ¿Cómo mantiene siempre la orientación dentro de la inspección?

Hoy el detalle de un recinto no da ninguna pista de dónde está ese
recinto dentro del conjunto — hallazgo #4: sin subtítulo, sin
indicación de proyecto/unidad, sin posición ("recinto 2 de 8"). El
usuario que entra a un recinto específico pierde el contexto que sí
tenía un segundo antes, en la lista o en Inicio.

La orientación tiene dos capas distintas, y conviene no confundirlas:

- **Orientación local** — "¿en qué recinto estoy, dentro de qué
  inspección?". Resuelta con contexto persistente y liviano (mismo
  espíritu que ya usa la lista de recintos con su subtítulo de
  proyecto/unidad), visible sin que el usuario tenga que buscarlo.
- **Orientación global** — "¿cuánto llevo del recorrido completo de
  la vivienda?". Esta es la pregunta 6, y merece su propia respuesta
  más abajo — no se resuelve solo con un número de posición.

## 5. ¿Cómo evitamos obligarlo a volver constantemente a Inicio o a la lista de recintos?

Esta pregunta es, en el fondo, la consecuencia directa de resolver
las preguntas 2 y 3: hoy Inicio y la lista de recintos son el **único**
mecanismo de transición entre recintos, así que se usan todo el
tiempo no porque aporten valor en ese momento, sino porque no hay otra
salida hacia adelante. Si el cierre de un recinto (punto 3) ya
propone naturalmente el siguiente paso (punto 2), la necesidad de
"volver" para decidir qué hacer desaparece en el caso más común —
Inicio y la lista vuelven a ser lo que deberían: puntos de entrada y
de vista general, no una parada obligatoria entre cada dos recintos.

El botón de "volver" del propio detalle de recinto (`backHref="/"`
fijo, hallazgo #1) es un síntoma del mismo problema desde otro ángulo:
como no hay adelante, todo camino termina apuntando hacia atrás. Con
un camino hacia adelante resuelto, la pregunta de "hacia dónde
vuelve" deja de ser tan crítica — pero sigue siendo una pregunta
real, que se retoma en el punto 4 (orientación local) y queda anotada
para la Etapa 3.

## 6. ¿Cómo comunica la aplicación la ubicación actual dentro del recorrido completo de la vivienda? (pregunta adicional)

Esta pregunta va más allá de "en qué recinto estoy" (punto 4) — es
"¿cómo se ve, de un vistazo, todo el recorrido de la vivienda, y
dónde caigo yo dentro de él". Hoy la única vista de conjunto es la
lista de recintos, y solo se llega a ella activamente, casi siempre
para editar la inspección, no para orientarse durante el recorrido
(hallazgo de navegación, Etapa 1 §4).

La experiencia debería dejar que el usuario sienta, sin tener que
salir del recinto en el que está, que existe un mapa mayor detrás —
algo del orden de "voy en el recinto 4 de 9", pero sin reducirlo a un
número seco: la sensación deseada es la de **avanzar por una casa
conocida y acotada**, no la de procesar un contador infinito. Esta
señal de ubicación global es la que, combinada con la orientación
local del punto 4, evita que el usuario necesite volver a Inicio o a
la lista completa solo para saber "cuánto me falta" — hoy esa es,
además de la falta de navegación hacia adelante, la otra razón real
por la que se depende tanto de esas dos pantallas.

---

## Principios de diseño (Sprint 3)

1. **Se camina, no se tilda.** El recorrido de recintos debe sentirse
   como avanzar físicamente por la vivienda, no como vaciar una lista
   de tareas.
2. **Completar un recinto es una transición, no un final.** El cierre
   de un recinto y el inicio del siguiente son, para la experiencia,
   el mismo gesto — no dos decisiones separadas.
3. **El camino hacia adelante es el camino por defecto.** Inicio y la
   lista de recintos siguen existiendo como vista de conjunto y punto
   de entrada, pero dejan de ser el único mecanismo para pasar de un
   recinto a otro.
4. **La orientación es doble y ambas partes son necesarias.** Local
   (dónde estoy) y global (cuánto llevo del recorrido completo) — una
   no reemplaza a la otra.
5. **Los hallazgos menores no dirigen el diseño.** Colores
   inconsistentes, cómputo duplicado, `EmptyState` sin usar e
   iconografía incompleta se resuelven como parte natural de la
   implementación (Etapa 3), no como objetivos de esta etapa.
6. **Nada de esto requiere un dato nuevo.** El orden de recintos
   (`RoomInstance.order`) y el progreso por elemento ya existen y ya
   se calculan — la experiencia se construye orquestando datos que la
   app ya tiene, no agregando persistencia nueva.
7. **Nunca se obliga a decidir cuál es el siguiente recinto.** Cuando
   existe un siguiente paso natural en el orden del recorrido, la
   aplicación lo sugiere directamente — no presenta una elección
   genérica ("¿a dónde quieres ir ahora?") donde ya hay una respuesta
   obvia derivada del orden existente.
8. **La interrupción y reanudación no rompen la sensación de
   continuidad.** El usuario puede cerrar la app a mitad de un recinto
   y volver horas o días después — al reanudar, la experiencia debe
   sentirse como una continuación del mismo recorrido, no como un
   reinicio ni como una pantalla que exige reorientarse desde cero.
   Esto se resuelve con la misma orientación local/global del punto 4
   estando siempre presente (no solo la primera vez que se entra a un
   recinto), no con una pantalla especial de "bienvenido de vuelta".

## Sobre Don José Luis en este flujo

La Etapa 1 dejó abierta la pregunta de si el personaje aparece en
Recintos. No es una de las 6 preguntas priorizadas por el usuario
para esta etapa, así que se registra pero no se resuelve acá — queda
como pregunta pendiente para la Etapa 3, a definir recién cuando el
resto de la experiencia (transición entre recintos, cierre de
recinto, orientación) ya esté resuelta y se sepa si hay un momento
que realmente lo necesite, en vez de agregarlo por costumbre.

## Hallazgos menores (a considerar, no a liderar el diseño)

Confirmados en la Etapa 1, quedan documentados para resolverse como
parte de la implementación (Etapa 5), sin condicionar las decisiones
de experiencia de este documento:

- Colores inconsistentes entre la barra de la lista (verde) y la del
  detalle (naranjo) para la misma métrica.
- Cómputo de progreso duplicado entre `get-rooms-list-data.ts` y
  `get-room-instance-data.ts`.
- Cálculo del "primer recinto" duplicado entre `createInspection` y
  `get-inspection-welcome-data.ts`.
- `EmptyState` disponible pero sin usar en el detalle de recinto
  (cero elementos), y sin `action` en el de la lista.
- Mapa de íconos de elemento cubre 17 de ~39 slugs reales.
- Doble query de autorización redundante en la lista de recintos.
