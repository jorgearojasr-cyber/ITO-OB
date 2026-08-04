# Sprint 2a — Pantalla de Inicio — Etapa 2: Diseño de la experiencia

Rol: Product Designer. Sin código, sin wireframes, sin definición de
componentes ni layout — eso corresponde a la Etapa 3 (Especificación
visual), una vez aprobado este documento. Acá se responde **cómo debe
sentirse y funcionar** la pantalla, no cómo se ve pixel a pixel.

Insumo: `Sprint-2a-Analisis-Pantalla-Inicio.md` (Etapa 1) y las
decisiones de alcance ya confirmadas: `OnboardingCarousel` fuera de
alcance; los 5 problemas de UX detectados sí se corrigen; Don José
Luis aparece con rol menor, reutilizando los componentes del
Sprint 1; la paleta naranja de `tokens.css` es la fuente de verdad de
color.

---

## 1. Objetivo de la pantalla

Inicio no es un dashboard analítico ni una lista de tareas — es el
**punto de re-entrada** a un trabajo físico que el usuario está
haciendo caminando por una vivienda. Su objetivo es responder, en el
primer vistazo, tres preguntas en este orden:

1. **¿Dónde quedé?** (estado de mi inspección en curso)
2. **¿Qué sigue?** (el siguiente paso concreto y accionable)
3. **¿Qué más puedo hacer o consultar desde acá?** (accesos y
   contenido de apoyo)

Todo lo demás en la pantalla existe para servir a esas tres preguntas,
no para competir con ellas. Es una pantalla de **reanudación**, no de
**exploración** — el usuario que abre ObraBien casi siempre lo hace
para retomar algo, no para navegar sin rumbo.

---

## Principios de diseño de la Pantalla de Inicio

Reglas que rigen cualquier decisión posterior de layout/estilo en la
Etapa 3 — si una idea de la spec visual contradice alguna de estas,
la regla gana:

1. **Una pregunta domina, todo lo demás sirve a esa pregunta.** "¿Puedo
   seguir donde quedé, sin fricción?" ordena la pantalla; ningún
   elemento decorativo o de apoyo puede competir en peso visual con la
   respuesta a esa pregunta.
2. **Estado y acción van juntos, nunca separados por scroll ni por
   otro contenido.** Ver el avance y poder actuar sobre él es, para el
   usuario, un solo gesto — no dos secciones distintas de la pantalla.
3. **Cada estado vacío es una pantalla completa propia, no una versión
   pobre del estado con datos.** Se diseña cada uno de los tres
   estados por su propio mérito, con su propia jerarquía y su propio
   camino de acción — nunca como "el hero de siempre, pero sin
   número".
4. **Lo que no ayuda a decidir el siguiente paso, va después y pesa
   menos.** Accesos directos, tip del día y biblioteca técnica son
   contenido de acompañamiento: presentes, pero nunca antes que el
   estado y la acción principal.
5. **Don José Luis acompaña, no interrumpe.** Presencia fija y
   discreta, un único lugar, sin animaciones ni mensajes que compitan
   por atención con el estado de la inspección — coherente con que
   Inicio es una pantalla de tránsito, no de instrucción.
6. **Ningún ajuste de esta etapa depende de un dato nuevo.** Toda
   mejora se construye con lo que `getInicioData()` y
   `getUnreadNotificationCount()` ya devuelven hoy — si una idea
   requiere un campo, cálculo o Server Action nuevos, no es una mejora
   "solo visual" y queda fuera de este sprint.

---

## 2. Qué intenta lograr el usuario al entrar

El usuario típico de esta pantalla llega en uno de estos momentos:

- **En terreno, a mitad de una recepción**: acaba de guardar el
  celular, volvió a mirarlo, y necesita saber inmediatamente qué
  recinto o elemento revisar a continuación — sin leer, sin pensar,
  sin navegar. El tiempo de decisión debe tender a cero.
- **Antes de empezar una recepción**: llega con la intención de crear
  o retomar una inspección — necesita que el camino hacia eso sea
  obvio incluso si nunca ha usado la app o si su última inspección ya
  se cerró.
- **Fuera de terreno, revisando avance**: quiere confirmar cuánto
  falta, sin necesariamente continuar en ese momento — acá la
  pantalla cumple un rol más informativo/tranquilizador que de acción
  inmediata.
- **Curioso/consultando la Biblioteca técnica**: no viene por una
  inspección activa, viene a repasar un criterio antes de una visita —
  este uso es secundario pero real, y no debe sentirse como una idea
  tardía en la jerarquía.

La intención dominante, sin embargo, es siempre la misma: **"¿puedo
seguir donde quedé, sin fricción?"** — el diseño debe optimizarse para
esa intención primero, y para las demás después.

---

## 3. Jerarquía de información y acciones

De mayor a menor peso perceptual:

1. **Estado de la inspección activa** (si existe) — cuánto avance
   llevo, en qué proyecto/unidad. Es el ancla de la pantalla; todo lo
   demás se ordena en relación a esto.
2. **La acción de continuar** — el paso siguiente concreto (qué
   recinto, cuántos elementos pendientes) y el botón que lo ejecuta.
   Debe estar tan cerca del estado como sea posible: ver el avance y
   poder actuar sobre él son, para el usuario, un mismo gesto, no dos
   pasos separados.
3. **Accesos directos a las vistas de trabajo** (recintos, elementos,
   observaciones, fotos) — útiles pero secundarios frente a "seguir
   donde quedé"; sirven para cuando el usuario quiere ir a un lugar
   específico distinto del "siguiente paso" sugerido.
4. **Contenido de apoyo/consulta** (consejo del día, biblioteca
   técnica) — enriquece la visita pero no bloquea ni compite con las
   acciones de arriba. Es lo primero que se sacrificaría en pantallas
   angostas o si el usuario tiene prisa.
5. **Navegación global** (bottom nav) — siempre presente, siempre al
   mismo nivel de peso mínimo, es infraestructura, no contenido.

Los tres estados vacíos del hero (sin proyectos, sin inspección
activa, inspección activa) no son variaciones cosméticas de la misma
jerarquía — son **jerarquías completas distintas**, porque la pregunta
dominante del usuario cambia: sin nada que continuar, la pregunta deja
de ser "¿qué sigue?" y pasa a ser "¿cómo empiezo?". El diseño debe
tratar cada uno como su propio "punto 1", no como un hero vacío con
menos contenido.

### CTA principal por estado

Cada uno de los tres estados de la pantalla tiene **un solo** CTA
principal — el que resuelve la pregunta dominante de ese estado. Todo
lo demás en pantalla es secundario a ese botón, sin excepción:

| Estado | Pregunta dominante | CTA principal |
|---|---|---|
| Sin proyectos (cero inspecciones jamás) | "¿Cómo empiezo?" | **"+ Nueva inspección"** — crear la primera inspección |
| Sin inspección activa (tiene inspecciones, ninguna en curso) | "¿Cómo retomo o empiezo de nuevo?" | **"+ Nueva inspección"** — mismo destino que el estado anterior; hoy este estado no tiene ningún CTA (problema de UX #1), se corrige dándole el mismo camino de acción que "sin proyectos" |
| Inspección activa, con pendientes | "¿Qué sigue?" | **"Continuar recorrido"** — retoma en el siguiente paso calculado por `getInicioData()`; "Ver resumen" existe pero es secundario, no compite por ser el CTA principal |
| Inspección activa, sin pendientes (100% revisado) | "¿Ya terminé?" | **"Ver resumen"** pasa a ser el CTA principal en este caso puntual — no hay "siguiente paso" que continuar, así que el botón dominante cambia de forma coherente con la pregunta, no se deja un "Continuar" sin destino real |

---

## 4. Flujo de atención (qué se ve primero, segundo, tercero…)

**Con inspección activa** (caso principal):

1. Estado/avance de la inspección — lo primero que el ojo procesa,
   antes que ningún texto.
2. El siguiente paso concreto y su acción — inmediatamente después,
   sin scroll de por medio en un teléfono estándar.
3. Los accesos directos — visibles pero ya requieren una decisión
   consciente de "quiero ir a otro lado distinto del sugerido".
4. Contenido de apoyo (tip, biblioteca) — al final, con permiso
   tácito para no leerse en cada visita.

**Sin inspección activa / sin proyectos**: el flujo colapsa a dos
pasos, no cuatro — estado vacío con su mensaje, y la acción para
resolverlo. Todo lo que en el caso principal era secundario (accesos,
tip, biblioteca) puede seguir presente más abajo, pero no debe
alargar el camino hacia "cómo empiezo".

**Regla general de atención**: nada por debajo del punto 2 debe
requerir procesamiento activo para que el usuario complete su tarea
principal. Si en algún momento el usuario necesita leer la sección de
biblioteca técnica para saber qué hacer a continuación, la jerarquía
falló.

---

## 5. Rol de Don José Luis en esta pantalla (presencia discreta)

A diferencia de la Pantalla de Elemento — donde Don José Luis enseña
activamente y confirma cada acción — en Inicio su rol es de
**acompañamiento ambiental, no instructivo**. Esta pantalla no enseña
nada nuevo ni requiere confirmación de acciones; es un lugar de
tránsito, y el personaje debe sentirse consistente con eso.

- **Presencia, no protagonismo**: aparece una sola vez, en un lugar
  fijo y de bajo peso visual (coherente con el punto 5 de la
  jerarquía: es infraestructura de marca, no contenido a procesar).
  No compite con el estado de la inspección ni con el siguiente paso.
- **Tono situacional, no genérico**: el mensaje debe reconocer en qué
  momento está el usuario (por ejemplo, distinto matiz si hay un
  avance a mitad de camino que si recién está por empezar), sin caer
  en instrucción paso a paso — es un saludo con contexto, no una
  lección.
- **Nunca bloquea ni exige interacción**: a diferencia de "Enseñando"
  en la Pantalla de Elemento (que invita a comenzar la revisión), acá
  no hay una acción que Don José Luis esté "guardando" — no aplica un
  estado "Escuchando" en esta pantalla, porque Inicio no registra
  observaciones ni fotos. Su presencia es de bienvenida/continuidad,
  no de confirmación de trabajo.
- **Reutiliza, no reinterpreta**: usa el mismo avatar placeholder ya
  construido en el Sprint 1 (`DonJoseLuisAvatar`) — misma cara, mismo
  criterio de "swap futuro sin rediseñar el layout". No es un
  personaje distinto ni una nueva ilustración; es el mismo personaje
  en un contexto más silencioso.

En síntesis: en Elemento, Don José Luis *hace* algo (enseña,
escucha). En Inicio, Don José Luis *está* — y esa diferencia de rol es
intencional y debe notarse en cuánto espacio y cuánta insistencia
visual se le da.

---

## 6. Cómo se resuelven los problemas de UX detectados (sin cambiar lógica de negocio)

Los 5 problemas quedan dentro de alcance (confirmado por el usuario).
Cada uno se resuelve a nivel de experiencia/contenido, sin requerir
ningún dato nuevo del servidor — los datos que necesitan ya existen
en `InicioData` o son derivables de props ya recibidas:

1. **Estado "sin inspección activa" sin CTA**: pasa a tener, igual que
   los otros dos estados vacíos del hero, un camino de acción claro
   hacia crear o retomar trabajo — dejando de ser el único de los tres
   estados sin salida.
2. **"Sin recintos" vs. "todo revisado" comparten el mismo copy**: se
   diferencian en el mensaje según cuál sea el caso real (ambos datos
   ya están disponibles: si hay recintos y si el porcentaje llegó a
   100), sin inventar ningún estado nuevo en el modelo.
3. **Solo se ve 1 de N inspecciones `IN_PROGRESS` simultáneas**: se
   deja constancia discreta de que hay más trabajo en curso además del
   que se muestra, sin necesidad de construir un selector — es una
   señal informativa, no una funcionalidad nueva de cambio de
   inspección (eso quedaría, si se decide, para un sprint aparte).
4. **Tip del día repetitivo/sin variar por usuario**: se trata como
   contenido de apoyo de bajo compromiso — su repetición ya no importa
   tanto una vez que deja de competir por atención con el flujo
   principal (ver jerarquía, punto 4); no se resuelve con un cambio de
   lógica, sino con su nueva posición discreta en la pantalla.
5. **Biblioteca técnica depende de imágenes externas**: no se resuelve
   en este sprint (requeriría fotos propias, fuera de lo que es un
   cambio "solo visual/interacción" real) — pero su tratamiento visual
   dentro de la jerarquía (punto 4, contenido de apoyo) hace que una
   carga lenta u ocasional falta de imagen no comprometa la tarea
   principal del usuario, que ya se resolvió antes en el flujo de
   atención.

Ninguna de estas soluciones requiere un nuevo campo en
`InicioData`, una nueva Server Action, ni un nuevo estado en el
modelo de `Inspection`/`ElementInstance` — son, en su totalidad,
decisiones de qué mostrar, en qué orden y con qué mensaje.

---

## 7. Qué queda explícitamente fuera de alcance

- **`OnboardingCarousel`** — se mantiene exactamente como está hoy;
  no se toca su contenido, sus 3 pasos ni su lógica de activación.
- **Selector/cambio entre múltiples inspecciones activas** — se deja
  solo la señal informativa (punto 3 de la sección anterior); construir
  un selector funcional es una decisión de producto mayor, no un ajuste
  visual, y queda fuera.
- **Reemplazo de las imágenes de Biblioteca técnica** por fotografía
  propia — sigue como TODO conocido, no es parte de este sprint.
- **Cambiar cómo se calcula el tip del día** (de qué fuente sale, si
  varía por usuario/organización) — se resuelve solo su tratamiento
  visual, no su lógica de selección.
- **Cualquier nuevo dato, cálculo o Server Action** — el sprint opera
  enteramente sobre lo que `getInicioData()` y
  `getUnreadNotificationCount()` ya devuelven hoy.
- **Rediseño del `TopBar`** más allá de darle espacio al avatar de Don
  José Luis si así resulta de la Etapa 3 — no se agregan menús,
  búsqueda ni otras funciones nuevas a la barra superior.
- **Ilustración definitiva de Don José Luis** — sigue siendo el mismo
  placeholder del Sprint 1, sin excepción.
