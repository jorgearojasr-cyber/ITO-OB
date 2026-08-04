# Sprint 2b — Bienvenida a una inspección — Etapa 2: Diseño de la experiencia

Rol: Product Designer. Sin código, sin wireframes, sin definición de
componentes ni layout — eso corresponde a la Etapa 3. Insumo: Etapa 1
(`Sprint-2b-Analisis-Onboarding-Inspeccion.md`) y las decisiones de
arquitectura ya confirmadas por el usuario:

- No reemplaza ni modifica `OnboardingCarousel` — son dos flujos
  distintos con propósitos distintos.
- Sin persistencia ni campos nuevos en el modelo de datos: la pantalla
  se inserta únicamente en el flujo de creación de una inspección
  nueva, antes de entrar al primer recinto. Al reanudar una inspección
  existente, nunca vuelve a aparecer — su "no repetición" es una
  consecuencia de dónde se inserta (un tramo de navegación, no un
  estado guardado), no de una bandera que haya que consultar.
- Extensión futura (fuera de alcance ahora): mismo componente con copy
  adaptado para un colaborador invitado en su primera entrada a una
  inspección compartida.
- `Spec-01-Bienvenida-Inicio-Inspeccion.md` es visión de producto, no
  especificación — se usa como referencia de tono/intención, se
  contrasta contra lo que el código puede sostener hoy.
- Don José Luis tiene rol **central** en esta pantalla — a diferencia
  de Inicio (acompañamiento discreto) y de Elemento (enseña
  puntualmente), acá es el protagonista de la bienvenida.

---

## 1. Objetivo de la pantalla

Esta pantalla no informa ni enseña — **prepara emocionalmente**. Entre
el momento en que alguien crea una inspección y el momento en que
empieza a marcar elementos hay un salto de estado mental: pasó de
"estoy llenando un formulario" a "estoy a punto de recibir una
vivienda, posiblemente sin saber nada de construcción, con el dueño de
la inmobiliaria al lado". El objetivo único de esta pantalla es
suavizar ese salto — transmitir, en segundos, que no está solo y que
no necesita ser experto para hacerlo bien.

No es una pantalla informativa (eso ya lo cubre `OnboardingCarousel`,
una sola vez, a nivel de app) ni instructiva (eso lo cubre Don José
Luis "Enseñando" dentro de cada elemento, Sprint 1). Es, en una
palabra, un **respiro**.

## 2. Qué intenta lograr el usuario al entrar

El usuario que ve esta pantalla acaba de tocar "Crear inspección" — su
estado mental típico:

- **Ansiedad de principiante**: "¿Voy a saber reconocer un problema?
  ¿Qué pasa si me equivoco o me salto algo importante?"
- **Presión social**: a menudo hay alguien más presente (el vendedor,
  el desarrollador, un familiar) esperando que la persona "sepa lo que
  hace".
- **Urgencia práctica**: quiere empezar pronto — esta pantalla no
  puede sentirse como un obstáculo ni pedir ninguna acción compleja.

No busca información nueva ni una decisión — busca permiso para
empezar sin miedo. La pantalla cumple su objetivo si, dos segundos
después de verla, el usuario toca un único botón para continuar.

## 3. Jerarquía de información y acciones

1. **Don José Luis y su mensaje de bienvenida** — el punto de mayor
   peso, ocupa el centro visual de la pantalla. No compite con nada
   más porque no hay nada más compitiendo.
2. **Una promesa de acompañamiento que reduce la barrera de entrada** —
   la idea de que no hace falta saber de construcción, seguida de la
   promesa explícita de que Don José Luis va a guiar paso a paso, debe
   estar tan cerca del mensaje principal como sea posible: es la que
   responde directamente a la ansiedad del punto 2.
3. **Un único CTA** — "Comenzar" (o equivalente), sin alternativas,
   sin botón secundario, sin salida a otra pantalla. Esta pantalla no
   ofrece bifurcaciones: es un tramo, no un cruce.

Deliberadamente **no hay** jerarquía de datos operativos (progreso,
conteos, fecha, desarrolladora) — eso ya lo vio el usuario en el
formulario que acaba de llenar, y volverá a verlo en Inicio. El
nombre del proyecto/unidad es la única excepción, y solo como
contexto secundario dentro del mensaje de Don José Luis (ver sección
5) — nunca como un dato propio con su propia jerarquía visual.

## 4. Flujo de atención

Un solo paso, no una secuencia: Don José Luis + mensaje → botón. No
hay "primero esto, después aquello" — todo se procesa en un único
vistazo, coherente con que el objetivo es un respiro de segundos, no
una lectura. Si el diseño de la Etapa 3 necesita más de un elemento
antes del CTA para transmitir el mensaje, es una señal de que el copy
es demasiado largo, no de que falte jerarquía adicional.

## 5. Rol de Don José Luis — presencia central

Este es el opuesto exacto de su rol en Inicio (discreto, un chip en el
header) y una escala mayor que en Elemento (enseña un punto concreto).
Acá:

- **Ocupa el centro de la pantalla**, no una esquina ni un chip — es
  el elemento visual dominante, coherente con que es una pantalla de
  un único momento emocional, no de trabajo continuo.
- **Su mensaje tiene dos partes, en este orden**: (1) una bienvenida
  centrada **en la persona**, no en la inspección — el protagonista
  del saludo es quien está por empezar, no el proyecto que acaba de
  crear; el nombre del proyecto/unidad puede aparecer como contexto
  secundario (p. ej. en una línea más chica, o mencionado de paso),
  nunca como el sujeto de la frase principal —, y (2) la promesa
  explícita de acompañamiento: no solo "no hace falta saber de
  construcción", sino la afirmación directa de que él va a guiar el
  camino paso a paso — esa promesa es la propuesta de valor del
  personaje y de la aplicación, no un detalle menor. Sin instrucciones
  de "cómo" todavía — eso empieza recién en la Pantalla de Elemento.
- **Tono**: cercano, tranquilo, ligeramente ceremonial — es un
  saludo de bienvenida real, no una confirmación breve como en Inicio
  ni una explicación funcional como en Elemento. Es el único momento
  de las tres pantallas donde Don José Luis puede permitirse una frase
  más larga y con más calidez, porque el usuario no está a mitad de
  una tarea — está a punto de empezar una.
- **Nunca da instrucciones de interacción.** Don José Luis no dice
  "presiona", "toca" ni "haz clic" — esas palabras describen la
  interfaz, no el acompañamiento, y le corresponden únicamente al
  botón. Su mensaje transmite confianza y compañía; la acción concreta
  ("Comenzar") la comunica siempre el CTA, nunca el texto del
  personaje. Regla válida para esta pantalla y para cualquier futura
  aparición suya en el producto.
- **No enseña el "cómo"**: ningún mini-tutorial, ningún mapa de pasos
  (eso ya lo cubrió `OnboardingCarousel` para quien lo vio, y lo cubre
  cada elemento en su propio momento). Mencionarlo acá otra vez
  diluiría el propósito emocional de la pantalla.
- **Reutiliza el placeholder existente**: mismo personaje del Sprint 1
  (`DonJoseLuisAvatar`), sin nueva ilustración — solo cambia de
  tamaño/protagonismo respecto a como aparece en Elemento e Inicio,
  no de identidad visual.

## 6. Principios de diseño

1. **Un respiro, no un formulario ni una lección.** Nada que leer más
   allá del mensaje de Don José Luis; nada que decidir más allá de
   avanzar.
2. **Don José Luis es el centro, no un acompañante.** Única pantalla
   del producto donde ocupa el rol protagónico — el resto del diseño
   se subordina a eso.
3. **Un solo camino hacia adelante.** Un CTA, sin bifurcaciones ni
   pantalla de "saltar" — a diferencia de `OnboardingCarousel`, que sí
   ofrece salir antes de tiempo.
4. **A la persona, no al proyecto.** El saludo se dirige a quien va a
   inspeccionar, no a la inspección recién creada — el nombre del
   proyecto/unidad es contexto secundario, nunca el sujeto de la
   frase principal. Específica igual, pero específica sobre la
   persona y su tarea, no sobre el dato administrativo.
5. **Sin nueva persistencia.** Su "no repetición" es un efecto de
   dónde vive en la navegación, no de una bandera nueva en la base de
   datos — si una idea de la Etapa 3 requiere recordar algo, no
   encaja en este sprint.
6. **No reemplaza, no le explica de nuevo a nadie.** `OnboardingCarousel`
   sigue siendo la única pantalla que "enseña a usar ObraBien"; esta
   pantalla nunca compite con ese contenido ni lo repite.
7. **Es un respiro antes de comenzar — principio permanente.** No es
   un paso funcional del flujo de creación ni una pantalla de estado;
   es una pausa deliberada entre "terminé el formulario" y "empiezo a
   trabajar". Cualquier elemento que la Etapa 3 quiera sumarle debe
   preguntarse primero si sigue sirviendo a esa pausa o si la
   convierte, sin querer, en un paso más que completar.
8. **Don José Luis nunca instruye la interacción — principio
   permanente.** No dice "presiona" ni "toca" ni nombra al botón; solo
   transmite confianza y acompañamiento. La acción siempre la
   comunica el control mismo (el CTA), nunca el texto del personaje.
   Aplica acá y a cualquier aparición futura de Don José Luis en el
   producto, no solo a esta pantalla.
9. **Nunca genera urgencia — principio permanente.** Ni acá ni en
   ninguna otra pantalla del producto Don José Luis presiona, apura ni
   insinúa que el usuario se está demorando o quedando atrás — su
   función es siempre calmar, nunca acelerar. Cualquier copy futuro
   que le atribuya frases del tipo "date prisa" o "no pierdas tiempo"
   está fuera de personaje.
10. **Única conversación extendida del recorrido — principio
    permanente.** Esta pantalla es, a propósito, el único momento del
    producto donde Don José Luis sostiene algo parecido a una
    conversación breve con el usuario (la bienvenida + la promesa de
    acompañamiento de la sección 5). En cualquier otra pantalla —
    Inicio, Elemento, y las que vengan — sus mensajes vuelven a ser
    breves y estrictamente contextuales, como ya quedó establecido en
    los Sprints 1 y 2a. Esta pantalla no sienta precedente para
    alargar sus mensajes en otros lugares.

## 7. Qué queda explícitamente fuera de alcance

- **Copy/variante para colaboradores invitados** — mismo componente,
  pero con mensaje adaptado; documentado como extensión futura, no se
  diseña todavía.
- **Cualquier campo o tabla nueva** para recordar si ya se mostró —
  la pantalla vive puramente en el tramo de navegación
  creación → primer recinto.
- **Tocar `OnboardingCarousel`** en cualquier forma — sigue intacto,
  con su propio propósito y su propio momento (una vez por usuario, a
  nivel de app).
- **Cualquier contenido instructivo** sobre cómo usar la app o cómo
  revisar un elemento — eso vive en `OnboardingCarousel` y en la
  Pantalla de Elemento, respectivamente, no acá.
- **Botón de "Saltar" o navegación alternativa** — a diferencia de
  `OnboardingCarousel`, esta pantalla no ofrece salida temprana; es un
  tramo breve, no un flujo de varios pasos que alguien pueda querer
  abreviar.
