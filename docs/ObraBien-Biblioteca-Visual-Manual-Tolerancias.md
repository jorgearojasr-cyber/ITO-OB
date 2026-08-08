# ObraBien — Biblioteca Visual a partir del Manual de Tolerancias CChC/CDT

## Cómo leer este documento

**Hallazgo de partida, ya confirmado contigo**: el Manual de Tolerancias
para Edificaciones (CDT/CChC, 3ª ed. 2018, 69 páginas, 26 fichas) no
contiene ninguna fotografía. Su contenido visual son ~69 **esquemas
técnicos vectoriales** (isométricos tipo CAD, con cotas, flechas y
líneas punteadas) que ilustran cómo se **mide** una tolerancia — no
cómo se **ve** un defecto real en una vivienda.

Por acuerdo contigo, cada ficha de este documento **no describe el
dibujo como dibujo**. Describe: (a) qué criterio técnico real enseña
ese diagrama, y (b) cómo debería verse ese mismo criterio en una
**fotografía hiperrealista** de una vivienda real — correcta e
incorrecta cuando el defecto es visualmente distinguible — que es lo
que ObraBien necesita generar. Los campos de fotografía (ángulo, luz,
materiales) describen la **foto objetivo a generar**, no el esquema
fuente.

Unidad atómica de registro: cada **FIGURA numerada** del manual (así
es como el propio documento identifica sus imágenes). Cuando una
figura agrupa varios criterios mediante círculos de detalle (ej.
Guardapolvos Fig. 1: 4 criterios en un mismo dibujo), se documentan
como sub-registros dentro del mismo código, no como imágenes nuevas
no numeradas por el manual — evita tanto la sobre-fragmentación como
la fusión indebida.

## Sistema de códigos

`[PARTIDA]-[NNN]`, correlativo por capítulo, en el orden del manual.
Prefijos: MUROLAD, MUROHOR, LOSA, RADIER, TABIQ, ENCPAR, CIELO,
ESTUCO, YESO, CERAM, GRADA, PUERTA, VENTANA, PAPEL, ENCHMAD, GUARDAP,
ALFOM, CORNISA, CUBREJ, PILASTRA, CLOSET, MUEBLE, PINTURA, VINIL,
PISOFLOT, ARTELEC.

## Leyenda de campos (los 15 acordados, adaptados a foto-objetivo)

1. **ID** — código, página, capítulo, partida.
2. **Objetivo técnico** — qué criterio evalúa (planeidad, verticalidad, etc.).
3. **Tipo** — naturaleza de la foto objetivo (Correcto / Incorrecto / Comparación Bien-Mal / Método de medición).
4. **Qué enseña el esquema** — lectura objetiva de la tolerancia representada (no del dibujo).
5. **Defecto representado** — principal / secundario, o "sin defecto = ejecución correcta".
6. **Estado correcto esperado** — descripción hiperrealista del resultado impecable.
7. **Objetos presentes** — elementos que deben aparecer en la foto objetivo.
8. **Tipo de fotografía** — encuadre ideal para la foto objetivo.
9. **Condiciones de observación** — extraídas **textuales** del manual.
10. **Instrumentos** — cuáles aparecen o deberían aparecer en la foto.
11. **Tolerancia** — valor **textual, sin modificar**.
12. **Variables visuales IA** — materiales, texturas, luz, entorno.
13. **Dificultad IA** — Muy fácil/Fácil/Media/Difícil/Muy difícil + por qué.
14. **Mejora vs. manual** — cómo superarlo, no copiarlo.
15. **Prompt IA preliminar** — listo para generación.

---

# CAPÍTULO 1 — Muros de Albañilería de Ladrillos (pág. 11-13)

## MUROLAD-001 — Espesor de canterías
1. **ID**: MUROLAD-001 · pág. 12 · Cap. 1 · Muros de albañilería.
2. **Objetivo técnico**: espesor uniforme de la junta de mortero (cantería) entre hiladas de ladrillo.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: el espesor de la cantería debe mantenerse constante en toda la extensión del muro; una junta que varía de grosor delata mala nivelación de hiladas.
5. **Defecto**: cantería de espesor irregular (más gruesa en un tramo, más delgada en otro) — no hay "defecto secundario" en esta ficha.
6. **Estado correcto**: hiladas de ladrillo a la vista perfectamente paralelas, junta de mortero de ancho visualmente idéntico de extremo a extremo del paño, sin escalones ni cuñas de mortero visibles.
7. **Objetos**: muro de ladrillo cara vista, mortero de junta, huincha o regla graduada apoyada sobre 2-3 hiladas.
8. **Tipo de fotografía**: frontal, perpendicular al muro, encuadre medio (2-3 hiladas visibles), con la regla de medición en cuadro.
9. **Condiciones de observación (manual)**: "Medir el espesor de las canterías con huincha o regla graduada en distintos puntos del paño."
10. **Instrumentos**: huincha, regla graduada.
11. **Tolerancia (textual)**: "Espesor de cantería especificado 10 mm ≤ e < 15 mm: -1 mm, +3 mm" / "15 mm ≤ e ≤ 20 mm: ± 3 mm".
12. **Variables IA**: ladrillo cerámico color arcilla/naranjo, mortero gris cemento, luz natural rasante para marcar sombra de junta, textura porosa del ladrillo visible.
13. **Dificultad IA**: Fácil — patrón repetitivo, alto contraste ladrillo/mortero.
14. **Mejora**: par lado a lado (junta uniforme vs. junta irregular) con la misma iluminación, flecha roja señalando la variación de espesor, regla superpuesta con valor en mm.
15. **Prompt IA preliminar**: "Fotografía hiperrealista, primer plano de un muro de ladrillo a la vista visto de frente, luz de día rasante desde la izquierda, 3 hiladas de ladrillo cerámico color arcilla con junta de mortero gris cemento de espesor uniforme de 12 mm, una regla metálica graduada apoyada horizontalmente sobre la junta central, textura porosa realista del ladrillo, fondo desenfocado de obra en construcción, cámara a nivel del muro, lente 50 mm."

## MUROLAD-002 — Pérdida de linealidad en junta horizontal
1. **ID**: MUROLAD-002 · pág. 12 · Cap. 1 · Muros de albañilería.
2. **Objetivo técnico**: rectitud de la línea de junta horizontal a lo largo del muro.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la junta debe formar una línea recta continua; una junta "ondulada" indica hiladas mal niveladas hilada a hilada.
5. **Defecto**: pérdida de linealidad — la junta se desvía de la horizontal en algún tramo de 3 m.
6. **Estado correcto**: línea de junta perfectamente recta y horizontal en toda la longitud fotografiada, verificable con un hilo o regla tensada.
7. **Objetos**: muro de ladrillo, hilo/regla de 3 m tensada sobre la junta, marcas de desviación si las hay.
8. **Tipo de fotografía**: frontal amplia (todo el paño, 3 m de largo), con la regla/hilo horizontal cruzando el encuadre.
9. **Condiciones de observación (manual)**: "La linealidad se puede medir con instrumento topográfico, o con un nivel manual apoyado con una regla."
10. **Instrumentos**: nivel manual, regla, instrumento topográfico.
11. **Tolerancia (textual)**: "Pérdida de linealidad en junta horizontal: ± 4 mm / 3 m."
12. **Variables IA**: mismo muro de ladrillo, luz rasante para que la sombra de la junta revele la ondulación, regla larga de aluminio.
13. **Dificultad IA**: Media — la desviación de 4 mm en 3 m es sutil, requiere exagerar ligeramente para que sea "enseñable" sin falsear la tolerancia real.
14. **Mejora**: superponer una línea guía roja recta sobre la foto para que el ojo compare la junta real contra la línea teórica — recurso gráfico que el manual no usa.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un muro de ladrillo cara vista de 3 metros de largo, cámara centrada, luz rasante de tarde, junta de mortero horizontal que se desvía levemente hacia abajo en el tercio central, regla de aluminio de 3 m apoyada sobre la hilada superior mostrando el hueco de la desviación, textura de ladrillo realista, fondo de faena de obra desenfocado."

## MUROLAD-003 — Verticalidad de muros y columnas de albañilería
1. **ID**: MUROLAD-003 · pág. 12 · Cap. 1 · Muros de albañilería.
2. **Objetivo técnico**: desplome (desviación de la vertical) del muro completo, según su altura.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: un muro debe estar a plomo; el desplome tolerado crece con la altura del muro, pero siempre como porcentaje de esa altura.
5. **Defecto**: desplome — el muro se inclina respecto de la vertical.
6. **Estado correcto**: muro completo, de piso a cielo, perfectamente vertical, verificado con plomada colgante que corre paralela al muro en toda su altura.
7. **Objetos**: muro completo (altura de piso), plomada o nivel láser, hilo rojo de referencia.
8. **Tipo de fotografía**: plano general vertical (de piso a cielo), cámara a media distancia para capturar toda la altura sin distorsión de gran angular excesiva.
9. **Condiciones de observación (manual)**: "Para alturas interiores o exteriores menores a 3 m se puede utilizar nivel manual con regla de 2 m [...] se puede utilizar un plomo, o instrumento topográfico. Esta medición se debe realizar antes de cualquier tratamiento superficial."
10. **Instrumentos**: plomada, nivel manual con regla de 2 m, instrumento topográfico.
11. **Tolerancia (textual)**: "h≤3 m: 0,2% de h · 3 m<h≤6 m: 0,15% de h · 6 m<h≤12 m: 0,1% de h."
12. **Variables IA**: muro de ladrillo visto en toda su altura, plomada colgando con hilo tenso, contraste entre el hilo (referencia vertical real) y el paramento del muro.
13. **Dificultad IA**: Media — requiere que la IA respete una perspectiva vertical sin distorsión que delate la inclinación real.
14. **Mejora**: vista de perfil (no frontal) para que el desplome sea evidente al ojo, con la plomada como referencia visual clara, y una segunda foto de un muro perfecto para el par Bien/Mal.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un muro de albañilería de 3 metros de altura visto de perfil (lateral), una plomada de metal colgando desde el punto más alto con hilo rojo tenso, el muro mostrando una leve inclinación hacia la cámara en la base, luz natural difusa, obra en construcción sin terminaciones aplicadas, cámara a media altura del muro, lente 35 mm sin distorsión de barril."

## MUROLAD-004 — Alineamiento vertical y horizontal
1. **ID**: MUROLAD-004 · pág. 12 · Cap. 1 · Muros de albañilería.
2. **Objetivo técnico**: planeidad de la superficie del muro y verticalidad entre unidades (ladrillos) adyacentes.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: dos criterios en un mismo caso — que la superficie del muro no tenga ondulaciones (planeidad) y que ladrillos vecinos no sobresalgan uno respecto del otro (verticalidad entre unidades).
5. **Defecto principal**: ladrillo sobresaliente respecto de sus vecinos (resalte). **Secundario**: ondulación de la superficie general.
6. **Estado correcto**: superficie de ladrillos perfectamente alineada en un mismo plano, sin ningún ladrillo hundido ni sobresaliente, verificable al apoyar una regla que toca todos los puntos por igual.
7. **Objetos**: paño de ladrillos, regla apoyada de canto sobre la superficie, luz rasante marcando sombra bajo la regla donde hay hueco.
8. **Tipo de fotografía**: detalle/macro sobre 3-4 ladrillos, regla en primer plano, luz rasante lateral para que la sombra bajo la regla revele el desnivel.
9. **Condiciones de observación (manual)**: "Utilizar regla de 1,2 m, colocarla en distintas ubicaciones sobre el paño, medir con una regla pequeña graduada o una huincha la diferencia de planeidad entre la regla y el elemento."
10. **Instrumentos**: regla de 1,2 m, regla pequeña graduada, huincha.
11. **Tolerancia (textual)**: "Planeidad de superficies: ± 3 mm / lado alineado" · "Verticalidad entre unidades adyacentes: ± 3 mm."
12. **Variables IA**: primer plano de textura de ladrillo, sombra dura bajo la regla metálica, contraste alto para que el hueco sea legible.
13. **Dificultad IA**: Fácil — es un defecto muy fotogénico (sombra bajo regla es un recurso visual clásico y fácil de generar de forma realista.
14. **Mejora**: cortar la imagen en dos mitades — mitad "sin hueco visible" (correcto) y mitad "hueco de 4-5 mm bajo la regla" (incorrecto) — comparación directa en un solo cuadro.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de un muro de ladrillo cara vista, una regla metálica de aluminio apoyada de canto horizontalmente sobre 4 ladrillos, luz rasante fuerte desde la derecha creando una sombra visible de 4 mm bajo la regla en el ladrillo central que sobresale respecto a sus vecinos, textura porosa del ladrillo nítida, fondo desenfocado, profundidad de campo baja tipo lente macro 100 mm."

## MUROLAD-005 — Alineamiento de hilada superior
1. **ID**: MUROLAD-005 · pág. 12 · Cap. 1 · Muros de albañilería.
2. **Objetivo técnico**: alineamiento horizontal de la hilada de remate superior del muro.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la hilada superior (donde apoyará la losa o cadena) debe quedar perfectamente horizontal en toda su longitud.
5. **Defecto**: hilada superior desalineada — algunos ladrillos más altos que otros en la coronación del muro.
6. **Estado correcto**: línea de coronación perfectamente horizontal, visible al apoyar una regla larga sobre toda la hilada superior sin que queden huecos.
7. **Objetos**: parte superior del muro (coronación), regla de 3 m horizontal, ladrillos de la última hilada.
8. **Tipo de fotografía**: frontal, encuadre en la parte superior del muro únicamente, regla apoyada a lo largo.
9. **Condiciones de observación (manual)**: "El alineamiento de la primera hilada se puede medir con una regla de 3 m colocada en forma horizontal sobre la hilada."
10. **Instrumentos**: regla de 3 m, regla pequeña graduada o huincha.
11. **Tolerancia (textual)**: "Alineamiento hilada superior: ± 6 mm / 3 m."
12. **Variables IA**: vista elevada (cámara a la altura de la coronación), luz de día, regla larga metálica.
13. **Dificultad IA**: Fácil — similar a MUROLAD-004 pero en horizontal extendido.
14. **Mejora**: incluir el contexto (losa o cadena que apoyará encima) para que el usuario entienda por qué importa este alineamiento, algo que el manual no explica visualmente.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de la coronación de un muro de ladrillo cara vista, tomada desde un andamio a la altura de la última hilada, una regla de aluminio de 3 metros apoyada horizontalmente mostrando un hueco de 6 mm en el extremo derecho por un ladrillo más bajo, luz de día uniforme, textura de ladrillo nítida, obra de construcción de fondo."

---

# CAPÍTULO 2 — Muros de Hormigón (pág. 14-15)

## MUROHOR-001 — Espesor del muro de hormigón armado
1. **ID**: MUROHOR-001 · pág. 15 · Cap. 2 · Muros de hormigón.
2. **Objetivo técnico**: espesor constante del muro de hormigón respecto de lo especificado en el proyecto.
3. **Tipo**: Método de medición (el defecto de espesor no es visualmente evidente desde la superficie terminada).
4. **Qué enseña**: el espesor real del muro (medido en bordes libres, vanos o perforaciones) no debe desviarse más de lo tolerado del espesor de proyecto.
5. **Defecto**: sin defecto visible en superficie — es una desviación dimensional interna, se detecta solo con medición directa en un borde o perforación.
6. **Estado correcto**: muro de hormigón visto en corte (en un vano de ventana o borde libre), espesor uniforme, huincha o regla mostrando la medida exacta especificada.
7. **Objetos**: hormigón visto en sección (borde de vano), huincha metálica, marca de espesor especificado.
8. **Tipo de fotografía**: primer plano de un borde/vano de hormigón en corte, huincha insertada mostrando el espesor.
9. **Condiciones de observación (manual)**: "En bordes libres, en vanos de puertas y ventanas, o en alguna perforación que atraviese el elemento, se puede medir con huincha el espesor del muro. La medición se debe realizar antes de la colocación de algún revestimiento."
10. **Instrumentos**: huincha.
11. **Tolerancia (textual)**: "e≤30cm: +10mm/-6mm · 30cm<e≤60cm: +13mm/-10mm · e>60cm: +25mm/-19mm."
12. **Variables IA**: hormigón gris natural con textura de moldaje (líneas de tabla o placa), huincha metálica amarilla/roja de obra.
13. **Dificultad IA**: Difícil — es fundamentalmente una medición dimensional sin señal visual de defecto por sí sola; la IA debe generar convincentemente la escena de medición, no un "defecto visible".
14. **Mejora**: reemplazar el diagrama de sección abstracto por una foto real de un vano de ventana en obra gruesa con la huincha insertada — mucho más reconocible para un usuario no técnico que el corte técnico del manual.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un vano de ventana en un muro de hormigón armado en obra gruesa, sin terminaciones, textura de hormigón con marcas de moldaje de madera, una huincha metálica de obra insertada perpendicularmente en el borde del vano mostrando 20 cm de espesor, luz de día natural, profundidad de campo media, ángulo levemente picado desde el interior del vano."

---

# CAPÍTULO 3 — Losas de Hormigón (pág. 16-18)

## LOSA-001 — Planeidad de hormigón de superficie de piso
1. **ID**: LOSA-001 · pág. 18 · Cap. 3 · Losas de hormigón.
2. **Objetivo técnico**: planeidad de la cara superior de la losa (futuro piso), antes de colocar el revestimiento.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la superficie de la losa no debe tener ondulaciones que superen el máximo permitido al apoyar una regla larga, según el grado de terminación (G5/G6) y la longitud medida.
5. **Defecto**: ondulación/resalte en la superficie de la losa — hueco visible bajo la regla.
6. **Estado correcto**: superficie de hormigón afinada, la regla apoyada de canto toca la losa en toda su longitud sin dejar hueco perceptible.
7. **Objetos**: losa de hormigón gris, regla larga (3-6 m), luz rasante.
8. **Tipo de fotografía**: vista rasante casi a nivel del piso (cámara baja), regla extendida en el encuadre.
9. **Condiciones de observación (manual)**: "Colocarla en distintas ubicaciones sobre la losa, medir con una regla graduada o una huincha, la diferencia de planeidad entre la regla y el elemento [...] antes de colocar el revestimiento de piso y después de 2 días de haber retirado las alzaprimas."
10. **Instrumentos**: regla graduada, huincha, nivel topográfico (Método 2, cuadrícula).
11. **Tolerancia (textual)**: "L≤1,5m: G5 ±3mm, G6 ±4mm · 1,5m<L≤3m: G5 ±5mm, G6 ±7mm · 3m<L≤6m: G5 ±7mm, G6 ±10mm · L>6m: G5 ±10mm, G6 ±15mm."
12. **Variables IA**: hormigón gris natural, superficie afinada, regla de aluminio larga, cámara a nivel del suelo (ángulo "worm's eye").
13. **Dificultad IA**: Media — la ondulación de una losa es sutil y requiere que la sombra bajo la regla se lea con claridad sin exagerar la escena.
14. **Mejora**: agregar escala de referencia (moneda o cinta métrica) junto al hueco para que el usuario dimensione visualmente los milímetros de desviación — el manual no da esa referencia humana.
15. **Prompt IA preliminar**: "Fotografía hiperrealista a nivel del suelo de una losa de hormigón recién desmoldada, superficie gris con textura de afinado a llana, una regla de aluminio de 3 metros apoyada de canto sobre la losa con un hueco visible de 7 mm en el centro marcado por una sombra proyectada por luz rasante de ventana lateral, sin revestimiento aplicado, ambiente de obra en construcción."

## LOSA-002 — Planeidad de hormigón de superficie de cielo
1. **ID**: LOSA-002 · pág. 18 · Cap. 3 · Losas de hormigón.
2. **Objetivo técnico**: planeidad de la cara inferior de la losa (futuro cielo).
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: mismo criterio que LOSA-001 pero medido desde abajo, contra la cara inferior de la losa (el cielo del recinto de abajo).
5. **Defecto**: ondulación de la superficie de cielo — hueco entre la regla y el hormigón.
6. **Estado correcto**: cielo de hormigón parejo, sin resaltes visibles al apoyar la regla contra la cara inferior.
7. **Objetos**: losa vista desde abajo (cielo), regla apoyada contra la cara inferior, laina o galga.
8. **Tipo de fotografía**: contrapicado (cámara mirando hacia arriba), regla en el encuadre superior.
9. **Condiciones de observación (manual)**: "Colocarla en distintas ubicaciones sobre la cara inferior de la losa, medir con una regla pequeña graduada o una huincha la diferencia de planeidad."
10. **Instrumentos**: regla graduada, laina, galga.
11. **Tolerancia (textual)**: "L≤1,5m: G1 6mm, G2 7mm, G3 8mm, G4 9mm · L>6m: G1 20mm, G2 22mm, G3 25mm, G4 30mm" (grados 1-4, distinto de piso que usa G5/G6).
12. **Variables IA**: hormigón visto desde abajo, textura de moldaje, regla apoyada contra el cielo, iluminación artificial de obra (la luz natural no llega bien a un cielo en contrapicado interior).
13. **Dificultad IA**: Media — el ángulo de contrapicado con objeto apoyado contra el techo es menos común en datasets de entrenamiento, riesgo de artefactos en la IA.
14. **Mejora**: incluir referencia de escala y, si es posible, un segundo hormigón sin defecto en el mismo cuadro para comparación directa Bien/Mal.
15. **Prompt IA preliminar**: "Fotografía hiperrealista en contrapicado de la cara inferior de una losa de hormigón (futuro cielo), textura de moldaje de madera visible, una regla de aluminio apoyada contra la superficie con una separación visible de 15 mm marcada por sombra, iluminación artificial de obra tipo foco halógeno, ambiente de construcción sin terminar, cámara mirando directamente hacia arriba."

## LOSA-003 — Variaciones de espesor de la losa
1. **ID**: LOSA-003 · pág. 18 · Cap. 3 · Losas de hormigón.
2. **Objetivo técnico**: espesor de la losa dentro de la tolerancia respecto del proyecto.
3. **Tipo**: Método de medición.
4. **Qué enseña**: igual que MUROHOR-001 pero para losas — se mide en bordes libres, vanos de escalera o testigos extraídos.
5. **Defecto**: sin señal visual directa — desviación dimensional detectable solo con medición.
6. **Estado correcto**: espesor de losa uniforme y coincidente con el proyecto, verificado en un borde libre o vano.
7. **Objetos**: canto de losa visto en un borde libre o vano de escalera, huincha.
8. **Tipo de fotografía**: primer plano del canto de la losa con huincha insertada.
9. **Condiciones de observación (manual)**: "En bordes libres y en vanos de escaleras, medir con huincha el espesor de la losa. Si se extrae algún testigo y en general cualquier perforación que atraviese la losa también se puede utilizar para conocer su espesor."
10. **Instrumentos**: huincha, método topográfico.
11. **Tolerancia (textual)**: "Variaciones del espesor de la losa: -6 mm."
12. **Variables IA**: hormigón en corte, huincha metálica, luz de obra.
13. **Dificultad IA**: Difícil — mismo problema que MUROHOR-001, es medición sin defecto visual propio.
14. **Mejora**: mostrar el vano de una escalera real en obra gruesa como contexto reconocible, en vez del corte esquemático del manual.
15. **Prompt IA preliminar**: "Fotografía hiperrealista del borde de una losa de hormigón en el vano de una escalera en obra gruesa, huincha metálica insertada verticalmente mostrando 14 cm de espesor sobre 15 cm especificados, textura de hormigón con marcas de moldaje, luz de día entrando por el vano, ángulo de tres cuartos."

## LOSA-004 — Variaciones de pendiente
1. **ID**: LOSA-004 · pág. 18 · Cap. 3 · Losas de hormigón.
2. **Objetivo técnico**: pendiente de la losa (relevante en terrazas, balcones, baños) dentro de la tolerancia respecto de lo especificado.
3. **Tipo**: Método de medición.
4. **Qué enseña**: la pendiente real de la losa debe coincidir con la de proyecto dentro de ±0,5% — relevante para evacuación de agua.
5. **Defecto**: pendiente insuficiente o excesiva — riesgo de empozamiento de agua si es insuficiente.
6. **Estado correcto**: superficie con la pendiente exacta de proyecto, agua (si se vierte) escurriendo limpiamente hacia el desagüe sin empozarse.
7. **Objetos**: losa de terraza/balcón, nivel topográfico o de mano, agua vertida como prueba visual (recurso didáctico, no del manual).
8. **Tipo de fotografía**: plano general de una terraza/balcón con agua escurriendo, o nivel apoyado mostrando el ángulo.
9. **Condiciones de observación (manual)**: "Es posible utilizar algún método topográfico u otro que permita conocer espesores en zonas sin conexión de su cara superior con la inferior. [...] La medición de pendientes se puede realizar con nivel topográfico."
10. **Instrumentos**: nivel topográfico.
11. **Tolerancia (textual)**: "Variaciones de pendiente respecto de lo especificado: ± 0,5%."
12. **Variables IA**: superficie de hormigón o pavimento de terraza, agua real visible escurriendo o empozada (para el caso incorrecto), luz de día exterior.
13. **Dificultad IA**: Media-fácil si se usa el recurso del agua (muy fotogénico y didáctico); difícil si se intenta mostrar solo el nivel topográfico (poco intuitivo).
14. **Mejora real sobre el manual**: el manual no usa ningún recurso visual para "pendiente" — agregar una prueba de agua (correcta: escurre completamente; incorrecta: se empoza en un sector) es muy superior pedagógicamente y no está en el original.
15. **Prompt IA preliminar (caso incorrecto)**: "Fotografía hiperrealista de una terraza de hormigón exterior con un pequeño charco de agua empozada de unos 40 cm de diámetro cerca del muro, luz de día nublada, textura de hormigón húmedo con reflejo, ángulo de tres cuartos desde arriba, sin mobiliario."

---

# CAPÍTULO 4 — Radieres de Hormigón (pág. 19-20)

## RADIER-001 — Planeidad de hormigón de piso de radier
1. **ID**: RADIER-001 · pág. 20 · Cap. 4 · Radieres de hormigón.
2. **Objetivo técnico**: planeidad de la superficie del radier, idéntico criterio que LOSA-001 pero aplicado a radier (losa apoyada en terreno, no losa estructural entre pisos).
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: mismo criterio de "regla apoyada, medir el hueco" que la losa de piso, con las mismas tablas G5/G6.
5. **Defecto**: ondulación de la superficie del radier.
6. **Estado correcto**: superficie de radier afinada y pareja, sin huecos bajo la regla.
7. **Objetos**: radier de hormigón, regla larga, opcionalmente malla de cuadrícula marcada en tiza para el Método 2.
8. **Tipo de fotografía**: vista rasante a nivel de piso, en una nave o recinto amplio en obra gruesa.
9. **Condiciones de observación (manual)**: "Colocarla en distintas ubicaciones sobre el radier [...] Las mediciones en ambos métodos se deben realizar antes de instalar el revestimiento de piso."
10. **Instrumentos**: regla, huincha, nivel topográfico.
11. **Tolerancia (textual)**: idéntica a LOSA-001: "L≤1,5m: g5±3, g6±4 · L>6m: g5±10, g6±15" (mm).
12. **Variables IA**: superficie de radier gris más rústica que una losa de entrepiso (contacto directo con tierra/relleno), regla de aluminio.
13. **Dificultad IA**: Media — muy similar a LOSA-001, se diferencia por el contexto (nave industrial o primer piso vs. losa de entrepiso).
14. **Mejora**: diferenciar visualmente de LOSA-001 mostrando el contexto característico de radier (galpón, primer piso sobre terreno, sin vista de losa inferior) para que el usuario no confunda ambas fichas.
15. **Prompt IA preliminar**: "Fotografía hiperrealista a nivel del suelo de un radier de hormigón en un primer piso en obra gruesa, superficie gris afinada, regla de aluminio de 3 metros apoyada de canto con una leve sombra de 5 mm bajo su punto central, luz natural entrando por vanos de ventana sin instalar, ambiente de vivienda en construcción."

---

# CAPÍTULO 5 — Tabiques (pág. 21-23)

## TABIQ-001 — Tolerancias en planchas de revestimiento
1. **ID**: TABIQ-001 · pág. 22 · Cap. 5 · Tabiques.
2. **Objetivo técnico**: distancia entre fijaciones (tornillos) de las placas de yeso-cartón u otro revestimiento sobre la estructura del tabique, y distancia entre planchas.
3. **Tipo**: Método de medición.
4. **Qué enseña**: la separación entre tornillos y entre planchas debe respetar un rango — muy juntos o muy separados afecta la resistencia y terminación de la unión.
5. **Defecto**: fijaciones mal espaciadas o planchas con separación excesiva entre sí.
6. **Estado correcto**: tornillos alineados verticalmente cada distancia regular, cabeza enrasada sin romper el cartón, planchas con junta angosta y pareja.
7. **Objetos**: plancha de yeso-cartón antes de emplastecer, tornillos visibles, regla graduada.
8. **Tipo de fotografía**: plano medio de un paño de tabique recién placado, luz rasante para que las cabezas de tornillo generen sombra.
9. **Condiciones de observación (manual)**: "Realizar todas las mediciones con huincha o regla graduada, antes de cualquier intervención sobre las planchas (huinchas para juntas, sellantes, pasta, etc.)."
10. **Instrumentos**: huincha, regla graduada.
11. **Tolerancia (textual)**: "Distancia entre fijaciones: ± 10 mm · Distancia de fijación al borde de la plancha: ± 2 mm · Distancia entre planchas: + 3 mm."
12. **Variables IA**: plancha de yeso-cartón color beige/gris claro sin pintar, cabezas de tornillo galvanizadas, textura de cartón visible.
13. **Dificultad IA**: Fácil — patrón repetitivo de alto contraste (tornillo sobre superficie lisa).
14. **Mejora**: acercar (macro) a una sola fijación con la regla mostrando la distancia al borde, en vez del plano general del manual que dificulta leer los 2 mm de tolerancia.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de una plancha de yeso-cartón sin pintar, un tornillo autoperforante con cabeza levemente hundida y enrasada a 12 mm del borde de la plancha, regla metálica pequeña graduada apoyada junto al tornillo, luz rasante lateral, textura de cartón visible en detalle."

## TABIQ-002 — Planeidad de tabique sin huinchas
1. **ID**: TABIQ-002 · pág. 22 · Cap. 5 · Tabiques.
2. **Objetivo técnico**: planeidad de la superficie del tabique antes de tratar las juntas.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: mismo principio de regla-hueco que en muros, aplicado a tabique placado, medido antes de aplicar huinchas de junta.
5. **Defecto**: ondulación de la superficie del tabique (placas mal fijadas o estructura desalineada).
6. **Estado correcto**: superficie plana, regla apoyada sin dejar hueco perceptible.
7. **Objetos**: tabique placado sin tratar, regla, sombra de referencia.
8. **Tipo de fotografía**: plano medio con luz rasante, regla en diagonal o vertical según el punto medido.
9. **Condiciones de observación (manual)**: "Utilizar reglas adecuadas dependiendo del tamaño del tabique, colocándolas en distintas ubicaciones sobre el paño, y medir con una regla pequeña graduada o una huincha la diferencia de planeidad."
10. **Instrumentos**: regla, regla pequeña graduada o huincha.
11. **Tolerancia (textual)**: "Planeidad tabique sin huinchas: ± 5 mm (con regla adecuada, cualquier ubicación y dirección)."
12. **Variables IA**: placa de yeso-cartón, regla diagonal, sombra de hueco de 5 mm.
13. **Dificultad IA**: Fácil.
14. **Mejora**: par lado a lado con TABIQ-003 (terminado, tolerancia más estricta de ±3 mm) para que el usuario entienda visualmente por qué la exigencia sube después de tratar las juntas.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un tabique de yeso-cartón recién placado sin tratar juntas, una regla de 1,2 m apoyada en diagonal mostrando un hueco de 5 mm marcado por sombra de luz rasante, superficie de cartón sin pintar, ambiente de obra en construcción."

## TABIQ-003 — Planeidad de tabique terminado
1. **ID**: TABIQ-003 · pág. 22 · Cap. 5 · Tabiques.
2. **Objetivo técnico**: planeidad del tabique ya con juntas tratadas y emplastecidas (terminación final antes de pintura).
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la tolerancia se estrecha (de ±5 mm a ±3 mm) porque ya se corrigió con pasta — el estándar final es más exigente.
5. **Defecto**: ondulación residual en zona de junta emplastecida, típicamente un "abultamiento" donde se aplicó la pasta.
6. **Estado correcto**: superficie continua y lisa, la junta invisible al tacto y a la vista, regla sin marcar hueco.
7. **Objetos**: tabique con juntas emplastecidas y lijadas, regla.
8. **Tipo de fotografía**: plano medio, luz rasante fuerte (la luz rasante es el método real más usado en obra para detectar abultamientos de pasta).
9. **Condiciones de observación (manual)**: idéntico método a TABIQ-002, aplicado post-tratamiento.
10. **Instrumentos**: regla pequeña graduada o huincha.
11. **Tolerancia (textual)**: "Planeidad tabique terminado: ± 3 mm (con regla adecuada, cualquier ubicación y dirección)."
12. **Variables IA**: superficie ya emplastecida color blanco yeso, sin pintar todavía, luz muy rasante (recurso real de faena, "linterna a ras de muro").
13. **Dificultad IA**: Media — el abultamiento sutil de una junta tratada es más difícil de generar de forma creíble que un hueco entre placas.
14. **Mejora**: usar el recurso real de obra — una linterna portátil a ras del muro en un ambiente oscuro — es más didáctico y auténtico que el diagrama de regla.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un muro de tabique con juntas emplastecidas en un recinto con poca luz ambiental, iluminado por una linterna sostenida a ras de la superficie desde la izquierda, revelando un leve abultamiento de la línea de junta central de unos 3 mm de alto, superficie color blanco yeso mate, textura de lijado visible."

## TABIQ-004 — Verticalidad del tabique
1. **ID**: TABIQ-004 · pág. 23 · Cap. 5 · Tabiques.
2. **Objetivo técnico**: desplome del tabique completo, de piso a cielo.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: igual principio que MUROLAD-003 pero con tolerancia fija (no escalada por altura) porque los tabiques rara vez superan una altura de piso.
5. **Defecto**: desplome del tabique respecto de la vertical.
6. **Estado correcto**: tabique a plomo en toda su altura, plomo colgante paralelo a la superficie sin separarse.
7. **Objetos**: tabique completo, plomada colgada desde el cielo a 5 cm del borde superior.
8. **Tipo de fotografía**: plano general vertical de piso a cielo, similar composición a MUROLAD-003 pero en interior con tabique placado.
9. **Condiciones de observación (manual)**: "Colocar un plomo en un eje auxiliar a 5 cm del borde superior del tabique, medir la distancia entre el plomo y el tabique en el punto más desfavorable con una huincha o regla con graduación 0 en el extremo."
10. **Instrumentos**: plomada, huincha o regla con graduación 0 en el extremo.
11. **Tolerancia (textual)**: "Verticalidad: Max. 5 mm en la altura (piso-cielo)."
12. **Variables IA**: tabique interior placado, plomada con hilo, interior residencial en construcción.
13. **Dificultad IA**: Media.
14. **Mejora**: incluir el eje auxiliar mencionado en el manual (línea de referencia a 5 cm del tabique) dibujado o marcado en la foto para que el criterio de medición sea comprensible sin leer texto.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un tabique interior de yeso-cartón visto de piso a cielo, una plomada colgando con hilo tenso paralelo al tabique separada 5 cm en la parte superior, el tabique mostrando una leve inclinación que aumenta la separación a 9 mm cerca del piso, interior de vivienda en construcción, luz artificial de obra."

## TABIQ-005 — Cuadratura tabique-tabique
1. **ID**: TABIQ-005 · pág. 23 · Cap. 5 · Tabiques.
2. **Objetivo técnico**: escuadra (ángulo de 90°) en el encuentro entre dos tabiques.
3. **Tipo**: Método de medición.
4. **Qué enseña**: el rincón interior formado por dos tabiques debe ser un ángulo recto real, no aproximado.
5. **Defecto**: rincón fuera de escuadra — abertura entre la escuadra de verificación y uno de los tabiques.
6. **Estado correcto**: escuadra de 40 cm apoyada en el rincón toca ambos tabiques sin espacio en ninguno de los dos lados.
7. **Objetos**: rincón interior de tabiques, escuadra metálica grande.
8. **Tipo de fotografía**: detalle de esquina interior, cámara a 45° del rincón para mostrar ambos planos.
9. **Condiciones de observación (manual)**: "Ubicar la escuadra horizontalmente en la esquina entre tabiques [...] apoyando uno de los cantos de la escuadra contra uno de los elementos y con una regla pequeña graduada medir a los 40 cm., en el canto no apoyado de la escuadra, la diferencia existente."
10. **Instrumentos**: escuadra, regla pequeña graduada.
11. **Tolerancia (textual)**: "Cuadratura tabique - tabique: 3 mm (escuadra a los 40 cm)."
12. **Variables IA**: escuadra metálica de carpintero grande, rincón de tabiques placados, luz de obra.
13. **Dificultad IA**: Fácil — buen contraste geométrico entre la escuadra recta y el rincón real.
14. **Mejora**: exagerar levemente el ángulo abierto para que sea perceptible a simple vista sin perder realismo del valor de 3 mm, y marcar el hueco con una línea de color.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de una esquina interior entre dos tabiques de yeso-cartón, una escuadra metálica grande de carpintero apoyada en el rincón con uno de sus brazos mostrando una separación de 3 mm respecto del tabique en el extremo, luz de obra artificial, ángulo de tres cuartos capturando ambos planos del rincón."

## TABIQ-006 — Cuadratura tabique-cielo
1. **ID**: TABIQ-006 · pág. 23 · Cap. 5 · Tabiques.
2. **Objetivo técnico**: escuadra en el encuentro entre el tabique y el cielo (ángulo de 90° en el plano vertical).
3. **Tipo**: Método de medición.
4. **Qué enseña**: mismo principio que TABIQ-005 pero en el encuentro superior (tabique-cielo) en vez del encuentro entre dos tabiques.
5. **Defecto**: encuentro fuera de escuadra en la unión superior.
6. **Estado correcto**: escuadra apoyada en el ángulo tabique-cielo sin espacio visible.
7. **Objetos**: encuentro superior tabique-cielo, escuadra.
8. **Tipo de fotografía**: contrapicado leve, encuadre del ángulo superior del recinto.
9. **Condiciones de observación (manual)**: mismo método que TABIQ-005, aplicado al plano vertical piso-cielo.
10. **Instrumentos**: escuadra, regla graduada.
11. **Tolerancia (textual)**: "Cuadratura tabique - cielo: 3 mm (escuadra a los 40 cm)."
12. **Variables IA**: escuadra apoyada contra cielo y tabique, interior residencial.
13. **Dificultad IA**: Fácil-Media.
14. **Mejora**: mostrar en la misma imagen ambos casos (TABIQ-005 y 006) como un tríptico de esquinas del mismo recinto, dando contexto espacial completo que el manual no ofrece (sus dos figuras están desconectadas visualmente).
15. **Prompt IA preliminar**: "Fotografía hiperrealista del encuentro superior entre un tabique de yeso-cartón y el cielo raso, una escuadra metálica apoyada verticalmente en el ángulo mostrando ajuste perfecto sin espacios, interior de vivienda recién placada, luz artificial cenital, contrapicado leve."

---

# CAPÍTULO 6 — Encuentro de Paramentos (pág. 24)

## ENCPAR-001 — Verticalidad en encuentro de paramentos
1. **ID**: ENCPAR-001 · pág. 24 · Cap. 6 · Encuentro de paramentos.
2. **Objetivo técnico**: verticalidad del encuentro (arista) entre dos paramentos verticales de cualquier materialidad.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la arista vertical formada por el encuentro de dos muros/tabiques debe mantenerse recta y a plomo en toda su altura.
5. **Defecto**: arista de encuentro torcida o fuera de plomo.
6. **Estado correcto**: línea de encuentro perfectamente recta y vertical, plomada paralela sin separarse.
7. **Objetos**: rincón interior o esquina exterior de dos paramentos, plomada con hilo.
8. **Tipo de fotografía**: plano general vertical del rincón, cámara centrada en la arista.
9. **Condiciones de observación (manual)**: "Colocar un plomo en un eje auxiliar a 5 cm del borde superior del paramento, medir la distancia entre el plomo y el tabique en el punto más desfavorable con una huincha o regla con graduación 0 en el extremo."
10. **Instrumentos**: plomada, huincha o regla con graduación 0.
11. **Tolerancia (textual)**: "Verticalidad: +/- 2 mm por metro de altura."
12. **Variables IA**: rincón de dos paramentos de distinta o igual materialidad, plomada colgante, interior o exterior de vivienda.
13. **Dificultad IA**: Media.
14. **Mejora**: distinguir claramente esta ficha de TABIQ-004 (verticalidad de UN tabique) mostrando explícitamente que acá se mide la ARISTA del encuentro entre dos paños, no un paño aislado — el manual los deja visualmente casi idénticos, generando confusión.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de una esquina interior donde se encuentran dos muros tabicados, una plomada colgando con hilo rojo tenso paralela a la arista del rincón desde el cielo hasta el piso, la arista mostrando una leve desviación de 4 mm en la base, interior de vivienda en construcción, luz natural difusa."

---

# CAPÍTULO 7 — Cielos Rasos (pág. 25)

## CIELO-001 — Planeidad de la superficie de cielo terminado
1. **ID**: CIELO-001 · pág. 25 · Cap. 7 · Cielos rasos.
2. **Objetivo técnico**: planeidad de un cielo raso con entramado (de madera o metálico) ya terminado.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: mismo principio de regla-hueco de los capítulos anteriores, aplicado a la cara vista (inferior) del cielo raso terminado.
5. **Defecto**: ondulación del cielo raso, comúnmente por mal nivelado de la estructura metálica/madera de soporte.
6. **Estado correcto**: superficie de cielo lisa y continua, sin ondulaciones perceptibles al apoyar la regla.
7. **Objetos**: cielo raso terminado (placa de yeso-cartón), regla/laina o galga.
8. **Tipo de fotografía**: contrapicado, regla apoyada contra el cielo.
9. **Condiciones de observación (manual)**: "Colocarla en distintas ubicaciones sobre la cara inferior del cielo, midiendo con una laina o con una galga la diferencia de planeidad entre la regla y el elemento."
10. **Instrumentos**: regla de 1,2 m o más, laina, galga.
11. **Tolerancia (textual)**: "Planeidad: +/- 3 mm medidos con una regla de 1.2 metros o más, en cualquier dirección."
12. **Variables IA**: cielo raso de placa de yeso-cartón pintado o sin pintar, regla amarilla apoyada, interior residencial.
13. **Dificultad IA**: Media — contrapicado con objeto apoyado al techo.
14. **Mejora**: usar el mismo recurso de linterna rasante de TABIQ-003, muy efectivo para cielos donde la luz natural rara vez incide de forma rasante.
15. **Prompt IA preliminar**: "Fotografía hiperrealista en contrapicado de un cielo raso de yeso-cartón en un dormitorio recién terminado, una regla de 1,2 m apoyada contra la superficie con una leve separación de 3 mm visible por sombra de linterna rasante, textura de pintura mate blanca, ambiente residencial iluminado tenuemente."

---

# CAPÍTULO 8 — Estucos (pág. 26)

## ESTUCO-001 — Verticalidad de estuco
1. **ID**: ESTUCO-001 · pág. 26 · Cap. 8 · Estucos.
2. **Objetivo técnico**: verticalidad de líneas, superficies y encuentros verticales de un muro estucado.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: el estuco (mortero de cemento aplicado como revestimiento) debe formar superficies y líneas verticales rectas, comparando dos paños o una arista de estuco contra la vertical teórica.
5. **Defecto**: desviación de la vertical en la superficie o arista de estuco.
6. **Estado correcto**: dos paños de esquina estucados perfectamente a plomo entre sí, arista recta de piso a cielo.
7. **Objetos**: esquina o paño de muro estucado, nivel/plomo, regla de apoyo.
8. **Tipo de fotografía**: plano general vertical de una esquina exterior o interior estucada.
9. **Condiciones de observación (manual)**: "Para elementos verticales se puede utilizar nivel manual con regla de apoyo. También se puede utilizar un plomo, o instrumento topográfico."
10. **Instrumentos**: nivel manual, plomo, instrumento topográfico.
11. **Tolerancia (textual)**: "Verticalidad líneas, superficies y encuentros verticales: ±5 mm en la altura de un piso."
12. **Variables IA**: superficie de estuco color gris cemento con textura rugosa característica, arista de esquina, luz de día.
13. **Dificultad IA**: Fácil-Media — la textura rugosa de estuco es reconocible y relativamente fácil de generar de forma realista.
14. **Mejora**: mostrar una esquina exterior real de fachada en construcción en vez del diagrama abstracto de dos paños paralelos — más representativo del caso real más común (esquina de fachada).
15. **Prompt IA preliminar**: "Fotografía hiperrealista de una esquina exterior de fachada recién estucada, textura de mortero de cemento gris rugosa y uniforme, un nivel de burbuja de 60 cm apoyado verticalmente sobre la arista de la esquina mostrando alineación perfecta, luz de día con cielo nublado de fondo, obra de construcción residencial."

## ESTUCO-002 — Verticalidad de estuco en encuentro de esquina
1. **ID**: ESTUCO-002 · pág. 26 · Cap. 8 · Estucos.
2. **Objetivo técnico**: mismo criterio que ESTUCO-001, ilustrado específicamente en el encuentro (arista) de esquina entre dos paños estucados.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la arista formada por el encuentro de dos paños de estuco debe ser recta y vertical.
5. **Defecto**: arista de esquina desviada de la vertical.
6. **Estado correcto**: arista de esquina recta, verificada con plomo pegado a la línea de encuentro.
7. **Objetos**: esquina estucada (interior o exterior), plomada.
8. **Tipo de fotografía**: plano general vertical centrado en la arista.
9. **Condiciones de observación (manual)**: igual a ESTUCO-001, con plomo en la arista específicamente.
10. **Instrumentos**: plomo, nivel.
11. **Tolerancia (textual)**: "± 5 mm en la altura de piso" (misma tabla que ESTUCO-001, Figs. 1 y 2).
12. **Variables IA**: arista de estuco, plomada, textura rugosa de mortero.
13. **Dificultad IA**: Media.
14. **Mejora**: complementar con vista aérea/planta esquemática de dónde está esa esquina en la vivienda, dando contexto que el manual no ofrece.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de una esquina interior de un muro estucado sin pintar, plomada con hilo colgando pegada a la arista de la esquina desde el cielo, mostrando una leve separación de 5 mm en la base, textura de mortero de cemento gris, interior de vivienda en construcción."

## ESTUCO-003 — Planeidad de estuco
1. **ID**: ESTUCO-003 · pág. 26 · Cap. 8 · Estucos.
2. **Objetivo técnico**: planeidad de la superficie de estuco terminada.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: mismo principio de regla-hueco, aplicado a la superficie rugosa del estuco.
5. **Defecto**: ondulación de la superficie estucada.
6. **Estado correcto**: superficie de estuco pareja, sin resaltes ni depresiones al apoyar la regla en cualquier dirección.
7. **Objetos**: paño de muro estucado, regla.
8. **Tipo de fotografía**: plano medio frontal, luz rasante para resaltar la textura y el eventual hueco.
9. **Condiciones de observación (manual)**: "Para medición de la planeidad se debe utilizar regla de dimensiones adecuadas al elemento, colocándola en distintas ubicaciones y con una regla con cero en el borde medir las diferencias encontradas entre el elemento y la regla."
10. **Instrumentos**: regla con cero en el borde.
11. **Tolerancia (textual)**: "Planeidad: ± 5 mm (regla en cualquier posición y dirección)."
12. **Variables IA**: textura de estuco rugosa realista, regla apoyada, sombra de hueco.
13. **Dificultad IA**: Fácil — la textura rugosa del estuco ayuda a que el defecto de planeidad se perciba naturalmente.
14. **Mejora**: par lado a lado con un estuco "correcto" (regla sin hueco) para comparación directa, algo que el manual no ofrece (solo muestra el método, no el resultado bien/mal).
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un muro estucado exterior, regla de aluminio de 1,2 m apoyada horizontalmente, un hueco de 6 mm visible bajo la regla en el sector central marcado por sombra de luz rasante de atardecer, textura de mortero rugosa color gris natural, fachada de vivienda en construcción."

---

# CAPÍTULO 9 — Enlucidos de Yeso (pág. 27-28)

## YESO-001 — Planeidad del enlucido
1. **ID**: YESO-001 · pág. 28 · Cap. 9 · Enlucidos de yeso.
2. **Objetivo técnico**: planeidad de la superficie enlucida con yeso.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: mismo principio de regla-hueco, sobre una superficie de yeso liso (más fina y blanca que estuco).
5. **Defecto**: ondulación de la superficie enlucida.
6. **Estado correcto**: superficie de yeso perfectamente lisa y plana, sin ninguna sombra al apoyar la regla.
7. **Objetos**: muro con enlucido de yeso blanco, regla de 1,2 m mínimo.
8. **Tipo de fotografía**: plano medio con luz rasante fuerte (el yeso liso solo revela defectos con luz muy rasante).
9. **Condiciones de observación (manual)**: "La planeidad se mide utilizando una regla de 1,2 metros, ubicada en cualquier dirección sobre la superficie a evaluar. Con un instrumento graduado, se mide la separación entre la superficie y la regla."
10. **Instrumentos**: regla de 1,2 m, instrumento graduado.
11. **Tolerancia (textual)**: "Planeidad: ± 3 mm medido con regla de 1,2 metros o más, para muros y cielos, en cualquier dirección."
12. **Variables IA**: superficie de yeso blanco muy liso, luz rasante artificial (linterna), regla amarilla o plateada.
13. **Dificultad IA**: Fácil — alto contraste entre superficie blanca lisa y sombra.
14. **Mejora**: usar exactamente el recurso gráfico ya presente en el propio manual (círculo de detalle con regla y nivel superpuestos), pero como foto real en vez de ilustración — es de los pocos diagramas del manual con buena claridad pedagógica ya.
15. **Prompt IA preliminar**: "Fotografía hiperrealista en primer plano de un muro con enlucido de yeso blanco recién aplicado, una regla plateada de 1,2 m apoyada horizontalmente, sombra de 3 mm visible bajo la regla producida por una linterna a ras de muro sostenida desde la izquierda, superficie lisa y mate."

## YESO-002 — Linealidad de aristas
1. **ID**: YESO-002 · pág. 28 · Cap. 9 · Enlucidos de yeso.
2. **Objetivo técnico**: rectitud de la línea de arista (vértice) formada por el enlucido en un encuentro de muros.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la línea de vértice del enlucido debe ser recta, no ondulada, medida por metro lineal.
5. **Defecto**: arista ondulada u "olas" en la línea de vértice.
6. **Estado correcto**: arista de encuentro perfectamente recta, sin desviación visible respecto a una línea de referencia.
7. **Objetos**: arista/vértice de enlucido de yeso, línea de referencia (hilo o regla).
8. **Tipo de fotografía**: primer plano de la arista vertical, cámara paralela a la línea.
9. **Condiciones de observación (manual)**: "La linealidad de aristas, se mide con un instrumento graduado, utilizando trazos auxiliares, determinando la diferencia entre la superficie enlucida y la línea del vértice."
10. **Instrumentos**: instrumento graduado, trazos auxiliares (hilo/línea de tiza).
11. **Tolerancia (textual)**: "Linealidad de aristas: ± 3 mm por metro."
12. **Variables IA**: arista de yeso blanco, línea de hilo rojo tenso de referencia junto a la arista real ligeramente ondulada.
13. **Dificultad IA**: Media — requiere que la IA muestre una desviación sutil y creíble en una línea recta.
14. **Mejora**: superponer digitalmente (en la versión ObraBien, no en la foto generada) una línea guía recta sobre la arista real para hacer el defecto obvio de un vistazo.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de la arista vertical de un encuentro de muros con enlucido de yeso blanco, un hilo rojo tenso paralelo a la arista como línea de referencia, la arista real desviándose levemente del hilo en el tercio central, luz de día lateral suave."

## YESO-003 — Cuadratura de esquinas
1. **ID**: YESO-003 · pág. 28 · Cap. 9 · Enlucidos de yeso.
2. **Objetivo técnico**: escuadra (90°) de esquinas internas y externas enlucidas.
3. **Tipo**: Método de medición.
4. **Qué enseña**: mismo principio de escuadra-en-rincón que TABIQ-005, aplicado a enlucido de yeso, con escuadra de 30 cm.
5. **Defecto**: esquina fuera de escuadra.
6. **Estado correcto**: escuadra de 30 cm apoyada en el rincón sin espacio visible en ningún lado.
7. **Objetos**: esquina interna o externa enlucida, escuadra de carpintero.
8. **Tipo de fotografía**: detalle de esquina a 45°.
9. **Condiciones de observación (manual)**: "Se mide utilizando escuadra de 30 cm. identificando la distancia entre el muro y la escuadra, se debe verificar en diferentes ubicaciones eligiendo puntos o haciendo un barrido en todo el encuentro."
10. **Instrumentos**: escuadra de 30 cm.
11. **Tolerancia (textual)**: "Cuadratura de esquinas, internas y externas: 3 mm con escuadra de 30 cm."
12. **Variables IA**: escuadra metálica, esquina de yeso blanco, luz de obra.
13. **Dificultad IA**: Fácil.
14. **Mejora**: distinguir con claridad esquina interna vs. externa en dos fotos separadas (el manual las trata en el mismo enunciado sin diferenciarlas visualmente).
15. **Prompt IA preliminar**: "Fotografía hiperrealista de una esquina interna de un muro con enlucido de yeso blanco liso, una escuadra metálica de 30 cm apoyada perfectamente en el rincón sin espacios visibles, luz de día suave, textura de yeso mate."

## YESO-004 — Verticalidad de aristas
1. **ID**: YESO-004 · pág. 28 · Cap. 9 · Enlucidos de yeso.
2. **Objetivo técnico**: verticalidad (plomo) de la arista de encuentro enlucida.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: además de recta (linealidad, YESO-002), la arista debe estar a plomo — dos criterios relacionados pero distintos.
5. **Defecto**: arista inclinada respecto de la vertical.
6. **Estado correcto**: arista vertical exacta, nivel de burbuja centrado al apoyarlo contra ella.
7. **Objetos**: arista de yeso, nivel de burbuja.
8. **Tipo de fotografía**: plano vertical de la arista con el nivel apoyado.
9. **Condiciones de observación (manual)**: "La verticalidad de aristas, se mide ubicando un nivel de burbuja, indicando posición vertical. Se mide la diferencia entre el borde del nivel y la superficie enlucida."
10. **Instrumentos**: nivel de burbuja.
11. **Tolerancia (textual)**: "Verticalidad de aristas: ± 2 mm por metro."
12. **Variables IA**: nivel de burbuja amarillo apoyado en la arista, burbuja centrada o descentrada, yeso blanco.
13. **Dificultad IA**: Fácil — el nivel de burbuja es un objeto reconocible y fácil de renderizar con precisión.
14. **Mejora**: mostrar la burbuja del nivel en detalle (inserto/zoom) para que el usuario entienda visualmente qué significa "centrada" — el manual no muestra la burbuja en absoluto.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un nivel de burbuja amarillo de 60 cm apoyado verticalmente sobre una arista de yeso enlucido blanco, la burbuja del nivel visible y levemente descentrada, luz de día natural, primer plano con foco nítido en el nivel."

---

# CAPÍTULO 10 — Revestimientos Cerámicos (pág. 29-31)

## CERAM-001 — Diferencia de nivel entre palmetas
1. **ID**: CERAM-001 · pág. 31 · Cap. 10 · Revestimientos cerámicos.
2. **Objetivo técnico**: desnivel (escalón) entre dos piezas cerámicas/porcelanato adyacentes.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: al pasar la mano por la unión de dos piezas, no debe sentirse un escalón — tolerancia distinta para piso (más estricta, riesgo de tropiezo) que para otras superficies.
5. **Defecto**: una palmeta más alta que su vecina en el borde de la junta.
6. **Estado correcto**: piezas perfectamente a nivel entre sí, superficie continua al tacto.
7. **Objetos**: piso o muro cerámico, mano o galga en el borde de unión.
8. **Tipo de fotografía**: macro del borde entre dos palmetas, luz rasante para revelar el escalón.
9. **Condiciones de observación (manual)**: "Para la verificación de la planeidad en pisos y otras superficies, se debe utilizar regla de dimensiones adecuadas a la superficie del elemento, colocándola en distintas ubicaciones y con un instrumento graduado (con cero en borde) medir las diferencias entre la regla y el revestimiento cerámico."
10. **Instrumentos**: instrumento graduado con cero en el borde, galga.
11. **Tolerancia (textual)**: "Diferencia de nivel entre palmetas en pisos: 1 mm (entre los bordes de 2 palmetas) · en otras superficies: 2 mm."
12. **Variables IA**: cerámica o porcelanato color claro, junta entre piezas, luz rasante lateral marcando el escalón con una sombra fina.
13. **Dificultad IA**: Fácil — muy fotogénico, patrón habitual en fotografía de detalle de pisos.
14. **Mejora**: agregar la prueba táctil como recurso visual — una mano pasando sobre la unión — más intuitivo para el usuario final que el diagrama de sección abstracto del manual.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de dos palmetas de porcelanato blanco en un piso, luz rasante fuerte desde la derecha revelando un escalón de 2 mm entre ambas piezas mediante una fina línea de sombra, junta de pasta gris clara, textura de porcelanato pulido con reflejo sutil."

## CERAM-002 — Alineación vertical y horizontal
1. **ID**: CERAM-002 · pág. 31 · Cap. 10 · Revestimientos cerámicos.
2. **Objetivo técnico**: alineación de las líneas de junta (canterías) entre cerámicos, tanto vertical como horizontalmente, y espesor uniforme de la junta.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: las juntas deben formar una retícula perfectamente alineada en ambos sentidos, con espesor de cantería constante.
5. **Defecto**: juntas desalineadas ("dientes de sierra") o de espesor variable entre piezas.
6. **Estado correcto**: retícula de juntas perfectamente alineada, líneas rectas continuas en ambas direcciones, espesor de junta idéntico en todo el paño.
7. **Objetos**: paño amplio de cerámicos o porcelanato, línea de referencia (hilo o láser), regla.
8. **Tipo de fotografía**: plano general cenital o frontal de un paño completo (piso o muro), suficiente para mostrar varias filas y columnas.
9. **Condiciones de observación (manual)**: "La alineación de canterías, se puede medir con regla o una lienza, entre los extremos del elemento y con una regla graduada, medir las diferencias. El espesor de canterías, se debe medir con regla graduada, cuidando la perpendicularidad de esta en la medición."
10. **Instrumentos**: regla, lienza (hilo tensado), regla graduada.
11. **Tolerancia (textual)**: "Alineación de canterías en ambos sentidos: ± 2 mm en 3 m · Espesor de canterías: ± 2 mm."
12. **Variables IA**: piso de porcelanato beige/gris en formato rectificado, junta fina, vista cenital con líneas de perspectiva convergentes leves.
13. **Dificultad IA**: Media — mantener una retícula geométricamente coherente en toda la imagen es más exigente para el modelo de IA que un detalle puntual.
14. **Mejora**: vista cenital pura (dron/cámara elevada) en vez de la vista isométrica del manual, replicando cómo realmente se percibe el desalineado al entrar a un recinto — más fiel a la experiencia real del usuario.
15. **Prompt IA preliminar**: "Fotografía cenital hiperrealista de un piso de porcelanato rectificado color gris claro en una sala amplia, retícula de juntas finas mayormente alineada salvo una fila que se desvía 3 mm hacia la derecha en el tercio derecho de la imagen, luz de día uniforme desde ventanas laterales, sin mobiliario, cámara a 3 metros de altura mirando hacia abajo."

---

# CAPÍTULO 11 — Gradas de Escaleras (pág. 32-33)

## GRADA-001 — Tolerancias para alturas de contrahuellas y anchos de huellas
1. **ID**: GRADA-001 · pág. 33 · Cap. 11 · Gradas de escaleras.
2. **Objetivo técnico**: uniformidad de la altura de contrahuella y el ancho de huella entre peldaños consecutivos de una escalera.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: todos los peldaños de una escalera deben tener la misma altura y profundidad entre sí — la variación entre 2 gradas consecutivas es la más riesgosa (genera tropiezos por hábito de zancada).
5. **Defecto**: peldaño con contrahuella o huella distinta a sus vecinos.
6. **Estado correcto**: todos los peldaños con altura y profundidad idéntica, huincha mostrando la misma medida grada a grada.
7. **Objetos**: tramo de escalera completo, huincha o regla graduada con cero en el extremo.
8. **Tipo de fotografía**: vista lateral (perfil) del tramo completo de escalera, para comparar el perfil de todos los peldaños en una sola imagen.
9. **Condiciones de observación (manual)**: "Se debe medir el fondo de la huella y la altura de la contrahuella con una huincha o regla graduada con el cero en el extremo, el número de mediciones por grada se establecen en la tabla 2."
10. **Instrumentos**: huincha, regla graduada con cero en el extremo.
11. **Tolerancia (textual)**: "Altura de contrahuella: ± 5 mm · Diferencia entre 2 gradas consecutivas: ± 5 mm · Huella: ± 5 mm."
12. **Variables IA**: escalera de hormigón o madera con recubrimiento de terminación, huincha, luz de día lateral (ventana o vano de escalera).
13. **Dificultad IA**: Media — requiere que la IA mantenga proporciones geométricas coherentes en perspectiva de perfil.
14. **Mejora**: destacar visualmente (línea de nivel de color) la diferencia de altura entre dos peldaños específicos, en vez de dejar que el usuario deba compararlos a ojo como en el diagrama del manual.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de perfil de un tramo de escalera interior de 8 peldaños con recubrimiento de porcelanato, luz de día natural desde una ventana lateral, un peldaño en la mitad del tramo con una contrahuella visiblemente más alta que sus vecinos, una regla metálica apoyada verticalmente mostrando la diferencia de 8 mm, textura de porcelanato realista."

## GRADA-002 — Ejemplo de puntos de medición para escalera de 1,50 m de ancho
1. **ID**: GRADA-002 · pág. 33 · Cap. 11 · Gradas de escaleras.
2. **Objetivo técnico**: metodología de cuántos puntos medir por grada según el ancho de la escalera (no es un criterio de defecto en sí, es un protocolo de muestreo).
3. **Tipo**: Método de medición.
4. **Qué enseña**: en escaleras anchas (>1,5 m) se deben tomar mediciones distribuidas cada 0,75 m de ancho, no solo al centro — evita que un defecto localizado en un extremo pase inadvertido.
5. **Defecto**: sin defecto — es protocolo de muestreo, no un estado incorrecto en sí.
6. **Estado correcto**: no aplica un "estado correcto" fotografiable distinto de GRADA-001 — esta ficha es sobre CÓMO medir, no sobre qué se ve.
7. **Objetos**: escalera ancha, huincha o regla, marcas de los 3 puntos de medición por grada (a 1/3 y 2/3 del ancho).
8. **Tipo de fotografía**: vista en planta/cenital de una grada ancha mostrando los 3 puntos de medición marcados.
9. **Condiciones de observación (manual)**: "Escaleras de ancho mayor a 1,5m: Una medición por cada 0,75m de ancho uniformemente distribuidas."
10. **Instrumentos**: huincha o regla graduada.
11. **Tolerancia (textual)**: no aplica tabla de tolerancia propia — remite a Tabla 1 (GRADA-001); esta ficha es la Tabla 2 (protocolo de puntos a medir).
12. **Variables IA**: escalera ancha institucional o residencial de gran formato, marcas de tiza o cinta en 3 puntos de la huella.
13. **Dificultad IA**: Difícil de representar fotográficamente sin caer en un diagrama — es contenido metodológico, no visual por naturaleza.
14. **Mejora**: convertir en una infografía simple superpuesta a una foto real de escalera (no un diagrama abstracto ni una foto pura) — es el caso donde el formato mixto foto+anotación supera tanto al diagrama puro del manual como a una foto sin contexto.
15. **Prompt IA preliminar**: "Fotografía cenital hiperrealista de una huella de escalera ancha de 1,5 metros con acabado de porcelanato, tres marcas de tiza discretas distribuidas uniformemente a lo ancho del peldaño, huincha metálica extendida sobre la huella, luz de día natural."

---

# CAPÍTULO 12 — Puertas (pág. 34-35)

## PUERTA-001 — Verticalidad de rasgos (vano)
1. **ID**: PUERTA-001 · pág. 35 · Cap. 12 · Puertas.
2. **Objetivo técnico**: verticalidad del vano (marco de obra) donde se instalará la puerta.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: los lados del vano deben estar a plomo — un vano torcido complica el ajuste y funcionamiento posterior de la puerta.
5. **Defecto**: lado del vano desviado de la vertical.
6. **Estado correcto**: ambos lados del vano perfectamente a plomo, plomada paralela sin separarse.
7. **Objetos**: vano de puerta sin instalar (obra gruesa o tabique terminado), plomada.
8. **Tipo de fotografía**: plano general vertical del vano completo.
9. **Condiciones de observación (manual)**: "La verticalidad del vano se debe medir por ambos lados con una plomada desde la parte superior del vano y con huincha o regla graduada verificar las distancias entre superior e inferior del vano, la diferencia existente se ponderará en función de la altura."
10. **Instrumentos**: plomada, huincha o regla graduada.
11. **Tolerancia (textual)**: "Verticalidad: ± 0,3% de la altura."
12. **Variables IA**: vano de puerta en obra gruesa o tabique sin puerta instalada, plomada, interior en construcción.
13. **Dificultad IA**: Media.
14. **Mejora**: mostrar el vano ANTES de instalar la puerta (como pide el manual) es contraintuitivo para el usuario de ObraBien, que inspecciona la puerta YA instalada — conviene reformular como PUERTA-003 (rectitud de bastidores) que sí es visible en la puerta final; se mantiene esta ficha para completitud normativa pero se marca de bajo uso práctico.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un vano de puerta en un tabique de yeso-cartón sin puerta instalada, plomada colgando junto al lado izquierdo del vano mostrando una leve desviación en la base, interior de vivienda en construcción, luz artificial de obra."

## PUERTA-002 — Horizontalidad y dimensiones del vano
1. **ID**: PUERTA-002 · pág. 35 · Cap. 12 · Puertas.
2. **Objetivo técnico**: horizontalidad del dintel superior del vano, y sus dimensiones de alto/ancho.
3. **Tipo**: Método de medición.
4. **Qué enseña**: el dintel debe estar nivelado y las dimensiones del vano deben coincidir con lo especificado, para que la puerta calce correctamente.
5. **Defecto**: dintel inclinado o vano de dimensión incorrecta.
6. **Estado correcto**: dintel horizontal (nivel centrado), alto y ancho del vano dentro de tolerancia.
7. **Objetos**: vano completo, nivel de mano, huincha.
8. **Tipo de fotografía**: plano general del vano con el nivel apoyado en el dintel.
9. **Condiciones de observación (manual)**: "Se debe verificar la horizontalidad en la parte superior del vano con un nivel carpintero u otro similar. [...] La altura del vano se debe medir con huincha en los extremos del vano y en el centro [...] El ancho del vano se debe medir con huincha tomando a lo menos tres medidas."
10. **Instrumentos**: nivel carpintero, huincha.
11. **Tolerancia (textual)**: "Horizontalidad: ± 0,3% del ancho · Altura del vano: ± 6 mm · Ancho del vano: ± 6 mm."
12. **Variables IA**: vano en obra gruesa, nivel de burbuja carpintero apoyado en el dintel.
13. **Dificultad IA**: Media.
14. **Mejora**: combinar en una sola foto tanto la verificación de horizontalidad (nivel) como la de ancho (huincha), en vez de fichas separadas — reduce el número de fotos que el usuario debe interpretar por partida.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un vano de puerta en obra gruesa de hormigón, un nivel de burbuja carpintero apoyado horizontalmente en el dintel superior con la burbuja centrada, huincha metálica extendida verticalmente en uno de los lados, luz de obra artificial."

## PUERTA-003 — Rectitud de bastidores
1. **ID**: PUERTA-003 · pág. 35 · Cap. 12 · Puertas.
2. **Objetivo técnico**: rectitud de los cabezales (bastidores laterales) de la hoja de la puerta ya fabricada.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: el borde lateral de la hoja de puerta debe ser perfectamente recto, sin arqueamiento.
5. **Defecto**: bastidor curvo — la hoja "se abre" en el medio respecto de una regla recta apoyada en el canto.
6. **Estado correcto**: canto de la hoja perfectamente recto, regla apoyada sin dejar espacio.
7. **Objetos**: hoja de puerta de madera apoyada de canto, regla del alto de la hoja.
8. **Tipo de fotografía**: plano vertical del canto de la puerta con la regla apoyada — este es uno de los pocos casos donde el manual sí tiene una figura clara y reutilizable tal cual.
9. **Condiciones de observación (manual)**: "La rectitud de los cabezales, se mide con una regla de dimensiones, igual o superior al ancho de la hoja de puerta. La regla se coloca en la parte superior e inferior de la hoja, verificando la desviación entre los cabezales y la regla, con una huincha o regla pequeña graduada con el cero en el borde."
10. **Instrumentos**: regla de dimensiones ≥ ancho de hoja, huincha o regla pequeña graduada.
11. **Tolerancia (textual)**: "Rectitud de bastidores: ±1,5 mm."
12. **Variables IA**: hoja de puerta de madera enchapada, canto visto de perfil, regla metálica larga.
13. **Dificultad IA**: Fácil — geometría simple, alto contraste.
14. **Mejora**: agregar vista de la puerta completa instalada además del detalle de canto, dando contexto de qué parte de la puerta se está evaluando.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de una hoja de puerta de madera enchapada vista de canto, una regla metálica larga apoyada a lo largo del borde mostrando un leve arqueamiento de 3 mm en el centro, taller o interior de vivienda, luz natural difusa."

## PUERTA-004 — Planeidad de puertas
1. **ID**: PUERTA-004 · pág. 35 · Cap. 12 · Puertas.
2. **Objetivo técnico**: planeidad de la cara de la hoja de puerta (que no esté "combada" o alabeada).
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la superficie de la puerta debe ser plana, sin combadura, verificada con regla de 1,2 m o más apoyada en cualquier dirección sobre la cara de la hoja.
5. **Defecto**: hoja de puerta combada/alabeada.
6. **Estado correcto**: superficie de la hoja perfectamente plana en todas direcciones.
7. **Objetos**: hoja de puerta, regla larga.
8. **Tipo de fotografía**: plano frontal de la hoja completa con la regla apoyada diagonalmente.
9. **Condiciones de observación (manual)**: "La planeidad de puertas, se mide con regla de 1,2 m. o más, colocándola en distintas ubicaciones, en cualquier dirección de las superficies de las caras de la puerta, luego medir con una regla pequeña graduada o una huincha, la diferencia de planeidad entre la regla y la hoja de puerta."
10. **Instrumentos**: regla de 1,2 m o más, regla pequeña graduada o huincha.
11. **Tolerancia (textual)**: "Planeidad: ±3 mm."
12. **Variables IA**: puerta de madera enchapada, regla diagonal en la cara, luz rasante lateral.
13. **Dificultad IA**: Media.
14. **Mejora**: exagerar sutilmente la combadura en la versión "incorrecta" para que sea perceptible en foto (una combadura de 3 mm en una hoja de 2 m es casi invisible sin la regla) y mostrar siempre el par con la regla como referencia obligatoria.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de una hoja de puerta de madera enchapada color nogal, una regla de aluminio de 1,8 m apoyada en diagonal sobre la cara de la puerta, un hueco de 4 mm visible en el extremo superior por combadura leve, luz rasante de ventana lateral, interior residencial."

## PUERTA-005 — Paralelismo entre hojas y marco
1. **ID**: PUERTA-005 · pág. 35 · Cap. 12 · Puertas.
2. **Objetivo técnico**: holgura pareja (paralelismo) entre el canto de la hoja y el marco, en todo el perímetro.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la separación entre la hoja cerrada y el marco debe ser constante en todo el contorno — variaciones indican que la hoja no quedó "escuadrada" en la instalación.
5. **Defecto**: holgura desigual entre hoja y marco (más ancha en un punto, más angosta en otro).
6. **Estado correcto**: holgura uniforme de 3 mm en todo el perímetro entre hoja y marco.
7. **Objetos**: puerta instalada y cerrada, huincha o galga.
8. **Tipo de fotografía**: detalle del canto de la puerta cerrada contra el marco, en 2-3 puntos del perímetro (esquina superior, lateral, inferior).
9. **Condiciones de observación (manual)**: "En marcos y hojas de puertas ya instaladas y cerradas, se mide con huincha o regla pequeña graduada, la distancia entre los bordes laterales y superior de las hojas de la puerta con el marco."
10. **Instrumentos**: huincha, regla pequeña graduada, galga.
11. **Tolerancia (textual)**: "Paralelismo entre hojas y marco: 3 mm."
12. **Variables IA**: puerta cerrada, galga insertada en la holgura, marco de madera o metal.
13. **Dificultad IA**: Fácil-Media.
14. **Mejora**: usar una galga de espesores (herramienta más precisa y visualmente clara que una regla) insertada literalmente en la holgura — recurso más profesional que el que usa el manual.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de la holgura entre una hoja de puerta cerrada y su marco de madera, una galga de espesores metálica insertada en el hueco mostrando 3 mm parejos, textura de madera barnizada, luz interior cálida."

## PUERTA-006 — Paralelismo entre puertas de dos hojas
1. **ID**: PUERTA-006 · pág. 35 · Cap. 12 · Puertas.
2. **Objetivo técnico**: paralelismo del encuentro central entre las dos hojas de una puerta doble.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: en puertas de dos hojas, el hueco central entre ambas debe ser constante en toda su altura.
5. **Defecto**: hueco central variable (más ancho arriba que abajo, o viceversa).
6. **Estado correcto**: hueco central uniforme de 3 mm en toda la altura de la puerta.
7. **Objetos**: puerta de dos hojas cerrada, galga o regla pequeña.
8. **Tipo de fotografía**: plano vertical del encuentro central, mostrando toda la altura.
9. **Condiciones de observación (manual)**: "Para puertas de dos hojas, manteniendo las hojas cerradas, se mide con huincha o regla pequeña graduada, la distancia entre los bordes adyacentes de ambas hojas. La medición se realiza verificando que el plomo entre los bordes de las hojas se mantenga dentro de la tolerancia indicada a lo largo de todas las huelgas."
10. **Instrumentos**: huincha, regla pequeña graduada.
11. **Tolerancia (textual)**: "Paralelismo entre puertas de dos hojas: 3 mm."
12. **Variables IA**: puerta doble de acceso principal, encuentro central, luz de entrada natural.
13. **Dificultad IA**: Media.
14. **Mejora**: usar una puerta de acceso principal (contexto residencial reconocible) en vez de una puerta interior genérica — más representativo del caso de uso real (puertas dobles son comunes en acceso principal, poco en interiores).
15. **Prompt IA preliminar**: "Fotografía hiperrealista del encuentro central de una puerta doble de acceso principal de una vivienda, vista desde el interior, hueco central uniforme de 3 mm visible en toda su altura, madera maciza barnizada, luz de día entrando por el hueco."

---

# CAPÍTULO 13 — Ventanas (pág. 36-38)

## VENTANA-001 — Manchas, rayas o decoloraciones en marcos
1. **ID**: VENTANA-001 · pág. 37 · Cap. 13 · Ventanas.
2. **Objetivo técnico**: aceptabilidad de manchas, rayas, abolladuras o decoloraciones en el marco/hoja de la ventana, según visibilidad a distancia de observación estándar.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: no toda imperfección es un defecto — solo cuenta si es visible desde 1,5 m de distancia perpendicular, y máximo 2 por componente.
5. **Defecto**: raya o mancha visible en el marco de aluminio/PVC a 1,5 m de distancia.
6. **Estado correcto**: superficie del marco limpia y uniforme, sin rayas perceptibles a la distancia de observación.
7. **Objetos**: marco de ventana de aluminio o PVC, observador a distancia de referencia.
8. **Tipo de fotografía**: plano general con el observador incluido en el encuadre a la distancia exacta indicada, y un segundo plano de detalle de la raya.
9. **Condiciones de observación (manual)**: "Para verificar la presencia de manchas, rayas, abolladuras o decoloraciones, se debe ubicar el observador a una distancia perpendicular de 1,5 metros."
10. **Instrumentos**: ninguno (evaluación visual a distancia fija).
11. **Tolerancia (textual)**: "Puntuales y no más de dos por componente siempre que no sean visibles a una distancia perpendicular a la ventana de 1,5 m."
12. **Variables IA**: marco de aluminio color blanco o gris, rayas superficiales sutiles, persona de referencia a escala real para la distancia.
13. **Dificultad IA**: Media — requiere coherencia de escala entre la persona y la ventana para que la distancia de 1,5 m sea creíble.
14. **Mejora**: par de fotos — una a 1,5 m (donde la raya "desaparece", correcto según norma) y un zoom a 30 cm (donde la raya es evidente) — enseña el concepto contraintuitivo de que la distancia de evaluación importa, algo que el manual explica en texto pero no logra mostrar bien en su propio esquema.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de una ventana de aluminio blanco en una fachada residencial, una persona con casco de obra de pie a 1,5 metros de distancia observando el marco, una raya superficial fina de 6 cm visible en el marco solo al acercarse, luz de día exterior, cámara al nivel de los ojos del observador."

## VENTANA-002 — Paralelismo entre hojas y marco
1. **ID**: VENTANA-002 · pág. 38 · Cap. 13 · Ventanas.
2. **Objetivo técnico**: paralelismo entre la hoja y el marco de la ventana, sin luz visible entre ambos estando cerrada.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: con la ventana cerrada, no debe verse luz pasando entre marco y hoja ni entre hojas — señal directa de mal sellado/ajuste.
5. **Defecto**: luz visible entre marco y hoja (o entre hojas) con la ventana cerrada.
6. **Estado correcto**: ventana cerrada sin ninguna línea de luz visible en el perímetro del cierre.
7. **Objetos**: ventana cerrada, luz exterior de fondo (contraluz) que revela el defecto.
8. **Tipo de fotografía**: contraluz — cámara desde el interior con la ventana cerrada y luz exterior de fondo, exactamente el método real de detección.
9. **Condiciones de observación (manual)**: "En marcos y hojas de ventanas ya instaladas y cerradas, se debe medir con un instrumento graduado, la distancia entre los bordes laterales y superior de las hojas de la ventana con el marco o entre hojas."
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Paralelismo entre hojas y entre marco y hojas: ± 2 mm, Estando cerrada no debe verse luz entre el marco o perfil de la hoja ni entre las hojas que constituyen la ventana."
12. **Variables IA**: ventana de aluminio o PVC cerrada, contraluz exterior brillante, línea fina de luz colándose por el marco.
13. **Dificultad IA**: Fácil-Media — el contraluz es un recurso fotográfico muy fotogénico y reconocible.
14. **Mejora**: este es el caso de mayor potencial fotográfico de todo el manual — reemplazar completamente el diagrama esquemático de círculos por la fotografía real a contraluz, que es exactamente el método que cualquier inspector usa en terreno.
15. **Prompt IA preliminar**: "Fotografía hiperrealista tomada desde el interior de una vivienda al atardecer, una ventana corredera de aluminio cerrada, contraluz exterior intenso revelando una delgada línea de luz filtrándose entre el marco y la hoja en el lado derecho, silueta del marco en sombra, interior desenfocado en primer plano."

## VENTANA-003 — Vidrios de ventanas (detección de fallas)
1. **ID**: VENTANA-003 · pág. 38 · Cap. 13 · Ventanas.
2. **Objetivo técnico**: protocolo de detección de fallas en el vidrio (rayas, burbujas, manchas) según distancia y ángulo de observación normado (ASTM 1036-01).
3. **Tipo**: Método de medición.
4. **Qué enseña**: la intensidad de una falla en el vidrio se clasifica según la distancia a la que deja de ser perceptible — un protocolo objetivo de aceptación/rechazo, no solo "se ve o no se ve".
5. **Defecto**: falla lineal en el vidrio (raya, burbuja) — su severidad depende de la distancia de detección.
6. **Estado correcto**: vidrio sin fallas detectables desde la distancia de referencia aplicable (según Tabla 3 del manual, distinta para vidrios corrientes vs. tinteados/reflectivos).
7. **Objetos**: paño de vidrio, observador a 4 m retrocediendo hasta el punto de detección.
8. **Tipo de fotografía**: secuencia de 2 fotos — posición inicial a 4 m, y punto de detección de la falla — replicando el protocolo real.
9. **Condiciones de observación (manual)**: "La muestra se coloca en posición vertical, frente al observador. El observador se ubica aproximadamente a 4 metros de la muestra. El observador mira a través de la muestra en un ángulo de 90°. La detección de fallas [...] se realiza con luz de día (sin luz solar directa) [...] con un mínimo de iluminancia de 160 pie-candela (1722 lux)."
10. **Instrumentos**: ninguno físico — protocolo de observación normado (ASTM C 1036-01).
11. **Tolerancia (textual)**: "Sobre 3,3 m: Alta · Desde 3,3 m a 1,01 m: Media · Desde 1 m a 0,2 m: Leve · Menos de 0,2 m: Débil" (distancia de detección → intensidad del defecto).
12. **Variables IA**: vidrio templado de ventana, luz de día difusa (nublado, sin sol directo), persona alejándose en secuencia.
13. **Dificultad IA**: Difícil — representar una falla de vidrio sutil y su gradiente de visibilidad según distancia es un desafío técnico alto para generación de imágenes.
14. **Mejora**: convertir el protocolo en una infografía de 4 fotogramas (a 4 m, 3,3 m, 1 m, 0,2 m) mostrando cómo "aparece" la falla progresivamente — mucho más didáctico que el diagrama estático único del manual.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un paño de vidrio de ventana visto de frente con luz de día difusa nublada, una falla lineal sutil de 8 cm visible cerca del borde inferior, un observador con casco de obra desenfocado en el fondo situado a 1 metro de distancia, ángulo de cámara perpendicular al vidrio, reflejo tenue del cielo en la superficie."

---

# CAPÍTULO 14 — Revestimientos de Papel (pág. 39-40)

## PAPEL-001 — Piquetes en papel mural
1. **ID**: PAPEL-001 · pág. 40 · Cap. 14 · Revestimientos de papel.
2. **Objetivo técnico**: ausencia de piquetes (pequeños agujeros/marcas) visibles en el papel mural instalado.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: los piquetes no deben poder observarse de pie a 1 m de distancia — mismo criterio de "distancia de detección" que otras fichas.
5. **Defecto**: piquete visible a 1 m de distancia.
6. **Estado correcto**: superficie de papel mural continua y sin marcas perceptibles a la distancia de observación normal.
7. **Objetos**: muro con papel mural instalado, observador de referencia a 1 m.
8. **Tipo de fotografía**: plano general con observador a escala, y un detalle macro del piquete.
9. **Condiciones de observación (manual)**: "Que no se puedan observar de pie a una distancia de 1m."
10. **Instrumentos**: ninguno (evaluación visual a distancia).
11. **Tolerancia (textual)**: "Piquetes: Que no se puedan observar de pie a una distancia de 1m."
12. **Variables IA**: papel mural con patrón/textura, pequeño piquete visible en detalle, persona de referencia a 1 m.
13. **Dificultad IA**: Media — el papel mural con patrón repetitivo es exigente para que la IA no distorsione el diseño.
14. **Mejora**: mostrar el mismo defecto en dos tomas (a 1 m, invisible; en macro, evidente) — refuerza el criterio de "distancia de aceptación" de forma mucho más clara que el dibujo esquemático del manual.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un muro con papel mural de patrón geométrico sutil color beige, una persona de pie a 1 metro de distancia observando el muro, un pequeño piquete de 3 mm apenas visible en el papel a media altura, luz interior cálida."

## PAPEL-002 — Encuentro de papel mural con guardapolvo y cornisa
1. **ID**: PAPEL-002 · pág. 40 · Cap. 14 · Revestimientos de papel.
2. **Objetivo técnico**: separación entre el borde del papel mural y la cornisa/guardapolvo.
3. **Tipo**: Método de medición.
4. **Qué enseña**: el papel debe llegar hasta muy cerca del borde de cornisa o guardapolvo (1 mm), sin dejar franja de muro visible ni montarse sobre la moldura.
5. **Defecto**: separación excesiva entre el papel y la cornisa/guardapolvo dejando franja de muro sin cubrir.
6. **Estado correcto**: papel mural llegando justo hasta el borde de la cornisa/guardapolvo, con separación mínima de 1 mm, sin superposición.
7. **Objetos**: encuentro superior (cornisa) e inferior (guardapolvo) con el papel mural.
8. **Tipo de fotografía**: dos detalles — encuentro superior con cornisa, encuentro inferior con guardapolvo.
9. **Condiciones de observación (manual)**: "Para verificar los encuentros del papel con cornisa y guardapolvo, se utiliza regla pequeña graduada, midiendo entre el borde del papel y el borde de la cornisa, y entre el borde del papel y el borde del guardapolvo."
10. **Instrumentos**: regla pequeña graduada.
11. **Tolerancia (textual)**: "Encuentros del papel con cornisa y con guardapolvo: 1 mm de separación al borde."
12. **Variables IA**: encuentro papel-cornisa de madera o yeso, papel mural con patrón, luz interior.
13. **Dificultad IA**: Fácil-Media.
14. **Mejora**: separar en dos fotos independientes (cornisa arriba, guardapolvo abajo) en vez de forzar ambos encuentros en un solo diagrama compuesto como hace el manual, dificultando ver cada caso con claridad.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista del encuentro entre papel mural de patrón floral y una cornisa de yeso blanca, borde del papel llegando justo hasta 1 mm del borde de la cornisa sin superponerse, luz interior cálida, textura de papel visible."

## PAPEL-003 — Encuentro de papel mural con marcos de puerta o ventana
1. **ID**: PAPEL-003 · pág. 40 · Cap. 14 · Revestimientos de papel.
2. **Objetivo técnico**: encuentro del papel mural con marcos de puertas o ventanas, ya sea montado (traspasando el borde) o corto (sin llegar).
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: si el papel se instala sobrepasando el marco, se acepta un traspaso máximo de 2 mm; si queda corto, se acepta hasta 1 mm de separación — dos criterios distintos según cómo se ejecutó.
5. **Defecto**: traspaso mayor a 2 mm sobre el marco, o separación mayor a 1 mm dejando marco visible sin cubrir.
6. **Estado correcto**: encuentro limpio del papel con el marco, dentro de cualquiera de los dos rangos aceptados.
7. **Objetos**: marco de puerta o ventana, borde del papel mural junto a él.
8. **Tipo de fotografía**: detalle del encuentro papel-marco, dos variantes (montado y corto).
9. **Condiciones de observación (manual)**: "Para encuentros de papel mural con marcos de ventanas u otros, en que se utilice sobrepasar con el papel el encuentro, se debe medir el traspaso de papel sobre el marco [...] Para encuentros de papel mural de tope con marcos [...] se debe medir la distancia entre el papel y el marco."
10. **Instrumentos**: regla graduada pequeña.
11. **Tolerancia (textual)**: "Encuentros con marcos de ventanas u otros: + 2 mm (montado); -1 mm (corto)."
12. **Variables IA**: marco de puerta de madera, papel mural, encuentro limpio.
13. **Dificultad IA**: Media.
14. **Mejora**: etiquetar visualmente cada variante ("montado" vs. "corto") con una pequeña anotación en la imagen — el manual usa el mismo símbolo de medición para ambos casos, generando ambigüedad.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista del encuentro entre un papel mural color gris claro y el marco blanco de una puerta interior, el papel traspasando 2 mm sobre el marco de forma pareja, luz interior natural, textura de papel y madera pintada nítidas."

---

# CAPÍTULO 15 — Enchapes de Madera (pág. 41-42)

## ENCHMAD-001 — Enchapes en madera (detección de imperfecciones)
1. **ID**: ENCHMAD-001 · pág. 42 · Cap. 15 · Enchapes de madera.
2. **Objetivo técnico**: aceptabilidad de rayas, saltaduras y sopladuras (desprendimiento del enchape) en superficies enchapadas en madera.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: rayas/saltaduras puntuales se aceptan si no son visibles a más de 1 m; las sopladuras (desprendimiento) **no se aceptan nunca**, sin importar el tamaño. El manual aclara explícitamente que diferencias de tono o veta NO son defecto (es producto natural).
5. **Defecto principal**: sopladura (desprendimiento del enchape del sustrato) — cero tolerancia. **Secundario**: raya o saltadura visible a 1 m.
6. **Estado correcto**: superficie enchapada firmemente adherida, veta natural de la madera visible como característica normal (no defecto), sin rayas perceptibles a la distancia de observación.
7. **Objetos**: puerta o mueble enchapado en madera, observador de referencia a 1 m.
8. **Tipo de fotografía**: par de fotos — (a) superficie correcta con veta natural, (b) sopladura visible como burbuja/levantamiento del enchape.
9. **Condiciones de observación (manual)**: "El observador se ubica frente a la muestra, a una distancia de 1 metro, con luz día o con la iluminación permanente del recinto."
10. **Instrumentos**: ninguno (evaluación visual a distancia).
11. **Tolerancia (textual)**: "Rayas y saltaduras: Puntuales y no más de dos por cara o canto, siempre que no sean visibles a una distancia mayor de 1m · Sopladuras: No se aceptan sopladuras del enchape."
12. **Variables IA**: enchape de madera natural (nogal, roble o similar) con veta realista, una zona con burbuja de desprendimiento claramente visible para el caso incorrecto.
13. **Dificultad IA**: Media — la veta de madera natural debe verse auténtica y la sopladura debe leerse como un defecto de adherencia, no como una mancha.
14. **Mejora**: incluir explícitamente en el par Bien/Mal un ejemplo de "variación de tono/veta que NO es defecto" junto al ejemplo real de sopladura — el manual lo aclara en texto pero nunca lo muestra visualmente, generando el riesgo de que un usuario reporte una veta natural como problema.
15. **Prompt IA preliminar (caso incorrecto)**: "Fotografía macro hiperrealista de una puerta enchapada en madera de nogal, una sopladura visible como una burbuja levantada de 4 cm de diámetro cerca del borde inferior, veta de madera natural nítida en el resto de la superficie, luz interior cálida rasante."

---

# CAPÍTULO 16 — Guardapolvos y Junquillos (pág. 43-45)

## GUARDAP-001 — Distancia guardapolvo-muro y guardapolvo-piso
1. **ID**: GUARDAP-001 · pág. 44 · Cap. 16 · Guardapolvos y junquillos.
2. **Objetivo técnico**: separación entre el guardapolvo y el muro (horizontal) y entre el guardapolvo y el piso terminado (vertical).
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: el guardapolvo debe quedar prácticamente pegado al muro (1 mm) y con una holgura controlada respecto del piso (menos de 3 mm) para permitir dilatación sin dejar un hueco antiestético.
5. **Defecto**: guardapolvo separado del muro más de 1 mm, o separación excesiva respecto del piso.
6. **Estado correcto**: guardapolvo firmemente asentado contra el muro, con una holgura mínima y pareja respecto del piso.
7. **Objetos**: guardapolvo de madera/MDF instalado, encuentro con muro y piso.
8. **Tipo de fotografía**: dos detalles — encuentro superior (guardapolvo-muro) y encuentro inferior (guardapolvo-piso).
9. **Condiciones de observación (manual)**: "La distancia entre guardapolvo y muro, corresponde a la separación horizontal que quede entre ambos elementos, midiéndose con regla pequeña graduada o algún otro instrumento, en los puntos en que se detecte alguna singularidad, visto desde el centro del recinto."
10. **Instrumentos**: regla pequeña graduada.
11. **Tolerancia (textual)**: "Distancia entre guardapolvo y muro: 1 mm · Distancia entre guardapolvo o junquillo y piso terminado: < 3 mm."
12. **Variables IA**: guardapolvo de MDF pintado blanco, encuentro con piso de porcelanato o piso flotante.
13. **Dificultad IA**: Fácil — geometría simple de moldura contra muro/piso.
14. **Mejora**: unificar en una sola composición fotográfica el encuentro completo (muro-guardapolvo-piso) en vez de las 4 vistas circulares fragmentadas del manual — más fácil de leer de un vistazo.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de detalle del encuentro entre un guardapolvo de MDF pintado blanco y un piso de porcelanato gris claro, holgura mínima y pareja de 2 mm entre guardapolvo y piso, guardapolvo firmemente asentado contra el muro sin separación, luz natural interior."

## GUARDAP-002 — Alineación y desajuste en encuentros de guardapolvos
1. **ID**: GUARDAP-002 · pág. 44 · Cap. 16 · Guardapolvos y junquillos.
2. **Objetivo técnico**: alineación de la parte superior de dos tramos de guardapolvo en un encuentro (esquina), y ajuste entre los cortes de la unión.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: en la esquina donde se unen dos tramos de guardapolvo (típicamente a inglete 45°), el borde superior debe coincidir sin escalón, y el corte de unión debe calzar sin espacio.
5. **Defecto**: escalón en el borde superior del encuentro, o hueco visible en el corte de unión (inglete mal ajustado).
6. **Estado correcto**: encuentro a inglete perfectamente ajustado, sin escalón ni hueco visible.
7. **Objetos**: esquina interior o exterior con guardapolvos, corte de inglete.
8. **Tipo de fotografía**: macro del encuentro de esquina.
9. **Condiciones de observación (manual)**: "La alineación en junta entre guardapolvos o entre junquillos, se mide con regla pequeña graduada o algún otro instrumento, verificando diferencias en la parte superior de las uniones de tiras de guardapolvos o junquillos [...] Los desajustes en juntas [...] verificando los bordes que no coincidan perfectamente en las uniones de tiras."
10. **Instrumentos**: regla pequeña graduada.
11. **Tolerancia (textual)**: "Alineación junta entre guardapolvos o junquillos: 1 mm · Desajuste en junta entre guardapolvos o junquillos: 1 mm."
12. **Variables IA**: esquina de guardapolvo MDF pintado, corte a inglete, luz rasante para revelar el hueco.
13. **Dificultad IA**: Fácil — geometría de esquina simple, buen contraste.
14. **Mejora**: mostrar el corte de inglete desde un ángulo que revele claramente tanto la alineación superior como el ajuste del corte a la vez, en vez de separarlos en dos círculos de detalle distintos como hace el manual.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de una esquina interior con guardapolvos de MDF blanco unidos a inglete 45°, un leve hueco de 1,5 mm visible en la línea de corte, luz rasante lateral revelando la sombra del desajuste, textura de pintura mate."

## GUARDAP-003 — Guardapolvos cerámicos
1. **ID**: GUARDAP-003 · pág. 45 · Cap. 16 · Guardapolvos y junquillos.
2. **Objetivo técnico**: paralelismo del guardapolvo cerámico respecto del muro y su diferencia de nivel respecto del piso terminado.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: mismo principio que GUARDAP-001 pero para guardapolvo cerámico (pieza rígida, distinta tolerancia que la madera/MDF).
5. **Defecto**: guardapolvo cerámico no paralelo al muro, o desnivel respecto del piso.
6. **Estado correcto**: pieza cerámica de guardapolvo perfectamente paralela al muro y a nivel con el piso.
7. **Objetos**: guardapolvo cerámico (rodapié), encuentro con muro y piso cerámico.
8. **Tipo de fotografía**: detalle del encuentro guardapolvo cerámico-piso-muro.
9. **Condiciones de observación (manual)**: "El paralelismo entre palmetas de guardapolvo a muro, se mide colocando regla de dimensión acorde al muro, apoyada en cara exterior de guardapolvo cerámico, midiendo la diferencia entre las distancias entre el muro y la regla."
10. **Instrumentos**: regla de dimensión acorde al muro.
11. **Tolerancia (textual)**: "Paralelismo entre palmetas de guardapolvo a muro: +- 2 mm · Diferencia entre guardapolvo y piso terminado: +- 1 mm."
12. **Variables IA**: rodapié cerámico a juego con el piso, encuentro con muro pintado.
13. **Dificultad IA**: Fácil.
14. **Mejora**: mostrar el guardapolvo cerámico junto al piso del mismo material para reforzar que es un conjunto coordinado (contexto que el diagrama del manual, en vista aislada, no transmite).
15. **Prompt IA preliminar**: "Fotografía hiperrealista de detalle de un rodapié cerámico color gris a juego con el piso, perfectamente paralelo al muro pintado blanco, encuentro a nivel con el piso sin desnivel, luz natural interior."

## GUARDAP-004 — Tolerancias en junquillos
1. **ID**: GUARDAP-004 · pág. 45 · Cap. 16 · Guardapolvos y junquillos.
2. **Objetivo técnico**: mismos criterios que GUARDAP-001/002 (distancia a piso, alineación y desajuste de encuentros) pero aplicados a junquillos en vez de guardapolvos.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: el junquillo (moldura más delgada, habitual en pisos flotantes/laminados) tiene la misma lógica de instalación ajustada que el guardapolvo.
5. **Defecto**: desajuste o desalineación en el encuentro de junquillos, o separación excesiva respecto del piso.
6. **Estado correcto**: junquillo bien alineado en sus encuentros y con holgura controlada respecto del piso.
7. **Objetos**: junquillo de madera/PVC, encuentro de esquina, piso flotante.
8. **Tipo de fotografía**: macro del encuentro de esquina de junquillo, similar composición a GUARDAP-002.
9. **Condiciones de observación (manual)**: mismo método que GUARDAP-002, aplicado a junquillos.
10. **Instrumentos**: regla pequeña graduada.
11. **Tolerancia (textual)**: "Desajuste encuentro entre junquillos: 1 mm · Alineación encuentro entre junquillos: <1 mm · Distancia junquillo a piso: < 3 mm."
12. **Variables IA**: junquillo delgado de madera o PVC, piso flotante laminado, esquina de encuentro.
13. **Dificultad IA**: Fácil.
14. **Mejora**: diferenciar visualmente de GUARDAP-002 mostrando el contexto característico de junquillo (piso flotante/laminado) vs. guardapolvo (piso cerámico/porcelanato) para que el usuario asocie cada moldura a su piso típico.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de una esquina con junquillo delgado de madera sobre un piso flotante laminado color roble, encuentro a inglete bien ajustado sin hueco visible, luz natural rasante, textura de laminado realista."

---

# CAPÍTULO 17 — Alfombras y Cubrepisos (pág. 46)

## ALFOM-001 — Juntas de cubrepiso
1. **ID**: ALFOM-001 · pág. 46 · Cap. 17 · Alfombras y cubrepisos.
2. **Objetivo técnico**: separación en las juntas entre paños de cubrepiso (vinílico en rollo u otro).
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: el manual aclara explícitamente que las juntas en alfombras y cubrepisos NO son invisibles por naturaleza — el criterio es que la separación no supere 1 mm, no que sea imperceptible.
5. **Defecto**: junta con separación mayor a 1 mm entre paños de cubrepiso.
6. **Estado correcto**: junta entre paños con separación mínima y uniforme, visible pero dentro de tolerancia.
7. **Objetos**: cubrepiso en rollo, junta entre dos paños, guardapolvo de referencia.
8. **Tipo de fotografía**: macro de la línea de junta entre paños.
9. **Condiciones de observación (manual)**: "Para realizar las mediciones de la tabla n°1, se debe un instrumento graduado, determinando la separación entre los bordes."
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Juntas y encuentros de cubrepisos: 1 mm."
12. **Variables IA**: cubrepiso vinílico en rollo color neutro, junta fina entre paños, luz natural interior.
13. **Dificultad IA**: Fácil.
14. **Mejora**: incluir explícitamente en la etiqueta de la foto la aclaración "la junta es visible por diseño, esto NO es un defecto en sí" para que el usuario de ObraBien no reporte automáticamente toda junta visible.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de una junta entre dos paños de cubrepiso vinílico color gris neutro, separación mínima y uniforme de 1 mm, textura de vinílico realista, luz de día natural desde ventana lateral."

## ALFOM-002 — Encuentro de alfombra con marcos y pilastras
1. **ID**: ALFOM-002 · pág. 46 · Cap. 17 · Alfombras y cubrepisos.
2. **Objetivo técnico**: separación entre el borde de la alfombra/cubrepiso y los marcos o pilastras de puertas.
3. **Tipo**: Método de medición.
4. **Qué enseña**: el encuentro del piso con elementos verticales (marco, pilastra) debe quedar limpio, con separación acotada.
5. **Defecto**: separación excesiva entre el borde del piso y el marco/pilastra.
6. **Estado correcto**: borde de alfombra/cubrepiso llegando limpiamente hasta el marco, sin holgura visible mayor a la tolerancia.
7. **Objetos**: marco de puerta, pilastra, borde de alfombra o cubrepiso.
8. **Tipo de fotografía**: detalle del encuentro piso-marco a nivel del suelo.
9. **Condiciones de observación (manual)**: mismo método instrumental que ALFOM-001, aplicado al encuentro con marco.
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Encuentro de alfombra con marcos y pilastras: 2 mm."
12. **Variables IA**: alfombra o cubrepiso, marco de puerta de madera, vista a nivel de piso.
13. **Dificultad IA**: Fácil.
14. **Mejora**: mostrar el encuentro completo del vano (ambos lados del marco) en una sola foto panorámica a nivel de piso, en vez de los dos círculos separados del manual.
15. **Prompt IA preliminar**: "Fotografía hiperrealista a nivel de piso de un vano de puerta con cubrepiso vinílico gris llegando limpiamente hasta el marco de madera blanco, separación mínima de 2 mm, luz natural interior."

---

# CAPÍTULO 18 — Cornisas (pág. 47)

## CORNISA-001 — Alineación y desajuste de cornisas
1. **ID**: CORNISA-001 · pág. 47 · Cap. 18 · Cornisas.
2. **Objetivo técnico**: alineación y ajuste en las juntas de unión entre tramos de cornisa.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: mismo principio que guardapolvos/junquillos (GUARDAP-002) pero en el encuentro de cielo, con la misma advertencia del manual de que la junta entre cornisas no es invisible por naturaleza.
5. **Defecto**: desalineación del borde o hueco visible en la junta de unión de cornisas.
6. **Estado correcto**: tramos de cornisa alineados y ajustados en su unión, sin escalón ni hueco.
7. **Objetos**: cornisa de yeso o poliestireno en encuentro de cielo con muro, unión entre tramos.
8. **Tipo de fotografía**: detalle de la unión de cornisa en una esquina o empalme recto.
9. **Condiciones de observación (manual)**: "La alineación de juntas de cornisas, se mide con instrumento graduado determinando la diferencia en la instalación de bordes de las cornisas. El desajuste en juntas de cornisas, se mide con instrumento graduado determinando la separación de los bordes de cornisas."
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Alineación junta de cornisas: 1 mm · Desajuste en junta de cornisas: 1 mm."
12. **Variables IA**: cornisa de yeso blanca en el encuentro muro-cielo, unión entre tramos, luz artificial cenital.
13. **Dificultad IA**: Fácil.
14. **Mejora**: contexto real de esquina de recinto (no solo el tramo aislado del manual), para que el usuario ubique visualmente dónde revisar esta partida.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de una esquina de cielo raso con cornisa de yeso blanca, unión entre dos tramos de cornisa con un leve desajuste de 2 mm visible por sombra, luz artificial cenital, interior residencial terminado."

---

# CAPÍTULO 19 — Cubrejuntas (pág. 48)

## CUBREJ-001 — Cubrejuntas (linealidad y llegada a marcos)
1. **ID**: CUBREJ-001 · pág. 48 · Cap. 19 · Cubrejuntas.
2. **Objetivo técnico**: rectitud (linealidad) de un cubrejuntas entre pavimentos de terminación, y su llegada a marcos o vanos.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: el cubrejuntas (perfil que cubre la unión entre dos pavimentos distintos, ej. cerámico-piso flotante) debe ser recto y llegar limpiamente al marco de la puerta, visible cuando esta está cerrada.
5. **Defecto**: cubrejuntas curvo/desviado, o mal llegada al marco de la puerta.
6. **Estado correcto**: cubrejuntas perfectamente recto y paralelo al eje del vano, llegando limpiamente al marco.
7. **Objetos**: perfil de cubrejuntas metálico o de madera, umbral de puerta, encuentro con marco.
8. **Tipo de fotografía**: plano general del umbral con el cubrejuntas, detalle de la llegada al marco.
9. **Condiciones de observación (manual)**: "La linealidad en cubrejuntas plásticos y de goma, se verifica utilizando una regla de 50 cm, colocada paralela al eje del marco de la puerta o vano. Con un instrumento graduado, se debe medir la desviación de la cubrejunta con la regla."
10. **Instrumentos**: regla de 50 cm, instrumento graduado.
11. **Tolerancia (textual)**: "Cubrejuntas plásticas y de goma, Linealidad: ± 3 mm. En caso de haber puerta, la cubrejunta no debe ser visible cuando está cerrada · Llegada a marco o vano: 2 mm por cada lado · Uniones de cubrejuntas en distintas direcciones: 1 mm."
12. **Variables IA**: perfil metálico de cubrejuntas en el umbral entre cerámico y piso flotante, marco de puerta.
13. **Dificultad IA**: Media.
14. **Mejora**: incluir explícitamente el estado "puerta cerrada" mostrando que el cubrejuntas queda oculto — es un criterio de aceptación textual del manual que su propio diagrama no ilustra.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un umbral de puerta entre un piso cerámico y un piso flotante, perfil metálico de cubrejuntas recto y bien alineado con el eje del marco, puerta entreabierta mostrando el perfil, luz natural interior."

---

# CAPÍTULO 20 — Pilastras (pág. 49-51)

## PILASTRA-001 — Espacios y desajustes en uniones a 45°
1. **ID**: PILASTRA-001 · pág. 50 · Cap. 20 · Pilastras.
2. **Objetivo técnico**: ajuste de la unión a inglete (corte 45°) entre dos tramos de pilastra en la esquina superior del marco.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la unión a 45° debe calzar sin espacios puntuales ni desajustes de nivel entre ambos cortes.
5. **Defecto**: espacio visible en el corte de inglete, o desnivel entre ambos tramos de pilastra.
6. **Estado correcto**: corte de inglete perfectamente ajustado, sin hueco ni escalón.
7. **Objetos**: esquina superior de marco con pilastras, corte a 45°.
8. **Tipo de fotografía**: macro de la esquina superior del marco.
9. **Condiciones de observación (manual)**: "Para la verificación de las tolerancias indicadas en la Tabla N°1, se utiliza un instrumento graduado."
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Espacios puntuales en uniones de pilastras corte 45°: 1 mm · Desajuste en junta de pilastras: 1 mm."
12. **Variables IA**: pilastra de madera pintada blanca, esquina superior de marco, corte de inglete.
13. **Dificultad IA**: Fácil.
14. **Mejora**: mostrar el marco completo con la esquina resaltada mediante recuadro, dando contexto de dónde está esta unión dentro del vano completo.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de la esquina superior de un marco de puerta con pilastras de madera pintada blanca, corte a inglete 45° con un leve espacio de 1,5 mm visible, luz interior natural, textura de pintura lisa."

## PILASTRA-002 — Paralelismo entre pilastra y marco, espacio pilastra-muro
1. **ID**: PILASTRA-002 · pág. 50 · Cap. 20 · Pilastras.
2. **Objetivo técnico**: paralelismo de la pilastra respecto del marco de la puerta, y espacio entre pilastra y muro (revestimiento).
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la pilastra (moldura vertical que cubre el encuentro entre el marco y el muro) debe correr paralela al marco en toda su altura, y su espacio contra el muro/revestimiento debe ser constante.
5. **Defecto**: pilastra no paralela al marco (más separada arriba que abajo, o viceversa), o espacio irregular contra el muro.
6. **Estado correcto**: pilastra paralela al marco en toda su altura, espacio uniforme contra el revestimiento del muro.
7. **Objetos**: pilastra completa junto al marco de puerta, muro revestido.
8. **Tipo de fotografía**: plano vertical de la pilastra completa.
9. **Condiciones de observación (manual)**: mismo método instrumental que PILASTRA-001.
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Paralelismo entre pilastras y borde marco: ± 2 mm · Espacio entre pilastra muro (muro liso): 2 mm."
12. **Variables IA**: pilastra de madera junto al marco, muro con revestimiento, interior residencial.
13. **Dificultad IA**: Media.
14. **Mejora**: composición vertical completa (piso a dintel) en una sola toma en vez de la vista fragmentada por círculos del manual.
15. **Prompt IA preliminar**: "Fotografía hiperrealista vertical de una pilastra de madera junto al marco de una puerta interior, paralelismo correcto en toda su altura, espacio uniforme de 2 mm contra el muro revestido en yeso, luz de día interior."

## PILASTRA-003 — Separación de pilastras con guardapolvo, taco y piso
1. **ID**: PILASTRA-003 · pág. 51 · Cap. 20 · Pilastras.
2. **Objetivo técnico**: separación de la base de la pilastra respecto del guardapolvo, el taco de piso y el piso mismo.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la base de la pilastra debe encontrarse limpiamente con los elementos de piso, con separaciones controladas para permitir dilatación sin dejar huecos antiestéticos.
5. **Defecto**: separación excesiva en la base de la pilastra respecto de guardapolvo, taco o piso.
6. **Estado correcto**: base de pilastra bien resuelta contra guardapolvo y piso, sin huecos visibles mayores a tolerancia.
7. **Objetos**: base de pilastra, guardapolvo, taco de piso, piso terminado.
8. **Tipo de fotografía**: detalle a nivel de piso de la base de la pilastra.
9. **Condiciones de observación (manual)**: mismo método instrumental de la ficha (instrumento graduado).
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Separación con guardapolvo: 2 mm · Separación con taco: 2 mm · Separación con el piso: 2 mm."
12. **Variables IA**: base de pilastra de madera, guardapolvo, piso de porcelanato, vista a nivel de suelo.
13. **Dificultad IA**: Fácil.
14. **Mejora**: foto única de la base completa del vano (dos pilastras, guardapolvo y piso) en vez de 3 círculos de detalle separados, mostrando cómo se ve el conjunto resuelto correctamente.
15. **Prompt IA preliminar**: "Fotografía hiperrealista a nivel de piso de la base de un vano de puerta con pilastras de madera blanca, guardapolvo y piso de porcelanato, encuentros limpios y ajustados sin huecos visibles, luz natural interior."

---

# CAPÍTULO 21 — Closets (pág. 52-54)

## CLOSET-001 — Verticalidad con marco de puerta corredera
1. **ID**: CLOSET-001 · pág. 53 · Cap. 21 · Closets.
2. **Objetivo técnico**: verticalidad de la hoja de puerta corredera de closet, cerrada, respecto del marco.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la hoja corredera debe quedar a plomo respecto del marco/pierna del closet en toda su altura, con tolerancia proporcional a la altura.
5. **Defecto**: hoja corredera inclinada respecto del marco.
6. **Estado correcto**: hoja perfectamente vertical y paralela al marco, sin inclinación perceptible.
7. **Objetos**: puerta corredera de closet cerrada, marco/pierna del mueble.
8. **Tipo de fotografía**: plano general vertical de la puerta cerrada, con detalle del encuentro lateral.
9. **Condiciones de observación (manual)**: verificación con instrumento graduado, con apoyo de nivel o escuadra según corresponda.
10. **Instrumentos**: instrumento graduado, nivel o escuadra.
11. **Tolerancia (textual)**: "Verticalidad de las hojas, al estar cerradas, respecto del marco en puertas de corredera: 1mm por metro de altura."
12. **Variables IA**: puerta corredera de closet melamina blanca, encuentro con pierna del mueble.
13. **Dificultad IA**: Media.
14. **Mejora**: agregar el detalle de la holgura visible entre hoja y marco en primer plano, complementando la vista general con un zoom que la mayoría de los usuarios de ObraBien necesitará para entender la magnitud del defecto.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de una puerta corredera de closet en melamina blanca, cerrada, vista de frente, leve inclinación respecto del marco visible en el borde lateral, interior de dormitorio, luz natural."

## CLOSET-002 — Alineación de puertas en el plano
1. **ID**: CLOSET-002 · pág. 53 · Cap. 21 · Closets.
2. **Objetivo técnico**: alineación horizontal entre puertas abatibles/plegables de un mismo closet (extremos superior/inferior, tiradores).
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: en un closet de varias puertas, todas deben quedar alineadas entre sí — mismo nivel superior/inferior, tiradores a la misma altura.
5. **Defecto**: puerta desalineada respecto de sus vecinas, o tirador a distinta altura.
6. **Estado correcto**: todas las puertas del closet alineadas horizontalmente en sus extremos y con tiradores a la misma altura.
7. **Objetos**: closet de varias puertas abatibles, tiradores/manillas.
8. **Tipo de fotografía**: plano frontal completo del closet, detalle de tiradores.
9. **Condiciones de observación (manual)**: verificación con instrumento graduado, apoyo de nivel o escuadra.
10. **Instrumentos**: instrumento graduado, nivel o escuadra.
11. **Tolerancia (textual)**: "Verticalidad entre hojas en puertas de abatir y plegables: ± 2 mm por metro de altura · Alineación en el plano entre puertas de abatir: ± 1 mm por metro de altura · Alineación horizontal en extremos inferior o superior entre puertas: 2 mm · Diferencias de ubicación de manillas/tiradores de un mismo closet: 2 mm."
12. **Variables IA**: closet de melamina con 3-4 puertas abatibles, tiradores metálicos, dormitorio.
13. **Dificultad IA**: Media — mantener la coherencia geométrica entre varias puertas en la misma imagen exige precisión del modelo.
14. **Mejora**: destacar con una línea guía horizontal (roja) el nivel de referencia de los tiradores para que la diferencia de 2 mm sea perceptible — recurso que el manual ya usa parcialmente y que conviene mantener.
15. **Prompt IA preliminar**: "Fotografía hiperrealista frontal de un closet de melamina blanca con 4 puertas abatibles, tiradores metálicos, uno de los tiradores 3 mm más bajo que los demás, dormitorio residencial, luz natural de ventana lateral."

## CLOSET-003 — Alineación horizontal y de tiradores (detalle)
1. **ID**: CLOSET-003 · pág. 54 · Cap. 21 · Closets.
2. **Objetivo técnico**: mismo criterio que CLOSET-002, en vista de detalle ampliada de los tiradores.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: refuerza visualmente el criterio de alineación de tiradores con un acercamiento específico.
5. **Defecto**: tiradores a distinta altura o desalineados horizontalmente.
6. **Estado correcto**: tiradores perfectamente alineados en una línea horizontal.
7. **Objetos**: dos tiradores de puertas adyacentes.
8. **Tipo de fotografía**: macro de los dos tiradores con regla de referencia.
9. **Condiciones de observación (manual)**: igual a CLOSET-002.
10. **Instrumentos**: instrumento graduado, nivel.
11. **Tolerancia (textual)**: "Alineación de tiradores o manillas: ± 2 mm" (misma tabla 1 que CLOSET-002).
12. **Variables IA**: par de tiradores metálicos, melamina blanca, luz de detalle.
13. **Dificultad IA**: Fácil.
14. **Mejora**: esta ficha es redundante con CLOSET-002 en el manual (ambas ilustran el mismo criterio) — para ObraBien, fusionar en una sola entrada de biblioteca en vez de mantener dos fichas separadas como hace el documento original.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de dos tiradores metálicos de un closet de melamina blanca, uno de ellos levemente más bajo que el otro, regla pequeña de referencia, luz interior de detalle."

## CLOSET-004 — Linealidad y separación de repisas
1. **ID**: CLOSET-004 · pág. 54 · Cap. 21 · Closets.
2. **Objetivo técnico**: linealidad horizontal entre repisas (de borde a borde) y separación de la repisa respecto del paramento vertical.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: las repisas del closet deben quedar horizontalmente alineadas entre sí y con una separación pareja respecto de la pared lateral.
5. **Defecto**: repisa desnivelada respecto de su par, o separación irregular contra el paramento.
6. **Estado correcto**: repisas alineadas horizontalmente y con separación uniforme contra el muro lateral.
7. **Objetos**: repisas interiores de closet, muro lateral.
8. **Tipo de fotografía**: interior del closet abierto, plano general de las repisas.
9. **Condiciones de observación (manual)**: verificación con instrumento graduado, apoyo de nivel o escuadra.
10. **Instrumentos**: instrumento graduado, nivel.
11. **Tolerancia (textual)**: "Separación de repisas con el paramento vertical: 3 mm · Linealidad horizontal entre repisas (de borde a borde): 3 mm."
12. **Variables IA**: interior de closet con repisas de melamina, muro lateral, luz interior con puerta abierta.
13. **Dificultad IA**: Media.
14. **Mejora**: mostrar el interior completo del closet con todas las repisas visibles a la vez, en vez de la vista fragmentada del manual, para que el criterio de "linealidad entre repisas" (que compara varias, no solo un par) se entienda de un vistazo.
15. **Prompt IA preliminar**: "Fotografía hiperrealista del interior de un closet abierto con 4 repisas de melamina blanca, una de ellas levemente desalineada respecto de las demás, separación pareja contra el muro lateral, luz artificial interior."

---

# CAPÍTULO 22 — Muebles Incorporados (pág. 55-59)

## MUEBLE-001 — Alineación de muebles respecto de paramentos y muebles próximos
1. **ID**: MUEBLE-001 · pág. 56 · Cap. 22 · Muebles incorporados.
2. **Objetivo técnico**: paralelismo del mueble (cubierta) respecto del muro/tabique próximo, y respecto de otros muebles cercanos.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: el mueble de cocina/baño debe correr paralelo al muro en toda su longitud, sin abrirse ni cerrarse hacia un extremo.
5. **Defecto**: mueble no paralelo al muro — separación variable entre la cubierta y el muro.
6. **Estado correcto**: cubierta del mueble paralela al muro en toda su longitud, separación constante.
7. **Objetos**: mueble de cocina con cubierta, muro adyacente.
8. **Tipo de fotografía**: plano general de la cocina/mueble con el muro de referencia.
9. **Condiciones de observación (manual)**: "La alineación del mueble respecto de elementos terminados de la estructura del recinto, en la que se encuentra apoyado o muy próximo, se verifica utilizando un instrumento graduado midiendo las desviaciones en la separación entre el paramento del mueble y el elemento del recinto."
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Paralelismo (vertical u horizontal) del mueble respecto de paramentos y/o muebles próximos: 3 mm."
12. **Variables IA**: mueble de cocina melamina o MDF lacado, cubierta de cuarzo o granito, muro pintado adyacente.
13. **Dificultad IA**: Media.
14. **Mejora**: contexto de cocina completa amoblada en vez del detalle aislado del manual — más representativo de cómo el usuario de ObraBien realmente evalúa esta partida (mirando toda la línea de muebles, no un punto).
15. **Prompt IA preliminar**: "Fotografía hiperrealista de una cocina residencial con mueble bajo de melamina blanca y cubierta de cuarzo gris, separación pareja de 3 mm entre la cubierta y el muro adyacente en toda su longitud, luz de día natural, ambiente moderno."

## MUEBLE-002 — Alineación horizontal superior e inferior entre puertas
1. **ID**: MUEBLE-002 · pág. 57 · Cap. 22 · Muebles incorporados.
2. **Objetivo técnico**: alineación horizontal (superior e inferior) y en el plano, entre hojas de puertas adyacentes de un mueble.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: mismo principio que CLOSET-002/003 pero para muebles de cocina/baño — puertas contiguas deben coincidir en altura y plano.
5. **Defecto**: puerta desalineada respecto de su vecina, arriba, abajo o en el plano.
6. **Estado correcto**: puertas adyacentes perfectamente alineadas en ambos bordes.
7. **Objetos**: dos puertas adyacentes de mueble bajo o alto.
8. **Tipo de fotografía**: plano frontal de dos-tres puertas contiguas.
9. **Condiciones de observación (manual)**: "La alineación horizontal y vertical, entre puertas del mueble, se mide con instrumento graduado."
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Alineación horizontal superior e inferior entre las puertas de un mueble: 1 mm · Alineación en el plano entre hojas de puertas adyacentes de un mueble: 1 mm."
12. **Variables IA**: puertas de mueble de cocina en melamina, encuentro central.
13. **Dificultad IA**: Fácil-Media.
14. **Mejora**: exactamente el mismo tratamiento visual que MUEBLE-004 (manillas) — vale la pena unificar como una sola foto de "detalle de frente de mueble" que muestre a la vez alineación de puertas y manillas, ya que en la práctica se revisan juntas.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de dos puertas adyacentes de un mueble de cocina en melamina blanca, borde superior con un desnivel de 2 mm visible, luz interior de cocina, textura lisa."

## MUEBLE-003 — Alineación de elementos decorativos
1. **ID**: MUEBLE-003 · pág. 57 · Cap. 22 · Muebles incorporados.
2. **Objetivo técnico**: alineación entre elementos decorativos de la estructura del mueble (molduras, marcos decorativos aplicados).
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: los elementos decorativos aplicados sobre las puertas (molduras, cenefas) deben mantener una distancia constante entre sí.
5. **Defecto**: elemento decorativo desalineado respecto de su par en la puerta adyacente.
6. **Estado correcto**: elementos decorativos alineados y con distanciamiento uniforme.
7. **Objetos**: puertas de mueble con molduras decorativas aplicadas.
8. **Tipo de fotografía**: detalle de dos puertas con molduras visibles.
9. **Condiciones de observación (manual)**: "La alineación en elementos decorativos, se verifica midiendo con instrumento graduado, el distanciamiento entre elementos paralelos del elemento."
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Alineaciones entre componentes decorativos de la estructura del mueble: ± 1 mm."
12. **Variables IA**: mueble estilo clásico con molduras aplicadas, mueble de baño o cocina.
13. **Dificultad IA**: Media — las molduras decorativas requieren más detalle geométrico que una superficie lisa.
14. **Mejora**: dado que este estilo de mueble (con molduras decorativas) es cada vez menos común en vivienda nueva estándar, priorizar su generación solo si ObraBien confirma demanda real — candidato a baja prioridad relativa dentro de este capítulo.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de dos puertas de mueble de baño con molduras decorativas aplicadas en relieve, una moldura levemente desalineada respecto de su par en la puerta adyacente, luz interior cálida."

## MUEBLE-004 — Alineación entre manillas o tiradores
1. **ID**: MUEBLE-004 · pág. 58 · Cap. 22 · Muebles incorporados.
2. **Objetivo técnico**: alineación horizontal de manillas/tiradores respecto de su ubicación en muebles continuos.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: en un mueble continuo (varias puertas/cajones), todas las manillas deben quedar a la misma altura.
5. **Defecto**: manilla/tirador a distinta altura que sus pares en el mismo mueble.
6. **Estado correcto**: todas las manillas del mueble alineadas en una misma línea horizontal.
7. **Objetos**: mueble bajo con varias puertas/cajones, manillas o tiradores metálicos.
8. **Tipo de fotografía**: plano frontal del mueble completo con línea de manillas visible.
9. **Condiciones de observación (manual)**: "La alineación horizontal de manillas, tiradores u otros elementos del mueble, se mide con nivel e instrumento graduado."
10. **Instrumentos**: nivel, instrumento graduado.
11. **Tolerancia (textual)**: "Desalineación horizontal con respecto a la ubicación (medida en la altura) entre manillas, tiradores u otros en muebles continuos: ± 1 mm."
12. **Variables IA**: mueble de cocina completo con manillas metálicas alineadas, una levemente desviada.
13. **Dificultad IA**: Fácil — buen contraste, patrón repetitivo reconocible.
14. **Mejora**: usar una línea guía horizontal roja superpuesta a las manillas (recurso ya presente en el manual, vale la pena conservarlo tal cual porque es efectivo).
15. **Prompt IA preliminar**: "Fotografía hiperrealista frontal de un mueble de cocina bajo con 5 cajones en melamina blanca, tiradores metálicos horizontales, uno de ellos 2 mm más abajo que el resto, luz de día natural, cocina moderna."

## MUEBLE-005 — Horizontalidad de superficies de mesones
1. **ID**: MUEBLE-005 · pág. 59 · Cap. 22 · Muebles incorporados.
2. **Objetivo técnico**: horizontalidad (nivel) de la superficie del mesón/cubierta.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la cubierta del mueble debe estar perfectamente nivelada — relevante para el uso funcional del mesón (líquidos no deben escurrir hacia un lado).
5. **Defecto**: mesón con pendiente perceptible, verificable con nivel.
6. **Estado correcto**: superficie de mesón perfectamente horizontal, burbuja de nivel centrada.
7. **Objetos**: mesón de cocina (cuarzo, granito o madera), nivel de burbuja largo.
8. **Tipo de fotografía**: plano general del mesón con el nivel apoyado a lo largo.
9. **Condiciones de observación (manual)**: "La horizontalidad de superficies de mesones se verifica con nivel y escuadra en cualquier dirección."
10. **Instrumentos**: nivel, escuadra.
11. **Tolerancia (textual)**: "Horizontalidad de superficies de mesones: 1 mm por metro lineal."
12. **Variables IA**: mesón de cuarzo blanco o granito, nivel de burbuja largo, cocina residencial.
13. **Dificultad IA**: Fácil.
14. **Mejora**: agregar un vaso con líquido como referencia visual intuitiva de la horizontalidad (recurso didáctico adicional, no presente en el manual, muy efectivo para usuarios no técnicos).
15. **Prompt IA preliminar**: "Fotografía hiperrealista de un mesón de cocina de cuarzo blanco, un nivel de burbuja largo de 1 metro apoyado a lo largo mostrando la burbuja centrada, luz de día natural, cocina moderna residencial."

---

# CAPÍTULO 23 — Pinturas (pág. 60)

## PINTURA-001 — Pinturas interiores
1. **ID**: PINTURA-001 · pág. 60 · Cap. 23 · Pinturas.
2. **Objetivo técnico**: uniformidad de la terminación de pintura interior lisa, evaluada con luz angulada.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: las sombras/imperfecciones de la pintura interior se aceptan solo si no superan 1 mm de espesor y 5 mm de largo, observadas con luz angulada desde 1 m de distancia — un criterio muy específico que ObraBien ya usa como referencia normativa central de su ficha de Fachada/Muros.
5. **Defecto**: sombra de imperfección mayor a 1 mm de espesor o 5 mm de largo, visible con luz angulada a 1 m.
6. **Estado correcto**: superficie pintada perfectamente lisa y pareja, sin sombras perceptibles con luz angulada a la distancia de referencia.
7. **Objetos**: muro pintado interior, observador con luz angulada de referencia.
8. **Tipo de fotografía**: par de fotos — luz frontal (donde el defecto es invisible) y luz angulada/rasante (donde aparece), reproduciendo exactamente el protocolo del manual.
9. **Condiciones de observación (manual)**: "Para pinturas lisas se aceptan sombras con luz angulada desde el centro del elemento, no superiores a 1 mm de espesor y 5 mm de largo observadas a distancia mínima de 1 m."
10. **Instrumentos**: ninguno físico — protocolo de iluminación angulada y distancia.
11. **Tolerancia (textual)**: "Para pinturas lisas se aceptan sombras con luz angulada desde el centro del elemento, no superiores a 1 mm de espesor y 5 mm de largo observadas a distancia mínima de 1 m (Fig. 1)."
12. **Variables IA**: muro pintado color claro (blanco o pastel), luz angulada rasante (linterna o luz de tarde), textura de pintura lisa mate.
13. **Dificultad IA**: Media — el efecto de "solo visible con luz angulada" es conceptualmente sutil pero muy representable con buena dirección de luz.
14. **Mejora**: este es el criterio que YA usa ObraBien como base normativa de su ficha de Pintura interior/exterior — la biblioteca de imágenes de esta ficha es la de mayor prioridad de generación real, no solo teórica, porque ya tiene un consumidor directo en el producto.
15. **Prompt IA preliminar (caso incorrecto)**: "Fotografía hiperrealista de un muro interior pintado color blanco mate, luz angulada rasante desde una linterna sostenida a 30 cm del muro desde la izquierda, revelando una sombra de imperfección de 2 mm de espesor y 8 mm de largo en el centro del muro, observador implícito a 1 metro, habitación residencial en penumbra."

## PINTURA-002 — Pinturas exteriores
1. **ID**: PINTURA-002 · pág. 60 · Cap. 23 · Pinturas.
2. **Objetivo técnico**: uniformidad de la terminación de pintura exterior, evaluada a 5 m de distancia con luz de día.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: el criterio exterior es mucho más permisivo que el interior (solo importan imperfecciones detectables desde 5 m, no desde 1 m) porque la distancia habitual de observación de una fachada es mayor.
5. **Defecto**: imperfección de pintura detectable a 5 m de distancia con luz de día.
6. **Estado correcto**: fachada pintada uniforme, sin manchas, escurrimientos o diferencias de tono detectables a 5 m.
7. **Objetos**: fachada exterior pintada, observador de referencia a 5 m.
8. **Tipo de fotografía**: plano general de fachada con observador a escala a 5 m, y detalle de la imperfección.
9. **Condiciones de observación (manual)**: "Para las verificaciones de las tolerancias para pintura exteriores, el observador se ubica frente a la muestra, a una distancia de 5 metros, con luz día."
10. **Instrumentos**: ninguno — protocolo de distancia y luz de día.
11. **Tolerancia (textual)**: "Se aceptan imperfecciones que no se detecten a una distancia mínima de 5 m (Fig. 2)."
12. **Variables IA**: fachada exterior con pintura o estuco pintado, luz de día exterior, observador a escala real a 5 m.
13. **Dificultad IA**: Media — coherencia de escala entre observador y fachada a la distancia correcta.
14. **Mejora**: esta ficha es exactamente la base normativa ya usada por ObraBien en `pintura-exterior` — de máxima prioridad real, junto con PINTURA-001, no solo un ejercicio de catalogación.
15. **Prompt IA preliminar (caso incorrecto)**: "Fotografía hiperrealista de una fachada residencial exterior pintada color arena, una persona con casco de obra de pie a 5 metros de distancia, una mancha de escurrimiento visible en la fachada cerca de una ventana, luz de día natural, cielo despejado."

---

# CAPÍTULO 24 — Pavimentos Vinílicos (pág. 61)

## VINIL-001 — Encuentro entre palmetas o paños
1. **ID**: VINIL-001 · pág. 61 · Cap. 24 · Pavimentos vinílicos.
2. **Objetivo técnico**: separación en el encuentro entre palmetas o paños de pavimento vinílico.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la junta entre piezas de vinílico debe ser mínima, prácticamente imperceptible (menor a 1 mm).
5. **Defecto**: junta con separación mayor a 1 mm entre palmetas.
6. **Estado correcto**: palmetas de vinílico con junta casi invisible, superficie prácticamente continua.
7. **Objetos**: piso vinílico en palmetas o rollo, junta entre piezas.
8. **Tipo de fotografía**: macro de la junta entre palmetas.
9. **Condiciones de observación (manual)**: "Para la verificación de las tolerancias medibles indicadas en la Tabla N°1, se utiliza un instrumento graduado."
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Encuentro entre palmetas o paños: < 1 mm."
12. **Variables IA**: palmetas de vinílico símil madera o cerámico, junta muy fina.
13. **Dificultad IA**: Fácil.
14. **Mejora**: complementar con una prueba táctil (mano deslizándose sobre la junta) como en CERAM-001, reforzando el criterio "casi imperceptible" de forma más intuitiva que el diagrama isométrico del manual.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de dos palmetas de piso vinílico símil madera roble, junta prácticamente imperceptible menor a 1 mm, luz natural rasante, textura de vinílico realista con veta de madera impresa."

## VINIL-002 — Encuentro con sectores singulares sin guardapolvo ni junquillo
1. **ID**: VINIL-002 · pág. 61 · Cap. 24 · Pavimentos vinílicos.
2. **Objetivo técnico**: separación del vinílico contra elementos verticales (marco, pilar) en zonas donde no hay guardapolvo ni junquillo que cubra el encuentro.
3. **Tipo**: Método de medición.
4. **Qué enseña**: sin la moldura de guardapolvo/junquillo que normalmente disimula el encuentro, la tolerancia de separación directa del vinílico contra el elemento vertical es más permisiva (2 mm) porque el corte queda expuesto.
5. **Defecto**: separación mayor a 2 mm en un encuentro sin guardapolvo ni junquillo.
6. **Estado correcto**: borde de vinílico bien cortado y ajustado contra el marco, sin guardapolvo que lo cubra.
7. **Objetos**: encuentro de vinílico con marco de puerta, sin moldura de cubierta.
8. **Tipo de fotografía**: detalle del encuentro expuesto a nivel de piso.
9. **Condiciones de observación (manual)**: mismo método instrumental de la ficha.
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Encuentros con sectores singulares sin guardapolvo ni junquillo: 2 mm."
12. **Variables IA**: vinílico en encuentro con marco de puerta sin guardapolvo, corte expuesto.
13. **Dificultad IA**: Fácil.
14. **Mejora**: aclarar en la etiqueta de la foto que este es el caso "sin moldura de cubierta" para diferenciarlo de VINIL-001 y de las fichas de guardapolvo/junquillo, ya que las tres tratan encuentros similares con distinta tolerancia.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista del encuentro entre un piso vinílico gris y el marco de una puerta sin guardapolvo, corte del vinílico bien ajustado con separación de 2 mm, luz interior natural."

---

# CAPÍTULO 25 — Pisos Flotantes (pág. 62)

## PISOFLOT-001 — Planeidad de piso flotante
1. **ID**: PISOFLOT-001 · pág. 62 · Cap. 25 · Pisos flotantes.
2. **Objetivo técnico**: planeidad de la superficie del piso flotante instalado.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: mismo principio de regla-hueco de capítulos anteriores, aplicado al piso flotante — el manual aclara que la losa/radier base debe cumplir planeidad G5 mínimo antes de instalar el flotante, conectando esta ficha con LOSA-001/RADIER-001.
5. **Defecto**: ondulación de la superficie del piso flotante (típicamente reflejo de una base mal nivelada).
6. **Estado correcto**: superficie de piso flotante pareja, regla apoyada sin dejar hueco.
7. **Objetos**: piso flotante laminado, regla de 3 m.
8. **Tipo de fotografía**: vista rasante a nivel de piso, regla extendida.
9. **Condiciones de observación (manual)**: "Para la verificación de las tolerancias medibles indicadas en la Tabla N°1, se utiliza un instrumento graduado." Nota adicional: "Los pisos flotantes se deben colocar sobre superficies con tolerancia de planeidad mínima G5."
10. **Instrumentos**: instrumento graduado.
11. **Tolerancia (textual)**: "Planeidad: 3 mm en 3 m · Profundidad de rayas: Se aceptarán rayas superficiales (sin profundidad ni relieve, sin dejar marcas de otra tonalidad)."
12. **Variables IA**: piso flotante laminado color roble o nogal, regla de aluminio, luz de día rasante.
13. **Dificultad IA**: Fácil.
14. **Mejora**: incluir en la misma biblioteca la referencia cruzada a LOSA-001 (causa raíz de este defecto es casi siempre la base, no el flotante mismo) — el manual no conecta ambas fichas aunque una depende de la otra.
15. **Prompt IA preliminar**: "Fotografía hiperrealista a nivel de piso de un piso flotante laminado color roble en una sala de estar, una regla de aluminio de 3 metros apoyada de canto mostrando un leve hueco de 4 mm en el sector central por sombra de luz rasante, ambiente residencial recién terminado."

---

# CAPÍTULO 26 — Artefactos Eléctricos (pág. 63)

## ARTELEC-001 — Alineación entre artefactos
1. **ID**: ARTELEC-001 · pág. 63 · Cap. 26 · Artefactos eléctricos.
2. **Objetivo técnico**: alineación entre dos artefactos eléctricos (enchufes, interruptores, tapas) instalados a menos de 50 cm entre sí.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: cuando dos artefactos están próximos, deben quedar alineados entre sí como conjunto — un enchufe desalineado respecto de su vecino cercano es más notorio que uno aislado.
5. **Defecto**: artefacto desalineado respecto de su par cercano.
6. **Estado correcto**: ambos artefactos perfectamente alineados horizontal y verticalmente entre sí.
7. **Objetos**: dos enchufes o interruptores próximos, regla apoyada de referencia.
8. **Tipo de fotografía**: plano medio de ambos artefactos en el mismo encuadre.
9. **Condiciones de observación (manual)**: "La alineación de artefactos se debe verificar para artefactos que se encuentren a menos de 50 cm entre ellos [...] colocar una regla apoyada en uno de ellos y medir la diferencia entre la regla y el segundo artefacto."
10. **Instrumentos**: regla pequeña graduada, lainas o galgas.
11. **Tolerancia (textual)**: "Alineación entre artefactos: ± 2 mm."
12. **Variables IA**: dos enchufes o interruptores color blanco o bronce, muro pintado, regla pequeña de referencia.
13. **Dificultad IA**: Fácil — objetos pequeños y geométricamente simples, alto contraste con el muro.
14. **Mejora**: el manual ya usa fotografías realistas de artefactos (única ficha del documento con imágenes que parecen fotos reales de enchufes, no dibujo vectorial) — mantener ese estándar fotográfico y extenderlo al resto de la biblioteca es la referencia de calidad a igualar.
15. **Prompt IA preliminar**: "Fotografía hiperrealista de dos enchufes eléctricos color bronce instalados en un muro blanco a 40 cm de distancia entre sí, uno de ellos 3 mm más alto que el otro, regla pequeña metálica apoyada como referencia, luz interior uniforme, primer plano nítido."

## ARTELEC-002 — Horizontalidad del artefacto
1. **ID**: ARTELEC-002 · pág. 63 · Cap. 26 · Artefactos eléctricos.
2. **Objetivo técnico**: horizontalidad (nivel) de un artefacto eléctrico individual — que su tapa no quede inclinada.
3. **Tipo**: Comparación Bien/Mal.
4. **Qué enseña**: la tapa del artefacto debe estar perfectamente nivelada, no solo alineada respecto de otro — es un criterio individual además del relacional de ARTELEC-001.
5. **Defecto**: tapa de artefacto inclinada respecto de la horizontal.
6. **Estado correcto**: tapa perfectamente horizontal, nivel de mano con burbuja centrada al apoyarlo en el extremo superior.
7. **Objetos**: artefacto eléctrico individual (enchufe/interruptor/tapa), nivel de mano pequeño.
8. **Tipo de fotografía**: macro del artefacto con el nivel apoyado.
9. **Condiciones de observación (manual)**: "Para verificar la horizontalidad de los artefactos eléctrico se debe colocar un nivel de mano en el extremo más alto del artefacto o tapa y medir la distancia entre el nivel de mano y el artefacto en el extremo opuesto."
10. **Instrumentos**: nivel de mano, regla pequeña graduada, lainas o galgas.
11. **Tolerancia (textual)**: "Horizontalidad del artefacto: ± 1 mm."
12. **Variables IA**: enchufe o interruptor individual, nivel de mano miniatura, muro pintado.
13. **Dificultad IA**: Fácil.
14. **Mejora**: mantener el mismo estándar fotográfico ya usado por el manual en este capítulo — es, junto con ARTELEC-001, la referencia visual de mejor calidad de todo el documento original y no requiere una reinterpretación tan profunda como el resto.
15. **Prompt IA preliminar**: "Fotografía macro hiperrealista de un interruptor de luz color blanco instalado en un muro, levemente inclinado respecto de la horizontal, un nivel de mano pequeño apoyado en el borde superior mostrando la burbuja descentrada, luz interior uniforme."

---

# ANÁLISIS GLOBAL

## Inventario completo

| Métrica | Cantidad |
|---|---|
| Partidas (capítulos/fichas) analizadas | 26 |
| Imágenes/esquemas fuente registrados (unidad = FIGURA numerada del manual) | 70 |
| Fotografías objetivo propuestas para generación IA (1 por registro, algunas con variante correcto+incorrecto) | 70 |
| Registros tipo "Comparación Bien/Mal" (defecto visualmente distinguible) | 57 |
| Registros tipo "Método de medición" (sin señal visual propia, solo protocolo) | 13 |
| Registros tipo "Correcto puro" o "Incorrecto puro" (sin par) | 0 — todos los esquemas del manual son bidireccionales: implican un estado conforme y uno no conforme por la sola existencia de una tolerancia numérica |
| Fotografías reales/fotorrealistas ya presentes en el manual original | 0 |
| Comparaciones "Bien vs. Mal" ya presentes en el manual original (fotográficas) | 0 |
| Esquemas técnicos vectoriales (el 100% del contenido visual del manual) | ~69 (coincide con el conteo de páginas, sin relación causal) |
| Capítulos con contenido normativo ya usado directamente por ObraBien hoy (Pintura interior/exterior) | 1 de 26 (Cap. 23) |

## Matriz completa

*Columna "Existe en ObraBien" deliberadamente vacía, tal como se pidió — no se evaluó todavía.*

| Código | Partida | Concepto técnico | Tipo | Pág. | Existe en ObraBien | Prioridad |
|---|---|---|---|---|---|---|
| MUROLAD-001 | Muros de albañilería | Espesor de canterías | Comparación | 12 | | Media |
| MUROLAD-002 | Muros de albañilería | Linealidad de junta horizontal | Comparación | 12 | | Media |
| MUROLAD-003 | Muros de albañilería | Verticalidad del muro | Comparación | 12 | | Alta |
| MUROLAD-004 | Muros de albañilería | Alineamiento vertical/horizontal entre unidades | Comparación | 12 | | Alta |
| MUROLAD-005 | Muros de albañilería | Alineamiento hilada superior | Comparación | 12 | | Media |
| MUROHOR-001 | Muros de hormigón | Espesor del muro | Método | 15 | | Baja |
| LOSA-001 | Losas de hormigón | Planeidad superficie de piso | Comparación | 18 | | Alta |
| LOSA-002 | Losas de hormigón | Planeidad superficie de cielo | Comparación | 18 | | Media |
| LOSA-003 | Losas de hormigón | Variaciones de espesor | Método | 18 | | Baja |
| LOSA-004 | Losas de hormigón | Variaciones de pendiente | Método | 18 | | Media |
| RADIER-001 | Radieres de hormigón | Planeidad superficie de radier | Comparación | 20 | | Media |
| TABIQ-001 | Tabiques | Tolerancias en planchas de revestimiento | Método | 22 | | Media |
| TABIQ-002 | Tabiques | Planeidad sin huinchas | Comparación | 22 | | Media |
| TABIQ-003 | Tabiques | Planeidad terminado | Comparación | 22 | | Alta |
| TABIQ-004 | Tabiques | Verticalidad del tabique | Comparación | 23 | | Alta |
| TABIQ-005 | Tabiques | Cuadratura tabique-tabique | Método | 23 | | Media |
| TABIQ-006 | Tabiques | Cuadratura tabique-cielo | Método | 23 | | Media |
| ENCPAR-001 | Encuentro de paramentos | Verticalidad del encuentro | Comparación | 24 | | Media |
| CIELO-001 | Cielos rasos | Planeidad de cielo terminado | Comparación | 25 | | Media |
| ESTUCO-001 | Estucos | Verticalidad de estuco | Comparación | 26 | | Alta |
| ESTUCO-002 | Estucos | Verticalidad en esquina | Comparación | 26 | | Media |
| ESTUCO-003 | Estucos | Planeidad de estuco | Comparación | 26 | | Alta |
| YESO-001 | Enlucidos de yeso | Planeidad del enlucido | Comparación | 28 | | Alta |
| YESO-002 | Enlucidos de yeso | Linealidad de aristas | Comparación | 28 | | Media |
| YESO-003 | Enlucidos de yeso | Cuadratura de esquinas | Método | 28 | | Media |
| YESO-004 | Enlucidos de yeso | Verticalidad de aristas | Comparación | 28 | | Media |
| CERAM-001 | Revestimientos cerámicos | Diferencia de nivel entre palmetas | Comparación | 31 | | Alta |
| CERAM-002 | Revestimientos cerámicos | Alineación vertical y horizontal | Comparación | 31 | | Alta |
| GRADA-001 | Gradas de escaleras | Alturas de contrahuella y huella | Comparación | 33 | | Alta |
| GRADA-002 | Gradas de escaleras | Protocolo de puntos de medición | Método | 33 | | Baja |
| PUERTA-001 | Puertas | Verticalidad del vano | Comparación | 35 | | Baja |
| PUERTA-002 | Puertas | Horizontalidad y dimensión del vano | Método | 35 | | Media |
| PUERTA-003 | Puertas | Rectitud de bastidores | Comparación | 35 | | Media |
| PUERTA-004 | Puertas | Planeidad de la hoja | Comparación | 35 | | Media |
| PUERTA-005 | Puertas | Paralelismo hoja-marco | Comparación | 35 | | Alta |
| PUERTA-006 | Puertas | Paralelismo entre hojas (puerta doble) | Comparación | 35 | | Media |
| VENTANA-001 | Ventanas | Manchas/rayas en marcos | Comparación | 37 | | Media |
| VENTANA-002 | Ventanas | Paralelismo hoja-marco (luz visible) | Comparación | 38 | | Alta |
| VENTANA-003 | Ventanas | Detección de fallas en vidrio | Método | 38 | | Media |
| PAPEL-001 | Revestimientos de papel | Piquetes | Comparación | 40 | | Baja |
| PAPEL-002 | Revestimientos de papel | Encuentro con cornisa/guardapolvo | Método | 40 | | Baja |
| PAPEL-003 | Revestimientos de papel | Encuentro con marcos | Comparación | 40 | | Baja |
| ENCHMAD-001 | Enchapes de madera | Rayas, saltaduras, sopladuras | Comparación | 42 | | Media |
| GUARDAP-001 | Guardapolvos y junquillos | Distancia a muro y piso | Comparación | 44 | | Media |
| GUARDAP-002 | Guardapolvos y junquillos | Alineación y desajuste en encuentros | Comparación | 44 | | Media |
| GUARDAP-003 | Guardapolvos y junquillos | Guardapolvos cerámicos | Comparación | 45 | | Media |
| GUARDAP-004 | Guardapolvos y junquillos | Tolerancias en junquillos | Comparación | 45 | | Media |
| ALFOM-001 | Alfombras y cubrepisos | Juntas de cubrepiso | Comparación | 46 | | Baja |
| ALFOM-002 | Alfombras y cubrepisos | Encuentro con marcos/pilastras | Método | 46 | | Baja |
| CORNISA-001 | Cornisas | Alineación y desajuste | Comparación | 47 | | Baja |
| CUBREJ-001 | Cubrejuntas | Linealidad y llegada a marco | Comparación | 48 | | Baja |
| PILASTRA-001 | Pilastras | Uniones a 45° | Comparación | 50 | | Baja |
| PILASTRA-002 | Pilastras | Paralelismo con marco, espacio a muro | Comparación | 50 | | Media |
| PILASTRA-003 | Pilastras | Separación con guardapolvo/taco/piso | Comparación | 51 | | Media |
| CLOSET-001 | Closets | Verticalidad puerta corredera | Comparación | 53 | | Media |
| CLOSET-002 | Closets | Alineación de puertas en el plano | Comparación | 53 | | Media |
| CLOSET-003 | Closets | Alineación de tiradores (detalle) | Comparación | 54 | | Baja *(redundante con CLOSET-002, ver editorial)* |
| CLOSET-004 | Closets | Linealidad y separación de repisas | Comparación | 54 | | Media |
| MUEBLE-001 | Muebles incorporados | Alineación respecto de paramentos | Comparación | 56 | | Alta |
| MUEBLE-002 | Muebles incorporados | Alineación horizontal entre puertas | Comparación | 57 | | Media |
| MUEBLE-003 | Muebles incorporados | Elementos decorativos | Comparación | 57 | | Baja |
| MUEBLE-004 | Muebles incorporados | Alineación de manillas/tiradores | Comparación | 58 | | Media |
| MUEBLE-005 | Muebles incorporados | Horizontalidad de mesones | Comparación | 59 | | Alta |
| PINTURA-001 | Pinturas | Pinturas interiores (luz angulada) | Comparación | 60 | | **Alta — ya en uso por ObraBien** |
| PINTURA-002 | Pinturas | Pinturas exteriores (5 m) | Comparación | 60 | | **Alta — ya en uso por ObraBien** |
| VINIL-001 | Pavimentos vinílicos | Encuentro entre palmetas | Comparación | 61 | | Media |
| VINIL-002 | Pavimentos vinílicos | Encuentro sin guardapolvo/junquillo | Método | 61 | | Baja |
| PISOFLOT-001 | Pisos flotantes | Planeidad | Comparación | 62 | | Alta |
| ARTELEC-001 | Artefactos eléctricos | Alineación entre artefactos | Comparación | 63 | | Alta |
| ARTELEC-002 | Artefactos eléctricos | Horizontalidad del artefacto | Comparación | 63 | | Alta |

---

# IMÁGENES NUEVAS RECOMENDADAS PARA OBRABIEN

Situaciones donde el manual **solo usa texto**, sin ningún apoyo visual (ni siquiera esquemático), y donde ObraBien debería generar imagen propia — esto va más allá de "convertir lo que ya existe" y responde a vacíos reales del documento fuente.

| # | Partida | Motivo | Qué debería enseñar | Utilidad para el usuario | Prioridad |
|---|---|---|---|---|---|
| N1 | Muros de albañilería (Anexo, pág. 13) | El Anexo describe en texto puro fisuras, desconchamiento y eflorescencia en unidades de ladrillo, sin ninguna figura | Comparación fotográfica de un ladrillo con fisura superficial aceptable vs. fisura pasada inaceptable, y ejemplo de eflorescencia (salitre) | Es contenido normativo real (tabla del Anexo) que hoy no tiene ningún respaldo visual ni en el manual ni en ObraBien | Alta |
| N2 | Losas/Radieres | El manual no ilustra nunca el "grado de terminación del hormigón" (G1-G6) mencionado en Recomendaciones Generales (pág. 10) más allá de nombrarlo | Serie de 6 fotos comparativas mostrando la diferencia visual real entre G1 (arquitectónico a la vista) y G6 (rústico sin afinar) | El concepto de "grado" es la base de casi todas las tablas de hormigón del manual, pero nunca se muestra qué distingue un grado de otro a simple vista | Alta |
| N3 | Puertas/Ventanas | El manual nunca muestra cómo se ve una puerta o ventana **correctamente** instalada de forma integral (solo detalles aislados de cada tolerancia) | Una foto de "conjunto correcto" por partida, mostrando los 4-5 criterios simultáneamente cumplidos, como ancla visual de referencia | Sin una imagen de referencia integral, el usuario no técnico solo ve fragmentos de defectos, nunca el "estándar" completo al que aspira | Alta |
| N4 | Estucos/Pinturas exteriores | No existe ninguna imagen de fisuras de retracción del estuco, pese a ser la patología más común y consultada en postventa según la práctica de terreno | Comparación de fisura capilar aceptable (solo estética) vs. fisura estructural que amerita revisión | Vacío de alto impacto práctico — es de las consultas más frecuentes de un propietario real | Alta |
| N5 | Revestimientos cerámicos | El manual no muestra cómo se ve o suena una palmeta con adherencia deficiente ("sonido hueco al golpe"), solo lo describe en texto | Video corto o secuencia de fotos mostrando el golpe de prueba y contraste sonoro (complementado con texto/ícono de sonido) | Es un criterio 100% de terreno que el usuario debe replicar él mismo; hoy no tiene ninguna referencia visual, ni del manual ni de ObraBien | Media |
| N6 | Humedad y filtraciones | El manual no tiene ninguna ficha ni imagen sobre humedad/filtraciones, pese a que Fachada, Estucos y Losas mencionan el riesgo tangencialmente | Serie de fotos de manchas de humedad típicas (por capilaridad, por filtración de techumbre, por condensación) — hoy vacío total | Es una de las categorías de reclamo postventa más frecuentes en Chile y no tiene ninguna cobertura visual en la fuente | Alta |
| N7 | Artefactos sanitarios/griferías | El manual no incluye ficha de sanitarios ni griferías (a diferencia de otros documentos de la serie CDT) | Fotos de instalación correcta vs. incorrecta de WC, lavamanos, griferías — fuga en la base, desnivel, sellado perimetral | ObraBien ya tiene checklist de Sanitarios/Griferías en su propio catálogo (fuera de este manual) sin respaldo visual normativo | Media |
| N8 | Revestimientos exteriores no tradicionales (Marmolina, Graniplast, fibrocemento, etc.) | El manual (2018) es anterior a la extensión de terminaciones exteriores que UX-03 está incorporando a ObraBien; no cubre ninguna de ellas | Biblioteca visual completa por familia de terminación exterior, ya planificada en el Domain Model de UX-03 | Conecta directamente con el trabajo de arquitectura ya aprobado (`ObraBien-Domain-Model-v1.md`) — este manual no puede ser la única fuente para esas fichas | Alta |

---

# ANÁLISIS EDITORIAL

**¿Qué imágenes son poco claras?**
El sistema de círculos de detalle conectados por líneas punteadas (usado en Estucos, Enlucidos de Yeso, Guardapolvos, Pilastras, Closets, Muebles) satura la lectura cuando agrupa 3-4 criterios en un mismo dibujo — el ojo debe saltar entre el dibujo general y cada círculo aislado sin una jerarquía visual clara de cuál criterio es más importante. Ejemplos concretos: GUARDAP-001/002 (4 círculos por figura), PILASTRA-001 (3 círculos), MUEBLE-002/003 (dos círculos por figura con etiquetas casi idénticas). Ninguno tiene una jerarquía de lectura (todos los círculos con el mismo tamaño y peso visual).

**¿Cuáles podrían reemplazarse por fotografías mejores?**
Prácticamente el 100% — porque no hay ninguna fotografía real en el documento original, cualquier ficha se beneficia de la conversión. Las de mayor beneficio relativo son las que hoy dependen de que el usuario imagine una textura de material real que el dibujo vectorial no puede transmitir: MUROLAD (textura de ladrillo), ESTUCO (textura rugosa), ENCHMAD (veta de madera), CERAM/VINIL (brillo y reflejo de superficie pulida).

**¿Cuáles deberían convertirse en comparaciones Bien vs. Mal?**
Los 13 registros marcados "Método de medición" en la matriz son los candidatos a evaluar caso a caso — varios sí admiten una versión Bien/Mal aunque el manual solo describa el método (ej. LOSA-004 "variaciones de pendiente" se resolvió en este documento como comparación mediante el recurso del agua empozada, MUROHOR-001/LOSA-003 en cambio genuinamente no tienen señal visual de defecto propia y deben quedar como método).

**¿Cuáles necesitan un zoom?**
YESO-002 (linealidad de aristas, ±3 mm por metro — una desviación demasiado sutil en plano general), MUROLAD-002 (pérdida de linealidad, ±4 mm en 3 m), CLOSET-003/MUEBLE-004 (diferencias de 1-2 mm en tiradores) — en los tres casos el defecto real es demasiado pequeño para un plano general y requiere macro con escala de referencia.

**¿Cuáles necesitan una fotografía macro?**
TABIQ-001 (distancia de fijaciones), CERAM-001 (diferencia de nivel entre palmetas, 1-2 mm), ARTELEC-001/002 (artefactos pequeños) — en general, cualquier ficha cuya tolerancia esté expresada en 1-2 mm sobre un objeto pequeño.

**¿Cuáles deberían dividirse en dos imágenes?**
TABIQ (planchas de revestimiento, hoy 3 criterios distintos —distancia entre fijaciones, al borde, entre planchas— en una sola figura compuesta), PUERTA-001/002 (verticalidad + horizontalidad + dimensiones del vano, hoy fusionados en una sola Figura 1 con 4 sub-diagramas), GUARDAP-001 (guardapolvo) y GUARDAP-002 (junquillo) ya están correctamente separadas por tipo de moldura pero cada una sigue agrupando 4 criterios internos que ObraBien debería separar en 4 fotos independientes por criterio, no por moldura.

**¿Cuáles necesitan un esquema adicional (no reemplazo, complemento)?**
LOSA-004 (variaciones de pendiente) y VENTANA-003 (protocolo de detección de fallas en vidrio, con su gradiente de distancia) se benefician de mantener un esquema técnico simple **además** de la foto realista, porque el criterio de medición en sí (cómo se posiciona el instrumento, cómo se calcula el gradiente de distancia) es más claro en diagrama que en foto — son los dos casos donde el formato original del manual sigue siendo superior a una fotografía pura.

**¿Qué contenido visual importante falta completamente?**
Ver la sección "Imágenes nuevas recomendadas" arriba — los vacíos de mayor impacto real son humedad/filtraciones (N6), fisuras estructurales vs. estéticas en estuco (N4), y el propio concepto de "grado de terminación del hormigón G1-G6" (N2), que el manual usa como base de varias tablas sin nunca mostrarlo.

**¿Qué biblioteca visual mínima debería tener ObraBien para superar claramente al Manual de Tolerancias?**
Cuatro elementos que el manual, por su naturaleza normativa, no tiene y no puede tener:
1. **Fotografía real, no esquema vectorial**, en el 100% de las fichas — el manual parte en cero en esto.
2. **Par explícito Bien/Mal en la misma composición** (lado a lado o antes/después), no una figura aislada que exige que el usuario imagine el contraste — el manual nunca hace esto, ni una sola vez en 70 registros.
3. **Escala humana o de referencia constante** (persona, moneda, regla con valor legible) en cada imagen — el manual la usa de forma inconsistente (a veces sí, en Pinturas/Ventanas/Enchapes; la mayoría de las veces no).
4. **Cobertura de patologías reales de postventa** (humedad, fisuras estructurales, filtraciones) que el manual, por ser un documento de tolerancias dimensionales y no de patologías, deja completamente fuera de su alcance — y que es, en la práctica, lo que más le importa al propietario que usa ObraBien.

---

*Fin del documento. 70 registros individuales, 26 capítulos, matriz completa, 8 propuestas de contenido nuevo, análisis editorial completo. Ningún dato de tolerancia fue modificado respecto del original — todos los valores citados como "textuales" son transcripción literal del Manual de Tolerancias para Edificaciones, CDT/CChC, 3ª Edición, 2018.*
