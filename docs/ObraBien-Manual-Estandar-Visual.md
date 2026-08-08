# ObraBien — Manual Oficial del Estándar Visual

## Alcance de este documento

Documento de referencia, no de implementación. **No se generó ninguna
imagen, no se modificó código, arquitectura, Biblioteca Técnica, UX ni
el Sistema Maestro de Producción Visual.** Este manual es la norma que
va a gobernar cada imagen que se produzca a partir de ahora para la
Biblioteca Visual de ObraBien — el documento que cualquier persona (o
prompt de generación por IA) debe poder seguir para que la imagen
número 1 y la imagen número 400 se vean como si vinieran del mismo
lugar.

Se apoya en tres decisiones ya tomadas y congeladas en sesiones
anteriores, que este manual no reabre:
- La unidad de producción es la **toma** dentro de un **escenario**
  (`docs/ObraBien-Plan-Produccion-Biblioteca-Visual.md`,
  `src/lib/visual-production/`).
- Las imágenes se generan con criterio **fotográfico hiperrealista**,
  no ilustrativo (ya establecido al procesar el Manual de Tolerancias
  CDT, `docs/ObraBien-Biblioteca-Visual-Manual-Tolerancias.md`).
- El segmento objetivo de ObraBien es la vivienda nueva de
  **2.000–3.500 UF** (`CLAUDE.md`).

---

# 1. Vivienda maestra

Toda la Biblioteca Visual se fotografía sobre **dos viviendas de
referencia fijas**, nunca sobre viviendas distintas para el mismo
punto de inspección — es lo que permite que una persona reconozca
"esta es la casa de ObraBien" con solo mirar la miniatura.

## 1.1 Casa maestra

- Casa aislada o pareada de dos pisos, entre 90 y 130 m² construidos,
  loteo de condominio cerrado tipo medio (parcelaciones o condominios
  de casas de la Región Metropolitana o regiones, no periferia rural
  ni segmento premium con arquitectura de autor).
- Terreno propio con antejardín, patio trasero, acceso vehicular con
  portón — cubre las features condicionales reales del catálogo
  (`hasFrontYard`, `hasBackYard`, `hasVehicleGate`, etc.).
- Fachada principal orientada de forma que reciba luz rasante lateral
  al atardecer sin obstáculos (edificios, árboles grandes) — condición
  ya identificada como necesaria en el plan de producción de Fachadas.

## 1.2 Departamento maestro

- Departamento de 2 a 3 dormitorios, 55 a 80 m², en edificio de altura
  media (6 a 15 pisos), terminaciones estándar de entrega (no
  showroom decorado, no piso demostrativo con mobiliario de diseño).
- Logia, baño(s) con receptáculo de ducha (no tina, es lo más común en
  este segmento), cocina americana o cerrada según la unidad.

## 1.3 Regla de uso

- **Elementos comunes a casa y departamento** (pisos, muros, puertas,
  ventanas, griferías, artefactos, instalaciones eléctricas) se
  fotografían en **cualquiera de las dos**, la que tenga mejor
  condición de luz/acceso para esa toma específica — pero una vez
  elegida para un Escenario, ese Escenario no cambia de vivienda nunca
  (ver Sección 9).
- **Elementos exclusivos de casa** (fachada, cubierta, canaletas,
  patio, reja/portón, escalera si es de dos pisos) se fotografían solo
  en la casa maestra.
- **Elementos exclusivos de departamento** (ninguno hoy en el
  catálogo es exclusivo de depto — el catálogo es mayoritariamente
  compartido) no aplica por ahora.

---

# 2. Estilo arquitectónico

Contemporáneo residencial chileno de entrega estándar — **no**
minimalismo de autor, **no** estilo americano/californiano, **no**
industrial expuesto. Referencias correctas: inmobiliarias masivas
chilenas (Fundamenta, Paz Corp segmento medio, Socovesa, Aconcagua),
no revistas de arquitectura.

Elementos que definen el estilo:
- Fachada con líneas rectas, cubierta a dos aguas de baja pendiente o
  losa plana con antepecho — nunca techos muy inclinados tipo chalet.
- Terminación exterior húmeda sobre estuco (pintura lisa, marmolina,
  graniplast, textura) como material dominante, con acentos puntuales
  de otro material (piedra o siding) solo en un paño, nunca en toda la
  fachada — así se ve en el segmento real.
- Interior con muros pintados lisos color claro, pisos de porcelanato
  o piso flotante según recinto, guardapolvos y cornisas simples sin
  molduras decorativas complejas.
- Sin mobiliario de autor, sin plantas decorativas de utilería, sin
  arte en las paredes — la vivienda se fotografía **recién entregada**,
  no habitada ni decorada. Esto es intencional: así es exactamente como
  la ve un ITO en la recepción real.

---

# 3. Segmento objetivo

**2.000–3.500 UF** (segmento medio, `CLAUDE.md`) — cada decisión de
este manual se valida contra esta pregunta: *"¿esto es lo que vería un
comprador real de este segmento en Chile al recibir su vivienda?"* No
segmento premium (terminaciones de mármol, muebles europeos, alturas
libres grandes) ni segmento social/vivienda económica (terminaciones
mínimas, sin condominio cerrado). Esta franja es la que determina
cada material, color y nivel de terminación de las secciones
anteriores.

---

# 4. Cámara

Especificación técnica única para todas las tomas — se usa igual en
producción fotográfica real y como parámetro fijo en cualquier prompt
de generación por IA:

- **Distancia focal equivalente**: 28–35 mm (gran angular moderado,
  el rango de un smartphone actual gama media/alta) para tomas
  generales y medias; 50 mm equivalente para primeros planos, para
  evitar la distorsión de un gran angular a corta distancia.
- **Altura de cámara**: a la altura de los ojos de una persona de pie
  (~1,55–1,65 m) para tomas generales y medias. Para primeros planos
  de piso, la cámara baja a la altura del detalle (~30–60 cm),
  nunca fotografiada "desde arriba mirando hacia abajo" salvo que el
  punto de inspección sea literalmente el piso.
- **Apertura / profundidad de campo**: campo casi totalmente nítido
  (f/8–f/11 equivalente) en vistas generales y medias — el objetivo es
  que el usuario vea el defecto o la superficie completa en foco, no
  un efecto artístico de fondo desenfocado. Primeros planos pueden
  usar una profundidad de campo más baja (f/2.8–f/4 equivalente)
  **solo** cuando ayuda a aislar visualmente el detalle (ej. una
  fisura) del resto de la superficie.
- **Sin distorsión de lente aparente, sin viñeteado, sin efectos de
  color de cámara de teléfono** (HDR exagerado, saturación artificial)
  — el objetivo es que la imagen se vea como una fotografía técnica
  tomada con cuidado, no una foto de redes sociales.

---

# 5. Encuadre

Mismo sistema de 3 encuadres ya definido en el plan de producción,
ahora formalizado como estándar único para toda la Biblioteca Visual:

| Encuadre | Distancia | Uso |
|---|---|---|
| **General** | ~4–5 m | Uniformidad de color/textura, visión de conjunto de un paño o recinto completo |
| **Medio** | ~1–1,5 m | Alineación, escuadra, terminación de un tramo o encuentro entre dos elementos |
| **Primer plano** | ~20–40 cm | Defectos puntuales: fisuras, sellos, juntas, manchas, holguras |

Reglas transversales de encuadre:
- El objeto/superficie a evaluar ocupa el **70–85%** del cuadro — ni
  tan lejos que se pierda el detalle, ni tan cerca que se pierda el
  contexto necesario para entender dónde está.
- Horizonte y líneas verticales estructurales (marcos, esquinas de
  muro) siempre rectos — nunca un encuadre en diagonal o "artístico".
- Formato horizontal por defecto (ver Sección 8) salvo que el
  elemento sea intrínsecamente vertical y angosto (ej. un tramo de
  canaleta, una esquina de puerta) — ahí se acepta vertical.

---

# 6. Iluminación

Dos condiciones de luz, ya validadas en el plan de producción de
Fachadas, ahora aplicadas a toda la Biblioteca:

| Condición | Cuándo se usa | Qué revela |
|---|---|---|
| **Luz de día difusa** | Mediodía, cielo cubierto, o interior con luz natural indirecta + artificial general encendida | Uniformidad de color, manchas, terminación general — la luz plana no debe esconder ni exagerar nada |
| **Luz rasante (angulada)** | Amanecer/atardecer para exteriores, o luz lateral dirigida para interiores | Ondulaciones, planeidad, textura/grano — la luz rasante revela lo que la luz plana esconde |

Reglas adicionales:
- Nunca luz de flash directo de frente (aplana la superficie y genera
  reflejos que esconden defectos).
- Temperatura de color consistente en toda una misma toma: **5.000–
  5.600 K** (luz de día neutra) — ni cálida (tungsteno, 3.000K) ni fría
  azulada (nublado extremo, 7.500K+). Interiores con luz artificial
  mezclada deben corregirse a esta misma temperatura para no generar
  dominantes de color que compitan con el color real del material.
- Sombras suaves, nunca sombras duras que corten el objeto evaluado a
  la mitad.

---

# 7. Colores

- **Paleta de la vivienda maestra** (Sección 1): fachada en tono
  neutro claro (blanco roto, gris muy claro, o beige arena — nunca
  colores saturados) para que sea el material y su textura lo
  protagonista, no el color de la pintura. Interiores en blanco o gris
  muy claro en muros y cielos, tono cálido neutro en pisos (porcelanato
  símil madera o gris claro).
- **Regla de fondo**: cualquier elemento fuera del punto de inspección
  que aparezca en el cuadro (piso, muro, cielo de contexto) debe usar
  colores neutros de baja saturación — el ojo del usuario tiene que ir
  directo al punto evaluado, no distraerse con un fondo llamativo.
- **Sin filtros de color, sin viraje artístico** (blanco y negro,
  sepia, look cinematográfico) — los colores deben leerse tal como son
  en la realidad, porque en varios puntos de inspección el color real
  del material es literalmente lo que se está evaluando (ej.
  "uniformidad de color").

---

# 8. Resolución

- **Resolución mínima de origen**: 2000×1500 px (o equivalente 4:3) —
  suficiente para que el zoom del visor de pantalla completa
  (`InspectionPointImageViewer`, hasta 4x) no pixele.
- **Formato de entrega para la ficha (miniatura en tarjeta)**: recorte
  4:3, el mismo ratio que ya usa `InspectionPointCard` — la imagen
  fuente debe encuadrarse pensando en ese recorte, no depender de que
  el recorte "salve" un encuadre distinto.
- **Formato de entrega para pantalla completa**: la imagen original
  sin recortar adicionalmente, en `object-fit: contain` — por eso el
  encuadre debe quedar bien resuelto ya desde el origen (Sección 5),
  no depender de que el visor lo arregle.
- **Peso de archivo**: comprimido a calidad visualmente sin pérdida
  (JPEG calidad 85–90 o WebP equivalente) — nunca por debajo de eso,
  dado que varios defectos (fisuras finas, diferencias sutiles de
  color) dependen de que la compresión no genere artefactos que se
  confundan con el defecto real.

---

# 9. Nivel de realismo

**Fotográfico hiperrealista, siempre** — nunca ilustración, render 3D
estilizado, dibujo técnico ni estética "IA genérica" (piel plástica,
simetría perfecta imposible, texturas repetidas). Criterio de
aceptación: si una persona no supiera que es generada por IA, no
debería poder notarlo por el estilo — solo, en el peor caso, por un
detalle puntual de composición.

Reglas específicas:
- Texturas de materiales reales y variadas (el estuco no es
  perfectamente liso, el porcelanato tiene su veteado natural, la
  madera tiene vetas irregulares) — la variación natural del material
  es parte de lo que hace creíble la imagen, mientras no contradiga el
  punto "Bien" que se está enseñando.
- Imperfecciones ambientales sutiles y realistas donde correspondan
  (una leve marca de uso en un guardapolvo, polvo fino en una
  superficie exterior) — **siempre y cuando no interfieran con el
  punto de inspección evaluado**. Una imagen "Bien" de pintura no debe
  tener polvo que se confunda con una mancha.
- Prohibido cualquier elemento que delate generación sintética:
  manos/reflejos imposibles, texto ilegible pretendiendo ser real,
  proporciones físicamente inconsistentes (un marco de puerta que no
  cierra en ángulo recto cuando el punto no es justamente eso).

---

# 10. Regla de consistencia entre imágenes BIEN y MAL

Este es el principio más importante del manual — de él depende que la
comparación enseñe el concepto correcto y no otra cosa.

**Regla**: dentro de una misma Toma, la imagen BIEN y cada imagen MAL
deben ser la **misma escena exacta** — mismo encuadre, misma cámara,
misma distancia, misma iluminación, mismo material, mismo color de
fondo — con **una sola variable cambiada: el defecto que se está
enseñando.**

En la práctica:
- Si BIEN es "muro con pintura uniforme, encuadre general, luz
  difusa", MAL debe ser exactamente ese mismo muro, mismo encuadre,
  misma luz — con la única diferencia de tener la mancha, el traslapo
  o el escurrimiento que ese punto describe.
- **Nunca** cambiar de vivienda, de ángulo, de distancia o de luz
  entre BIEN y MAL de la misma toma — si eso pasa, el usuario no puede
  aislar visualmente qué es lo que hace que una imagen sea "mal" y la
  otra "bien"; su cerebro compara todas las diferencias, no solo la
  relevante.
- Cuando una Toma tiene **varias variantes de MAL** (ej. T-001 de
  Fachadas: traslapo, marca de rodillo, diferencia de brillo,
  escurrimiento, parche — ver `src/lib/visual-production/`), cada
  variante de MAL respeta la misma regla contra el mismo BIEN: solo
  cambia el defecto puntual mostrado, todo lo demás se mantiene fijo.
- Cuando un punto distingue entre dos tipos de defecto que se pueden
  confundir (ej. fisura capilar vs. estructural), ambas imágenes MAL
  deben estar fotografiadas con el mismo criterio entre sí también —
  la única diferencia entre "Mal-capilar" y "Mal-estructural" debe ser
  el espesor/tipo de la fisura, no el encuadre ni la luz.

---

# 11. Convenciones de nomenclatura

Ya implementadas en el Sistema Maestro de Producción Visual — este
manual las fija como estándar oficial, no solo como convención de
código:

```
ESC-001                              (Escenario: misma vivienda, cámara, luz base, criterio de color)
  └─ T-001                           (Toma: mismo encuadre + condición de luz específica)
       ├─ IMG-001-B                  (imagen Bien de esa toma)
       ├─ IMG-001-M01                (primera variante Mal)
       ├─ IMG-001-M02                (segunda variante Mal, si existe)
       └─ IMG-001-M03 …
```

Reglas:
- Un Escenario nuevo (`ESC-XXX`) se crea solo cuando cambia la
  vivienda, el material principal o el criterio de color — nunca por
  cambiar de encuadre (eso es una Toma nueva dentro del mismo
  Escenario).
- Una Toma nueva (`T-XXX`) se crea cada vez que cambia el encuadre o
  la condición de luz, aunque sea dentro del mismo lugar físico (ej.
  T-005 y T-006 de Fachadas: misma esquina de vano, pero T-005 es
  vista media y T-006 es primer plano del sello — dos tomas, una sola
  visita).
- El sufijo `-B` es siempre único por Toma (una sola imagen Bien por
  Toma). Los sufijos `-M01`, `-M02`… se numeran en el orden en que se
  definieron las variantes, nunca se reordenan después de asignados
  (para no romper referencias ya usadas en la app o en el archivo de
  producción).
- El nombre de archivo real hereda el código tal cual:
  `ESC-001_T-003_IMG-003-M02.jpg` — permite ordenar y auditar visualmente
  una carpeta completa sin abrir cada imagen.

---

# 12. Reglas para primeros planos

- Encuadre primer plano (Sección 5), distancia 20–40 cm.
- Incluir siempre un **elemento de escala** cuando el punto lo permita
  (una moneda, la punta de una regla, un dedo enguantado) — sin eso,
  una fisura de 0,2 mm y una de 2 mm pueden verse igual de graves en
  la foto.
- Enfoque total sobre el defecto o la característica evaluada — es la
  única categoría de encuadre donde se permite una profundidad de
  campo más baja (Sección 4), y solo para aislar visualmente el punto
  exacto.
- Luz rasante por defecto, salvo que el punto sea sobre color/mancha
  (ahí luz difusa, igual que en vistas generales) — la luz rasante es
  para revelar relieve/textura, no para color.

---

# 13. Reglas para vistas generales

- Encuadre general (Sección 5), distancia 4–5 m.
- Todo el paño, muro o recinto relevante debe entrar completo en el
  cuadro, sin cortar los bordes que importan para juzgar uniformidad.
- Luz difusa siempre — una vista general con luz rasante genera
  sombras largas que se pueden confundir con el defecto que se busca
  mostrar en otra toma.
- Sin objetos ajenos en el cuadro (vehículos, personas, herramientas
  de trabajo, basura de obra) — la vivienda se ve como recién
  entregada, no como una obra en construcción.

---

# 14. Reglas para materiales

- Cada material dentro de un mismo elemento (ej. Fachadas: Pintura,
  Marmolina, Graniplast…) es su propio Escenario — nunca se reutiliza
  la vivienda/toma de un material para representar otro, aunque el
  punto de inspección sea conceptualmente el mismo (ej. "color y
  textura uniformes" existe tanto en Pintura como en Marmolina, pero
  cada una necesita su propia fotografía real de ESE material).
- Cuando dos elementos comparten el mismo material con el mismo
  criterio técnico (ej. Cerámico se usa igual en Pisos y en Muros y
  Cielos), **si el defecto y el criterio son idénticos**, se puede
  reutilizar el mismo par de imágenes entre ambos puntos de la
  Biblioteca Técnica — no hay que fotografiar dos veces lo idéntico.
  Si el criterio cambia aunque sea levemente (ej. "esquinas y remates
  junto a artefacto" no aplica en un muro sin artefacto cerca), se
  fotografía aparte.
- El material debe ser identificable a simple vista en la imagen — un
  Graniplast fotografiado tan de lejos que parece Pintura lisa no
  sirve, aunque el punto de inspección sea el mismo.

---

# 15. Reglas para imágenes de detalle

*(Distintas de "primer plano" — el detalle es una toma dirigida a un
elemento pequeño específico, como una manilla, un sello, un enchufe,
no una superficie amplia vista de cerca.)*

- Encuadre medio o primer plano según el tamaño real del elemento —
  una manilla completa entra en un encuadre medio, el ojo de una
  cerradura necesita primer plano.
- El elemento de detalle siempre centrado y a escuadra respecto del
  cuadro — nunca en una esquina o en diagonal, porque en estas tomas
  no hay contexto adicional que ayude a ubicar qué se está mostrando.
- Fondo inmediato (marco, muro, superficie donde está montado el
  detalle) visible pero secundario — suficiente para dar contexto de
  "esto está instalado en la puerta/muro/mueble", sin competir
  visualmente con el detalle mismo.

---

# 16. Reglas para mantener la misma escena cambiando únicamente el defecto

Esta sección formaliza el mecanismo operativo detrás de la Sección 10,
pensado explícitamente para producción con IA (donde "misma escena,
un solo cambio" es un problema técnico real, no solo un criterio de
composición):

1. **Generar primero la imagen BIEN** de la Toma, con el encuadre,
   cámara, luz y material ya definidos en este manual.
2. **Usar esa imagen BIEN como referencia visual directa** (image-to-
   image / control de composición, no solo un prompt de texto) para
   generar cada variante MAL — el objetivo técnico es que el modelo
   parta de la misma geometría, iluminación y material, y solo
   modifique la región local donde va el defecto.
3. **El prompt de la variante MAL** debe describir únicamente el
   defecto a introducir (ej. "agrega una fisura fina de 0,2 mm en la
   esquina inferior izquierda del estuco, sin alterar el resto de la
   superficie, iluminación ni encuadre") — nunca redescribir la escena
   completa de cero, porque eso reintroduce el riesgo de que algo más
   cambie sin querer.
4. **Verificación antes de aceptar una variante MAL**: comparar contra
   el BIEN de la misma Toma y confirmar que la única diferencia
   perceptible es el defecto descrito — cualquier otra diferencia
   (color de fondo, ángulo, sombra) es motivo de regenerar esa
   variante, no de aceptarla "porque el defecto se ve bien".
5. Cuando una Toma tiene múltiples variantes MAL (Sección 10), cada
   una se genera de forma independiente a partir del mismo BIEN base
   — nunca una variante MAL a partir de otra variante MAL, para que no
   se acumulen diferencias no intencionadas entre variantes.

---

# Cómo se usa este manual de aquí en adelante

Cuando se retome la producción de imágenes (fuera de este Sprint, no
ejecutado acá), cada Toma ya definida en
`src/lib/visual-production/scenarios/` se resuelve consultando este
manual sección por sección: qué vivienda maestra corresponde (§1), qué
encuadre y luz le tocan según su `framing`/`light` ya definidos (§5,
§6), y qué reglas de consistencia respetar entre su imagen `-B` y sus
variantes `-M0X` (§10, §16). Este manual no reemplaza la ficha de cada
Toma — la complementa con las reglas generales que valen para todas.

---

*Fin del Manual Oficial del Estándar Visual de ObraBien. Documento de
referencia únicamente — ninguna imagen generada, ningún cambio de
código, arquitectura, Biblioteca Técnica, UX ni Sistema Maestro de
Producción Visual.*
