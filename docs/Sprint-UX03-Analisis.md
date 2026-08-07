# Sprint UX-03 — Sistema de Terminaciones Exteriores

## Etapa 1 — Análisis

Este documento responde una sola pregunta: **cómo debería modelarse una
fachada dentro de ObraBien Inspecciones para soportar cualquier
terminación exterior, hoy y a futuro, sin rehacer la arquitectura**.

No es una implementación. No agrega Marmolina. No toca código. Es la
Etapa 1 de un sprint independiente (UX-03), abierto explícitamente
antes de retomar Revestimientos Exteriores como prioridad P2b de
UX-02 — este análisis reemplaza y profundiza esa prioridad, no la
duplica.

---

## 1. Qué existe hoy (hechos verificados en el código, no supuestos)

Antes de proponer nada, esto es lo que ya está construido y que
cualquier diseño nuevo tiene que respetar o reutilizar:

1. **La elección de material vive en `RoomInstance`, no en el
   elemento.** `floorMaterial` y `wallCoveringMaterial` son columnas
   nullable de `RoomInstance`. Se responden una sola vez, sin UI para
   cambiarlas después (`setRoomMaterial`, comentario explícito en
   `actions.ts:489`).
2. **La pregunta de material no crea un elemento nuevo — reasigna uno
   existente.** Al crear la inspección, solo se instancia el
   `ElementTemplate` genérico de cada slot (ej. "Piso"). Los
   `ElementTemplate` marcados `isMaterialVariant: true` (ej.
   "piso-ceramica") nunca se instancian directamente — quedan
   "dormidos" en el catálogo. Cuando el usuario responde la pregunta,
   `setRoomMaterial` **reasigna** `ElementInstance.elementTemplateId`
   al variante correspondiente. Esto es seguro porque ocurre antes de
   que exista ninguna `Observation` para ese elemento — la pregunta
   bloquea el checklist hasta que se responde.
3. **`MaterialSlot` es un enum cerrado de 2 valores** (`FLOOR`,
   `WALL`). Tanto `RoomMaterialQuestion.tsx` (el título de la
   pregunta) como `get-element-instance-data.ts` (qué campo de
   `RoomInstance` mirar) están **hardcodeados** a esos dos casos vía
   `if`/ternario, no vía una tabla de configuración. Agregar un tercer
   slot no es aditivo tal como está escrito hoy.
4. **"Fachada" ya existe, pero es un elemento plano sin variantes.**
   Vive en el `RoomTemplate` "Exterior" (que sí es un `RoomInstance`
   real, siempre presente, no condicional a ningún feature). Su
   checklist actual es genérico ("¿la pintura o revestimiento está
   uniforme...") y su única ficha de biblioteca es `pintura-exterior`
   — no tiene `materialSlot` ni `isMaterialVariant`. Es decir: hoy
   **toda** fachada, sea cual sea su terminación real, ve el mismo
   checklist pensado para pintura.
5. **Ya se decidió Opción B para el catálogo** (`Sprint-UX02-Plan-Implementacion.md`,
   "Decisiones confirmadas", punto 1): tabla nueva, no enum — agregar
   un material nuevo debe ser una fila, no una migración. Esta
   decisión sigue vigente y este análisis la da por tomada; lo que
   falta es el resto del diseño alrededor de ella.
6. **Biblioteca y tolerancias hoy solo se resuelven por dos llaves**:
   slug de `LibraryArticle` (usado para separar pintura interior de
   exterior, caso especial) o slug de `LibraryCategory` (todo lo
   demás). No existe ninguna noción de "tolerancia por material" —
   ambas tablas (`good-bad-examples.ts`,
   `tolerances-by-category.ts`) son planas.
7. **El Manual de Tolerancias CDT (tal como está transcrito en
   `tolerances-manual.ts`) solo cubre dos fichas relevantes a
   fachada**: Ficha 23 "Pinturas" (interior/exterior) y Ficha 8
   "Estucos" (verticalidad ±5 mm por piso, planeidad ±5 mm con
   regla). **No existe ficha para Marmolina, Graniplast, revestimiento
   texturado, fibrocemento, SmartPanel, piedra, enchapes, madera,
   hormigón visto ni EIFS.** Esto no es un vacío del análisis — es un
   vacío real del manual de origen, y la arquitectura tiene que
   convivir con eso (ver `lacksNormativeBacking`, ya usado hoy para
   gas/piscina con el mismo problema).
8. **`Photo.kind` y `aiMetadata`** (en `Photo` y `Observation`) son
   los únicos puntos de extensión ya preparados para el futuro — hoy
   sin ningún uso relacionado a material. `PhotoKind` distingue etapa
   del flujo (evidencia vs. reparación post-venta), no tipo de foto
   requerida por material.

---

## 2. Idea central del análisis

La pregunta "¿qué terminación tiene la fachada?" **no es una lista
plana de 12 opciones intercambiables**. Construcción-mente, se agrupan
en familias con comportamiento físico distinto, y esas familias son
las que realmente determinan qué preguntas comparten:

| Familia | Materiales de la lista | Naturaleza |
|---|---|---|
| **A. Terminaciones húmedas sobre estuco/mortero** | Pintura lisa, Marmolina, Graniplast, Revestimiento texturado | Se aplican sobre la misma base de estuco/mortero. Comparten los defectos de la base (verticalidad, planeidad, grietas de retracción) y se diferencian solo en el defecto propio del acabado (uniformidad de textura/color/grano). |
| **B. Placas o paneles fijados mecánicamente** | Fibrocemento, SmartPanel | Se atornillan/clavan sobre una estructura (metalcón o similar). Los defectos característicos son de **junta y fijación**, no de superficie continua. |
| **C. Mampostería / piedra aplicada** | Piedra, Enchapes | Piezas individuales adheridas o ancladas. Defectos característicos: nivelación entre piezas, adherencia, sellado de juntas — igual en espíritu a cómo hoy se revisan cerámicas/porcelanatos interiores. |
| **D. Madera** | Madera (revestimiento tipo siding/machihembrado) | Piezas lineales fijadas mecánicamente, pero con un problema adicional que ningún otro tiene: protección/tratamiento contra humedad y UV. |
| **E. Hormigón visto** | Hormigón visto | No es un "revestimiento aplicado" — es la terminación de la estructura misma. No hay capa que revisar, se revisa la calidad del vaciado (burbujas, líneas de moldaje, fisuras). |
| **F. Sistema compuesto** | EIFS (Exterior Insulation and Finish System) | Es un sistema de varias capas (aislación + malla + terminación), no un material único — sus defectos son a menudo de **sistema** (delaminación, fisuración en encuentros) más que de acabado superficial. |
| **Agregados por relevancia local** | Estuco (rústico/liso, sin pintura encima), Ladrillo a la vista | Muy comunes en Chile como terminación final por sí solos, no solo como base. Los incluyo porque si el catálogo no los contempla desde el día uno, van a aparecer como "Otro" con mucha frecuencia. |

Esta tabla es la base de todo lo que sigue: el diseño de arquitectura
de la sección 4 está construido para que estas familias compartan
estructura de datos, no para que cada material sea una isla.

---

## 3. Análisis por material

Formato por cada uno: qué comparte con otros, qué le es exclusivo,
qué ejemplos visuales necesita, qué fotos pedir durante la inspección,
y qué observaciones técnicas son plausibles.

### 3.1 Pintura lisa (familia A)

- **Comparte**: con toda la familia A — verticalidad/planeidad de la
  base, ausencia de fisuras de retracción del estuco. Con el resto de
  fachada — sellos en encuentros con aleros/vanos.
- **Exclusivo**: uniformidad de color y textura al aplicar rodillo/spray
  (ya cubierto hoy por Ficha 23 CDT: imperfecciones no detectables a
  5 m).
- **Ejemplos visuales**: superficie pareja a 5 m vs. mancha/escurrimiento
  visible a 5 m (esto ya existe hoy, es el `pintura-exterior` actual).
- **Fotos a pedir**: 1 foto general a distancia (contexto, ~5 m) + 1
  foto de detalle en cada esquina/vano si hay observación.
- **Observaciones típicas**: manchas, escurrimientos, marcas de
  rodillo, diferencia de tono entre paños (repintado parcial).

### 3.2 Marmolina (familia A)

- **Comparte**: base de estuco con Pintura/Graniplast/Texturado.
- **Exclusivo**: uniformidad del **grano** (tamaño/distribución de la
  árida), no solo del color — un defecto que no existe en pintura lisa.
  Adherencia del recubrimiento (delaminación/desprendimiento en
  placas), que sí es comparable con Graniplast/Texturado pero no con
  pintura.
- **Ejemplos visuales**: grano parejo en toda la superficie vs. zonas
  con grano más fino/grueso o "parches" visibles de una segunda mano.
- **Fotos a pedir**: igual que pintura (general + detalle) más una
  foto de acercamiento (~30 cm) a la textura, porque el defecto de
  grano no se ve a 5 m.
- **Observaciones típicas**: parche de textura distinta, desprendimiento
  localizado, fisuras reflejadas del estuco base.

### 3.3 Graniplast (familia A)

- **Comparte**: exactamente el mismo perfil que Marmolina (son primos
  técnicos — ambos son recubrimientos texturados a la plancha sobre
  estuco). Puede tratarse con el mismo set de preguntas que Marmolina
  sin pérdida de precisión.
- **Exclusivo**: prácticamente nada frente a Marmolina — la diferencia
  es de marca/composición, no de defecto observable en obra.
- **Ejemplos visuales**: igual a Marmolina.
- **Fotos a pedir**: igual a Marmolina.
- **Observaciones típicas**: igual a Marmolina.
- **Nota de diseño**: este es el primer caso concreto de por qué
  conviene un checklist "por familia" y no "por marca" — Marmolina y
  Graniplast no deberían duplicar 6 preguntas idénticas en el catálogo.

### 3.4 Revestimiento texturado (familia A, genérico)

- **Comparte**: todo lo de Marmolina/Graniplast — de hecho es el
  nombre genérico de esa familia cuando el usuario no sabe/no quiere
  especificar la marca.
- **Exclusivo**: ninguno adicional — funcionalmente es una opción
  "genérica" dentro de la familia A, no un cuarto perfil de defectos.
- **Ejemplos visuales / fotos / observaciones**: idénticos a Marmolina.
- **Nota de diseño**: candidato fuerte a ser la opción por defecto de
  la familia A cuando el usuario elige "textura" sin poder nombrar la
  marca comercial exacta — evita que el catálogo dependa de que la
  persona conozca el nombre técnico.

### 3.5 Fibrocemento (familia B)

- **Comparte**: con SmartPanel — ambos son placas atornilladas con
  juntas visibles y necesitan verificación de fijación.
- **Exclusivo**: fibrocemento es friable — se astilla en los bordes de
  corte si la fijación fue mal ejecutada; eso no aplica igual a
  SmartPanel (más flexible/menos quebradizo).
- **Ejemplos visuales**: junta pareja y sellada vs. junta abierta o
  placa astillada en el borde. Tornillo enrasado vs. tornillo sobresaliente
  o hundido (rompe la placa).
- **Fotos a pedir**: foto general del paño + foto de detalle de al
  menos 2 juntas horizontales y 1 vertical + foto de las cabezas de
  fijación visibles.
- **Observaciones típicas**: junta sin sellar, placa astillada,
  fijación visible/mal enrasada, desalineación entre placas.

### 3.6 SmartPanel (familia B)

- **Comparte**: con Fibrocemento — juntas, fijación, alineación entre
  placas.
- **Exclusivo**: acabado de fábrica (textura madera) puede rayarse en
  el corte/manipulación — se revisa uniformidad de la textura impresa,
  no de una mano de pintura aplicada en obra.
- **Ejemplos visuales**: igual a fibrocemento en juntas/fijación, más
  un par adicional de "textura impresa uniforme vs. rayada/dañada en
  transporte-instalación".
- **Fotos a pedir**: igual a fibrocemento.
- **Observaciones típicas**: igual a fibrocemento + rayas de manipulación.

### 3.7 Piedra (familia C)

- **Comparte**: con Enchapes — nivelación entre piezas, adherencia,
  sellado de juntas (mismo espíritu que cerámicas interiores, que ya
  tiene ficha CDT de adherencia por sonido hueco).
- **Exclusivo**: piezas de piedra natural varían en grosor — la
  tolerancia de planeidad del conjunto es más laxa a propósito (no se
  puede pedir la misma planeidad que un porcelanato calibrado).
- **Ejemplos visuales**: piezas a nivel con junta pareja vs. pieza
  sobresaliente o junta irregular; sonido lleno vs. hueco al golpear
  suave (igual mecánica que cerámicas interiores).
- **Fotos a pedir**: foto general del paño + foto de detalle en
  esquinas (donde se nota más el desnivel) + registro de audio no
  aplica, pero sí anotar el resultado del golpeteo como observación.
- **Observaciones típicas**: pieza suelta/hueca, junta irregular,
  desnivel entre piezas, manchas de eflorescencia (salitre).

### 3.8 Enchapes (familia C)

- **Comparte**: prácticamente idéntico a Piedra — mismo perfil de
  defectos, distinta materialidad (cerámico/ladrillo laminado en vez
  de piedra natural).
- **Exclusivo**: al ser pieza calibrada de fábrica (no natural), sí es
  razonable exigir mayor uniformidad de junta que en piedra.
- **Ejemplos visuales / fotos / observaciones**: igual a Piedra, con
  tolerancia de junta más estricta.

### 3.9 Madera (familia D)

- **Comparte**: fijación mecánica y juntas con Fibrocemento/SmartPanel.
- **Exclusivo**: es el único material de la lista con un requisito de
  **mantención preventiva** propio del material — protección
  (barniz/aceite/tratamiento) contra humedad y UV. Un defecto real acá
  no es solo "se ve mal", es "va a fallar antes si no está protegida".
- **Ejemplos visuales**: veta uniforme y sellada vs. madera sin
  protección visible (opaca, grisácea) o con humedad ya penetrando en
  las uniones.
- **Fotos a pedir**: foto general + foto de detalle en las uniones
  horizontales/verticales (donde entra el agua primero) + foto de
  cualquier zona sin protección aplicada.
- **Observaciones típicas**: falta de sellador/protección, humedad
  visible en unión, pieza alabeada, separación entre tablas.

### 3.10 Hormigón visto (familia E)

- **Comparte**: verticalidad general con la familia A (es la misma
  exigencia de "el muro está a plomo"), pero **no** comparte nada de
  "acabado aplicado" porque no hay capa que revisar.
- **Exclusivo**: defectos propios del vaciado — nidos de piedra
  (hormigón segregado), marcas de moldaje mal desmoldado, fisuras de
  retracción del hormigón mismo (distintas de las fisuras de un
  estuco, porque acá indican algo sobre la estructura, no solo sobre
  el acabado).
- **Ejemplos visuales**: superficie lisa y uniforme (buen desmoldante)
  vs. nido de piedra o marca de junta de moldaje mal resuelta.
- **Fotos a pedir**: foto general + foto de detalle de cualquier fisura
  (con una referencia de escala, ej. una moneda o el dedo al lado, para
  poder estimar el ancho) + foto de juntas de hormigonado.
- **Observaciones típicas**: nido de piedra, fisura (con foto de
  ancho aproximado), desnivel entre paños de hormigonado, mancha de
  óxido (armadura muy superficial).

### 3.11 EIFS (familia F)

- **Comparte**: superficialmente se ve como la familia A (textura
  aplicada), pero la causa raíz de sus defectos es de sistema, no de
  acabado — por eso lo separo.
- **Exclusivo**: delaminación de capas (el acabado se separa de la
  aislación de base), fisuración concentrada en las esquinas de vanos
  (punto típico de falla de EIFS por falta de refuerzo de malla),
  sellado en encuentros con otros materiales (donde el sistema
  termina y empieza otro).
- **Ejemplos visuales**: esquina de ventana con malla de refuerzo bien
  resuelta (sin fisura diagonal) vs. fisura diagonal característica en
  la esquina — este es el patrón de falla más reconocible del sistema
  y vale la pena como ejemplo dedicado.
- **Fotos a pedir**: foto general + foto obligatoria de las 4 esquinas
  de cada vano (ventana/puerta) del paño, por ser el punto de falla
  típico + foto de cualquier zona con sonido hueco al golpe suave
  (indicio de delaminación).
- **Observaciones típicas**: fisura diagonal en esquina de vano,
  delaminación (sonido hueco), sello faltante en encuentro con otro
  material, impacto/perforación del sistema (es más blando que un
  estuco tradicional).

### 3.12 Estuco (rústico o liso, sin terminación pintada encima) — agregado

- **Comparte**: es literalmente la base de toda la familia A — cuando
  se deja como terminación final (sin pintura/textura encima), hereda
  exactamente la Ficha 23 CDT (verticalidad ±5 mm por piso, planeidad
  ±5 mm con regla), que ya está transcrita en el manual.
- **Exclusivo**: ninguno nuevo — es el único material de la lista que
  ya tiene respaldo normativo completo en el manual actual sin
  necesidad de contenido nuevo.
- **Ejemplos visuales**: superficie a plomo y plana con regla vs.
  desviación visible al aplicar la regla.
- **Fotos a pedir**: foto general + foto del instrumento (regla/nivel)
  apoyado en el muro si hay observación, igual que otras partidas que
  ya se miden con regla.
- **Observaciones típicas**: desplome, ondulación, fisura de
  retracción.
- **Por qué lo agrego**: si no está como opción propia, todo estuco
  visto terminaría cayendo en "Otro" (sin checklist propio) pese a ser
  uno de los pocos materiales con ficha CDT lista para usar.

### 3.13 Ladrillo a la vista — agregado

- **Comparte**: con Piedra/Enchapes — nivelación, juntas.
- **Exclusivo**: la junta de mortero (pega) entre ladrillos es en sí
  misma la partida a revisar (relleno completo, sin oquedades), algo
  que no aplica igual a piedra/enchapes adheridos con pegamento delgado.
- **Ejemplos visuales**: junta de pega llena y pareja vs. junta con
  oquedades o mortero derramado sobre el ladrillo (mancha).
- **Fotos a pedir**: foto general + foto de detalle de 2-3 juntas
  horizontales y verticales.
- **Observaciones típicas**: junta incompleta, mancha de mortero sobre
  el ladrillo, ladrillo trizado, eflorescencia (salitre).
- **Por qué lo agrego**: terminación final muy común en Chile
  (no solo enchape delgado sino albañilería reforzada a la vista);
  mismo argumento que Estuco — sin opción propia cae en "Otro".

---

## 4. Patrones transversales que debe capturar la arquitectura

De los 13 análisis anteriores, tres patrones se repiten y son los que
tienen que quedar resueltos en el modelo de datos, no parchados
material por material:

1. **Preguntas de "base" vs. preguntas de "acabado".** Familia A
   comparte 100% las preguntas de base (verticalidad/planeidad/fisuras
   del estuco) y solo difiere en 1-2 preguntas de acabado (uniformidad
   de color vs. uniformidad de grano). Si el catálogo obliga a
   duplicar el checklist completo por cada material de la familia A,
   cualquier corrección futura a una pregunta de base hay que
   replicarla a mano en 4+ lugares — exactamente el tipo de deuda que
   el proyecto ya evita en otros lados (`ActionMenu`, algoritmo único
   de siguiente pendiente, etc.).
2. **Fotos "de contexto" vs. "de detalle" son un patrón, no una
   excepción.** Todas las familias piden al menos una foto general a
   distancia y al menos una foto de acercamiento a un punto crítico
   específico de esa familia (junta, esquina de vano, unión). Hoy el
   checklist no tiene ningún campo que exprese "esta pregunta necesita
   una foto de cierto tipo" — es una guía en `helpText` en texto
   libre, nada estructurado.
3. **Respaldo normativo es la excepción, no la norma.** De 13
   materiales, solo 2 (Pintura, Estuco) tienen ficha CDT completa. El
   resto necesita el mismo tratamiento que gas/piscina hoy
   (`lacksNormativeBacking`), no un vacío silencioso.

---

## 5. Propuesta de arquitectura (para tu revisión — nada implementado)

Construida sobre la Opción B ya aprobada, resolviendo los tres puntos
pendientes que el propio plan de UX-02 dejó abiertos (`MaterialSlot`
nuevo, dónde vive la respuesta, copy no hardcodeada) más los tres
patrones transversales de la sección 4.

### 5.1 Slot y dónde vive la respuesta

- Nuevo valor de enum `MaterialSlot.FACADE`.
- La respuesta **sí puede vivir en `RoomInstance`**, igual que
  `floorMaterial`/`wallCoveringMaterial` — a diferencia de lo que
  planteaba el análisis de UX-02, "Exterior" **ya es** un
  `RoomInstance` real y siempre presente (no condicional), así que no
  hace falta un modelo distinto para "dónde vive la elección". Se
  agrega `facadeFinishOptionId` (nullable, FK al catálogo nuevo) a
  `RoomInstance`, junto a los otros dos.
- `RoomMaterialQuestion.tsx` deja de tener el título hardcodeado por
  `if (slot === "FLOOR")`/`else` y pasa a resolverlo desde una tabla
  de configuración por slot (3 entradas hoy, extensible sin tocar el
  componente si aparece un cuarto slot mañana).

### 5.2 Catálogo (Opción B, ya aprobada)

Tabla nueva, ej. `FacadeFinishOption`:

```
id            String  @id
slug          String  @unique       // "marmolina", "graniplast"...
label         String                // "Marmolina"
familySlug    String                // "humeda-sobre-estuco", "placa-atornillada"...
order         Int     @default(0)
active        Boolean @default(true)
```

Agregar un material nuevo = una fila. El campo `familySlug` es la
pieza que faltaba en el plan original de UX-02: **no es solo el
catálogo de materiales, es el catálogo con su familia de
comportamiento adjunta**, porque de ahí sale qué checklist comparte.

### 5.3 Checklist: compartido por familia + exclusivo por material

Esto es el cambio de diseño más importante frente al patrón actual de
`isMaterialVariant` (que asume 1 checklist completo por variante,
sin compartir nada). Propongo dos niveles:

- **`ElementTemplate` por familia** (6-7 filas, no 13): una por cada
  fila de la tabla de la sección 2 (húmeda-sobre-estuco,
  placa-atornillada, mampostería-piedra, madera, hormigón-visto,
  EIFS), cada una con su propio `checklistItemTemplates` — esto
  reutiliza tal cual el mecanismo `isMaterialVariant` que ya existe,
  sin inventar nada nuevo a nivel de motor.
- **El material elegido (`FacadeFinishOption`) selecciona la familia**,
  y dentro del checklist de esa familia, 1-2 preguntas quedan
  redactadas de forma paramétrica cuando hace falta diferenciar (ej.
  "¿La [textura/color] del acabado es uniforme en toda la superficie?"
  en vez de duplicar la pregunta completa por Pintura vs. Marmolina).
  Esto evita la explosión de 13 `ElementTemplate` casi idénticos y
  concentra el mantenimiento en 6-7 checklists reales.
- `ElementInstance` sigue reasignándose igual que hoy
  (`elementTemplateId` apunta al `ElementTemplate` de la familia
  correspondiente) — cero cambios al motor de reasignación de
  `setRoomMaterial`, solo cambia a qué apunta el mapeo material→template.

### 5.4 Biblioteca técnica y ejemplos Bien/Mal

- Un `LibraryArticle` por **familia** (no por material), reutilizando
  el patrón ya existente de `goodBadExamplesByArticleSlug` (el mismo
  mecanismo que ya separa pintura interior/exterior). Materiales
  "primos" como Marmolina/Graniplast comparten artículo; EIFS y
  Hormigón Visto, al ser familias con defectos propios, tienen el suyo.
- Dentro de cada artículo, el body puede mencionar los materiales
  específicos que cubre (ej. "aplica a Marmolina, Graniplast y
  Revestimiento texturado"), sin necesidad de un artículo por material.

### 5.5 Tolerancias y respaldo normativo

- Pintura exterior y Estuco: se mantienen con respaldo CDT completo
  (fichas 23 y 8 ya transcritas).
- El resto (10 de 13): se marcan de la misma forma que gas/piscina
  hoy — `lacksNormativeBacking: true` a nivel de `ElementTemplate` de
  familia, con el mismo aviso visual ya construido
  (`NormativeScopeNotice`). No hace falta inventar un mecanismo nuevo,
  solo aplicar el que ya existe a un caso más.

### 5.6 Fotos por punto crítico (extensión futura, no de este sprint)

- El patrón "foto de contexto + foto de detalle en un punto
  específico" que se repite en las 13 fichas **no** requiere cambios
  de schema para implementarse ahora — se puede resolver con
  `helpText` bien redactado por pregunta, igual que hoy.
- Si más adelante se quiere una guía visual estructurada por tipo de
  foto (ej. mostrar un ícono de "esquina de vano" antes de esa
  pregunta específica para EIFS), el campo `Photo.aiMetadata`/
  `Observation.aiMetadata` ya existen como extensión sin migración —
  no es necesario decidirlo ahora, solo dejar constancia de que el
  punto de extensión ya existe cuando llegue su turno (posible
  candidato natural para la Prioridad 6 / P3 "Bien/Mal por pregunta"
  de UX-02, que ya está marcada como su propia Etapa 1→2 futura).

### 5.7 Qué NO resuelve esta propuesta (a propósito)

- No decide todavía los slugs/labels finales de cada
  `FacadeFinishOption` ni el copy exacto de cada pregunta — eso es
  Etapa 2 (diseño de experiencia + contenido), no Etapa 1.
- No decide si "Otro" (sin familia) debe seguir existiendo como
  variante genérica (recomendado que sí, por continuidad con el
  patrón de Piso/Muros) — lo dejo como pregunta abierta abajo.

---

## 6. Preguntas abiertas antes de Etapa 2

1. ¿Apruebas la agrupación en familias de la sección 2, o hay algún
   material de la lista que consideras que debería tener checklist
   propio en vez de compartir familia (ej. ¿Graniplast realmente igual
   a Marmolina, o prefieres distinguirlos)?
2. ¿Apruebas agregar Estuco y Ladrillo a la vista al catálogo desde el
   día uno (no estaban en tu lista original), o prefieres dejarlos
   fuera de este sprint?
3. ¿Apruebas el enfoque de "`ElementTemplate` por familia +
   `LibraryArticle` por familia" en vez de "uno por cada uno de los 13
   materiales"? Es la decisión de mayor impacto de este documento —
   reduce mantenimiento pero significa que dos materiales de la misma
   familia comparten literalmente las mismas preguntas salvo 1-2
   palabras paramétricas.
4. ¿"Otro" sigue existiendo como opción de escape sin checklist
   específico, igual que hoy en Piso/Muros?

No implementé nada de esto. Queda a la espera de tu revisión antes de
pasar a la Etapa 2 (diseño de experiencia: copy exacto, wireframe de
la pregunta de fachada, contenido final por familia).
