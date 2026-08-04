# Fase 2 — Validación del Producto — Plan de Investigación

Rol: Product Manager + UX Research Lead. Documento de planificación
pura — **sin código, sin propuestas de funcionalidades nuevas**. El
objetivo es confirmar, con usuarios reales, que el Milestone 1
(Experiencia Principal de Inspección: Inicio → Bienvenida → Recorrido
→ Elementos → Resumen → Finalización → Informe) es realmente
excelente antes de invertir en el resto del ecosistema ObraBien.

Este plan no reemplaza el criterio de las 6 etapas de un sprint — lo
antecede. Todo lo que la validación encuentre se procesa después
usando ese mismo proceso ya probado (ver sección 4 más abajo para
cuándo corresponde cada camino).

---

## 1. Cómo realizar pruebas con usuarios reales que nunca hayan recibido una vivienda

**Perfil del participante — es literalmente el usuario que ObraBien
fue diseñado para acompañar**: alguien que va a recibir (o recibió
hace poco, idealmente menos de 6 meses) una vivienda nueva por primera
vez, sin experiencia previa en construcción. No reclutar
"profesionales inmobiliarios" ni gente con experiencia técnica —
contaminaría exactamente la señal que necesitamos: ¿alguien sin
conocimiento de construcción entiende y confía en la app sin ayuda?

**Criterios de screening**:
- Nunca hizo una recepción formal de vivienda antes (primera compra o
  primera vez recibiendo una construida por un tercero).
- Usa smartphone con soltura para tareas cotidianas (WhatsApp, apps
  bancarias, fotos) — no necesita ser "tech-savvy", pero descartamos a
  quien no usa apps de forma habitual, porque mediría alfabetización
  digital general, no la experiencia de ObraBien.
- Mezcla deliberada de edad, género y con quién va a hacer la
  recepción (solo, en pareja, con familia) — el copy y el tono de Don
  José Luis se diseñaron para un público amplio, no un segmento
  único.
- Excluir a cualquiera que ya conozca ObraBien o haya participado en
  una sesión anterior de esta misma fase (evita aprendizaje previo
  contaminando los datos).

**Tamaño de muestra**: 5 a 8 participantes por ronda. Es el rango
estándar de investigación de usabilidad (Nielsen) para detectar la
gran mayoría de los problemas reales sin incurrir en el costo de una
muestra grande — con este tamaño de sprint de validación, el objetivo
es encontrar patrones, no significancia estadística.

**Formato de sesión**:
- **Moderada, con protocolo de pensar en voz alta ("think-aloud")**:
  el participante navega mientras verbaliza qué espera que pase, qué
  no entiende, qué le genera duda — es la fuente más rica de
  hallazgos cualitativos y la que mejor detecta fricción de copy o de
  jerarquía visual, que es donde más trabajo puso el producto hasta
  ahora.
- **Remota (videollamada con espejo de pantalla del celular) o
  presencial**, según disponibilidad — remota es más rápida de
  agendar; presencial permite observar mejor el lenguaje corporal y
  es preferible si se puede simular el contexto real (ver siguiente
  punto).
- **Contexto físico ideal**: si es posible, la sesión ocurre con el
  participante moviéndose por un espacio real (su propia casa actual,
  o un showroom/departamento piloto si la constructora colaboradora
  tiene uno disponible) — el recorrido de recintos fue diseñado
  explícitamente para sentirse como "caminar por una casa" (Sprint 3),
  y esa sensación no se valida sentado frente a un escritorio. Si no
  es viable, una sesión de escritorio sigue siendo válida, pero debe
  quedar anotada como limitación al interpretar los resultados de esa
  sesión en particular.
- **Dispositivo propio del participante (BYOD)**, no un dispositivo de
  laboratorio — así la sesión refleja condiciones reales de red,
  tamaño de pantalla y familiaridad con su propio teléfono.
- Consentimiento informado y permiso de grabación explícitos antes de
  empezar; los datos de la cuenta de prueba son ficticios (mismo
  patrón de higiene de datos ya usado en las verificaciones de cada
  sprint — organización desechable, sin datos reales de la vivienda
  del participante).

**Cadencia recomendada**: mínimo 2 rondas. Ronda 1 establece la línea
base sobre el Milestone 1 tal como está hoy. Entre ronda y ronda se
resuelven los hallazgos que califiquen como bugfix o ajuste de UX
(sección 4). Ronda 2 confirma si esos ajustes efectivamente resolvieron
la fricción — sin ronda de confirmación, no hay forma de saber si un
cambio basado en una sola sesión realmente ayudó o solo se sintió
razonable en el escritorio de diseño.

---

## 2. Qué tareas deberían realizar durante la prueba

El guion de tareas cubre el arco completo del Milestone 1, formulado
como **objetivos**, nunca como instrucciones de interfaz — decirle al
participante qué botón tocar invalida la medición (estaríamos
probando si puede seguir instrucciones, no si la app se explica sola).

| # | Tarea (se lee al participante) | Tramo que evalúa |
|---|---|---|
| 1 | "Vas a recibir tu primera vivienda nueva. Crea tu cuenta en ObraBien y prepárate para hacer la recepción." | Registro + Onboarding |
| 2 | "Registra la inspección de tu nueva casa o departamento." | Crear inspección |
| 3 | "Estás a punto de empezar. Continúa cuando te sientas listo." | Bienvenida |
| 4 | "Revisa el primer recinto (por ejemplo, el living) y avanza con lo que encuentres." | Recorrido — camino rápido |
| 5 | "En algún momento del recorrido, vas a encontrar algo que no te convence del todo. Repórtalo como corresponde, con foto." | Elementos — camino de observación |
| 6 | "Sigue recorriendo hasta llegar al final de la vivienda." *(el moderador puede pre-completar algunos recintos intermedios para acortar la sesión — ver nota abajo)* | Recorrido — continuidad |
| 7 | "Revisa cómo quedó tu inspección antes de cerrarla. ¿Cómo la describirías con tus propias palabras?" | Resumen |
| 8 | "Cierra tu inspección." | Finalización |
| 9 | "Encuentra el informe final de tu recepción y compártelo o descárgalo como creas que corresponde." | Informe / acciones posteriores |
| 10 (post-tarea, sin pantalla) | "¿Qué esperarías que pase ahora con lo que reportaste como problema?" | Expectativa de postventa (valida si el mensaje del cierre sembró la expectativa correcta) |

**Nota de duración**: el recorrido completo real tiene ~10-12 recintos
y ~40-60 elementos — inviable de completar en una sesión de una hora
sin fatiga del participante. Igual que en la revisión interna de
Sprint UX-01, el moderador puede pre-completar recintos intermedios
por script (dejando siempre el primero y el último para experiencia
real) para llegar a Resumen/Finalización/Informe dentro de una sesión
de 40-50 minutos, sin sacrificar la validación de las transiciones que
más importan.

**Qué NO se le dice al participante**: nombres de pantallas, nombres de
botones, ni que "Don José Luis" es un personaje con reglas de diseño
—si lo menciona o reacciona a él espontáneamente, es una señal
valiosa; si no lo menciona, también lo es.

---

## 3. Qué métricas y observaciones debemos registrar

**Cuantitativo, por tarea**:
- Éxito de la tarea: completada sin ayuda / completada con ayuda del
  moderador / no completada.
- Tiempo en tarea.
- Número de intentos fallidos o retrocesos antes de lograrlo (ej.
  volver atrás, tocar el elemento equivocado).
- Punto exacto de abandono, si lo hay (pantalla + acción intentada).

**Cuantitativo, al cierre de la sesión**:
- **SUS (System Usability Scale)** — cuestionario estándar de 10
  preguntas, permite comparar rondas entre sí con un número único.
- 3-4 preguntas Likert (1-5) dirigidas a los momentos que más importan
  hoy, atadas directamente a los principios ya definidos en sprints
  anteriores — no genéricas:
  - "Sentí que la app me guiaba durante el recorrido" (Elementos/Don
    José Luis).
  - "Entendí claramente cómo quedó mi vivienda antes de cerrar"
    (Resumen).
  - "Sentí que mi inspección quedó bien registrada al cerrar"
    (Finalización — el principio central del Sprint 5).
  - "Sé qué esperar después de haber cerrado mi inspección" (Informe /
    postventa).
- Pregunta de recomendación (¿se lo recomendarías a alguien que también
  va a recibir una vivienda?, 0-10) — mide confianza general, no
  usabilidad puntual.

**Cualitativo, durante toda la sesión** (registrado en una plantilla
por observación, no como notas libres, para poder agregarlos entre
sesiones):

| Campo | Ejemplo |
|---|---|
| Participante / sesión | P03 |
| Tramo | Finalización |
| Pantalla o momento exacto | Pantalla de cierre, tras firmar |
| Tipo de observación | Fricción / Confusión / Momento positivo / Error |
| Qué pasó | Dudó 4s antes de tocar "Ver informe", dijo en voz alta "¿ya quedó guardado o falta algo?" |
| Cita textual | "¿ya quedó guardado o falta algo?" |
| Severidad estimada (ver sección 4) | Media |

Prestar atención especial a: momentos de duda silenciosa (el
participante se detiene sin verbalizar — pedir "¿qué estás pensando
ahora?"), pedidos de ayuda no solicitados, reacciones emocionales
(alivio, frustración, sorpresa) y si el participante malinterpreta un
ícono, un estado o el rol de Don José Luis. Cada observación se
etiqueta con el tramo correspondiente (mismos 7 tramos del Milestone
1) para poder agregar patrones entre sesiones, igual que se hizo en la
revisión interna del Sprint UX-01 — la diferencia es que esta vez el
dato viene de usuarios reales, no de un recorrido experto.

---

## 4. Qué criterios utilizar para decidir bugfix, ajuste de UX o nuevo sprint

Un árbol de decisión de tres caminos, coherente con el proceso que el
proyecto ya usa (los 4 ajustes menores tras el Sprint UX-01 fueron
exactamente el primer camino; el Sprint 5 completo fue exactamente el
tercero):

### Camino 1 — Bugfix directo
La app no se comporta según su **propio** diseño ya aprobado: un
defecto real, una inconsistencia de copy contra la terminología
vigente, un vacío de contenido puntual. Aislado, no requiere ninguna
decisión de diseño nueva — se corrige y se verifica, sin pasar por las
6 etapas.
**Señal**: 1 sola observación ya es suficiente si es inequívocamente
un defecto (algo que contradice lo que el propio sprint que cerró esa
pantalla dejó documentado).

### Camino 2 — Ajuste de UX (lote de corrección, sin sprint propio)
El participante **logra** completar la tarea, pero con fricción,
duda o un modelo mental equivocado, y la causa raíz es copy,
jerarquía visual o una microinteracción — no falta ninguna capacidad
nueva, no se toca arquitectura ni datos.
**Señal para actuar**: el mismo problema aparece en **2 o más
participantes de una misma ronda** (patrón, no anécdota), **o** una
sola vez pero con severidad Alta/Bloqueante (el participante estuvo a
punto de abandonar o pidió ayuda directa). Se agrupan varios hallazgos
de este tipo en un lote, se presentan juntos para aprobación (mismo
formato que el lote de 4 correcciones tras el Sprint UX-01) y se
implementan sin abrir un sprint formal.

### Camino 3 — Nuevo sprint (proceso completo de 6 etapas)
El hallazgo revela que falta una **capacidad**, no que una capacidad
existente esté mal comunicada — requiere una decisión de diseño real,
toca arquitectura, datos, o un patrón de interacción nuevo. También
aplica si el ajuste del Camino 2 no alcanza a resolver el problema de
fondo detectado.
**Señal**: el hallazgo no se resuelve cambiando texto, color o
tamaño — se resuelve solo agregando o rediseñando algo que hoy no
existe.

### Severidad (cruzada con frecuencia para priorizar, no para decidir el camino)

| Severidad | Definición |
|---|---|
| Bloqueante | El participante no pudo continuar sin ayuda directa del moderador. |
| Alta | Completó la tarea, pero con frustración visible o un error real (ej. reportó algo que no quería reportar). |
| Media | Dudó, retrocedió o verbalizó confusión, pero se recuperó solo. |
| Baja | Comentario o preferencia estética, sin impacto en completar la tarea. |

**Regla explícita**: la severidad nunca decide sola el camino (1/2/3)
— decide si algo se atiende **ahora** o se agenda. Un hallazgo
Bloqueante siempre se atiende antes que uno de baja severidad, sin
importar en qué camino caiga.

### Fuera de alcance de esta fase
Hallazgos reales pero que apuntan al "ecosistema" ya identificado como
la siguiente prioridad (postventa, colaboradores, biblioteca técnica)
en vez del Milestone 1 en sí — se documentan igual, pero no se actúan
dentro de esta fase de validación; alimentan la planificación de lo
que sigue después de la Fase 2.

---

## 5. Cómo documentar y priorizar el feedback obtenido

**Por ronda**: un documento único, `Fase2-Ronda-N-Hallazgos.md`,
siguiendo la misma estructura de 6 preguntas ya usada en la revisión
interna (`Sprint-UX01-Revision-Integral-Flujo.md`) — pero ahora
poblada con evidencia de sesiones reales en vez de un recorrido
experto: qué transmitió cada tramo, fricciones observadas
(agrupadas por patrón, con el conteo de participantes y las citas
textuales), inconsistencias, oportunidades de simplificación, de
acompañamiento y de continuidad. Incluye también los resultados
cuantitativos (SUS, tasas de éxito por tarea, Likert por tramo) para
poder comparar objetivamente contra la ronda siguiente.

**Backlog vivo de hallazgos**: cada observación individual se registra
como una fila con: tramo, severidad, camino asignado (1/2/3/fuera de
alcance), frecuencia (cuántos participantes), estado (nuevo /
aprobado / implementado / verificado en ronda siguiente). Vive junto
al resto de la documentación de `docs/`, referenciado desde
`ROADMAP_OBRABIEN.md` igual que cualquier otro documento oficial del
proyecto — no en una herramienta externa, para mantener una sola
fuente de verdad consistente con el resto del proceso.

**Priorización, en este orden**:
1. Cualquier hallazgo **Bloqueante**, sin importar el camino — se
   resuelve o se escala antes de seguir con la ronda siguiente.
2. Camino 1 (bugfixes) — se corrigen de inmediato, no requieren
   aprobación de diseño, solo confirmación de que es un defecto real.
3. Camino 2 (ajustes de UX) — se agrupan en un lote, se presentan
   juntos para aprobación explícita antes de tocar código (mismo
   patrón ya usado), priorizando primero los de mayor frecuencia y
   severidad dentro del lote.
4. Camino 3 (nuevos sprints) — cada uno se propone individualmente,
   nunca se agrupan entre sí ni se inician automáticamente; cada uno
   requiere la aprobación explícita del usuario para abrir su propio
   proceso de 6 etapas.
5. Hallazgos fuera de alcance — se archivan como insumo para la
   planificación posterior al cierre de la Fase 2, sin acción
   inmediata.

**Cierre de la Fase 2**: se declara validado el Milestone 1 cuando (a)
se completaron al menos 2 rondas, (b) los hallazgos Bloqueantes y de
severidad Alta detectados en la ronda 1 ya no reaparecen en la ronda
2, y (c) el puntaje SUS y las preguntas Likert por tramo se mantienen
estables o mejoran entre rondas. Si una ronda revela hallazgos de
Camino 3 significativos, esos sprints pueden ejecutarse en paralelo a
una ronda de confirmación posterior — no bloquean necesariamente el
cierre de la fase, pero si son múltiples o tocan el mismo tramo,
corresponde evaluar con el usuario si ese tramo necesita su propia
ronda de validación dedicada después de implementarse.
