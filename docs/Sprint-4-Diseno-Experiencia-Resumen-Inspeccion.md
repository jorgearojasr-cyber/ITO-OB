# Sprint 4 — Experiencia del Resumen de Inspección — Etapa 2: Diseño de la experiencia

Rol: Product Designer. Sin código, sin wireframes, sin definición de
componentes ni layout — eso corresponde a la Etapa 3. Insumo: Etapa 1
(`Sprint-4-Analisis-Resumen-Inspeccion.md`) y las dos decisiones de
producto ya resueltas (ver `PRODUCT_DECISIONS.md` #2 y #3):

- La autorización de `/informe` no se toca en este sprint — sigue
  restringida al propietario/gestor, distinta de `/resumen`.
- `InspectionStatus.COMPLETED` es un estado reservado, no usado — el
  diseño se construye únicamente sobre `IN_PROGRESS` y `CLOSED`, los
  dos estados que el código realmente escribe hoy.

---

## 1. Objetivo de la pantalla

Hoy `/resumen` responde, en la práctica, "¿qué observaciones quedaron
pendientes?" — una lista filtrable de incidencias. El objetivo de este
sprint es que responda una pregunta distinta y más amplia: **"¿Cómo
quedó esta vivienda después de la inspección?"**

Esa es una pregunta de **síntesis**, no de inventario. Observaciones,
prioridades y fotografías siguen siendo necesarias, pero pasan a ser
**evidencia que sostiene una lectura general**, no el contenido
principal de la pantalla. El cambio de objetivo no es cosmético: hoy
la jerarquía visual empieza directo en la lista (ver Etapa 1, §6); la
pregunta nueva exige que exista, antes que nada, una lectura agregada
del estado de la vivienda.

Esta síntesis se puede construir enteramente con datos que la app ya
calcula hoy — conteo de recintos/elementos revisados, observaciones
por prioridad, estado de ciclo de vida — sin inventar ningún juicio
subjetivo que no esté respaldado por esos números (coherente con el
principio ya establecido de "ningún ajuste depende de un dato nuevo").

## 2. Qué intenta lograr el usuario al entrar

A diferencia de Inicio (¿puedo seguir donde quedé?) o de Recintos (¿a
dónde sigo?), quien llega a esta pantalla ya terminó de inspeccionar
— su pregunta ya no es de progreso, es de **evaluación**:

- **El propietario/gestor** quiere confirmar, de un vistazo, si la
  vivienda está en condiciones de recibirse o si hay motivos reales
  para exigir correcciones antes de firmar — y solo después de esa
  lectura general, entrar al detalle si algo le preocupa.
- **Un colaborador externo** (constructora) quiere entender qué se le
  está pidiendo corregir, con la misma lectura general como contexto
  de cuán grave es la situación en su conjunto, no observación por
  observación de entrada.
- Ambos comparten la misma necesidad raíz: **una lectura antes que una
  lista** — la lista sigue estando ahí para quien la necesite, pero no
  es lo primero que se procesa.

## 3. Jerarquía de información

1. **Síntesis del estado general** — el nuevo punto de mayor peso.
   Responde directamente la pregunta del encargo, en un lenguaje
   humano ("la vivienda está en buenas condiciones, con N
   observaciones menores" / "hay N observaciones de prioridad alta que
   revisar antes de firmar"), no un dashboard de métricas sueltas.
2. **Evidencia que sostiene esa lectura** — los mismos datos
   agregados que hoy solo existen en `/informe` (`InformeSummary`):
   recintos/elementos revisados, conteo por prioridad. Refuerzan la
   síntesis del punto 1, no compiten con ella.
3. **El detalle de observaciones** — sigue existiendo, con sus
   filtros, pero ahora es la capa de "quiero profundizar", no la
   primera pantalla que se procesa.
4. **Las acciones de cierre e invitación** — se mantienen al final,
   como ya están hoy; no cambian de posición relativa a la lista, solo
   de posición relativa a la nueva síntesis que las antecede.

## 4. Flujo de atención

Con la síntesis al frente, el flujo pasa de ser "leer una lista de
arriba a abajo" a ser: **leer la conclusión → decidir si hace falta
mirar el detalle → actuar (cerrar, invitar, o revisar una observación
puntual)**. Alguien que solo necesita confirmar "todo bien, puedo
firmar" debería poder hacerlo sin desplazarse más allá de la síntesis
y el botón de cierre. Alguien que necesita intervenir sí baja hasta el
detalle, pero llega ahí por elección, no por obligación de scroll.

## 5. Qué cambia y qué no, según las dos decisiones ya resueltas

- **No se toca la autorización.** La síntesis se calcula con los
  mismos datos que hoy ya trae `getObservationsSummaryData` (o su
  fuente equivalente) para el rol correspondiente — un colaborador
  externo ve una síntesis igual de honesta que el propietario, dentro
  de lo que ya puede ver hoy. No se diseña ningún acceso nuevo a
  `/informe`.
- **No se asume `COMPLETED`.** La síntesis se construye sobre
  inspecciones `IN_PROGRESS` (con `/resumen` accesible antes del
  cierre — ya es así hoy, no cambia) y `CLOSED` — sin un estado
  intermedio "revisión completa, aún sin firmar" que hoy no existe en
  el código.
- **La asimetría entre `/resumen` y `/informe` se vuelve más visible,
  no más confusa.** Si `/resumen` ahora ofrece una lectura de síntesis
  parecida a la de `InformeSummary`, hay que evitar que un colaborador
  externo sienta que ya "vio el informe" — la síntesis de `/resumen`
  es un resumen para decidir qué hacer ahora, no un sustituto del
  documento final restringido.

## 6. Rol de Don José Luis — evaluación pendiente para la Etapa 3

No se resuelve en esta etapa — se posterga explícitamente hasta la
Especificación Visual (Etapa 3). Criterio de decisión, ya confirmado
por el usuario: el personaje se incorpora **solo si mejora realmente
la comprensión y la calma del usuario**, nunca por obligación de
aparecer en todas las pantallas del producto. Candidato a evaluar en
la Etapa 3, con el wireframe concreto delante: la síntesis misma,
leída en voz de Don José Luis en vez de como un bloque de texto sin
voz — parecido en espíritu a la Bienvenida a una inspección
(Sprint 2b). A diferencia de Recintos (Sprint 3), donde se evaluó y se
descartó por no haber un momento propio, acá hay al menos un candidato
real — pero la decisión final se toma en la Etapa 3, no antes.

## 7. Principios de diseño (Sprint 4)

1. **Síntesis antes que inventario.** La primera cosa que se procesa
   en la pantalla responde "¿cómo quedó la vivienda?", no "¿cuántas
   observaciones hay?".
2. **La evidencia sostiene la síntesis, no la reemplaza.**
   Observaciones, prioridades y fotos siguen presentes y accesibles,
   pero subordinadas a la lectura general, nunca compitiendo con ella
   por el primer vistazo.
3. **La síntesis se calcula, nunca se redacta a mano ni se inventa.**
   Se deriva de datos ya existentes (conteos por prioridad, progreso)
   — ningún juicio de "buena/mala condición" aparece sin un número
   real detrás.
4. **No se toca la autorización existente.** El rediseño trabaja
   sobre lo que cada rol ya puede ver hoy — no amplía ni reduce quién
   ve qué.
5. **No se diseña para `COMPLETED`.** Solo `IN_PROGRESS` y `CLOSED`
   son estados reales a considerar.
6. **La acción de cierre sigue siendo la de mayor peso entre las
   acciones** (ya lo es hoy, con `--ink-900` sólido) — la síntesis no
   le quita protagonismo al botón de cerrar, lo antecede.
7. **Ningún dato nuevo.** Igual que en los sprints anteriores, toda
   la síntesis se construye con lo que la query ya trae — si hiciera
   falta un cálculo nuevo, se evalúa explícitamente en la Etapa 3, no
   se asume.
8. **El Resumen nunca sorprende.** La síntesis debe sentirse como una
   consecuencia natural de todo lo que el usuario ya revisó durante la
   inspección — nunca una conclusión que aparezca de la nada o que
   contradiga lo que el usuario vio recinto por recinto, elemento por
   elemento. Si la síntesis dijera algo que el usuario no pueda
   reconocer de su propio recorrido, falló.
9. **El Resumen nunca reemplaza al Informe.** Su objetivo es preparar
   al usuario para cerrar la inspección y darle una comprensión clara
   del estado general — el Informe sigue siendo, sin ambigüedad, el
   documento oficial de cierre. La síntesis de `/resumen` es una
   lectura de apoyo para decidir, no una versión alternativa o
   reducida del documento final.

## 8. Fuera de alcance (confirmado para este sprint)

- Cualquier cambio a `inspectionAccessWhere`, a la query de
  `/informe`, o a quién puede ver qué.
- Cualquier flujo o UI que dependa de `InspectionStatus.COMPLETED`.
- Rediseño de `/informe` en sí (portada, firmas, PDF) — el foco de
  este sprint es `/resumen` y el tramo de cierre, no el documento
  final.
- Los hallazgos menores de la Etapa 1 no priorizados explícitamente
  acá (terminología "cerrada" vs. "completada", umbral duplicado de
  generación lenta, `EmptyState` no reutilizado, etc.) — se retoman
  como consideraciones de implementación si encajan de forma natural,
  sin dirigir el diseño de la síntesis.
