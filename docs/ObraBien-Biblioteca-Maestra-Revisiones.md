# BIBLIOTECA MAESTRA DE REVISIONES OBRABIEN (BMR)

## Qué es este documento

Catálogo editorial definitivo de **revisiones técnicas atómicas**,
extraídas de las ~140 preguntas de checklist que existen hoy en los
92 `ElementTemplate` de la aplicación (ya inventariadas
verbatim en `ObraBien-Biblioteca-Maestra-Auditoria.md`), **fusionadas
por concepto técnico** en vez de por elemento/material/pantalla. Cada
revisión existe **una sola vez** y declara dónde se reutiliza —
exactamente el criterio pedido: "Uniformidad del color" es una
revisión, no cuatro (Pintura interior / Pintura exterior / Marmolina
/ Graniplast).

**No se implementa nada.** No se toca schema, código, ni la
arquitectura de UX-03. Este documento es la fuente editorial para
que, cuando corresponda, se construyan checklists, biblioteca visual,
imágenes Bien/Mal, artículos, videos, guías y capacitación — todo
como trabajo futuro, no de este documento.

**Resultado**: 74 revisiones únicas, organizadas en 13 familias
técnicas (las 7 que sugeriste + 6 adicionales detectadas durante la
fusión, todas necesarias para no forzar revisiones dispares dentro de
una familia que no les corresponde).

## Cómo leer cada ficha

Los 16 campos pedidos, en orden compacto:
**Código** · **Nombre corto** · **Nombre técnico** · **Objetivo** ·
**Qué detecta** · **Cómo inspeccionarla** · **Normativa** ·
**Artículo** · **Guía técnica** · **Imágenes necesarias** ·
**Video sugerido** · **Elementos que la usan** · **Materiales que la
usan** · **Recintos que la usan** · **Prioridad** · **Estado**.

`Normativa` cita la ficha del Manual CDT cuando existe respaldo
directo (ya transcrito en `tolerances-manual.ts`); `Ninguna` cuando el
criterio es enteramente editorial (no es un defecto del catálogo, el
CDT simplemente no cubre plomería, gas ni seguridad). `Estado` sigue
el mismo criterio que la Auditoría Maestra: Completo / Parcial /
Mínimo — y, como ya se documentó ahí, **ninguna revisión de este
documento tiene hoy una imagen real** (0 de 74), así que esa columna
no se repite ficha por ficha.

---

# FAMILIA 1 · GEOMETRÍA

Verticalidad, planeidad, nivel, escuadra, alineación — todo lo que se
mide con regla, nivel, plomada o escuadra.

### REV-0001 — Verticalidad / aplome
- **Nombre técnico**: Desviación respecto de la vertical teórica
- **Objetivo**: confirmar que una superficie o línea vertical no esté desplomada
- **Qué detecta**: inclinación de un paño respecto del plomo
- **Cómo inspeccionar**: apoyar regla/nivel o colgar plomada; medir la separación en el punto más desfavorable
- **Normativa**: Ficha 8 (Estucos, ±5 mm/piso); conceptualmente también Fichas 1, 5, 6 (no vinculadas hoy)
- **Artículo**: ninguno vinculado hoy
- **Guía técnica**: No
- **Imágenes necesarias**: par Bien/Mal con plomada colgante, sombra/hueco visible en el caso incorrecto
- **Video sugerido**: Sí — cómo colgar y leer una plomada correctamente
- **Elementos que la usan**: Fachada (familia húmeda sobre estuco)
- **Materiales**: Pintura lisa, Marmolina, Graniplast, Revestimiento texturado
- **Recintos**: Exterior
- **Prioridad**: Alta
- **Estado**: Parcial (checklist existe, sin tolerancia numérica citada al usuario)

### REV-0002 — Planeidad de superficie
- **Nombre técnico**: Ausencia de ondulaciones respecto de un plano teórico
- **Objetivo**: confirmar que una superficie no tenga resaltes ni depresiones
- **Qué detecta**: ondulación al apoyar una regla larga
- **Cómo inspeccionar**: apoyar regla de 1,2 m o más en distintas direcciones, medir el hueco
- **Normativa**: Fichas 3, 4, 8, 9, 25 (Losas, Radieres, Estucos, Enlucidos, Pisos Flotantes)
- **Artículo**: `crujidos-en-piso-flotante`, `pintura-interior` (indirecto vía "cielo parejo")
- **Guía técnica**: Sí (parcial)
- **Imágenes necesarias**: par Bien/Mal con regla apoyada y sombra de hueco
- **Video sugerido**: Sí — técnica de apoyo de regla y lectura del hueco
- **Elementos**: Piso (genérico Flotante), Muros y cielos (pintura), Fachada (húmeda sobre estuco)
- **Materiales**: Piso flotante, Pintura interior, familia húmeda sobre estuco
- **Recintos**: Living, Comedor, Dormitorios, Exterior
- **Prioridad**: Alta
- **Estado**: Parcial

### REV-0003 — Nivelación entre piezas adyacentes
- **Nombre técnico**: Desnivel (escalón) entre unidades contiguas de un revestimiento
- **Objetivo**: que dos piezas vecinas queden al mismo nivel
- **Qué detecta**: escalón perceptible al pasar la mano por la unión
- **Cómo inspeccionar**: pasar la mano por el borde de unión; en escaleras, medir con huincha contra grada vecina
- **Normativa**: Ficha 10 (Rev. Cerámicos, 1-2 mm), Ficha 11 (Gradas, ±5 mm entre gradas consecutivas)
- **Artículo**: `piezas-parejas-sin-fisuras`, `nivel-y-sellado-de-juntas`
- **Guía técnica**: Sí
- **Imágenes necesarias**: macro del borde con escalón marcado por sombra
- **Video sugerido**: Sí — prueba táctil de la mano sobre la unión
- **Elementos**: Piso (Cerámica, Porcelanato), Muros y cielos (Cerámico), Peldaños y pasamanos
- **Materiales**: Cerámica, Porcelanato
- **Recintos**: Living, Comedor, Dormitorios, Cocina, Baños, Escalera
- **Prioridad**: Alta
- **Estado**: Completo (sin imagen)

### REV-0004 — Escuadra de marco o vano
- **Nombre técnico**: Ángulo de 90° en el encuentro de un vano
- **Objetivo**: confirmar que el marco no esté "romboidal"
- **Qué detecta**: marco inclinado hacia un lado
- **Cómo inspeccionar**: apoyar escuadra en la esquina del vano, medir el hueco al canto no apoyado
- **Normativa**: Ficha 12 (Puertas), Ficha 9 (Enlucidos, cuadratura de esquinas)
- **Artículo**: `alineacion-y-cierre`
- **Guía técnica**: Sí
- **Imágenes necesarias**: par Bien/Mal con escuadra apoyada en el rincón
- **Video sugerido**: No prioritario
- **Elementos**: Puerta de acceso
- **Materiales**: —
- **Recintos**: Exterior
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0005 — Horizontalidad de mesón o superficie
- **Nombre técnico**: Nivel de una superficie de trabajo horizontal
- **Objetivo**: confirmar que un mesón no tenga pendiente
- **Qué detecta**: inclinación perceptible con nivel o mediante prueba de objeto redondo
- **Cómo inspeccionar**: poner un objeto redondo sobre el mesón — si rueda, hay pendiente; o apoyar nivel de burbuja
- **Normativa**: Ficha 22 (Muebles Incorporados, 1 mm/m lineal)
- **Artículo**: `puertas-cajones-y-herrajes`
- **Guía técnica**: Sí
- **Imágenes necesarias**: nivel de burbuja apoyado, burbuja centrada vs. descentrada
- **Video sugerido**: Sí — la prueba del objeto redondo es muy didáctica
- **Elementos**: Muebles de cocina, Mueble de baño
- **Materiales**: —
- **Recintos**: Cocina, Baños
- **Prioridad**: Media
- **Estado**: Completo (sin imagen)

### REV-0006 — Alineación entre elementos vecinos
- **Nombre técnico**: Coincidencia de posición entre artefactos o piezas próximas
- **Objetivo**: que dos elementos cercanos (enchufes, tiradores, molduras) queden a la misma altura/línea
- **Qué detecta**: elemento desalineado respecto de su par cercano
- **Cómo inspeccionar**: apoyar regla en uno, medir diferencia con el segundo
- **Normativa**: Ficha 26 (Artefactos Eléctricos, ±2 mm), Ficha 16 (Guardapolvos), Ficha 18 (Cornisas), Ficha 22 (Muebles)
- **Artículo**: `prueba-de-enchufes`, `puertas-cajones-y-herrajes`, `guardapolvos-y-junquillos`, `cornisas`
- **Guía técnica**: Sí
- **Imágenes necesarias**: par Bien/Mal con regla de referencia entre dos artefactos/tiradores
- **Video sugerido**: No prioritario
- **Elementos**: Enchufes e interruptores, Muebles de cocina, Guardapolvos, Cornisas
- **Materiales**: —
- **Recintos**: Living, Cocina, Comedor, Dormitorios
- **Prioridad**: Media
- **Estado**: Completo (sin imagen)

### REV-0007 — Paralelismo entre hoja y marco
- **Nombre técnico**: Holgura constante en el perímetro de cierre
- **Objetivo**: que una puerta de dos hojas mantenga separación pareja entre ambas
- **Qué detecta**: hueco variable entre hojas (más ancho arriba que abajo)
- **Cómo inspeccionar**: medir con huincha/galga en varios puntos de la altura
- **Normativa**: Ficha 12 (Puertas, 3 mm)
- **Artículo**: `alineacion-y-cierre`
- **Guía técnica**: Sí
- **Imágenes necesarias**: galga insertada en la holgura, par Bien/Mal
- **Video sugerido**: No prioritario
- **Elementos**: Puerta de acceso (de dos hojas)
- **Materiales**: —
- **Recintos**: Exterior
- **Prioridad**: Baja
- **Estado**: Parcial

### REV-0008 — Rectitud y alineación de líneas de junta
- **Nombre técnico**: Linealidad de la retícula de canterías/juntas
- **Objetivo**: que las líneas de junta de un revestimiento formen una retícula recta
- **Qué detecta**: junta que se desvía de la línea recta en algún tramo
- **Cómo inspeccionar**: tender hilo o regla larga a lo largo de la línea de junta, medir la desviación
- **Normativa**: Ficha 10 (Rev. Cerámicos, ±2 mm en 3 m)
- **Artículo**: `piezas-parejas-sin-fisuras`, `nivel-y-sellado-de-juntas`
- **Guía técnica**: Sí
- **Imágenes necesarias**: vista cenital de retícula con un tramo desviado marcado
- **Video sugerido**: No prioritario
- **Elementos**: Piso (Cerámica, Porcelanato)
- **Materiales**: Cerámica, Porcelanato
- **Recintos**: Living, Comedor, Dormitorios, Cocina, Baños
- **Prioridad**: Media
- **Estado**: Completo (sin imagen)

---

# FAMILIA 2 · SUPERFICIES

Aspecto visual de una superficie terminada: color, brillo, textura,
adhesión, integridad.

### REV-0009 — Uniformidad de color o tono
- **Nombre técnico**: Homogeneidad cromática de la superficie terminada
- **Objetivo**: que no existan diferencias de tono perceptibles en un mismo paño
- **Qué detecta**: parche, mancha o diferencia de tono
- **Cómo inspeccionar**: observar a la distancia normada (1 m interior / 5 m exterior), luz de día
- **Normativa**: Ficha 23 (Pinturas)
- **Artículo**: `pintura-interior`, `pintura-exterior`, `papel-mural`
- **Guía técnica**: Sí — la más completa del sistema hoy
- **Imágenes necesarias**: par Bien/Mal ya parcialmente descrito en la Biblioteca Visual (PINTURA-001/002)
- **Video sugerido**: Sí — protocolo de distancia y luz de día
- **Elementos**: Fachada (ambas), Muros y cielos (pintura), Muros y cielos (papel mural)
- **Materiales**: Pintura interior/exterior, familia húmeda sobre estuco, Papel mural
- **Recintos**: Exterior, Living, Comedor, Dormitorios
- **Prioridad**: **Alta — ya en uso productivo**
- **Estado**: **Completo (sin imagen)**

### REV-0010 — Ausencia de marcas de aplicación
- **Nombre técnico**: Huella visible de herramienta de aplicación (rodillo, llana)
- **Objetivo**: que la terminación no delate el proceso de aplicación
- **Qué detecta**: marca de rodillo, traslapo, huella de llana
- **Cómo inspeccionar**: observación con luz rasante
- **Normativa**: Ficha 23 (Pinturas, criterio de sombra con luz angulada)
- **Artículo**: `pintura-interior`
- **Guía técnica**: Sí
- **Imágenes necesarias**: detalle con luz rasante mostrando el traslapo
- **Video sugerido**: No prioritario
- **Elementos**: Muros y cielos (pintura)
- **Materiales**: Pintura interior
- **Recintos**: Living, Comedor, Dormitorios
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0011 — Uniformidad de textura o grano
- **Nombre técnico**: Homogeneidad del relieve superficial de un acabado texturado
- **Objetivo**: que el grano/relieve de un revestimiento no varíe entre zonas
- **Qué detecta**: parche de textura distinta (típico de segunda mano mal empatada)
- **Cómo inspeccionar**: observación de cerca, luz rasante
- **Normativa**: ninguna ficha CDT específica de textura (vacío ya señalado en la Auditoría)
- **Artículo**: ninguno vinculado hoy
- **Guía técnica**: No
- **Imágenes necesarias**: macro de textura pareja vs. parche
- **Video sugerido**: No prioritario
- **Elementos**: Fachada (húmeda sobre estuco)
- **Materiales**: Marmolina, Graniplast, Revestimiento texturado — Pintura lisa no aplica (sin grano)
- **Recintos**: Exterior
- **Prioridad**: Media — futura extensión específica por material (ya prevista en el modelo de tres capas de UX-03)
- **Estado**: Mínimo

### REV-0012 — Sonoridad de adhesión (golpe hueco)
- **Nombre técnico**: Verificación acústica de contacto de adhesivo bajo revestimiento rígido
- **Objetivo**: confirmar que una pieza esté bien adherida a su base
- **Qué detecta**: adhesión deficiente (sonido hueco al golpe)
- **Cómo inspeccionar**: golpear suavemente con una moneda o mango de herramienta, comparar sonido
- **Normativa**: Ficha 10 (Rev. Cerámicos, mínimo 70% de contacto)
- **Artículo**: `piezas-parejas-sin-fisuras`, `nivel-y-sellado-de-juntas`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no es un criterio fotografiable por sí solo — candidato a **video/audio** en vez de imagen estática
- **Video sugerido**: **Sí, prioritario** — es el único criterio de todo el catálogo mejor representado en audio que en foto
- **Elementos**: Piso (Cerámica, Porcelanato)
- **Materiales**: Cerámica, Porcelanato
- **Recintos**: Living, Comedor, Dormitorios, Cocina, Baños
- **Prioridad**: Alta
- **Estado**: Completo (sin imagen/video)

### REV-0013 — Ausencia de piezas trisadas, astilladas o quebradas
- **Nombre técnico**: Integridad física de piezas rígidas
- **Objetivo**: que ninguna pieza tenga daño mecánico visible
- **Qué detecta**: trizadura, astilladura, fractura
- **Cómo inspeccionar**: inspección visual de cerca de bordes y esquinas
- **Normativa**: Ficha 10 (Rev. Cerámicos)
- **Artículo**: `nivel-y-sellado-de-juntas`, `puertas-cajones-y-herrajes`, `estado-de-la-cubierta`
- **Guía técnica**: Sí (parcial)
- **Imágenes necesarias**: macro de pieza trizada vs. pieza sana
- **Video sugerido**: No prioritario
- **Elementos**: Piso (Porcelanato), Mueble de baño, Cubierta
- **Materiales**: Porcelanato
- **Recintos**: Living, Comedor, Dormitorios, Cocina, Baños, Techumbre
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0014 — Rayas, abolladuras o decoloraciones superficiales
- **Nombre técnico**: Daño estético puntual en superficie terminada
- **Objetivo**: distinguir daño aceptable (puntual, no visible a distancia) de inaceptable
- **Qué detecta**: raya, abolladura o decoloración en marco, hoja o pavimento
- **Cómo inspeccionar**: observación a la distancia de referencia normada (1,5 m en ventanas)
- **Normativa**: Ficha 13 (Ventanas), Ficha 24 (Pavimentos Vinílicos)
- **Artículo**: `sellos-de-silicona`, `pavimentos-vinilicos`
- **Guía técnica**: Sí
- **Imágenes necesarias**: par a 1,5 m (invisible) vs. macro (evidente) — ya descrito en Biblioteca Visual (VENTANA-001)
- **Video sugerido**: No prioritario
- **Elementos**: Ventanas, Piso (Vinílico)
- **Materiales**: Pavimento vinílico
- **Recintos**: Living, Dormitorios
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0015 — Ausencia de manchas por humedad en superficie
- **Nombre técnico**: Indicio visual de humedad bajo o detrás de un revestimiento
- **Objetivo**: detectar humedad antes de que sea un daño mayor
- **Qué detecta**: mancha, decoloración u óxido cerca de juntas, techos o zonas húmedas
- **Cómo inspeccionar**: observación visual sistemática de juntas, cielos y esquinas
- **Normativa**: ninguna ficha CDT (el manual no cubre patologías de humedad — vacío ya señalado, ver también RP7 de la Auditoría)
- **Artículo**: `piezas-parejas-sin-fisuras`, `estado-de-la-cubierta`
- **Guía técnica**: Parcial
- **Imágenes necesarias**: **Alta prioridad** — es uno de los vacíos de mayor impacto real detectados en la Auditoría (N6)
- **Video sugerido**: No — mejor una serie de fotos comparativas por tipo de mancha
- **Elementos**: Piso (Cerámica), Cubierta
- **Materiales**: Cerámica
- **Recintos**: Baños, Cocina, Techumbre
- **Prioridad**: **Alta**
- **Estado**: Mínimo

---

# FAMILIA 3 · SELLADOS Y JUNTAS

Continuidad y estado de silicona, sellos perimetrales, juntas de
dilatación y uniones entre piezas o molduras.

### REV-0016 — Continuidad de silicona perimetral
- **Nombre técnico**: Integridad del cordón de sellante en el perímetro de un vano
- **Objetivo**: que el sello no tenga cortes ni espacios
- **Qué detecta**: silicona discontinua — causa más común de filtración de agua/aire
- **Cómo inspeccionar**: recorrer visualmente todo el perímetro
- **Normativa**: ninguna ficha CDT numérica (criterio cualitativo de continuidad)
- **Artículo**: `sellos-de-silicona`
- **Guía técnica**: Sí
- **Imágenes necesarias**: par cordón continuo vs. cordón cortado
- **Video sugerido**: No prioritario
- **Elementos**: Ventanas
- **Materiales**: —
- **Recintos**: Living, Dormitorios
- **Prioridad**: Alta
- **Estado**: Parcial

### REV-0017 — Sello de ducha/tina (muro-piso, tina-muro)
- **Nombre técnico**: Continuidad del sello impermeable en el perímetro de un receptáculo húmedo
- **Objetivo**: evitar filtración de agua hacia zonas no impermeabilizadas
- **Qué detecta**: corte o discontinuidad en el sello
- **Cómo inspeccionar**: recorrido visual del perímetro con ducha/tina secas
- **Normativa**: ninguna (plomería/impermeabilización fuera del alcance del Manual CDT)
- **Artículo**: `impermeabilizacion-de-duchas`
- **Guía técnica**: Sí
- **Imágenes necesarias**: par sello continuo vs. sello cortado/despegado
- **Video sugerido**: No prioritario
- **Elementos**: Impermeabilización y sellos
- **Materiales**: —
- **Recintos**: Baños
- **Prioridad**: Alta
- **Estado**: Parcial

### REV-0018 — Estado de silicona sanitaria (envejecimiento)
- **Nombre técnico**: Deterioro por edad/humedad de un sello de silicona ya instalado
- **Objetivo**: distinguir silicona sana de silicona que ya cumplió su vida útil
- **Qué detecta**: amarillamiento, hongos o despegue al tacto
- **Cómo inspeccionar**: inspección visual + tacto (presionar suavemente el cordón)
- **Normativa**: ninguna
- **Artículo**: `impermeabilizacion-de-duchas`
- **Guía técnica**: Sí
- **Imágenes necesarias**: par silicona sana (blanca, adherida) vs. deteriorada (amarilla, con hongo, despegada)
- **Video sugerido**: No prioritario
- **Elementos**: Impermeabilización y sellos
- **Materiales**: —
- **Recintos**: Baños
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0019 — Espacio de dilatación piso-muro
- **Nombre técnico**: Junta perimetral libre para expansión térmica/higroscópica del piso
- **Objetivo**: que el piso pueda dilatar sin levantarse
- **Qué detecta**: piso instalado sin espacio de dilatación (pegado al muro)
- **Cómo inspeccionar**: verificar visualmente el espacio en el perímetro, típicamente cubierto por guardapolvo
- **Normativa**: ninguna ficha CDT explícita (criterio de buena práctica de instalación)
- **Artículo**: `crujidos-en-piso-flotante`
- **Guía técnica**: Sí
- **Imágenes necesarias**: esquema/foto del espacio bajo el guardapolvo levantado
- **Video sugerido**: No prioritario
- **Elementos**: Piso (Flotante)
- **Materiales**: Piso flotante
- **Recintos**: Living, Comedor, Dormitorios
- **Prioridad**: Baja — defecto de consecuencia diferida, no urgente en la recepción
- **Estado**: Mínimo

### REV-0020 — Encuentro de piso sin escalón
- **Nombre técnico**: Transición pareja entre el piso y un elemento de remate
- **Objetivo**: que el encuentro del piso con guardapolvo o puertas no forme un resalte
- **Qué detecta**: escalón brusco en la transición
- **Cómo inspeccionar**: pasar la mano/pie por la transición
- **Normativa**: ninguna
- **Artículo**: `crujidos-en-piso-flotante`, `pavimentos-vinilicos`
- **Guía técnica**: Sí
- **Imágenes necesarias**: macro del encuentro con y sin escalón
- **Video sugerido**: No prioritario
- **Elementos**: Piso (Flotante, Vinílico)
- **Materiales**: Piso flotante, Pavimento vinílico
- **Recintos**: Living, Comedor, Dormitorios
- **Prioridad**: Baja
- **Estado**: Mínimo

### REV-0021 — Alineación y ajuste de uniones de moldura
- **Nombre técnico**: Continuidad de línea y ajuste de corte en encuentros de guardapolvo/cornisa/junquillo
- **Objetivo**: que dos tramos de moldura se encuentren sin escalón ni hueco
- **Qué detecta**: desajuste o desalineación en la unión (típicamente a inglete)
- **Cómo inspeccionar**: observación de cerca, luz rasante
- **Normativa**: Ficha 16 (Guardapolvos y Junquillos, 1 mm), Ficha 18 (Cornisas, 1 mm)
- **Artículo**: `guardapolvos-y-junquillos`, `cornisas`
- **Guía técnica**: Sí
- **Imágenes necesarias**: macro de esquina a inglete, par ajustado vs. con hueco
- **Video sugerido**: No prioritario
- **Elementos**: Guardapolvos, Cornisas
- **Materiales**: —
- **Recintos**: Living, Comedor, Dormitorios, Cocina, Baños
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0022 — Ausencia de piquetes o burbujas (papel mural)
- **Nombre técnico**: Defectos puntuales de instalación de revestimiento laminado
- **Objetivo**: que el papel no tenga marcas ni aire atrapado bajo la superficie
- **Qué detecta**: piquete o burbuja visible a la distancia de observación normada (1 m)
- **Cómo inspeccionar**: observación de pie a 1 m de distancia
- **Normativa**: Ficha 14 (Revestimientos de Papel)
- **Artículo**: `papel-mural`
- **Guía técnica**: Sí
- **Imágenes necesarias**: par a 1 m (invisible) vs. macro (evidente)
- **Video sugerido**: No prioritario
- **Elementos**: Muros y cielos (Papel mural)
- **Materiales**: Papel mural
- **Recintos**: Living, Comedor, Dormitorios
- **Prioridad**: Baja
- **Estado**: Parcial

### REV-0023 — Hermeticidad de cierre (ausencia de luz visible)
- **Nombre técnico**: Sellado efectivo entre hoja y marco al estar cerrado
- **Objetivo**: que no exista paso de aire/agua entre hoja y marco
- **Qué detecta**: luz visible colándose por el perímetro con la ventana cerrada
- **Cómo inspeccionar**: observar a contraluz desde el interior, ventana cerrada
- **Normativa**: Ficha 13 (Ventanas, ±2 mm, "no debe verse luz")
- **Artículo**: `sellos-de-silicona`
- **Guía técnica**: Sí
- **Imágenes necesarias**: fotografía a contraluz — ya identificado en Biblioteca Visual (VENTANA-002) como el recurso fotográfico de mayor potencial de todo el manual
- **Video sugerido**: No — la foto a contraluz es autoexplicativa
- **Elementos**: Ventanas
- **Materiales**: —
- **Recintos**: Living, Dormitorios
- **Prioridad**: **Alta**
- **Estado**: Parcial

---

# FAMILIA 4 · FUNCIONAMIENTO MECÁNICO

Todo lo que se prueba accionándolo: abrir, cerrar, deslizar, trabar,
motorizar.

### REV-0024 — Apertura y cierre sin roce
- **Nombre técnico**: Funcionamiento libre de un elemento batiente
- **Objetivo**: que abra y cierre sin rozar su marco/estructura
- **Qué detecta**: roce que indica desajuste de instalación
- **Cómo inspeccionar**: accionar el elemento en todo su recorrido
- **Normativa**: implícito en Ficha 12 (Puertas — el paralelismo garantiza esto)
- **Artículo**: `alineacion-y-cierre`, `puertas-cajones-y-herrajes`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no es un criterio fotografiable en estático — candidato a **video**
- **Video sugerido**: **Sí, prioritario** — mostrar el recorrido completo sin roce vs. con roce
- **Elementos**: Puerta de acceso, Reja peatonal, Portón manual, Portón automático, Ventanas, Muebles de cocina, Mueble de baño, Puerta y cerradura de bodega
- **Materiales**: —
- **Recintos**: Exterior, Cocina, Baños, Bodega, Living, Dormitorios
- **Prioridad**: **Alta — la revisión más reutilizada de toda la biblioteca**
- **Estado**: Completo (sin imagen/video)

### REV-0025 — Deslizamiento sin traba
- **Nombre técnico**: Funcionamiento libre de un elemento corredero sobre riel
- **Objetivo**: que deslice suavemente en todo su recorrido sin descarrilar
- **Qué detecta**: traba, descarrile o resistencia anormal
- **Cómo inspeccionar**: deslizar el elemento en todo su recorrido
- **Normativa**: ninguna
- **Artículo**: ninguno vinculado hoy
- **Guía técnica**: No
- **Imágenes necesarias**: video preferente sobre foto (ver REV-0024)
- **Video sugerido**: Sí
- **Elementos**: Puertas correderas
- **Materiales**: —
- **Recintos**: Closets
- **Prioridad**: Media
- **Estado**: Mínimo

### REV-0026 — Funcionamiento de cerradura, pestillo o candado
- **Nombre técnico**: Operación correcta del mecanismo de cierre con llave
- **Objetivo**: que trabe y destrabe sin forzar
- **Qué detecta**: mecanismo duro, trabado o que no calza
- **Cómo inspeccionar**: accionar con la llave real entregada
- **Normativa**: ninguna
- **Artículo**: `alineacion-y-cierre`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no prioritario (funcional, no visual)
- **Video sugerido**: No
- **Elementos**: Puerta de acceso, Reja peatonal, Puerta y cerradura de bodega
- **Materiales**: —
- **Recintos**: Exterior, Bodega
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0027 — Firmeza de manilla o tirador
- **Nombre técnico**: Ausencia de holgura en un elemento de accionamiento manual
- **Objetivo**: que no se mueva ni esté suelto al operarlo
- **Qué detecta**: holgura, tornillo suelto
- **Cómo inspeccionar**: mover la manilla/tirador con la mano, sentir holgura
- **Normativa**: ninguna
- **Artículo**: `alineacion-y-cierre`, `puertas-cajones-y-herrajes`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Puerta de acceso, Muebles de cocina, Mueble de baño
- **Materiales**: —
- **Recintos**: Exterior, Cocina, Baños
- **Prioridad**: Baja
- **Estado**: Parcial

### REV-0028 — Firmeza y silencio de bisagras, rieles o rodamientos
- **Nombre técnico**: Estado del mecanismo de soporte móvil
- **Objetivo**: que no genere ruido ni holgura excesiva durante el uso
- **Qué detecta**: ruido, vibración u holgura en el punto de giro/deslizamiento
- **Cómo inspeccionar**: accionar el elemento y escuchar/sentir
- **Normativa**: ninguna
- **Artículo**: ninguno vinculado hoy
- **Guía técnica**: No
- **Imágenes necesarias**: no aplica — es un criterio audible/táctil, mejor cubierto por video
- **Video sugerido**: Sí
- **Elementos**: Portón manual, Portón automático, Puertas correderas
- **Materiales**: —
- **Recintos**: Exterior, Closets
- **Prioridad**: Media
- **Estado**: Mínimo

### REV-0029 — Funcionamiento de motorización automática
- **Nombre técnico**: Operación del motor de un elemento automatizado
- **Objetivo**: que abra/cierre sin esfuerzo ni ruido excesivo
- **Qué detecta**: motor forzado, lento o ruidoso
- **Cómo inspeccionar**: accionar con el control y observar el ciclo completo
- **Normativa**: ninguna
- **Artículo**: ninguno vinculado hoy
- **Guía técnica**: No
- **Imágenes necesarias**: video, no foto
- **Video sugerido**: Sí
- **Elementos**: Portón vehicular automático
- **Materiales**: —
- **Recintos**: Exterior
- **Prioridad**: Media
- **Estado**: Mínimo

### REV-0030 — Alcance funcional de control remoto
- **Nombre técnico**: Respuesta del receptor a distancia normal de uso
- **Objetivo**: que el control funcione a la distancia habitual de un vehículo llegando
- **Qué detecta**: falta de alcance o de respuesta
- **Cómo inspeccionar**: probar el control a distancia representativa
- **Normativa**: ninguna
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no aplica
- **Video sugerido**: No
- **Elementos**: Portón vehicular automático
- **Materiales**: —
- **Recintos**: Exterior
- **Prioridad**: Baja
- **Estado**: Mínimo

### REV-0031 — Sistema de seguridad anti-atrapamiento
- **Nombre técnico**: Dispositivo de detección de obstáculo (sensor/reversa)
- **Objetivo**: que el portón se detenga o reverse ante un obstáculo
- **Qué detecta**: ausencia o falla del sistema de seguridad
- **Cómo inspeccionar**: probar interponiendo un objeto de prueba de forma segura
- **Normativa**: ninguna (criterio de seguridad, no dimensional)
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no aplica
- **Video sugerido**: Sí — es un criterio de seguridad de alto valor demostrativo
- **Elementos**: Portón vehicular automático
- **Materiales**: —
- **Recintos**: Exterior
- **Prioridad**: **Alta — seguridad**
- **Estado**: Mínimo

### REV-0032 — Firmeza de fijación al soporte
- **Nombre técnico**: Ausencia de movimiento de un elemento respecto de su anclaje
- **Objetivo**: que un elemento fijo no se mueva al ejercer presión normal
- **Qué detecta**: fijación insuficiente (tornillos flojos, adhesivo insuficiente)
- **Cómo inspeccionar**: aplicar presión manual deliberada — no solo mirar (ver Recomendación Profesional RP6 de la Auditoría)
- **Normativa**: ninguna ficha numérica
- **Artículo**: `guardapolvos-y-junquillos`, `cornisas`
- **Guía técnica**: Sí (parcial)
- **Imágenes necesarias**: no aplica — criterio táctil
- **Video sugerido**: Sí — mostrar la prueba de presión manual
- **Elementos**: Reja peatonal, Guardapolvos, Cornisas, Repisas, Baranda, Enchufes e interruptores
- **Materiales**: —
- **Recintos**: Exterior, Living, Comedor, Dormitorios, Cocina, Closets, Terraza/Patio
- **Prioridad**: Alta — reutilización muy amplia
- **Estado**: Parcial

---

# FAMILIA 5 · HIDRÁULICA Y HUMEDAD

Agua: presión, filtración, drenaje, pendiente, ventilación de zonas
húmedas.

### REV-0033 — Ausencia de goteras en llave o artefacto
- **Nombre técnico**: Estanqueidad de una conexión o llave de agua
- **Objetivo**: que no existan fugas visibles en uso normal
- **Qué detecta**: goteo en la base de la llave o en la conexión
- **Cómo inspeccionar**: accionar la llave y observar la base/conexión unos segundos
- **Normativa**: ninguna (plomería fuera del Manual CDT)
- **Artículo**: `filtraciones-y-presion-de-agua`
- **Guía técnica**: Sí
- **Imágenes necesarias**: macro de gota formándose en la base
- **Video sugerido**: No prioritario
- **Elementos**: Llave de agua y lavaplatos, Grifería
- **Materiales**: —
- **Recintos**: Cocina, Baños
- **Prioridad**: Alta
- **Estado**: Parcial

### REV-0034 — Drenaje sin filtración
- **Nombre técnico**: Estanqueidad del sistema de desagüe
- **Objetivo**: que el agua evacúe sin filtrar hacia afuera de la cañería
- **Qué detecta**: filtración bajo el mueble al usar el desagüe
- **Cómo inspeccionar**: dejar correr agua y revisar bajo el mueble/conexión
- **Normativa**: ninguna
- **Artículo**: `filtraciones-y-presion-de-agua`
- **Guía técnica**: Sí
- **Imágenes necesarias**: mancha de humedad bajo mueble (ver también REV-0036)
- **Video sugerido**: No prioritario
- **Elementos**: Llave de agua y lavaplatos, Conexión de lavadora, Impermeabilización y sellos
- **Materiales**: —
- **Recintos**: Cocina, Logia, Baños
- **Prioridad**: Alta
- **Estado**: Parcial

### REV-0035 — Presión de agua pareja fría/caliente
- **Nombre técnico**: Estabilidad de caudal entre circuitos de agua fría y caliente
- **Objetivo**: que no haya diferencia brusca de presión al alternar
- **Qué detecta**: caída de presión anormal en uno de los dos circuitos
- **Cómo inspeccionar**: abrir agua fría y caliente por separado, comparar caudal
- **Normativa**: ninguna
- **Artículo**: `filtraciones-y-presion-de-agua`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no aplica — criterio funcional
- **Video sugerido**: No
- **Elementos**: Llave de agua y lavaplatos, Grifería
- **Materiales**: —
- **Recintos**: Cocina, Baños
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0036 — Ausencia de manchas de humedad bajo mueble o artefacto
- **Nombre técnico**: Indicio de filtración crónica en un punto de conexión de agua
- **Objetivo**: detectar filtraciones lentas no visibles al momento de la prueba activa
- **Qué detecta**: mancha, hinchazón de tablero o corrosión bajo el mueble
- **Cómo inspeccionar**: revisar visualmente el interior del mueble bajo la conexión
- **Normativa**: ninguna
- **Artículo**: `filtraciones-y-presion-de-agua`
- **Guía técnica**: Sí
- **Imágenes necesarias**: **Alta prioridad** — ver Recomendación Profesional RP7 de la Auditoría (criterio olfativo complementario)
- **Video sugerido**: No
- **Elementos**: Llave de agua y lavaplatos, Grifería
- **Materiales**: —
- **Recintos**: Cocina, Baños
- **Prioridad**: **Alta**
- **Estado**: Mínimo

### REV-0037 — Funcionamiento de rebalse (tina)
- **Nombre técnico**: Desagüe de seguridad de un receptáculo de tina
- **Objetivo**: evitar desborde si se olvida cerrar la llave
- **Qué detecta**: rebalse obstruido o mal conectado
- **Cómo inspeccionar**: llenar hasta el nivel del rebalse y comprobar evacuación
- **Normativa**: ninguna
- **Artículo**: `impermeabilizacion-de-duchas`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Impermeabilización y sellos
- **Materiales**: —
- **Recintos**: Baños
- **Prioridad**: Baja
- **Estado**: Parcial

### REV-0038 — Ventilación de recinto o equipo húmedo/combustión
- **Nombre técnico**: Renovación de aire adecuada en un espacio con riesgo de humedad o gases
- **Objetivo**: prevenir acumulación de humedad o gases de combustión
- **Qué detecta**: ausencia de ventana/rejilla funcional, o extractor
- **Cómo inspeccionar**: verificar existencia y funcionamiento de la vía de ventilación
- **Normativa**: ninguna
- **Artículo**: `impermeabilizacion-de-duchas`, `calefont-y-termo-electrico`
- **Guía técnica**: Sí (parcial)
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Ventilación (Logia), Impermeabilización y sellos, Instalación de gas, Calefont o termo
- **Materiales**: —
- **Recintos**: Logia, Baños, Instalaciones, Equipamiento
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0039 — Pendiente de escurrimiento hacia desagüe
- **Nombre técnico**: Inclinación funcional de una superficie exterior o de piso húmedo
- **Objetivo**: que el agua escurra hacia el punto de desagüe, no hacia la vivienda
- **Qué detecta**: pendiente insuficiente o invertida
- **Cómo inspeccionar**: nivel topográfico, o verter agua y observar el escurrimiento (recurso recomendado en la Biblioteca Visual, LOSA-004)
- **Normativa**: Ficha 3 (Losas de Hormigón, ±0,5%) — no vinculada hoy al elemento real
- **Artículo**: `impermeabilizacion-de-terrazas`
- **Guía técnica**: Sí
- **Imágenes necesarias**: **Alta prioridad** — prueba de agua, ya diseñada en la Biblioteca Visual
- **Video sugerido**: Sí — el escurrimiento es intrínsecamente un fenómeno de movimiento
- **Elementos**: Piso exterior (Terraza/Patio)
- **Materiales**: —
- **Recintos**: Terraza/Patio
- **Prioridad**: **Alta**
- **Estado**: Parcial

### REV-0040 — Ausencia de empozamiento de agua
- **Nombre técnico**: Retención de agua en un punto bajo de una superficie
- **Objetivo**: que no queden charcos tras la lluvia o el riego
- **Qué detecta**: agua estancada en un sector
- **Cómo inspeccionar**: observación tras lluvia, o prueba de agua vertida
- **Normativa**: relacionada con Ficha 3 (pendiente)
- **Artículo**: `impermeabilizacion-de-terrazas`
- **Guía técnica**: Sí
- **Imágenes necesarias**: charco visible, ya diseñado en Biblioteca Visual (LOSA-004)
- **Video sugerido**: No — la foto del charco es suficiente
- **Elementos**: Piso exterior (Terraza/Patio)
- **Materiales**: —
- **Recintos**: Terraza/Patio
- **Prioridad**: Alta
- **Estado**: Parcial

### REV-0041 — Ciclo de descarga completo (inodoro)
- **Nombre técnico**: Funcionamiento del sistema de descarga sanitaria
- **Objetivo**: que descargue correctamente y deje de correr agua después
- **Qué detecta**: descarga débil, o agua que sigue corriendo tras descargar
- **Cómo inspeccionar**: accionar la descarga y observar el ciclo completo
- **Normativa**: ninguna
- **Artículo**: `firmeza-de-artefactos-sanitarios`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no aplica — criterio funcional, candidato a video
- **Video sugerido**: Sí
- **Elementos**: Artefactos sanitarios
- **Materiales**: —
- **Recintos**: Baños
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0042 — Giro suave de llave de paso o grifería
- **Nombre técnico**: Facilidad de accionamiento manual de una válvula
- **Objetivo**: que gire sin forzar, tanto en uso diario como en emergencia
- **Qué detecta**: válvula dura, trabada u oxidada
- **Cómo inspeccionar**: accionar completamente en ambos sentidos
- **Normativa**: ninguna
- **Artículo**: `filtraciones-y-presion-de-agua`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no aplica
- **Video sugerido**: No
- **Elementos**: Llave de agua y lavaplatos, Grifería, Llave de paso de agua
- **Materiales**: —
- **Recintos**: Cocina, Baños, Instalaciones
- **Prioridad**: Media
- **Estado**: Parcial

---

# FAMILIA 6 · ELÉCTRICA Y GAS

Funcionamiento y seguridad de instalaciones eléctricas y de gas.

### REV-0043 — Funcionamiento de enchufe con carga real
- **Nombre técnico**: Continuidad eléctrica bajo carga de un punto de enchufe
- **Objetivo**: confirmar que entrega corriente de forma estable
- **Qué detecta**: enchufe sin corriente o con falso contacto
- **Cómo inspeccionar**: probar con un artefacto real (no solo un tester de luz)
- **Normativa**: ninguna
- **Artículo**: `prueba-de-enchufes`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no aplica — criterio funcional
- **Video sugerido**: No
- **Elementos**: Enchufes e interruptores
- **Materiales**: —
- **Recintos**: Living, Cocina
- **Prioridad**: Alta
- **Estado**: Parcial

### REV-0044 — Funcionamiento de interruptor
- **Nombre técnico**: Correspondencia entre interruptor y punto de luz controlado
- **Objetivo**: que encienda/apague exactamente el punto de luz esperado
- **Qué detecta**: interruptor cruzado o sin efecto
- **Cómo inspeccionar**: accionar y verificar qué luz responde
- **Normativa**: ninguna
- **Artículo**: `prueba-de-enchufes`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no aplica
- **Video sugerido**: No
- **Elementos**: Enchufes e interruptores, Terminaciones e instalaciones (Quincho)
- **Materiales**: —
- **Recintos**: Living, Quincho
- **Prioridad**: Alta
- **Estado**: Parcial

### REV-0045 — Encendido estable de punto de luz
- **Nombre técnico**: Funcionamiento sin intermitencia de una luminaria
- **Objetivo**: que encienda de forma estable, sin parpadeo ni ruido
- **Qué detecta**: parpadeo, zumbido, luz que no enciende
- **Cómo inspeccionar**: encender y observar 10-15 segundos
- **Normativa**: ninguna
- **Artículo**: `puntos-de-luz-encendidos`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no aplica
- **Video sugerido**: No
- **Elementos**: Iluminación, Terminaciones e instalaciones (Quincho)
- **Materiales**: —
- **Recintos**: Living, Comedor, Dormitorios, Cocina, Baños, Quincho
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0046 — Fijación de artefacto de iluminación empotrado
- **Nombre técnico**: Anclaje mecánico de un foco embutido en cielo
- **Objetivo**: que quede firme, sin colgar ni torcerse
- **Qué detecta**: fijación insuficiente
- **Cómo inspeccionar**: inspección visual, leve presión si es accesible
- **Normativa**: ninguna
- **Artículo**: `puntos-de-luz-encendidos`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Iluminación
- **Materiales**: —
- **Recintos**: Living, Comedor, Dormitorios, Cocina, Baños
- **Prioridad**: Baja
- **Estado**: Parcial

### REV-0047 — Rotulación de circuitos
- **Nombre técnico**: Identificación clara de cada circuito en el tablero
- **Objetivo**: que el propietario pueda identificar qué circuito corta cada llave
- **Qué detecta**: ausencia o error de rotulación
- **Cómo inspeccionar**: comparar rótulo contra el circuito real accionando cada llave
- **Normativa**: ninguna (seguridad eléctrica general, no CDT)
- **Artículo**: `rotulacion-y-diferenciales`
- **Guía técnica**: Sí
- **Imágenes necesarias**: par tablero rotulado vs. sin rotular
- **Video sugerido**: No
- **Elementos**: Tablero eléctrico
- **Materiales**: —
- **Recintos**: Instalaciones
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0048 — Funcionamiento de protecciones diferenciales
- **Nombre técnico**: Respuesta del interruptor diferencial ante prueba
- **Objetivo**: confirmar que la protección contra electrocución funciona
- **Qué detecta**: diferencial que no corta al probarlo (botón de test)
- **Cómo inspeccionar**: accionar el botón de prueba de cada diferencial
- **Normativa**: ninguna (norma eléctrica general, fuera del Manual CDT)
- **Artículo**: `rotulacion-y-diferenciales`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no aplica
- **Video sugerido**: Sí — demostrar el botón de test, poco conocido por propietarios
- **Elementos**: Tablero eléctrico
- **Materiales**: —
- **Recintos**: Instalaciones
- **Prioridad**: **Alta — seguridad**
- **Estado**: Parcial

### REV-0049 — Accesibilidad de tablero o llave de paso
- **Nombre técnico**: Facilidad de ubicación y acceso a un punto de corte de emergencia
- **Objetivo**: que el propietario pueda actuar rápido ante una emergencia
- **Qué detecta**: tablero/llave bloqueado por muebles o difícil de identificar
- **Cómo inspeccionar**: verificar acceso libre y señalización
- **Normativa**: ninguna
- **Artículo**: `rotulacion-y-diferenciales`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Tablero eléctrico, Llave de paso de agua, Instalación de gas
- **Materiales**: —
- **Recintos**: Instalaciones
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0050 — Ausencia de olor a gas
- **Nombre técnico**: Detección olfativa de fuga en la instalación de gas
- **Objetivo**: descartar fuga activa al momento de la inspección
- **Qué detecta**: olor característico de gas odorizado
- **Cómo inspeccionar**: recorrido olfativo de la instalación visible — explícitamente no reemplaza certificación de gasfitero
- **Normativa**: ninguna (fuera del Manual CDT — normativa de gas es SEC/gasfitería, no tolerancias dimensionales)
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no aplica — criterio olfativo puro
- **Video sugerido**: No
- **Elementos**: Instalación de gas
- **Materiales**: —
- **Recintos**: Instalaciones
- **Prioridad**: **Alta — seguridad**
- **Estado**: Mínimo (a propósito, `lacksNormativeBacking`)

### REV-0051 — Estado de conexiones de gas visibles
- **Nombre técnico**: Integridad física de mangueras y conexiones de gas accesibles
- **Objetivo**: descartar corrosión, cortes o roturas visibles
- **Qué detecta**: manguera cuarteada, conexión oxidada
- **Cómo inspeccionar**: inspección visual de las conexiones accesibles
- **Normativa**: ninguna
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: par conexión sana vs. deteriorada
- **Video sugerido**: No
- **Elementos**: Instalación de gas
- **Materiales**: —
- **Recintos**: Instalaciones
- **Prioridad**: Alta
- **Estado**: Mínimo (a propósito)

### REV-0052 — Ventilación de artefactos a gas
- **Nombre técnico**: Vía de evacuación de gases de combustión hacia el exterior
- **Objetivo**: prevenir acumulación de monóxido de carbono
- **Qué detecta**: ausencia de rejilla/ducto de ventilación visible
- **Cómo inspeccionar**: verificar existencia de rejilla o ducto hacia el exterior
- **Normativa**: ninguna (fuera del Manual CDT)
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Instalación de gas
- **Materiales**: —
- **Recintos**: Instalaciones
- **Prioridad**: **Alta — seguridad**
- **Estado**: Mínimo (a propósito)

---

# FAMILIA 7 · ESTRUCTURA Y PATOLOGÍAS

Fisuras, desprendimientos, corrosión y filtración de origen
estructural — lo que un ITO revisa pensando en la causa raíz, no solo
en el síntoma estético.

### REV-0053 — Fisuras de retracción en revestimiento
- **Nombre técnico**: Grieta capilar por contracción del mortero/estuco al secar
- **Objetivo**: distinguir fisura estética (aceptable) de fisura que amerita revisión
- **Qué detecta**: fisura fina en la superficie de estuco
- **Cómo inspeccionar**: observación visual de cerca, luz rasante
- **Normativa**: Ficha 8 (Estucos, indirecta — el manual no clasifica fisuras por severidad)
- **Artículo**: ninguno vinculado hoy
- **Guía técnica**: No
- **Imágenes necesarias**: **Alta prioridad** — vacío ya señalado en Biblioteca Visual (N4): comparación fisura capilar vs. estructural
- **Video sugerido**: No — comparación fotográfica es suficiente
- **Elementos**: Fachada (húmeda sobre estuco)
- **Materiales**: familia húmeda sobre estuco
- **Recintos**: Exterior
- **Prioridad**: **Alta**
- **Estado**: Parcial

### REV-0054 — Fisuras estructurales visibles
- **Nombre técnico**: Grieta que compromete o sugiere comprometer un elemento estructural
- **Objetivo**: distinguirla de la fisura estética (REV-0053) y escalar su revisión
- **Qué detecta**: fisura de mayor espesor, en diagonal o que atraviesa el elemento
- **Cómo inspeccionar**: observación visual — ante duda, recomendar evaluación de especialista
- **Normativa**: ninguna (fuera de tolerancias dimensionales)
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: Alta prioridad, par con REV-0053
- **Video sugerido**: No
- **Elementos**: Estructura y filtración (Piscina), Techumbre y estructura (Quincho)
- **Materiales**: —
- **Recintos**: Piscina, Quincho
- **Prioridad**: Alta
- **Estado**: Mínimo

### REV-0055 — Desprendimiento de revestimiento o recubrimiento
- **Nombre técnico**: Pérdida de adherencia visible de una capa de terminación
- **Objetivo**: detectar zonas donde el revestimiento ya se separó de su base
- **Qué detecta**: descascaramiento, levantamiento visible
- **Cómo inspeccionar**: inspección visual, complementaria a la sonoridad de adhesión (REV-0012) cuando el desprendimiento aún no es visible
- **Normativa**: ninguna
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: par superficie sana vs. desprendida
- **Video sugerido**: No
- **Elementos**: Estructura y filtración (Piscina)
- **Materiales**: —
- **Recintos**: Piscina
- **Prioridad**: Media
- **Estado**: Mínimo

### REV-0056 — Oxidación o corrosión en elementos metálicos
- **Nombre técnico**: Degradación por óxido de una pieza metálica
- **Objetivo**: detectar corrosión temprana en rejas, portones o fijaciones
- **Qué detecta**: óxido superficial o avanzado
- **Cómo inspeccionar**: inspección visual de superficies y puntos de fijación
- **Normativa**: ninguna
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: par metal sano vs. oxidado
- **Video sugerido**: No
- **Elementos**: Reja peatonal, Portón manual, Portón automático, Artefactos sanitarios (pernos)
- **Materiales**: —
- **Recintos**: Exterior, Baños
- **Prioridad**: Media
- **Estado**: Mínimo

### REV-0057 — Filtración de origen estructural
- **Nombre técnico**: Paso de agua a través de un elemento que debiera ser estanco
- **Objetivo**: detectar filtración por losa, cubierta o estructura de piscina
- **Qué detecta**: mancha, goteo o luz visible indicando paso de agua
- **Cómo inspeccionar**: inspección visual, idealmente tras lluvia o con manguera controlada
- **Normativa**: ninguna vinculada (Fichas de Losas/Radieres existen pero no cubren impermeabilización)
- **Artículo**: `estado-de-la-cubierta`
- **Guía técnica**: Sí (parcial)
- **Imágenes necesarias**: **Alta prioridad** — vacío ya señalado en Biblioteca Visual (N6, humedad/filtraciones)
- **Video sugerido**: No
- **Elementos**: Cubierta, Estructura y filtración (Piscina), Piso exterior (Terraza — comparte concepto con REV-0039/0040)
- **Materiales**: —
- **Recintos**: Techumbre, Piscina, Terraza/Patio
- **Prioridad**: **Alta**
- **Estado**: Parcial

---

# FAMILIA 8 · SEGURIDAD FÍSICA

Elementos cuya falla no es solo estética sino un riesgo directo de
accidente — prioridad de revisión más alta que cualquier otra familia
por naturaleza.

### REV-0058 — Firmeza de baranda o pasamanos
- **Nombre técnico**: Resistencia de un elemento de apoyo/contención a la presión
- **Objetivo**: que soporte el peso de una persona apoyándose
- **Qué detecta**: holgura o movimiento al presionar
- **Cómo inspeccionar**: aplicar presión manual firme en varios puntos
- **Normativa**: ninguna (seguridad, no tolerancia dimensional)
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no aplica — criterio de fuerza, mejor en video
- **Video sugerido**: Sí — demostrar la prueba de presión
- **Elementos**: Baranda, Peldaños y pasamanos
- **Materiales**: —
- **Recintos**: Terraza/Patio, Escalera
- **Prioridad**: **Alta — seguridad**
- **Estado**: Mínimo

### REV-0059 — Separación segura entre barrotes o elementos
- **Nombre técnico**: Distancia máxima entre elementos verticales de una baranda
- **Objetivo**: prevenir el paso de la cabeza o cuerpo de un niño pequeño
- **Qué detecta**: espacio excesivo entre barrotes
- **Cómo inspeccionar**: prueba de referencia simple (una lata de bebida no debe pasar)
- **Normativa**: ninguna en el Manual CDT (norma de seguridad infantil, no de tolerancia constructiva)
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: foto de la prueba de la lata — muy didáctica y ya usada como recurso propio
- **Video sugerido**: No — la foto de la prueba es suficiente
- **Elementos**: Baranda
- **Materiales**: —
- **Recintos**: Terraza/Patio
- **Prioridad**: **Alta — seguridad infantil**
- **Estado**: Mínimo

### REV-0060 — Barrera de acceso restringido
- **Nombre técnico**: Elemento de cierre que impide el acceso no supervisado a una zona de riesgo
- **Objetivo**: prevenir acceso de niños sin supervisión a la piscina
- **Qué detecta**: cierre perimetral ausente, portón que no traba
- **Cómo inspeccionar**: verificar cierre completo del perímetro y funcionamiento del portón/reja
- **Normativa**: ninguna en el Manual CDT
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Cierre de seguridad (Piscina)
- **Materiales**: —
- **Recintos**: Piscina
- **Prioridad**: **Alta — seguridad infantil**
- **Estado**: Mínimo (a propósito, `lacksNormativeBacking`)

---

# FAMILIA 9 · TERMINACIONES Y REMATES

Calidad de la resolución en bordes, esquinas y encuentros — el
"acabado del acabado".

### REV-0061 — Terminación de esquinas y contornos
- **Nombre técnico**: Calidad del remate en un cambio de plano o encuentro con un vano
- **Objetivo**: que la esquina/contorno no tenga bordes irregulares
- **Qué detecta**: borde mal terminado en esquina o contorno de puerta/ventana
- **Cómo inspeccionar**: observación visual de cerca
- **Normativa**: ninguna numérica específica
- **Artículo**: `pintura-exterior`
- **Guía técnica**: Sí
- **Imágenes necesarias**: macro de esquina bien terminada vs. irregular
- **Video sugerido**: No
- **Elementos**: Fachada (ambas)
- **Materiales**: familia húmeda sobre estuco
- **Recintos**: Exterior
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0062 — Terminación de remates especiales
- **Nombre técnico**: Resolución de corte en un punto singular (borde de tina, mesón)
- **Objetivo**: que la pieza cortada para bordear un artefacto quede bien resuelta
- **Qué detecta**: pieza mal cortada o mal ajustada en el remate
- **Cómo inspeccionar**: observación visual del corte
- **Normativa**: ninguna numérica específica (implícita en Ficha 10)
- **Artículo**: `piezas-parejas-sin-fisuras`, `nivel-y-sellado-de-juntas`
- **Guía técnica**: Sí
- **Imágenes necesarias**: macro del remate
- **Video sugerido**: No
- **Elementos**: Piso (Cerámica, Porcelanato)
- **Materiales**: Cerámica, Porcelanato
- **Recintos**: Baños, Cocina
- **Prioridad**: Baja
- **Estado**: Parcial

### REV-0063 — Ajuste de encuentro con marcos o pilastras
- **Nombre técnico**: Resolución del borde de un revestimiento contra un elemento vertical
- **Objetivo**: que el revestimiento llegue limpiamente al marco, sin holgura excesiva
- **Qué detecta**: separación irregular en el encuentro
- **Cómo inspeccionar**: observación visual del encuentro
- **Normativa**: Ficha 17 (Alfombras y Cubrepisos, 2 mm) — no vinculada hoy con su tolerancia numérica
- **Artículo**: `alfombras-y-cubrepisos`, `pavimentos-vinilicos`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Piso (Alfombra, Vinílico)
- **Materiales**: Alfombra/cubrepiso, Pavimento vinílico
- **Recintos**: Living, Comedor, Dormitorios
- **Prioridad**: Baja
- **Estado**: Parcial

### REV-0064 — Fijación pegada sin espacio visible
- **Nombre técnico**: Ajuste de una moldura contra la superficie que acompaña
- **Objetivo**: que el guardapolvo/moldura quede sin espacio visible contra el muro
- **Qué detecta**: separación entre la moldura y el muro/piso
- **Cómo inspeccionar**: observación visual, prueba de introducir una laina en el espacio
- **Normativa**: Ficha 16 (Guardapolvos, 1 mm)
- **Artículo**: `guardapolvos-y-junquillos`
- **Guía técnica**: Sí
- **Imágenes necesarias**: macro del encuentro sin espacio vs. con espacio
- **Video sugerido**: No
- **Elementos**: Guardapolvos
- **Materiales**: —
- **Recintos**: Living, Comedor, Dormitorios, Cocina, Baños
- **Prioridad**: Baja
- **Estado**: Parcial

---

# FAMILIA 10 · EQUIPOS Y ARTEFACTOS

Funcionamiento de artefactos completos (no solo su instalación fija).

### REV-0065 — Firmeza y ausencia de fisuras en artefactos sanitarios
- **Nombre técnico**: Integridad estructural de un artefacto sanitario instalado
- **Objetivo**: que inodoro, lavamanos y ducha estén firmes y sin fisuras
- **Qué detecta**: movimiento al presionar, fisura en la loza sanitaria
- **Cómo inspeccionar**: presión manual + inspección visual
- **Normativa**: ninguna
- **Artículo**: `firmeza-de-artefactos-sanitarios`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Artefactos sanitarios
- **Materiales**: —
- **Recintos**: Baños
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0066 — Funcionamiento de extracción o ventilación mecánica
- **Nombre técnico**: Operación de un equipo de extracción de aire
- **Objetivo**: que encienda y extraiga efectivamente
- **Qué detecta**: motor que no enciende o extracción débil
- **Cómo inspeccionar**: encender y verificar corriente de aire con la mano
- **Normativa**: ninguna
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no aplica
- **Video sugerido**: No
- **Elementos**: Campana extractora
- **Materiales**: —
- **Recintos**: Cocina
- **Prioridad**: Media
- **Estado**: Mínimo

### REV-0067 — Estado de mantención de filtro
- **Nombre técnico**: Nivel de acumulación de residuo en un filtro de equipo
- **Objetivo**: confirmar que el filtro entregado esté limpio al momento de la recepción
- **Qué detecta**: filtro con grasa acumulada desde antes de la entrega
- **Cómo inspeccionar**: inspección visual directa del filtro
- **Normativa**: ninguna
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Campana extractora
- **Materiales**: —
- **Recintos**: Cocina
- **Prioridad**: Baja
- **Estado**: Mínimo

### REV-0068 — Entrega estable de agua caliente
- **Nombre técnico**: Rendimiento térmico continuo de un calentador de agua
- **Objetivo**: confirmar que entrega agua caliente de forma estable durante el uso
- **Qué detecta**: temperatura inestable o insuficiente
- **Cómo inspeccionar**: dejar correr agua caliente varios minutos y verificar estabilidad
- **Normativa**: ninguna
- **Artículo**: `calefont-y-termo-electrico`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no aplica
- **Video sugerido**: No
- **Elementos**: Calefont o termo eléctrico
- **Materiales**: —
- **Recintos**: Equipamiento
- **Prioridad**: Media
- **Estado**: Parcial

### REV-0069 — Ausencia de fugas de agua o gas en equipo
- **Nombre técnico**: Estanqueidad de un equipo de calentamiento de agua
- **Objetivo**: descartar fuga activa en el equipo mismo (no solo en la instalación general, ver REV-0050/51)
- **Qué detecta**: fuga visible en el cuerpo del equipo o sus conexiones
- **Cómo inspeccionar**: inspección visual del equipo en funcionamiento
- **Normativa**: ninguna
- **Artículo**: `calefont-y-termo-electrico`
- **Guía técnica**: Sí
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Calefont o termo eléctrico
- **Materiales**: —
- **Recintos**: Equipamiento
- **Prioridad**: Alta
- **Estado**: Parcial

### REV-0070 — Ausencia de ruido, vibración u olor anormal en equipo en marcha
- **Nombre técnico**: Comportamiento acústico/olfativo normal de un equipo funcionando
- **Objetivo**: detectar mal funcionamiento incipiente antes de una falla mayor
- **Qué detecta**: ruido, vibración u olor fuera de lo esperado
- **Cómo inspeccionar**: encender el equipo y observar/escuchar/oler unos minutos
- **Normativa**: ninguna
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no aplica — criterio sensorial, candidato a video con audio
- **Video sugerido**: Sí
- **Elementos**: Climatización/calefacción, Estructura y filtración (bomba de piscina)
- **Materiales**: —
- **Recintos**: Instalaciones, Piscina
- **Prioridad**: Media
- **Estado**: Mínimo

---

# FAMILIA 11 · CONFORMIDAD CONTRACTUAL

No son defectos de ejecución, sino de coincidencia entre lo entregado
y lo contratado — igual de importantes para el propietario.

### REV-0071 — Coincidencia de identificación o demarcación con contrato
- **Nombre técnico**: Correspondencia entre el bien físico entregado y su identificación contractual
- **Objetivo**: confirmar que la bodega/estacionamiento entregado es el contratado
- **Qué detecta**: numeración o demarcación que no coincide con el contrato
- **Cómo inspeccionar**: comparar directamente contra el documento de compraventa
- **Normativa**: ninguna (materia contractual, no constructiva)
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no aplica
- **Video sugerido**: No
- **Elementos**: Puerta y cerradura de bodega, Espacio de estacionamiento
- **Materiales**: —
- **Recintos**: Bodega, Estacionamiento
- **Prioridad**: Media
- **Estado**: Mínimo

### REV-0072 — Entrega completa de llaves o copias
- **Nombre técnico**: Verificación de la cantidad de copias de acceso entregadas
- **Objetivo**: evitar reclamos posteriores por copias faltantes
- **Qué detecta**: cantidad de llaves entregadas menor a la esperada
- **Cómo inspeccionar**: contar y probar cada copia en la cerradura correspondiente
- **Normativa**: ninguna
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no aplica
- **Video sugerido**: No
- **Elementos**: Puerta y cerradura de bodega
- **Materiales**: —
- **Recintos**: Bodega
- **Prioridad**: Baja
- **Estado**: Mínimo

---

# FAMILIA 12 · CONDICIONES DE ENTORNO

Aspectos del espacio que rodea al elemento, más que del elemento en
sí — relevantes sobre todo en espacios comunes/exteriores.

### REV-0073 — Iluminación adecuada del espacio
- **Nombre técnico**: Nivel de luz suficiente para uso seguro de un espacio
- **Objetivo**: que el espacio permita ver con claridad en condiciones normales
- **Qué detecta**: iluminación insuficiente
- **Cómo inspeccionar**: observación en condiciones de uso habitual (de noche si corresponde)
- **Normativa**: ninguna
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Espacio de estacionamiento
- **Materiales**: —
- **Recintos**: Estacionamiento
- **Prioridad**: Baja
- **Estado**: Mínimo

### REV-0074 — Espacio suficiente para uso normal
- **Nombre técnico**: Dimensión funcional adecuada para la actividad prevista
- **Objetivo**: confirmar que el espacio permite el uso esperado sin dificultad
- **Qué detecta**: espacio insuficiente para maniobrar o almacenar según lo previsto
- **Cómo inspeccionar**: prueba directa de uso (maniobrar el vehículo, por ejemplo)
- **Normativa**: ninguna
- **Artículo**: ninguno
- **Guía técnica**: No
- **Imágenes necesarias**: no prioritario
- **Video sugerido**: No
- **Elementos**: Espacio de estacionamiento
- **Materiales**: —
- **Recintos**: Estacionamiento
- **Prioridad**: Baja
- **Estado**: Mínimo

---

# RESUMEN Y CIERRE

## Inventario de la BMR

| Métrica | Cantidad |
|---|---|
| Revisiones únicas fusionadas | 74 |
| Familias técnicas | 12 |
| Preguntas de checklist originales que se fusionaron en ellas | ~140 |
| Revisiones reutilizadas en 3 o más recintos | 12 (REV-0002, 0003, 0006, 0008, 0009, 0012, 0021, 0024, 0032, 0038, 0045, 0057) |
| Revisiones con Prioridad Alta | 24 |
| Revisiones de seguridad física/eléctrica/gas (Alta, irrenunciables) | 9 |
| Revisiones sin ningún respaldo normativo CDT | 44 de 74 (59%) — coherente con que el manual no cubre plomería, gas, seguridad ni electrodomésticos |
| Revisiones marcadas como mejor cubiertas por **video** que por foto estática | 7 (REV-0012, 0024, 0028, 0029, 0031, 0041, 0070) — hallazgo nuevo de este documento, no estaba en la Biblioteca Visual anterior |

## La revisión más reutilizada del sistema

**REV-0024 (Apertura y cierre sin roce)** aparece en 8 elementos
distintos, 6 recintos — es, en la práctica, el concepto técnico más
transversal de toda la aplicación. Justifica por sí solo la lógica de
esta fusión: hoy existen 8 redacciones ligeramente distintas de la
misma idea repartidas por el catálogo; una sola guía técnica + un
solo video bien hechos cubrirían el 100% de esos casos.

## Cómo usar este documento hacia adelante

Este catálogo es la fuente para, en trabajo futuro y bajo su propio
proceso de aprobación (no de este documento):
- **Checklists**: cada `ChecklistItemTemplate` nueva o revisada debería
  poder trazarse a un código REV-XXXX de este documento.
- **Biblioteca Visual**: las columnas "Imágenes necesarias" y "Video
  sugerido" de cada revisión son el punto de partida directo para
  extender `ObraBien-Biblioteca-Visual-Manual-Tolerancias.md`.
- **Artículos y guías técnicas**: las revisiones con "Guía técnica: No"
  son la lista priorizada de contenido editorial por escribir.
- **Cursos y capacitación**: las 12 familias son, tal cual, una
  estructura de índice ya lista para un programa de capacitación de
  inspectores.

No se implementó nada de esto — es, exactamente como se pidió, el
catálogo editorial definitivo, no su ejecución.

---

*Fin de la Biblioteca Maestra de Revisiones. 74 revisiones, 12
familias, ningún cambio de código, schema ni arquitectura.*
