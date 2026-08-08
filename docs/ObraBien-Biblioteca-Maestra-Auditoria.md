# ObraBien — Auditoría Maestra de la Biblioteca de Inspección

## Alcance de este documento

Auditoría de contenido, no de arquitectura. **No se tocó ni se propone
tocar código, schema, migraciones ni UI.** La arquitectura de UX-03
(Domain Model + Backlog) se trata como aprobada y congelada. Este
documento recorrió literalmente todo el conocimiento técnico
implementado hoy: `prisma/seed.ts` completo (17 recintos, 92
`ElementTemplate`, cada pregunta de checklist verbatim), las 25
fichas de `LibraryArticle` (24 categorías), `good-bad-examples.ts`,
`tolerances-by-category.ts`, `tolerances-manual.ts` (26 fichas CDT ya
transcritas), `material-selection.ts`, `inspection-kit.ts`,
`tolerance-tips.ts`, el contenido de UX-03 (`FacadeFinishOption`,
familia "húmeda sobre estuco"), y el propio schema de Prisma para
confirmar qué modelos existen realmente hoy.

## Nota metodológica — un hallazgo estructural antes de empezar

Pediste el análisis por **Revisión** individual (14 campos por
pregunta de checklist). Antes de aplicarlo, hay que dejar constancia
de un hecho de la arquitectura actual, no una opinión: **hoy, "guía
técnica", "artículo que respalda" y "contenido visual" son atributos
del `ElementTemplate` (o de su `LibraryArticle`/categoría), no de la
`ChecklistItemTemplate` individual.** Una pregunta puntual del
checklist no tiene su propio artículo ni su propio ejemplo Bien/Mal —
hereda el del elemento completo. Esto ya fue identificado como vacío
arquitectónico real durante UX-03 (Prioridad P3 de UX-02, y
`InspectionEvidence` en el Domain Model) — sigue sin implementarse.
Por eso, el detalle de "guía / artículo / visual / origen / estado"
se documenta a nivel de **Elemento + Material** (que es el nivel real
en que existe hoy), y el listado de Revisiones debajo de cada uno es
completo y verbatim — no se omite ninguna pregunta de ningún elemento
de los 92 que existen.

**El segundo hallazgo, más importante que cualquier vacío puntual**:
**hoy no existe ninguna imagen real en toda la aplicación.** Los
"ejemplos Bien/Mal" de `good-bad-examples.ts` son pares de texto
(`caption`), con un campo `imageUrl` presente en el tipo pero **nunca
poblado** — se renderiza un ícono de check/cruz como placeholder en
el 100% de los casos. Esto aplica a las 24 categorías, sin excepción.
Cualquier columna "Imagen BIEN / Imagen MAL" de este documento debe
leerse, en la práctica, como "¿existe *texto* de ejemplo Bien/Mal?"
— la respuesta a "¿existe *imagen* real?" es **No** en el 100% de los
92 elementos, sin una sola excepción, y no se repite esa columna caso
por caso para no inflar artificialmente el documento con la misma
respuesta 92 veces.

---

# BIBLIOTECA MAESTRA — Elemento → Material → Revisiones

Formato por recinto: cada **Elemento** (nombre real de la app) lista
sus **Materiales** (cuando el elemento tiene variantes de material) o
se presenta directo si no las tiene, y debajo el listado completo y
verbatim de **Revisiones** (preguntas de checklist reales, tal como
las ve el usuario). Le sigue una tabla de estado a nivel de
Elemento/Material con los campos: Guía técnica, Artículo, Ejemplo
Bien/Mal (texto), Tolerancia CDT vinculada, Origen, Estado.

**Leyenda de Origen**: `CDT` = la tolerancia/criterio proviene
directamente de una ficha del Manual de Tolerancias ya transcrita;
`Editorial` = contenido propio de ObraBien sin respaldo CDT directo;
`Mixto` = checklist editorial + tolerancia CDT vinculada aparte.

**Leyenda de Estado**: `Completo` = checklist + artículo con cuerpo
real + ejemplo Bien/Mal en texto + tolerancia CDT vinculada.
`Parcial` = checklist + artículo, pero falta ejemplo Bien/Mal o
tolerancia CDT. `Mínimo` = checklist propio sin ningún respaldo
(artículo null, sin tolerancia, sin ejemplo). En todos los casos,
"imagen real" es No — ver nota metodológica.

---

## RECINTO: Exterior (7 elementos)

### Fachada — material: genérico (pre-respuesta, `materialSlot: FACADE`)
Revisiones:
- Pintura o revestimiento uniforme, sin manchas ni grietas visibles
- Sin filtraciones visibles en la unión entre muros y aleros
- Buena terminación en esquinas y contornos de puertas/ventanas, sin bordes irregulares

| Guía técnica | Artículo | Ejemplo Bien/Mal (texto) | Tolerancia CDT | Origen | Estado |
|---|---|---|---|---|---|
| Sí (biblioteca) | `pintura-exterior` | Sí, específico por artículo | Ficha 23 (Pinturas) | Mixto | Parcial |

### Fachada — familia "Húmeda sobre estuco" (Pintura lisa / Marmolina / Graniplast / Revestimiento texturado)
Revisiones (idénticas para los 4 materiales — ver Duplicados/Reutilización):
- Superficie a plomo, sin ondulaciones al pasar una regla
- Sin fisuras de retracción visibles en el estuco base
- Color y textura del acabado uniformes, sin manchas ni parches
- Sin filtraciones visibles en la unión entre muros y aleros
- Buena terminación en esquinas y contornos de puertas/ventanas

| Guía técnica | Artículo | Ejemplo Bien/Mal (texto) | Tolerancia CDT | Origen | Estado |
|---|---|---|---|---|---|
| No | `null` | No | No vinculada (aunque Fichas 8 y 23 aplican conceptualmente) | Editorial | **Mínimo** |

### Puerta de acceso
Revisiones:
- Cierra y sella sin rozar el marco
- Cerradura y pestillo funcionan sin forzar
- Marco derecho y en escuadra
- Separación pareja en todo el contorno
- Hoja plana, sin pandeos
- Manilla firme, sin holgura
- Si es de dos hojas, separación pareja entre ambas

| Guía técnica | Artículo | Ejemplo Bien/Mal | Tolerancia CDT | Origen | Estado |
|---|---|---|---|---|---|
| Sí | `alineacion-y-cierre` | Sí (categoría `puertas`) | Ficha 12 (Puertas) | Mixto | **Completo** |

### Reja peatonal / Portón vehicular manual / Portón vehicular automático / Cierre perimetral
Revisiones (las 4 comparten el patrón "abre-cierra / anticorrosivo / fijación", con variaciones):
- Abre y cierra sin trabarse ni rozar el suelo
- Cerradura o candado funciona bien *(solo reja peatonal)*
- Pintura o recubrimiento anticorrosivo en buen estado, sin óxido
- Bien fijada, sin moverse *(reja)* / bisagras-rieles-rodamientos firmes *(portones)*
- Motor sin esfuerzo ni ruido excesivo *(solo automático)*
- Control remoto funciona a distancia normal *(solo automático)*
- Sistema de seguridad (sensor/reversa) funcional *(solo automático)*
- Cierre perimetral: rodea completamente el terreno, sin tramos faltantes, altura y terminación parejas

| Guía técnica | Artículo | Ejemplo Bien/Mal | Tolerancia CDT | Origen | Estado |
|---|---|---|---|---|---|
| No (los 4) | `null` | No | No | Editorial | **Mínimo** |

---

## RECINTO: Living (14 elementos) / Dormitorios (13, estructura idéntica sin enchufes)

### Piso — material genérico (Piso Flotante por defecto)
Revisiones: sin crujidos al caminar; nivelado sin escalones; líneas de tabla rectas y paralelas; espacio parejo piso-muro para dilatación; sin escalón brusco en encuentro con guardapolvo/puertas.

| Guía | Artículo | Bien/Mal | CDT | Origen | Estado |
|---|---|---|---|---|---|
| Sí | `crujidos-en-piso-flotante` | Sí (`pisos`) | Ficha 25 (Pisos Flotantes) | Mixto | **Completo** |

### Piso — material: Cerámica
Revisiones: piezas niveladas sin escalón al tacto; juntas rectas y parejas; sin manchas/decoloración cerca de juntas (humedad); sonido sólido al golpe de moneda; esquinas/remates bien terminados.
| Sí | `piezas-parejas-sin-fisuras` | Sí (`ceramicas`) | Ficha 10 (Rev. Cerámicos) | Mixto | **Completo** |

### Piso — material: Porcelanato
Revisiones: piezas niveladas al tacto; juntas rectas; sonido sólido al golpe; sin piezas trisadas/astilladas.
| Sí | `nivel-y-sellado-de-juntas` | Sí (`porcelanatos`) | Ficha 10 | Mixto | **Completo** |

### Piso — material: Pavimento vinílico (PVC)
Revisiones: uniones parejas sin escalón; encuentros con puertas bien terminados; rayas solo superficiales sin relieve ni marca de otro tono.
| Sí | `pavimentos-vinilicos` | **No** | Ficha 24 (Pav. Vinílicos) | Mixto | Parcial |

### Piso — material: Alfombra/cubrepiso
Revisiones: uniones entre paños parejas, sin espacios; encuentro con marcos/pilastras bien ajustado.
| Sí | `alfombras-y-cubrepisos` | **No** | Ficha 17 | Mixto | Parcial |

### Guardapolvos
Revisiones: bien pegado a muro y piso, sin espacios; uniones entre tramos alineadas, sin desnivel; sin tramos sueltos o que se muevan.
| Sí | `guardapolvos-y-junquillos` | **No** | Ficha 16 | Mixto | Parcial |

### Muros y cielos — material genérico (Pintura por defecto)
Revisiones: pintura uniforme en color/textura, sin manchas ni marcas de rodillo; sin grietas finas en esquinas/encuentro muro-cielo; cielo parejo sin ondulaciones; guardapolvos y contornos con buena terminación de pintura.
| Sí | `pintura-interior` | Sí (por artículo, no categoría) | Ficha 23 | Mixto | **Completo** |

### Muros y cielos — material: Papel mural
Revisiones: sin piquetes ni burbujas visibles a 1 m; tono parejo en el muro; encuentro con cornisa/guardapolvo bien ajustado; encuentro con marcos sin quedar corto ni montado.
| Sí | `papel-mural` | **No** | Ficha 14 | Mixto | Parcial |

### Muros y cielos — material: Cerámico/porcelanato
Revisiones: **idénticas, palabra por palabra, a "Piso — Cerámica"** (ver Duplicados) — incluye la pregunta "esquinas y remates (borde de tina, mesón)" aplicada a un muro de Living/Dormitorio, donde no hay tina ni mesón.
| Sí | `piezas-parejas-sin-fisuras` | Sí (`ceramicas`) | Ficha 10 | Mixto | **Completo, con fricción de contenido — ver Duplicados** |

### Cornisas
Revisiones: bien fijada a muro y cielo, sin espacios; uniones entre tramos alineadas; sin tramos sueltos.
| Sí | `cornisas` | **No** | Ficha 18 | Mixto | Parcial |

### Ventanas *(no existe en Comedor)*
Revisiones: silicona perimetral continua; abre/cierra/traba correctamente; manilla suave; vidrio sin rayas/manchas/burbujas; marco/hojas sin rayas/abolladuras/decoloración; sin luz visible entre marco y hoja al estar cerrada.
| Sí | `sellos-de-silicona` | Sí (`ventanas`) | Ficha 13 (Ventanas) | Mixto | **Completo** |

### Iluminación
Revisiones: todos los puntos de luz encienden; sin parpadeo ni ruido; foco empotrado bien fijo, sin colgar ni torcerse.
| Sí | `puntos-de-luz-encendidos` | **No** | **No** (sin ficha CDT propia) | Editorial | Parcial |

### Enchufes e interruptores *(solo Living, no Comedor ni Dormitorios)*
Revisiones: cada enchufe funciona con artefacto real; interruptores encienden/apagan lo correspondiente; alineación pareja entre artefactos cercanos; placas firmes sin holgura.
| Sí | `prueba-de-enchufes` | Sí (`enchufes`, `interruptores`) | Ficha 26 (Artefactos Eléctricos) | Mixto | **Completo** |

---

## RECINTO: Comedor (12 elementos)
Mismos Piso/Guardapolvos/Muros-cielos/Cornisas/Iluminación que Living
(ver arriba, reutilización exacta) — **sin** elemento Ventanas ni
Enchufes/interruptores propio.

---

## RECINTO: Cocina (13 elementos)

### Piso — material genérico (definido inline, texto idéntico a Porcelanato)
Revisiones: piezas niveladas al tacto; juntas rectas; sonido sólido al golpe; sin piezas trisadas.
| Sí | `nivel-y-sellado-de-juntas` | Sí (`porcelanatos`) | Ficha 10 | Mixto | **Completo** — *ver Duplicados: mismo texto que Piso-Porcelanato de Living, escrito dos veces en el código* |

### Piso — variantes de material (Cerámica/Porcelanato/Flotante/Vinílico/Alfombra)
Idénticas a las de Living (ver arriba, reutilización correcta vía `PISO_MATERIAL_VARIANTS`).

### Guardapolvos
Idéntico a Living.

### Muebles de cocina
Revisiones: puertas/cajones abren-cierran sin rozar; bisagras y tiradores firmes; puertas/cajones vecinos alineados entre sí; tiradores vecinos a la misma altura; objeto redondo sobre el mesón no rueda (horizontalidad).
| Sí | `puertas-cajones-y-herrajes` | Sí (`muebles`) | Ficha 22 (Muebles Incorporados) | Mixto | **Completo** |

### Llave de agua y lavaplatos
Revisiones: sin goteras en llave ni bajo lavaplatos; desagüe drena sin filtraciones; llave gira suave; presión pareja fría/caliente; sin manchas de humedad bajo el mueble.
| Sí | `filtraciones-y-presion-de-agua` | **No** | **No** (sin ficha CDT — plomería no es tema del manual) | Editorial | Parcial |

### Iluminación
Idéntico a Living.

### Enchufes e interruptores *(variante sin línea de "interruptores", 3 preguntas en vez de 4)*
Revisiones: cada enchufe funciona con artefacto real; alineación pareja entre artefactos cercanos; placas firmes.
| Sí | `prueba-de-enchufes` | Sí (`enchufes`) | Ficha 26 | Mixto | **Completo, pero checklist más corto que en Living — ver Duplicados** |

### Campana extractora
Revisiones: enciende y extrae correctamente; filtro limpio sin exceso de grasa.
| No | `null` | No | No | Editorial | **Mínimo** |

---

## RECINTO: Logia (2 elementos)

### Conexión de lavadora
Revisiones: llave y desagüe sin filtraciones; llave gira suave; desagüe bien conectado, sin quedar suelto.
| No | `null` | No | No | Editorial | **Mínimo** |

### Ventilación
Revisiones: recinto con ventilación adecuada; ventana o rejilla abre/cierra sin dificultad.
| No | `null` | No | No | Editorial | **Mínimo** |

---

## RECINTO: Baños (13 elementos)

### Piso — material genérico (definido inline, texto idéntico a Cerámica)
Revisiones: idénticas a Piso-Cerámica de Living.
| Sí | `piezas-parejas-sin-fisuras` | Sí (`ceramicas`) | Ficha 10 | Mixto | **Completo** — *duplicado de texto, ver sección Duplicados* |

### Piso — variantes de material
Idénticas a Living.

### Guardapolvos
Idéntico a Living.

### Mueble de baño
Revisiones: puerta abre/cierra sin rozar; tiradores firmes y bien atornillados; objeto redondo sobre el mesón no rueda; mesón sin grietas ni bordes astillados.
| Sí | `puertas-cajones-y-herrajes` | Sí (`muebles`) | Ficha 22 | Mixto | **Completo, checklist distinto del de Cocina — ver Reutilización** |

### Artefactos sanitarios
Revisiones: inodoro/lavamanos/ducha firmes y sin fisuras; descarga funciona; sin manchas de óxido en pernos de fijación; agua deja de correr tras descargar.
| Sí | `firmeza-de-artefactos-sanitarios` | **No** | **No** (sin ficha CDT) | Editorial | Parcial |

### Grifería
Revisiones: sin goteras/filtraciones; gira suave; presión pareja; sin manchas de humedad bajo el mueble.
| Sí | `filtraciones-y-presion-de-agua` | **No** | **No** | Editorial | Parcial |

### Iluminación
Idéntico a Living.

### Impermeabilización y sellos *(checklist condicional según ducha/tina)*
Revisiones: sello muro-piso de ducha continuo *(si hay ducha)*; sin manchas de humedad *(siempre)*; silicona de tina/ducha sin amarillamiento/hongos/despegue *(si ducha o tina)*; desagüe de piso drena bien *(si ducha)*; rebalse funciona *(si tina)*; sello tina-muro continuo *(si tina)*; ventilación funcional *(si ducha o tina)*.
| Sí | `impermeabilizacion-de-duchas` | **No** | **No** (sin ficha CDT — impermeabilización no está en el manual de tolerancias) | Editorial | Parcial |

---

## RECINTO: Closets (2 elementos)

### Puertas correderas
Revisiones: deslizan suavemente sin descarrilar; no rozan marco ni piso; rieles bien fijados, sin tornillos sueltos.
| No | `null` | No | Ficha 21 (Closets) existe en el manual **pero no está vinculada** | Editorial | **Mínimo — vacío directo, ver sección Vacíos** |

### Repisas
Revisiones: firmes y niveladas; objeto redondo no rueda; soportes bien fijados sin holgura.
| No | `null` | No | Ficha 21 (parcialmente aplicable: linealidad de repisas) **no vinculada** | Editorial | **Mínimo** |

---

## RECINTO: Terraza / Patio (2 elementos, condicional a feature TERRAZA)

### Piso exterior
Revisiones: pendiente correcta para escurrir agua de lluvia; sin charcos hacia el interior; uniones piso-muro/puertas sin grietas ni sellos despegados.
| Sí | `impermeabilizacion-de-terrazas` | **No** | **No** (el manual tiene "Losas de Hormigón" con tabla de pendientes, Ficha 3, pero no está vinculada a este elemento) | Editorial | Parcial |

### Baranda
Revisiones: firme sin holgura; altura segura; espacio entre barrotes no permite pasar una lata (seguridad infantil).
| No | `null` | No | No | Editorial | **Mínimo** |

---

## RECINTO: Techumbre (2 elementos, condicional CASA + feature TECHUMBRE)

### Cubierta
Revisiones: sin manchas de humedad ni goteras; sin piezas quebradas/corridas/oxidadas; sin luz filtrándose entre piezas.
| Sí | `estado-de-la-cubierta` | **No** | **No** (sin ficha CDT de cubiertas) | Editorial | Parcial |

### Canaletas
Revisiones: bien fijadas, sin obstrucciones; sin tramos caídos/torcidos/separados; bajadas de agua bien conectadas.
| Sí | `fijacion-y-limpieza-de-canaletas` | **No** | **No** | Editorial | Parcial |

---

## RECINTO: Instalaciones (4 elementos)

### Tablero eléctrico
Revisiones: circuitos rotulados; diferenciales funcionan al probarlos; fácil de ubicar y acceder.
| Sí | `rotulacion-y-diferenciales` | **No** | **No** (Ficha 26 es de artefactos, no de tablero) | Editorial | Parcial |

### Llave de paso de agua
Revisiones: corta el suministro correctamente; fácil de ubicar y accionar.
| No | `null` | No | No | Editorial | **Mínimo** |

### Instalación de gas *(condicional feature GAS, `lacksNormativeBacking: true`)*
Revisiones: sin olor a gas; llave de paso general accesible e identificable; conexiones/mangueras sin cortes/roturas/corrosión; ventilación hacia el exterior del calefont/artefactos. *Todas con helpText explícito: "no reemplaza una certificación de gasfitería habilitado."*
| No | `null` | No | No | Editorial | **Mínimo (a propósito — fuera del alcance normativo declarado)** |

### Climatización / calefacción *(condicional feature CLIMATIZACION)*
Revisiones: enciende y responde a controles; sin ruidos/vibraciones/olores anormales; instalación fijada firmemente, sin filtraciones.
| No | `null` | No | No | Editorial | **Mínimo** |

---

## RECINTO: Equipamiento (1 elemento)

### Calefont o termo eléctrico
Revisiones: entrega agua caliente estable; sin fugas de agua ni gas; instalado en lugar ventilado, sin combustibles cerca.
| Sí | `calefont-y-termo-electrico` | **No** | **No** | Editorial | Parcial |

---

## RECINTO: Escalera (1 elemento, condicional CASA + feature ESCALERA)

### Peldaños y pasamanos
Revisiones: todos los escalones misma altura; misma profundidad de huella en todos; revestimiento bien adherido, sin piezas sueltas; pasamanos firme en toda su extensión.
| No | `null` | **No** | Ficha 11 (Gradas de Escaleras) existe en el manual **pero no está vinculada** — la tolerancia real (±5 mm) no aparece en el checklist, que queda en juicio cualitativo | Editorial | **Parcial — vacío directo, ver sección Vacíos** |

---

## RECINTO: Bodega (1 elemento, condicional DEPTO + feature BODEGA)

### Puerta y cerradura de bodega
Revisiones: cierra/abre sin forzar; cerradura funciona y llaves completas; espacio limpio/seco/sin humedad; numeración coincide con contrato.
| No | `null` | No | No | Editorial | **Mínimo** |

---

## RECINTO: Estacionamiento (1 elemento, condicional DEPTO + feature ESTACIONAMIENTO)

### Espacio de estacionamiento
Revisiones: demarcación clara y coincide con contrato; piso sin grietas/hoyos/desniveles importantes; iluminación adecuada; espacio suficiente para maniobrar.
| No | `null` | No | No | Editorial | **Mínimo** |

---

## RECINTO: Piscina (2 elementos, condicional CASA + feature PISCINA, `lacksNormativeBacking: true`)

### Cierre de seguridad
Revisiones: cierre perimetral impide acceso de niños sin supervisión; portón/reja cierra y traba correctamente.
| No | `null` | No | No | Editorial | **Mínimo (a propósito)** |

### Estructura y filtración
Revisiones: sin grietas/filtraciones/desprendimientos visibles; sistema de filtración/bomba funciona sin ruidos/olores anormales.
| No | `null` | No | No | Editorial | **Mínimo (a propósito)** |

---

## RECINTO: Quincho (2 elementos, condicional CASA + feature QUINCHO)

### Techumbre y estructura
Revisiones: techumbre bien fijada, sin filtraciones ni piezas sueltas; estructura firme, sin grietas visibles.
| No | `null` | No | No | Editorial | **Mínimo** |

### Terminaciones e instalaciones
Revisiones: enchufes e iluminación funcionan; superficies parejas y sin fisuras visibles.
| No | `null` | No | No | Editorial | **Mínimo** |

---

# 1. DUPLICADOS

Casos donde el **mismo contenido literal** (no solo el mismo tema)
está escrito más de una vez en el código, en vez de reutilizarse
desde una sola fuente.

| # | Duplicado | Dónde | Detalle |
|---|---|---|---|
| D1 | Checklist de "Piso Porcelanato" | `cocina.piso` (genérico) vs. `piso-porcelanato` (variante FLOOR de Living/Comedor/Dormitorios/Baños) | Las 4 preguntas están escritas **dos veces**, palabra por palabra, en `seed.ts` — una como constante reutilizable (`PISO_PORCELANATO_CHECKLIST`) y otra como array inline en la definición de Cocina. Mismo contenido, dos fuentes. |
| D2 | Checklist de "Piso Cerámica" | `banos.piso` (genérico) vs. `piso-ceramica` (variante FLOOR) | Idéntico patrón que D1 — 5 preguntas duplicadas palabra por palabra entre la definición inline de Baños y la constante `PISO_CERAMICA_CHECKLIST`. |
| D3 | Checklist de "Cerámica" reutilizado como muro | `piso-ceramica` (FLOOR) y `muros-y-cielos-ceramico` (WALL) | No es duplicado de código (sí reutiliza la misma constante correctamente), pero **es un duplicado de contenido con fricción**: la pregunta "¿las esquinas y remates (borde de tina, mesón) están bien terminados?" no tiene sentido en un muro de Living/Dormitorio (no hay tina ni mesón en esos recintos). Es reutilización mecánica de texto sin adaptar al contexto real. |
| D4 | "Filtraciones y presión de agua" con dos redacciones distintas | `cocina.llave-de-agua-y-lavaplatos` vs. `banos.griferia` | Ambos usan el mismo `libraryArticleSlug` y evalúan literalmente lo mismo (goteras, presión pareja fría/caliente, humedad bajo el mueble), pero cada uno tiene su propio texto de pregunta ligeramente distinto ("¿No hay goteras en la llave ni bajo el lavaplatos?" vs. "¿No hay goteras ni filtraciones en las llaves?"). Es el mismo criterio técnico redactado dos veces de forma independiente, no una reutilización real. |

---

# 2. REUTILIZACIÓN — oportunidades no aprovechadas

Siguiendo tu propio ejemplo (sellos de ventana PVC vs. aluminio — ya
resuelto correctamente hoy, `VENTANA_CHECKLIST` es material-agnóstico
y se reutiliza igual en Living y Dormitorios):

| # | Oportunidad | Elementos involucrados | Por qué |
|---|---|---|---|
| R1 | Unificar D4 en una sola fuente | `llave-de-agua-y-lavaplatos` (Cocina) y `griferia` (Baños) | Mismo artículo, mismo criterio técnico, dos redacciones. Se podría resolver con una sola constante `GRIFERIA_CHECKLIST` reutilizada en ambos recintos, igual que ya se hace con `GUARDAPOLVOS_CHECKLIST` o `CORNISAS_CHECKLIST`. |
| R2 | Unificar checklist de mueble con puertas/cajones | `muebles-de-cocina` y `mueble-de-bano` | Ambos comparten el mismo artículo (`puertas-cajones-y-herrajes`) y 3 de sus preguntas son conceptualmente idénticas (puertas/cajones sin rozar, tiradores firmes, objeto redondo sobre el mesón). Solo difieren en 1-2 preguntas específicas (Cocina agrega "alineación entre puertas/cajones vecinos"; Baño agrega "mesón sin grietas ni bordes astillados"). Candidato directo para el mismo patrón "checklist base + extensión" que UX-03 ya aprobó para fachada — aplicado acá a nivel de contenido, sin tocar el mecanismo. |
| R3 | Enchufes e interruptores — unificar variantes | `enchufes-e-interruptores` (Living, 4 preguntas) y su versión de Cocina (3 preguntas, sin la línea de interruptores porque Cocina no siempre tiene interruptor de pared en el mismo punto) | Hoy son dos arrays de texto independientes con el mismo nombre de elemento. Se podría resolver con una pregunta condicional (mismo mecanismo `requiresShower`/`requiresBathtub` que ya usa Baños) en vez de dos checklists distintos con igual nombre. |
| R4 | Patrón de "abre/cierra sin forzar + cerradura funciona" | `puerta-de-acceso` (Exterior), `puertas-correderas` (Closets), `puerta-y-cerradura-de-bodega` (Bodega) | Los tres evalúan el mismo concepto raíz (funcionamiento de una puerta) con estructuras de pregunta distintas. No son candidatos a fusionarse completamente (correderas vs. batientes son mecánicamente distintas), pero sí a compartir un núcleo de 1-2 preguntas base + extensión específica por tipo de puerta — mismo patrón que R2. |
| R5 | El propio mecanismo de familia de UX-03 es reutilizable más allá de Fachada | `piso-ceramica`/`muros-y-cielos-ceramico` (D3) es exactamente el caso que el modelo de "checklist base + extensión por material" (aprobado para Fachada en UX-03) resolvería mejor que la reutilización mecánica actual — la pregunta de "tina/mesón" pasaría a ser una extensión exclusiva del material Cerámica-en-Piso, no arrastrada al muro. *(Se menciona como observación de contenido, no como propuesta de tocar la arquitectura ahora — ya está aprobada y congelada.)* |

---

# 3. VACÍOS

## 3.1 Contra el Manual de Tolerancias CDT (26 fichas)

| Ficha CDT | Elemento ObraBien vinculado | Estado |
|---|---|---|
| 1. Muros de Albañilería | — | **No aplica a inspección de recepción**: es un elemento estructural cubierto por terminaciones antes de la entrega; ObraBien inspecciona resultado final (pintura/estuco/cerámico), no la albañilería cruda. No es un vacío real. |
| 2. Muros de Hormigón | — | Igual que arriba — no aplica. |
| 3. Losas de Hormigón | — | Igual — no aplica directamente, aunque su tabla de pendientes sí sería relevante para `terraza-patio.piso-exterior` (ver 3.1.a). |
| 4. Radieres de Hormigón | — | No aplica directamente (recubierto por piso terminado). |
| 5. Tabiques | — | No aplica — estructura cubierta por `muros-y-cielos`. |
| 6. Encuentro de Paramentos | — | No aplica. |
| 7. Cielos Rasos | `muros-y-cielos` (parcialmente, vía `MUROS_Y_CIELOS_CHECKLIST` que menciona "cielo parejo") | **Vacío parcial**: la pregunta existe pero no cita la tolerancia real (±3 mm con regla de 1,2 m) — queda en juicio cualitativo ("sin ondulaciones visibles"). |
| 8. Estucos | `fachada`/`humeda-sobre-estuco` | Cubierto conceptualmente por el checklist de fachada (fisuras, plomo), aunque sin la tolerancia numérica explícita. |
| 9. Enlucidos de Yeso | — | **Vacío real**: ObraBien no tiene ningún material "yeso" en muros interiores (solo Pintura/Papel mural/Cerámico) — el enlucido de yeso es la terminación previa a la pintura, invisible para el comprador final, por lo que la ausencia es razonable. |
| 10. Revestimientos Cerámicos | `piso-ceramica`, `muros-y-cielos-ceramico` | **Cubierto** — el más completo del sistema. |
| 11. Gradas de Escaleras | `peldanos-y-pasamanos` | **Vacío directo**: el elemento existe, pero su checklist no usa la tolerancia real (±5 mm) — queda en "misma altura" sin cuantificar, y el criterio de "1/3 y 2/3" de puntos de medición en escaleras anchas no está reflejado en absoluto. |
| 12. Puertas | `puerta-de-acceso` | **Cubierto**, aunque sin las tolerancias numéricas explícitas (paralelismo 3 mm, planeidad ±3 mm) — el checklist es cualitativo. |
| 13. Ventanas | `ventanas` | **Cubierto** — el segundo más completo. |
| 14. Revestimientos de Papel | `muros-y-cielos-papel-mural` | Cubierto conceptualmente (piquetes, tono, encuentros), sin imagen ni ejemplo Bien/Mal. |
| 15. Enchapes de Madera | — | **Vacío real**: ObraBien no tiene ningún elemento de enchape de madera (puertas, muebles o revestimientos). El material no existe hoy en ningún catálogo de la app pese a tener ficha CDT completa y estar ya documentado en la biblioteca visual (ENCHMAD-001). |
| 16. Guardapolvos y Junquillos | `guardapolvos` | Cubierto conceptualmente, sin tolerancia numérica explícita ni distinción guardapolvo/junquillo (ObraBien solo tiene "guardapolvos", el manual distingue ambos). |
| 17. Alfombras y Cubrepisos | `piso-alfombra` | Cubierto, checklist más corto que el manual (falta el criterio de "encuentro con marcos/pilastras: 2 mm"). |
| 18. Cornisas | `cornisas` | Cubierto conceptualmente. |
| 19. Cubrejuntas | — | **Vacío real**: no existe ningún elemento de cubrejuntas en ObraBien (perfil entre pavimentos distintos, ej. cerámico-flotante). Relevante en cualquier vivienda con más de un tipo de piso. |
| 20. Pilastras | — | **Vacío real**: no existe elemento de pilastras (molduras de marco de puerta). Menor impacto — suele evaluarse implícitamente dentro de `puerta-de-acceso`. |
| 21. Closets | `puertas-correderas`, `repisas` | **Vacío directo**: los elementos existen pero ninguna de sus preguntas cita las tolerancias reales del manual (verticalidad 1mm/m, alineación de tiradores 2mm, linealidad de repisas 3mm) — todo el checklist actual es cualitativo. |
| 22. Muebles Incorporados | `muebles-de-cocina`, `mueble-de-bano` | Cubierto conceptualmente y con ejemplo Bien/Mal de texto (categoría `muebles`), pero sin las tolerancias numéricas del manual (paralelismo 3mm, horizontalidad de mesón 1mm/m). |
| 23. Pinturas | `fachada`, `muros-y-cielos` | **El más completo de todos** — es el único con ejemplo Bien/Mal por artículo específico y ya es la base normativa real del producto. |
| 24. Pavimentos Vinílicos | `piso-vinilico` | Cubierto, sin tolerancia numérica ni ejemplo visual. |
| 25. Pisos Flotantes | `piso` (genérico Living/Comedor/Dormitorios) | Cubierto, sin la tolerancia numérica (3mm en 3m). |
| 26. Artefactos Eléctricos | `enchufes-e-interruptores`, `iluminacion` (parcial) | Cubierto para enchufes/interruptores; Iluminación no tiene ficha CDT propia y queda fuera. |

**3.1.a — Nota sobre pendientes de losas/terrazas**: la Ficha 3 (Losas
de Hormigón) incluye una tabla de tolerancia de pendiente (±0,5%)
directamente relevante para `terraza-patio.piso-exterior` ("¿tiene
pendiente correcta para escurrir el agua?") — hoy esa pregunta existe
en ObraBien pero sin ningún respaldo normativo citado, pese a que el
respaldo ya está transcrito en `tolerances-manual.ts` sin usarse.

## 3.2 Contra la arquitectura UX-03 (Domain Model + Backlog, ya aprobados)

- **`FacadeFinishOption`**: solo 1 de las 6-8 familias planificadas
  está implementada (Húmeda sobre estuco). Faltan: Placa atornillada
  (Fibrocemento/SmartPanel), Mampostería/piedra (Piedra/Enchapes),
  Madera, Hormigón visto, EIFS, Estuco visto, Ladrillo a la vista —
  tal como quedó documentado en `Sprint-UX03-Analisis.md`. Es un
  vacío **esperado**, no un defecto — es exactamente el trabajo que
  las siguientes épicas del backlog van a cerrar.
- **`MaterialKnowledgeItem`, `ResolutionGuide`, `ToleranceSpec`,
  `Measurement`, `DefectType`**: confirmado por grep directo contra
  `schema.prisma` — **ninguno de los cinco existe todavía como
  modelo real**. Todo lo documentado en el Domain Model v1 sobre
  estas entidades es diseño aprobado, no implementación. Esto es
  consistente con el estado declarado de UX-03 (solo el primer
  vertical slice — fundación + motor + familia húmeda-sobre-estuco —
  está construido) y no debe leerse como una desviación.
- **Checklist base + extensiones por material** (el modelo de tres
  capas aprobado en UX-03 Etapa 2): implementado solo a nivel de
  motor — la familia húmeda-sobre-estuco hoy no tiene ninguna
  extensión real cargada (los 4 materiales comparten exactamente el
  mismo checklist, sin diferenciarse todavía), tal como se dejó
  explícito y aprobado en el cierre de la Etapa C.

## 3.3 Contra la Biblioteca Visual planificada (70 registros, documento previo)

- **0 de 70 fotografías propuestas están generadas o cargadas.** El
  documento `ObraBien-Biblioteca-Visual-Manual-Tolerancias.md` es un
  plan de contenido, no contenido cargado — coherente con el hallazgo
  central de este documento (0% de imágenes reales en todo el
  sistema).
- Los 8 registros de "Imágenes nuevas recomendadas" de ese documento
  (grados de hormigón G1-G6, humedad/filtraciones, fisuras
  estructurales de estuco, revestimientos exteriores UX-03, etc.)
  siguen íntegramente pendientes.
- **Ninguna categoría de la biblioteca técnica actual (`good-bad-examples.ts`) tiene más de 2 ejemplos** — ni siquiera las categorías "Completo" de este audit. El techo actual de profundidad por categoría es bajo incluso donde el contenido de texto existe.

## 3.4 Categorías de biblioteca técnica sin ningún respaldo (ni CDT, ni ejemplo Bien/Mal, ni tolerancia)

De las 24 categorías, **10 no tienen ni ejemplo Bien/Mal ni tolerancia
mapeada ni ficha CDT aplicable**: Baños (impermeabilización),
Cubiertas, Sanitarios, Griferías, Siliconas, Iluminación, Tableros
eléctricos, Techumbres *(nota: esta categoría existe en la biblioteca
pero **ningún** `ElementTemplate` la referencia — es contenido
huérfano, ver 3.5)*, Impermeabilizaciones, Calefont y termo eléctrico.
Es decir, **casi el 42% de la biblioteca técnica actual** depende
100% de la redacción editorial propia, sin ningún anclaje normativo
ni visual.

## 3.5 Hallazgo adicional: contenido huérfano

La categoría `techumbres` (artículo `humedad-y-ventilacion-en-techumbre`)
existe en la biblioteca técnica pero **ningún elemento del catálogo
la referencia** — ni `cubierta` ni `canaletas` (que usan `estado-de-la-cubierta`
y `fijacion-y-limpieza-de-canaletas` respectivamente, ambos de otras
categorías). Es contenido editorial ya escrito y publicado que hoy no
es alcanzable desde ningún flujo de inspección real.

---

# RECOMENDACIONES PROFESIONALES

Actuando como ITO senior, especializado en recepción de vivienda
nueva en el segmento 2.000-3.500 UF (departamentos de inmobiliaria
media/alta y casas de condominio) — inspecciones que **hoy no
existen en ObraBien** y que un ITO experimentado revisa de forma
rutinaria en ese segmento específico:

### RP1 — Nivel y pendiente de ducha/receptáculo (no solo sello)
**Por qué se revisa**: el manual y ObraBien cubren el sello de la
ducha (impermeabilización), pero no la pendiente real del piso hacia
el desagüe — un receptáculo mal nivelado deja agua empozada aunque el
sello esté perfecto. **Qué problema evita**: filtraciones lentas por
estancamiento prolongado, no detectables el día de la recepción sino
meses después. **Beneficio al propietario**: evita un reclamo
postventa típico y difícil de probar retroactivamente. **Prioridad**:
Alta. **¿Incorporar?**: Sí — es una pregunta adicional de bajo costo
de implementación dentro de `impermeabilizacion-y-sellos`, no una
partida nueva.

### RP2 — Prueba de estanqueidad de ventanas con agua (no solo visual)
**Por qué se revisa**: un ITO experimentado, cuando puede, vierte
agua controlada sobre el marco exterior de una ventana para verificar
que no se filtre hacia el interior — el checklist actual de
`ventanas` es 100% visual/mecánico, no incluye ninguna prueba activa
de estanqueidad. **Qué problema evita**: filtraciones de agua lluvia
que solo se manifiestan en la primera lluvia fuerte, después de
vencido cualquier plazo de reclamo simple. **Beneficio**: detecta un
defecto de alto costo de reparación antes de la firma. **Prioridad**:
Alta, aunque requiere agua/condiciones controladas — quizás como
pregunta condicional a "¿es posible probar con agua?". **¿Incorporar?**:
Sí, como pregunta opcional/condicional, no obligatoria.

### RP3 — Verificación de pendiente de terraza con nivel, no solo visual
**Por qué se revisa**: `terraza-patio.piso-exterior` ya pregunta "¿tiene
pendiente correcta?" pero de forma puramente cualitativa. Un ITO usa
un nivel de burbuja o vierte agua para confirmarlo objetivamente.
**Qué problema evita**: empozamiento que después se traduce en
filtración hacia el piso de abajo (en departamentos) o hacia la
vivienda (en casas). **Beneficio**: uno de los reclamos de postventa
más frecuentes y costosos de resolver una vez ocupada la vivienda.
**Prioridad**: Alta. **¿Incorporar?**: Sí — agregar el recurso de
prueba de agua ya identificado en la Biblioteca Visual (LOSA-004)
directamente a esta revisión existente.

### RP4 — Golpe de sonoridad en porcelanato/cerámico de piso (no solo visual)
**Por qué se revisa**: el checklist ya menciona "sonido sólido al
golpe de moneda" — pero un ITO experimentado hace este golpe de forma
sistemática **en cada palmeta del recinto**, no como verificación
puntual. Hoy la pregunta existe pero no transmite la sistematicidad
del método real. **Qué problema evita**: piezas con adhesión parcial
(bajo 70% de contacto, según Ficha 10 CDT) que se sueltan con el uso.
**Beneficio**: evita levantamiento de piso años después de ocupada la
vivienda. **Prioridad**: Media (la pregunta ya existe; el ajuste es
de profundidad/instrucción, no de vacío). **¿Incorporar?**: Ajustar
`helpText` para explicitar "recorre toda la superficie, no solo un
punto" — mejora de contenido, no partida nueva.

### RP5 — Verificación de caída libre y cierre de puertas cortafuego / con resorte (edificios)
**Por qño se revisa**: en departamentos con puertas de escape o
cortafuego en pasillos comunes, un ITO verifica que cierren solas por
gravedad/resorte — hoy ObraBien no distingue este tipo de puerta del
resto. **Qué problema evita**: riesgo de seguridad real (propagación
de humo/fuego) si la puerta no cierra automáticamente.
**Beneficio**: seguridad de vida, no solo estética. **Prioridad**:
Alta, pero de aplicación acotada (solo edificios con puertas
cortafuego en el recorrido del propietario, generalmente accesos
comunes que hoy están fuera del alcance de ObraBien, centrado en la
unidad privada). **¿Incorporar?**: Evaluar como partida futura de
"Espacios comunes", fuera del alcance actual de recintos de unidad —
no aplica a este ciclo.

### RP6 — Prueba de carga en repisas y barras de closet
**Por qué se revisa**: `closets.repisas` pregunta si están "firmes",
pero un ITO aplica presión manual deliberada (no solo mira) para
confirmar que el soporte resiste peso real, no solo el peso de la
repisa vacía. **Qué problema evita**: fijaciones insuficientes que
ceden con el primer uso real (ropa colgada, cajas guardadas).
**Beneficio**: evita un defecto silencioso que se manifiesta recién
al mudarse. **Prioridad**: Media. **¿Incorporar?**: Sí — ajuste de
`helpText` explicitando "aplica presión con la mano, no solo mires",
mejora de contenido existente.

### RP7 — Verificación de olor a humedad en clósets y bajo muebles empotrados (no solo mancha visible)
**Por qué se revisa**: un ITO experimentado huele sistemáticamente el
interior de closets y bajo muebles de cocina/baño — el olor a humedad
suele preceder a la mancha visible por semanas. Ninguna revisión
actual de ObraBien incluye este criterio olfativo (sí existe para
gas, pero no para humedad). **Qué problema evita**: detección tardía
de filtraciones incipientes. **Beneficio**: alto — permite reclamar
antes de que el daño sea visible y más caro de reparar. **Prioridad**:
Alta. **¿Incorporar?**: Sí, como pregunta adicional en
`impermeabilizacion-y-sellos` y en `mueble-de-cocina`/`mueble-de-bano`.

### RP8 — Verificación de aislación acústica básica entre unidades (departamentos)
**Por qué se revisa**: en departamentos del segmento 2.000-3.500 UF,
el ruido entre unidades es una de las quejas postventa más
frecuentes, y no existe hoy ninguna revisión relacionada en ObraBien.
Un ITO no mide acústica formalmente (requiere equipo), pero sí hace
una prueba cualitativa simple (golpe en muro medianero, escucha desde
recinto adyacente si es posible). **Qué problema evita**: descubrir
después de mudarse que se escucha todo del vecino, sin ninguna
constancia de haberlo evaluado en la recepción. **Beneficio**:
gestión de expectativas — aunque no sea "defecto" reclamable, deja
constancia documentada. **Prioridad**: Media — requiere acceso al
recinto vecino, no siempre disponible el día de la recepción.
**¿Incorporar?**: Evaluar como partida opcional futura, condicionada
a si el usuario indica que puede acceder al recinto contiguo.

### RP9 — Verificación de hermeticidad de enchufes/artefactos en zonas húmedas (baño, exterior)
**Por qué se revisa**: un ITO revisa si los enchufes cercanos a zonas
de agua (baño, exterior) tienen tapa con protección IP o al menos
tapa de seguridad — hoy `enchufes-e-interruptores` no se instancia en
Baños en absoluto (solo en Living/Cocina), y no hay ninguna pregunta
de seguridad eléctrica en zona húmeda en todo el catálogo. **Qué
problema evita**: riesgo real de electrocución, no solo estético.
**Beneficio**: seguridad de vida. **Prioridad**: Alta. **¿Incorporar?**:
Sí — es el vacío de mayor relevancia de seguridad detectado en toda
esta auditoría: no existe HOY ningún elemento de enchufes/artefactos
eléctricos para el recinto Baños.

---

# INFORME FINAL

### 1. ¿Qué sabe actualmente ObraBien?

ObraBien tiene un catálogo funcional y coherente de **17 recintos y
92 elementos inspeccionables**, con checklists redactados en lenguaje
simple y no técnico — el correcto público objetivo (propietarios sin
formación técnica). El conocimiento normativo real (Manual CDT) está
completamente transcrito (26 fichas) pero **conectado a la
experiencia de usuario solo parcialmente**: 16 de las 26 fichas
tienen algún elemento vinculado, 10 no tienen ningún vínculo, y de las
16 vinculadas, la gran mayoría no expone la tolerancia numérica real
al usuario — el checklist queda en juicio cualitativo ("sin
ondulaciones visibles") en vez de citar el criterio objetivo ("±3 mm
con regla de 1,2 m"). El conocimiento de UX-03 (fachada por familia
de material) es real pero cubre solo 1 de 6-8 familias planificadas,
con la arquitectura de contenido enriquecido (tolerancia, defectos,
guías de resolución, evidencia) diseñada pero sin ningún dato cargado.

### 2. ¿Qué porcentaje aproximado de la Biblioteca está construido?

Con el criterio de "Completo" definido en este documento (checklist +
artículo con cuerpo + ejemplo Bien/Mal en texto + tolerancia CDT
vinculada — **sin contar imagen real, que es 0% en todo el sistema**):
de 24 categorías de biblioteca técnica, **8 son "Completo"** (33%),
**~6 son "Parcial"** (25%, tienen artículo pero falta tolerancia o
ejemplo), y **10 son "Mínimo o inexistente"** (42%, sin ningún
respaldo más allá del checklist mismo). Si el criterio incluye imagen
real (que es, en definitiva, el objetivo declarado del negocio), **el
avance real de la Biblioteca Visual es 0%** — el contenido de texto
es la base sobre la que construir, no el resultado final.

### 3. ¿Qué materiales están más completos?

En orden: **Pinturas** (única con ejemplo Bien/Mal por artículo
específico, ya en uso productivo real), **Ventanas**, **Puertas**,
**Cerámicos/Porcelanatos** (con la particularidad de reutilizarse
también como muro), **Muebles**, **Enchufes/Interruptores**. Estas 6-7
categorías comparten checklist + artículo + tolerancia CDT + ejemplo
Bien/Mal en texto — el techo actual del sistema.

### 4. ¿Qué materiales tienen mayor deuda?

**Plomería/sanitarios en su conjunto** (Griferías, Sanitarios,
Siliconas, y las revisiones de agua repetidas con distinta redacción
en Cocina/Baño) — sin ninguna ficha CDT de respaldo, sin ejemplo
visual, con contenido duplicado no unificado. En segundo lugar,
**Instalaciones eléctricas de tablero e iluminación** (sin tolerancia,
sin ejemplo, y con el vacío de seguridad detectado en RP9 — sin
enchufes en Baños). En tercer lugar, **Closets y Escaleras**, que
tienen ficha CDT completa y numérica (Fichas 11 y 21) pero un
checklist ObraBien que no la usa en absoluto — es la deuda más fácil
de resolver porque el contenido normativo ya existe transcrito, solo
falta conectarlo.

### 5. ¿Qué revisiones faltan?

Las enumeradas en la sección 3 (Vacíos) — como resumen priorizado:
tolerancias numéricas de Closets y Gradas de Escaleras (contenido CDT
ya transcrito, sin usar); Enchapes de Madera, Cubrejuntas y Pilastras
como elementos completos (no existen en absoluto); y las 9
Recomendaciones Profesionales, especialmente RP9 (seguridad eléctrica
en zona húmeda) y RP1/RP3 (pendientes con prueba objetiva, no solo
visual).

### 6. ¿Qué revisiones están duplicadas?

D1 y D2 (checklists de piso Porcelanato/Cerámica escritos dos veces
en `seed.ts`, una vez como constante y otra inline en Cocina/Baños) —
son duplicados de código puro, contenido idéntico. D4 (filtraciones de
agua en Cocina vs. Baño) es un duplicado de criterio con redacción
distinta, más relevante de resolver que D1/D2 porque genera
inconsistencia de experiencia, no solo de mantenimiento.

### 7. ¿Qué revisiones pueden reutilizarse?

R1 (grifería unificada), R2 (muebles con puertas/cajones, checklist
base + extensión), R3 (enchufes/interruptores con pregunta
condicional en vez de dos variantes) y R4 (patrón base de "puerta
funcional" para acceso/corredera/bodega) — los cuatro siguen
exactamente el mismo patrón que UX-03 ya validó y aprobó para
fachada (checklist base compartido + extensión puntual), aplicado acá
a nivel de contenido editorial, no de arquitectura.

### 8. ¿Cuál sería el orden óptimo para completar la Biblioteca?

1. **Cerrar duplicados y unificar reutilización** (D1, D2, D4, R1-R4)
   — es el trabajo de menor esfuerzo relativo y limpia la base antes
   de seguir agregando contenido nuevo sobre una base inconsistente.
2. **Conectar las tolerancias CDT ya transcritas pero no vinculadas**
   (Closets, Gradas de Escaleras, Cielos, Puertas, Ventanas con
   valores numéricos explícitos) — el contenido normativo ya existe,
   es trabajo de conexión, no de redacción nueva.
3. **Cerrar los vacíos de seguridad** (RP9 enchufes en zona húmeda,
   RP1/RP3 pendientes con prueba objetiva, RP7 olor a humedad) — alto
   impacto, bajo costo de implementación (son preguntas adicionales
   a elementos que ya existen).
4. **Completar las familias de fachada restantes de UX-03** (6-7
   familias pendientes) — ya tiene su propio backlog técnico aprobado
   (`ObraBien-Technical-Implementation-Backlog.md`), este audit solo
   confirma que sigue pendiente.
5. **Generar contenido visual real** (los 70 registros de la
   Biblioteca Visual planificada) — es la inversión de mayor volumen
   y la que más tiempo va a tomar; conviene priorizar dentro de ella
   por las categorías "Completo" de este audit (ya tienen todo el
   resto de la cadena lista para recibir la imagen).
6. **Cerrar vacíos estructurales menores** (Enchapes de madera,
   Cubrejuntas, Pilastras) — menor frecuencia real de uso, quedan al
   final.

### 9. ¿Qué implementaría primero para obtener el mayor impacto en usuarios reales?

**RP9 (enchufes/seguridad eléctrica en Baños) y RP1/RP3 (pendientes
con prueba objetiva de agua)** — ambos son ajustes de contenido sobre
elementos que ya existen (sin tocar arquitectura), de implementación
rápida, y que cierran vacíos de **seguridad y de la causa raíz de
reclamos postventa más frecuentes** (filtraciones y riesgo eléctrico),
no de estética. En paralelo, **cerrar D4** (unificar grifería) porque
es el duplicado de menor esfuerzo y mayor visibilidad de
inconsistencia para cualquier persona que revise el contenido después
de este audit.

---

*Fin de la Auditoría Maestra. No se modificó ningún archivo de
código, schema, migración ni componente — este documento es
enteramente de análisis. 92 elementos, 17 recintos, 25 artículos, 24
categorías, 26 fichas CDT y 5 modelos de UX-03 (confirmados ausentes
del schema) fueron revisados en su totalidad.*
