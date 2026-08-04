# Sprint 5 — Finalización de la Inspección — Etapa 2: Diseño de la experiencia

Rol: Product Designer. Sin código, sin wireframes, sin definición de
componentes ni layout — eso corresponde a etapas posteriores. Insumo:
Etapa 1 (`Sprint-5-Analisis-Finalizacion-Inspeccion.md`).

El hallazgo central de la Etapa 1 es el punto de partida de todo este
documento: **hoy no existe una experiencia de cierre, solo una
transición técnica entre la firma y el informe** — "Cerrando…" en un
botón, una navegación de cliente, y un documento que se arma en
segundo plano mientras el usuario ya lo está mirando a medias. Este
documento no diseña una pantalla de carga más prolija. Diseña el
momento en que la aplicación le confirma al usuario que su trabajo de
las últimas horas quedó registrado — antes de entregarle un documento.

Este documento responde, en el orden que el usuario definió, las 5
preguntas eje de esta etapa. Los hallazgos menores de la Etapa 1
(autorización asimétrica, umbrales duplicados, reintentos, firmas
huérfanas en Blob, filtrado client-side) se retoman al final, como
consideraciones de implementación — **no** como motores del diseño.

---

## 1. ¿Cómo confirma la aplicación que las firmas fueron registradas correctamente?

Hoy la única confirmación de que una firma "quedó" es indirecta: el
botón "Siguiente" deja de estar deshabilitado. No hay ningún mensaje,
ningún gesto, nada que el usuario pueda señalar y decir "ahí quedó
registrada mi firma". Para algo que representa la conformidad legal y
emocional del propietario con la recepción de su vivienda, eso es
insuficiente — es el mismo nivel de feedback que un checkbox cualquiera
del checklist.

La app ya tiene, en otro punto del recorrido, exactamente el patrón
que este momento necesita: cuando se responde un ítem del checklist de
un elemento, Don José Luis confirma con un toast breve — "Anotado ✓".
Ese mismo lenguaje de "quedó registrado, lo vi" es el que debe existir
acá, pero con un peso proporcional a lo que se está confirmando: no es
un ítem más de un checklist, es una firma. La confirmación debe sentirse
más deliberada que un toast de dos segundos — un instante de pausa
breve donde la firma recién trazada se reconoce visualmente como
"capturada" antes de pasar al siguiente paso, no un simple cambio de
estado de botón.

Esto ocurre dos veces, con dos calidades distintas de confirmación:

- **Al firmar el propietario**: la confirmación es personal — es *su*
  conformidad quedando registrada. El tono es de cierre de su propia
  parte del proceso.
- **Al firmar la constructora**: la confirmación es de cierre conjunto
  — ambas partes ya coinciden. Este es el momento en que, por primera
  vez, existen las dos firmas juntas — merece sentirse como la pieza
  que faltaba encajando, no como "una firma más".

## 2. ¿Cómo vive el usuario el momento de "Finalizando la inspección" sin sentir que solo está esperando un PDF?

Este es el corazón del encargo. Hoy este momento no existe como tal
—es la Etapa 1 la que lo confirma— y cuando el usuario llega a
`/informe`, dos cosas compiten sin resolverse: un botón que dice
"Generando…" y, debajo, el documento completo ya renderizado. El
usuario no sabe si ya terminó o no.

La solución no es una barra de progreso más bonita ni un spinner con
mejor copy — sería seguir resolviendo esto como "una espera técnica",
que es exactamente lo que el encargo pide evitar. La solución es que
este momento **tenga su propio contenido**, que no dependa de que el
PDF ya esté listo para tener valor. Mientras el informe se genera en
segundo plano, lo que el usuario ve en pantalla no debería ser "esto
está cargando" — debería ser un resumen de lo que acaba de lograr:
cuántos recintos recorrió, cuántos elementos revisó, cuántas
observaciones dejó registradas. Es información que la aplicación ya
tiene (es literalmente el mismo dato que hoy alimenta el snapshot del
informe) — lo que cambia es el momento y el propósito en que se
muestra: no como "aquí está tu documento", sino como "esto es lo que
acabas de terminar".

Ese contenido convierte la espera en algo con valor propio incluso si
la generación del PDF tardara más de lo esperado: el usuario no está
mirando un símbolo de carga preguntándose cuánto falta, está mirando
una confirmación de su propio trabajo mientras, en paralelo y sin que
tenga que pensarlo, el documento se termina de preparar. La duración
real de la generación deja de ser el eje de la experiencia de este
momento — es un detalle técnico que ocurre detrás, no el contenido
que el usuario está viviendo.

Un principio que se deriva directo de esto: **mientras dura este
momento, el documento del informe no debería asomar por debajo,
a medias, contradiciendo el mensaje de "esto está en proceso"** — el
tránsito y el documento final son dos momentos distintos, y deben
sentirse como tal, no como una misma pantalla en dos estados
superpuestos.

## 3. ¿Cómo comunica la aplicación que la inspección terminó exitosamente antes de mostrar el informe?

Hoy no hay ningún momento así — se pasa directo de firmar a ver el
documento. Falta un instante explícito, propio, que declare el cierre
antes de entregar el resultado. La app ya tiene un precedente exacto
de esta idea en el otro extremo del recorrido: Bienvenida es un
"respiro antes de comenzar", no un paso funcional — este momento debe
ser su contraparte, un **respiro después de terminar**, tampoco un
paso funcional de generación de PDF.

Ese momento debe declarar, con la misma calidez que usa el resto de la
app, algo del orden de "tu inspección quedó registrada" — una
afirmación, no una notificación técnica. No necesita detalle ni
estadísticas (eso ya lo cubre el punto 2) — su función es puramente
emocional: marcar, de forma inequívoca, que el recorrido que empezó en
Bienvenida ya se completó. Es el cierre del mismo arco narrativo que
esa pantalla abrió, y debería sentirse como tal — no como una pantalla
nueva y desconectada, sino como el otro extremo del mismo gesto.

Solo después de ese reconocimiento explícito corresponde mostrar el
informe — que pasa a ser, en ese orden, la prueba física de lo que ya
se confirmó verbalmente, no la única confirmación que el usuario
recibe.

## 4. ¿Cuál es el rol de Don José Luis en este momento final del recorrido?

Este es exactamente el tipo de decisión que, siguiendo el criterio ya
establecido para este personaje en el resto de la app (evaluarlo
pantalla por pantalla, no agregarlo por defecto), tiene una respuesta
clara una vez que se mira el patrón completo: Don José Luis está
presente y activo en los dos momentos de mayor carga emocional del
recorrido — Bienvenida (el único otro momento de "conversación
extendida") y Elementos (acompañamiento puntual) — y deliberadamente
ausente en Resumen e Informe, porque ahí el contenido mismo ya cumple
la función humanizadora.

El tramo de cierre no es "contenido" — es una transición, igual que
Bienvenida. Por eso el personaje **sí tiene un rol acá**, y es el
mismo tipo de rol que tuvo al principio, pero invertido: en Bienvenida
él recibe al usuario y le baja la ansiedad de empezar algo que no
domina ("no necesitas saber de construcción, yo te voy a guiar"); acá
debe **despedir** y reconocer el esfuerzo de haber terminado. No es
una instrucción ni una enseñanza (ese es su rol en Elementos) — es un
reconocimiento entre pares, más cercano al tono de Bienvenida que al
de un tutorial.

Esto lo convierte en el segundo y último momento de "conversación
extendida" de todo el recorrido — bookending el arco completo: él
abre el recorrido en Bienvenida y lo cierra acá. No debería aparecer
ya en `/informe` (ahí sigue rigiendo la decisión ya tomada en el
Sprint 4: el documento formal no es su lugar, y ahora además ya
cumplió su despedida un paso antes) — su presencia en este tramo vive
específicamente en el momento de cierre descrito en las preguntas 2 y
3, no se extiende más allá.

## 5. ¿Cómo prepara la aplicación al usuario para la etapa siguiente (informe, descarga y eventual postventa)?

Hoy no lo hace — la Etapa 1 confirmó que no existe ningún puente entre
terminar de ver/descargar el informe y el hecho de que las
observaciones con prioridad siguen su propio ciclo de vida de
postventa después. El usuario que cierra la app tras descargar el PDF
no tiene ninguna razón para esperar que la aplicación siga teniendo un
rol después de este momento.

La preparación no debe ser una funcionalidad nueva ni una pantalla
adicional — es una cuestión de **secuencia y expectativa**, dentro del
mismo momento de cierre ya diseñado en las preguntas 2-4. Una vez que
el usuario ya vivió la confirmación de que todo quedó registrado (punto
3), y antes de que la atención pase completamente al documento, es el
lugar natural para sembrar, en una frase breve y sin urgencia, qué
sigue: que el informe queda disponible para descargar y compartir
cuando lo necesite, y que las observaciones que dejó seguirán su
propio proceso (algo que la aplicación ya hace, solo que hoy nadie se
lo anticipa). No es una lista de instrucciones ni un tutorial nuevo —
es una expectativa correctamente puesta, del mismo tamaño y tono que
el resto de los mensajes de acompañamiento de la app.

Esto también responde, indirectamente, al vacío detectado en la Etapa
1 sobre la ausencia de cualquier "esto es lo que sigue" al final del
recorrido: la preparación para la etapa siguiente **es** el cierre
narrativo que hoy falta — no son dos problemas distintos, son la misma
oportunidad vista desde dos preguntas.

---

## Adenda tras aprobación de la Etapa 2

El usuario aprobó este documento y agregó dos principios permanentes
adicionales antes de iniciar la Etapa 3 — ya incorporados como
principios 9 y 10 abajo, y vigentes para el resto del sprint (Etapa 3
en adelante): el cierre nunca transmite urgencia, y el informe nunca
es el protagonista de este tramo — lo es la finalización correcta de
la inspección.

## Principios de diseño (Sprint 5)

1. **El cierre es un momento propio, no un efecto secundario de la
   generación del PDF.** La duración real de Puppeteer es un detalle
   técnico; la experiencia de cierre no debe depender de ella para
   tener sentido ni valor.
2. **Nunca se confirma con silencio.** Cada acción con peso real en
   este tramo — una firma trazada, ambas firmas completas, el cierre
   mismo — merece una confirmación explícita y proporcional, no solo
   un cambio de estado de botón o una navegación silenciosa.
3. **El tránsito y el documento final son dos momentos distintos.**
   Mientras dura el cierre, el informe no debe asomar a medio
   renderizar por debajo — evita la contradicción ya detectada en la
   Etapa 1 entre "Generando…" y un documento ya visible.
4. **Este tramo cierra el mismo arco que Bienvenida abrió.** No es una
   pantalla nueva y aislada — es la otra mitad de un gesto que ya
   empezó al principio del recorrido, y debe sentirse en continuidad
   con él (mismo tono, mismo personaje, mismo tipo de "respiro").
5. **Don José Luis se despide, no instruye, en este momento.** Su rol
   acá es de reconocimiento, siguiendo el mismo criterio de "evaluar
   por pantalla" ya usado en el resto del proyecto — presente en
   Bienvenida y en el cierre (transiciones), ausente en Resumen e
   Informe (contenido que ya se humaniza solo).
6. **Nunca se descarta trabajo ya confirmado sin avisar.** Si el
   usuario ya trazó una firma reconocida como capturada (punto 1),
   abandonar el proceso a mitad de camino debe sentirse como una
   decisión consciente, no como una pérdida silenciosa.
7. **Preparar lo que sigue es parte del cierre, no un paso aparte.**
   La expectativa sobre el informe y la postventa se siembra dentro
   del mismo momento de cierre, no como una pantalla o notificación
   adicional después.
8. **Nada de esto requiere datos nuevos.** Los conteos de recintos,
   elementos y observaciones, el estado de las firmas y el ciclo de
   vida de postventa ya existen y ya se calculan — este diseño
   orquesta información que la app ya tiene, igual que en el Sprint 3.
9. **(Permanente) El cierre nunca transmite urgencia.** Después de
   firmar, la aplicación debe permitir un breve momento de
   tranquilidad antes de presentar el informe — ningún elemento de
   este tramo (temporizador, contador, animación) debe sugerir prisa
   ni presionar al usuario a avanzar más rápido de lo que necesita.
10. **(Permanente) El informe nunca es el protagonista de este tramo.**
    El protagonista es la finalización correcta de la inspección; el
    informe es la consecuencia natural de ese proceso, no el motivo
    por el que existe esta pantalla. La jerarquía visual de cada
    momento del cierre debe reflejar esto — el documento aparece
    después, subordinado a la confirmación que lo precede.

## Hallazgos menores (a considerar, no a liderar el diseño)

Confirmados en la Etapa 1, quedan documentados para resolverse como
parte de la implementación, sin condicionar las decisiones de
experiencia de este documento:

- Autorización asimétrica entre `/resumen` e `/informe` para
  colaboradores externos.
- Umbral de "generación lenta" duplicado en dos constantes
  independientes (servidor y cliente).
- Reintentos sin ningún panel de intervención cuando se agotan de
  forma definitiva.
- Firmas subidas a Vercel Blob antes de que exista transacción o
  `Report` — quedan huérfanas si `closeInspection` falla después.
- Filtrado 100% client-side sin paginación en la lista de
  observaciones de `/resumen`.
- `InspectionStatus.COMPLETED` sin ningún escritor en el código actual.

---

Sin wireframes ni definición de componentes en este documento. Queda
para la siguiente etapa traducir estos cinco principios y el rol
definido de Don José Luis en una especificación visual concreta.
