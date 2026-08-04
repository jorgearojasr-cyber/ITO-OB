# Sprint UX-01 — Revisión Integral del Flujo

## Objetivo y método

Recorrer la aplicación completa como la recorrería una persona sin
conocimientos técnicos que recibe una vivienda nueva por primera vez,
de principio a fin: Inicio → Crear inspección → Bienvenida → Recorrido
de recintos → Inspección de elementos → Resumen → Informe.

Este documento **no busca bugs de código, no propone funcionalidades
nuevas y no cambia arquitectura**. Es un análisis exclusivamente de
experiencia: qué transmite cada pantalla, qué fricciona, qué es
inconsistente, qué se podría simplificar, dónde reforzar el
acompañamiento (Don José Luis y el tono general) y dónde reforzar la
continuidad entre pantallas.

**Método**: recorrido en vivo, en navegador, con un usuario de prueba
desechable (`ux-review@obrabien.test`, "Camila Reyes", rol
PROPIETARIO, `hasSeenOnboarding: false`) sobre una inspección real
("Edificio Los Aromos — Depto 302", 12 recintos / 45 elementos). Se
completaron en vivo, con interacción real de UI (no atajos de base de
datos): el onboarding completo, la creación de la inspección, la
Bienvenida, el primer recinto ("Exterior") completo elemento por
elemento —incluyendo el camino rápido "✓ Está bien" y el panel de
observación "Reportar un problema"—, y el último recinto
("Equipamiento"), el Resumen, el cierre real con firma de propietario
y constructora, y el Informe final generado. Los 10 recintos
intermedios se completaron por script de base de datos (deliberado,
para no gastar el recorrido en repetición mecánica) dejando el último
recinto pendiente a propósito, para vivir en vivo la transición
"último recinto → Ir al resumen".

Cada etapa se documenta con las mismas seis preguntas que se pidieron:
qué transmite, fricciones, inconsistencias, oportunidades de
simplificación, oportunidades de acompañamiento, oportunidades de
continuidad.

---

## 1. Inicio

**Qué transmite**: control y progreso. La card hero muestra el estado
general ("INSPECCIÓN EN PROGRESO", % de avance, contador de
recintos/elementos/observaciones/fotos) y dos acciones directas
("Continuar recorrido" / "Ver resumen"). Debajo, una sección
"Continuemos" apunta explícitamente al siguiente paso pendiente
("Sigamos en Equipamiento — Tienes 1 elemento pendiente por
revisar."), acceso rápido a Recintos/Elementos/Observaciones/Fotos, un
"Kit de inspección", un consejo del día con fuente citada (Manual de
Tolerancias CDT) y la Biblioteca Técnica. Es una pantalla que dice "sé
exactamente dónde vas" más que "bienvenido a una lista de tareas".

**Fricciones**: ninguna real observada en la interacción; la pantalla
resuelve en una sola vista lo que se necesita para decidir el próximo
paso. El único punto detectado — la primera visita de una ruta de
recinto nunca compilada por Turbopack devolvió un 404 transitorio (ver
sección 4) — no ocurre en Inicio en sí, pero Inicio es el lugar desde
donde ese primer tap sale, así que la mala experiencia empieza
lógicamente aquí.

**Inconsistencias**: ninguna detectada en esta pantalla en particular.

**Oportunidades de simplificación**: la pantalla ya es densa en
información útil pero no sobrecargada — cada bloque tiene un propósito
distinto y no compite por atención. No se identifican elementos
redundantes.

**Oportunidades de acompañamiento**: la presencia de Don José Luis
aparece como un chip en el TopBar (`DonJoseLuisPresence`), discreto y
no intrusivo — coherente con la regla ya establecida de que en Inicio
no debe convertirse en un personaje que instruye o interrumpe. Esa
comedida es correcta: Inicio es un tablero de control, no un momento
de conversación.

**Oportunidades de continuidad**: fuerte. El texto "Sigamos en
Equipamiento" en el estado de 98% de avance nombra el recinto exacto
pendiente, usando el mismo algoritmo único de "primer trabajo
pendiente" que después se confirma dentro del propio recinto. Esa
coherencia (Inicio anticipa correctamente lo que el usuario va a
encontrar al entrar) es uno de los puntos más sólidos de todo el
recorrido.

---

## 2. Crear inspección

**Qué transmite**: un formulario de 3 pasos, sin fricción de campos
técnicos innecesarios — pide lo mínimo para generar el catálogo
correcto de recintos/elementos (dirección, tipo de vivienda,
features/equipamiento presente).

**Fricciones**: ninguna bloqueante detectada en el recorrido en vivo.

**Inconsistencias**: ninguna detectada frente al resto del sistema —
el wizard usa el mismo lenguaje visual que las demás pantallas.

**Oportunidades de simplificación**: no se identifican pasos
prescindibles; los 3 pasos existen porque las respuestas de features
determinan qué elementos se siembran en la inspección (gas, piscina,
etc.), así que el largo del formulario está justificado por su función,
no es fricción gratuita.

**Oportunidades de acompañamiento**: esta etapa es puramente
transaccional (llenar un formulario) y no involucra a Don José Luis —
decisión correcta, coherente con la regla de usarlo solo donde aporta,
no como decoración en cada pantalla.

**Oportunidades de continuidad**: el formulario termina redirigiendo a
`/bienvenida` en vez de directo al primer recinto — ese es exactamente
el punto de continuidad más fuerte de esta etapa: no se abandona al
usuario en una lista fría de recintos recién creados, se lo recibe.

---

## 3. Bienvenida

**Qué transmite**: es, deliberadamente, el único momento de
"conversación extendida" de Don José Luis en toda la app — la pantalla
existe para bajar la ansiedad de "no sé nada de construcción" antes de
empezar. El tono es cercano y el mensaje explica qué va a pasar y por
qué no se necesita experiencia previa.

**Fricciones**: ninguna funcional. La única fricción es tonal (ver
inconsistencias).

**Inconsistencias**: el saludo usa el nombre completo del usuario y un
"Bienvenido" con género marcado — `Hola, {userName}. Bienvenido.`
(`InspectionWelcome.tsx:25`), donde `userName` es el nombre completo
registrado (en el recorrido: "Camila Reyes"). Esto choca levemente con
el principio de diseño ya establecido para esta pantalla ("cercano y
cálido", Sprint 2b): un saludo con nombre completo y formal ("Bienvenido")
lee más protocolar que cercano, y asume un género que el sistema no
necesariamente conoce (el modelo de datos no registra género de
usuario, así que "Bienvenido" es una elección de copy, no un dato).

**Oportunidades de simplificación**: ninguna — es intencionalmente el
momento donde más se puede "hablar", no donde hay que acortar.

**Oportunidades de acompañamiento**: ya está bien resuelto — es la
etapa que mejor representa el personaje. El único ajuste que valdría
la pena explorar (sin implementarlo en este sprint) es el saludo
descrito arriba.

**Oportunidades de continuidad**: buena — de aquí se entra
directamente al primer recinto pendiente, sin pasos intermedios ni
pantallas de "ahora sí, empecemos" redundantes.

---

## 4. Recorrido de recintos

**Qué transmite**: orientación constante. Cada pantalla de recinto
muestra "Recinto X de Y" (posición dentro del recorrido total), una
barra de progreso del propio recinto y la lista de elementos con su
estado. El usuario nunca tiene que preguntarse "¿cuánto me falta?" ni
"¿en qué recinto estoy".

**Fricciones**: se observó, al entrar por primera vez a la ruta de un
recinto recién creado (nunca antes compilada por el dev server), un
404 transitorio — la misma ruta, sin ningún cambio, funcionó
correctamente al reintentar. La causa técnica (una carrera de
primera-compilación de Turbopack en modo desarrollo) casi con toda
seguridad no existe en producción, así que se documenta aquí solo como
experiencia, no como defecto de la aplicación: si algo así ocurriera
en producción, el momento no podría ser peor — es el primer tap del
usuario después de que Don José Luis le dijo "no necesitas saber de
construcción, yo te voy a guiar", y la respuesta sería una página de
error. Vale la pena tenerlo presente como escenario a vigilar, no como
tarea a resolver ahora.

**Inconsistencias**: el paso 2 del onboarding ("Cómo funciona")
describe la interacción como "Marca ✔ u ⚠" (`OnboardingCarousel.tsx:22`),
pero la interfaz real de elementos usa botones de texto ("✓ Está bien"
/ "Reportar un problema"), no íconos de check/warning. Es una
desconexión real entre lo que el onboarding enseña y lo que el usuario
efectivamente encuentra dos pantallas después — exactamente el tipo de
inconsistencia que mina la sensación de "esto ya me lo explicaron
bien".

**Oportunidades de simplificación**: ninguna relevante — la lista de
elementos por recinto ya es la unidad mínima de trabajo.

**Oportunidades de acompañamiento**: el `RoomCompletionBanner` cumple
bien su función sin necesitar a Don José Luis (decisión ya documentada
y correcta) — el mensaje varía naturalmente según si queda otro
recinto pendiente ("Continuar con Living →") o si es el último
("Recorriste todos los recintos de esta inspección. Ir al resumen →"),
usando el mismo algoritmo de "próximo pendiente" que Inicio. Esa
variación autoformulada, sin plantilla genérica, es un acierto de
acompañamiento aunque no use al personaje directamente.

**Oportunidades de continuidad**: fuerte — la numeración "Recinto X de
Y" y el banner de finalización conectan cada recinto con el siguiente
sin que el usuario tenga que volver a la lista general a decidir por
sí mismo. La sección "Todos los recintos" (accesible desde acceso
rápido) sigue disponible como mapa completo para quien prefiera saltar
de orden, pero no se impone como paso obligatorio.

---

## 5. Inspección de elementos

**Qué transmite**: guía puntual, elemento por elemento, con Don José
Luis presente en dos modos — "Enseñando" (antes de responder) y
"Escuchando" (toast "Anotado ✓" tras cada respuesta). El patrón de
pregunta + "✓ Está bien" / "Reportar un problema" + foto opcional es
consistente en los 3 puntos de checklist observados en cada elemento.

**Fricciones**: dos, ambas menores y de contenido, no de
funcionalidad:
1. El elemento "Calefont o termo eléctrico" mostró "Aún no hay ficha
   técnica para este elemento" — el usuario llega a un tema con
   implicancias de seguridad (gas, ventilación) sin ningún respaldo
   técnico visible más allá de las 3 preguntas del checklist. Es un
   vacío de contenido/cobertura de biblioteca, no un error de
   interfaz, pero se siente como una interrupción del acompañamiento
   justo en un elemento donde más se esperaría orientación.
2. El mensaje de Don José Luis en modo "Enseñando" para elementos que
   sí tienen ficha técnica concatena el primer punto de chequeo
   directamente en la frase — `Vamos a revisar ${element.name}. Fíjate
   especialmente en: ${firstTip.toLowerCase()}.`
   (`ElementInspectionExperience.tsx:50`). Cuando el contenido de
   `quickCheckItems[0]` ya trae su propio prefijo de categoría (como
   se vio en el recorrido: "Fíjate especialmente en: exterior: revisa
   desde 5 m..."), el resultado es una frase con dos puntos
   encadenados que sí se lee, pero no con la naturalidad que el resto
   de los mensajes de Don José Luis logra en otras pantallas.

**Inconsistencias**: ninguna adicional a la ya señalada del onboarding
(sección 4) — el patrón de interacción es uniforme entre todos los
elementos revisados.

**Oportunidades de simplificación**: ninguna — 3 preguntas de
checklist por elemento, con foto opcional, ya es un mínimo razonable.

**Oportunidades de reforzar el acompañamiento**: esta es la pantalla
donde Don José Luis está más presente y mejor integrado — el cambio de
"Enseñando" a "Escuchando" tras la primera respuesta da la sensación de
que efectivamente está siguiendo el ritmo del usuario, no repitiendo
un guion fijo. El único punto que le resta pulido es la construcción
de frase señalada arriba.

**Oportunidades de continuidad**: buena — al completar el elemento,
"Elemento revisado — Volver a Equipamiento" regresa directo al recinto
en curso, sin pasos intermedios; y desde ahí el `RoomCompletionBanner`
retoma el hilo hacia el siguiente recinto o el resumen.

---

## 6. Resumen

**Qué transmite**: cierre de sentido, no solo de datos. La card de
síntesis ("Cómo quedó la vivienda") antepone un titular en lenguaje
natural ("La vivienda quedó en buenas condiciones, con 1 observación
menor registrada.") a la lista cruda de observaciones — el usuario
entiende el resultado antes de tener que leer una tabla. El desglose
por prioridad (Alta/Media/Baja) y los filtros por recinto están
disponibles pero subordinados visualmente al titular, tal como está
documentado en Sprint 4.

**Fricciones**: la firma digital (canvas) respondió de forma inconsistente
según el tipo de evento de puntero usado para dibujar durante la
verificación — un detalle de la capa de interacción del componente de
firma que no se manifestó como error visible en la UI real (el flujo
completo con mouse/trackpad funcionó sin problema), así que se anota
solo como observación técnica de bajo impacto, no como fricción de
usuario.

**Inconsistencias**: ninguna detectada frente al resto del sistema —
el aviso "Al cerrar, se capturan las firmas... Esta acción no se puede
deshacer." es directo y no ambiguo, coherente con el tono del resto de
la app para acciones irreversibles.

**Oportunidades de simplificación**: ninguna — la pantalla ya prioriza
correctamente (síntesis primero, detalle después, acción de cierre al
final).

**Oportunidades de acompañamiento**: Don José Luis está deliberadamente
ausente en Resumen (decisión ya documentada en Sprint 4) — acierto: el
titular de síntesis ya cumple la función humanizadora que en otras
pantallas cumple el personaje, sin necesitar el avatar.

**Oportunidades de continuidad**: el botón "Ver informe" en el header
está disponible incluso antes de cerrar la inspección, lo cual es
correcto (deja explorar el informe en construcción), y tras cerrar, la
redirección directa a `/informe` con el PDF ya generado conecta el
gesto de firmar con el resultado tangible sin pasos intermedios.

---

## 7. Informe

**Qué transmite**: un documento formal y completo — encabezado con
propietario, dirección, tipo de vivienda, organización, fecha de
generación y % de avance al momento de generar, seguido de un
recorrido completo recinto por recinto con el estado de cada elemento
y el detalle de cada observación. Se siente como el artefacto final
que justifica todo el recorrido anterior, no como una vista más de la
app.

**Fricciones**: en este recorrido, el cierre y la generación del PDF
(Puppeteer, potencialmente hasta 60s) se resolvieron dentro del mismo
estado "Cerrando…" del botón de firma, sin una pantalla intermedia de
"generando informe" — la redirección a `/informe` ocurrió ya con el
documento listo. Esto es positivo cuando la generación es rápida, pero
significa que el usuario no ve explícitamente qué está pasando durante
esos segundos de espera más allá del texto del botón. (El
comportamiento para generación lenta o con reintento —
`InformeToolbar` con timer de 90s y manejo de error— existe en el
código pero no se vivió en este recorrido porque la generación fue
inmediata; queda fuera de lo observado en vivo.)

**Inconsistencias**: ninguna detectada — el informe usa el mismo
sistema visual y la misma terminología (estados "Correcto" / "Con
observación", prioridades) que el resto del recorrido.

**Oportunidades de simplificación**: ninguna — es un documento de
respaldo, no una pantalla de trabajo; su extensión está justificada
por su función.

**Oportunidades de acompañamiento**: correctamente ausente — el
informe es un documento formal dirigido también a la constructora, no
solo al propietario; la voz de Don José Luis no pertenece aquí y no
aparece.

**Oportunidades de continuidad**: es el punto final del recorrido — no
hay una acción de "volver a" o "qué sigue" explícita más allá del botón
"Descargar PDF". Dado que la inspección ya está cerrada en este punto,
eso es coherente (no hay siguiente paso funcional), pero se nota como
el único lugar del recorrido donde la aplicación no le dice al usuario
qué esperar después (por ejemplo, que las observaciones con prioridad
seguirán su ciclo de vida de postventa) — se mencionona solo como
observación, no como una funcionalidad faltante a implementar.

---

## Patrones transversales observados

Estos no son hallazgos nuevos, son la misma información de arriba
vista en conjunto — util para decidir dónde enfocar el próximo sprint
funcional, sin proponer aquí ninguna solución:

- **El algoritmo único de "próximo pendiente" es el hilo conductor más
  fuerte de todo el recorrido.** Aparece en Inicio, en el banner de
  fin de recinto y en la lista de recintos, siempre con el mismo
  resultado — es, hoy, la pieza que más sostiene la sensación de
  continuidad entre pantallas.
- **Don José Luis está bien calibrado por pantalla**: presente y
  activo en Bienvenida y en Elementos (donde más aporta), discreto en
  Inicio, ausente en Resumen/Informe (donde el propio contenido ya
  humaniza el resultado). No hay ninguna pantalla donde su presencia
  se sienta forzada o decorativa.
- **Las dos inconsistencias de copy detectadas (onboarding vs. UI
  real de checklist; saludo formal de Bienvenida) son pequeñas en
  aislado, pero comparten una misma naturaleza**: texto que se escribió
  en un momento del proyecto y no se revisó cuando la pantalla que
  describe cambió después. Vale la pena tenerlo en cuenta como tipo de
  fricción a vigilar en futuros cambios de copy, más que como dos
  bugs puntuales a corregir.
- **El único vacío de "orientación" real detectado fue de contenido**
  (ficha técnica ausente para "Calefont o termo eléctrico"), no de
  interfaz — la interfaz siempre supo qué mostrar; lo que faltó fue el
  artículo de biblioteca técnica correspondiente.
- **El recorrido nunca deja al usuario sin saber qué sigue**, con la
  única excepción parcial del Informe al final (razonable, dado que es
  el punto de cierre) y la ausencia de una pantalla explícita de
  "generando informe" durante el cierre.

## Alcance no cubierto en este recorrido

Por foco y tiempo, este recorrido no incluyó: el flujo de colaborador
externo invitado (`/invitaciones/[token]`), el ciclo de vida de
postventa de una observación después del cierre (`advanceObservationLifecycle`,
notificaciones), ni el comportamiento de reintento de generación de
informe (`retryReportGeneration`, timer de 90s) — quedan como
candidatos naturales para un recorrido de seguimiento si se define
como parte de un futuro sprint.
