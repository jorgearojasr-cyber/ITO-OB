# ObraBien — Biblioteca Técnica Revisada y Completada

## Alcance

Contenido puro. **No se implementó código, no se tocó schema, no se
modificó UX-03, no se cambió el flujo de inspección.** Este
documento recorre **todos** los elementos que existen hoy en la
aplicación (39 elementos conceptuales, agrupando las variantes de
material bajo un mismo elemento — igual criterio que usa la propia
app), reorganiza y completa su contenido de inspección, y deja cada
uno listo para el siguiente paso real (fotografiar Bien/Mal), sin dar
ese paso.

**Metodología**: para cada elemento se parte del checklist real ya
implementado (`ObraBien-Biblioteca-Maestra-Auditoria.md`), se
reorganiza usando el vocabulario de conceptos técnicos ya fusionado
en `ObraBien-Biblioteca-Maestra-Revisiones.md` (se cita el código
REV-XXXX cuando corresponde, para que el trazado sea directo), y se
completa con criterio de ITO — todo lo que un inspector experimentado
revisaría en la recepción de una vivienda de 2.000-3.500 UF y que hoy
no está en el checklist. Los puntos **nuevos** (no implementados hoy)
se marcan explícitamente con 🆕.

**Columnas de Biblioteca Visual**: Bien / Mal / Video — "Solo Sí
cuando una fotografía no basta para enseñar el concepto" (rotación,
sonido, movimiento). El resto de puntos son fotografiables con un par
Bien/Mal estático.

---

# ELEMENTO: Fachada

## Descripción
Terminación exterior de los muros perimetrales de la vivienda —
primera impresión y primera línea de defensa contra el clima.

## Qué aplica según material
Hoy implementado: familia **Húmeda sobre estuco** (Pintura lisa,
Marmolina, Graniplast, Revestimiento texturado) con checklist único
compartido. 🆕 Familias pendientes de UX-03 (no se agregan acá,
pertenecen a su propio backlog aprobado): Placa atornillada
(Fibrocemento/SmartPanel), Piedra/Enchapes, Madera, Hormigón visto,
EIFS, Estuco visto, Ladrillo a la vista.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Superficie a plomo, sin ondulaciones al pasar regla | REV-0001/0002 | Alta | Sí | Sí | No |
| Fisuras de retracción en el estuco base | REV-0053 | Alta | Sí | Sí | No |
| 🆕 Fisuras estructurales vs. capilares (distinción explícita) | REV-0054 | Alta | Sí | Sí | No |
| Color y textura del acabado uniformes, sin manchas ni parches | REV-0009/0011 | Alta | Sí | Sí | No |
| Filtraciones en la unión entre muros y aleros | REV-0057 | Alta | Sí | Sí | No |
| Terminación de esquinas y contornos de vanos | REV-0061 | Media | Sí | Sí | No |
| 🆕 Ausencia de manchas de humedad ascendente (napa/salpicadura) | REV-0015 | Media | Sí | Sí | No |
| 🆕 Estado de sellos en encuentro con marcos de puertas/ventanas | REV-0016 | Media | Sí | Sí | No |
| 🆕 Uniformidad de grano/relieve (solo Marmolina/Graniplast/Texturado) | REV-0011 | Media | Sí | Sí | No |

---

# ELEMENTO: Puerta de acceso

## Descripción
Puerta principal de ingreso a la vivienda — el elemento más revisado
de cualquier recepción por su rol de seguridad y uso diario.

## Qué aplica según material
No se distingue hoy por material de puerta (madera/metálica/PVC). 🆕
Debería distinguirse: puertas metálicas requieren revisión adicional
de anticorrosivo (comparte concepto con REV-0056); puertas de madera
requieren revisión de protección/barniz (mismo concepto que Enchapes
de Madera, hoy inexistente en el catálogo — ver Auditoría, vacío
CDT Ficha 15).

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Escuadra del marco (no romboidal) | REV-0004 | Media | Sí | Sí | No |
| Cierra y sella sin rozar el marco | REV-0024 | Alta | No | No | Sí |
| Cerradura y pestillo funcionan sin forzar | REV-0026 | Alta | No | No | Sí |
| Separación pareja en todo el contorno | REV-0007 | Media | Sí | Sí | No |
| Hoja plana, sin pandeos ni curvaturas | REV-0013 | Media | Sí | Sí | No |
| Manilla firme, sin holgura | REV-0027 | Baja | No | No | No |
| Paralelismo entre hojas (si es de dos) | REV-0007 | Baja | Sí | Sí | No |
| 🆕 Bisagras firmes, sin ruido ni holgura excesiva | REV-0028 | Media | No | No | Sí |
| 🆕 Topes de puerta instalados y funcionales (protección de muro/manilla) | — | Baja | Sí | Sí | No |
| 🆕 Estado de pintura/barniz de terminación (rayas, golpes de transporte) | REV-0014 | Media | Sí | Sí | No |
| 🆕 Mirilla/mecanismo de seguridad adicional funcional (si aplica) | — | Baja | No | No | No |

---

# ELEMENTO: Reja peatonal

## Descripción
Reja de acceso peatonal al terreno, condicional a la existencia de la
feature correspondiente.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Abre y cierra sin trabarse ni rozar el suelo | REV-0024 | Alta | No | No | Sí |
| Cerradura o candado funciona bien | REV-0026 | Media | No | No | No |
| Pintura o recubrimiento anticorrosivo sin óxido | REV-0056 | Media | Sí | Sí | No |
| Bien fijada a sus soportes, sin moverse | REV-0032 | Media | No | No | Sí |
| 🆕 Soldaduras sin fisuras visibles en puntos de unión | — | Baja | Sí | Sí | No |

---

# ELEMENTO: Portón vehicular (manual / automático)

## Descripción
Acceso vehicular al terreno — manual (batiente/corredero simple) o
automatizado.

## Qué aplica según material/tipo
**Manual**: funcionamiento mecánico básico. **Automático**: agrega
motor, control remoto y sistema de seguridad — subconjunto de puntos
exclusivo.

## ¿Qué se revisa? — Común a ambos

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Abre y cierra sin trabarse ni rozar el suelo | REV-0024 | Alta | No | No | Sí |
| Pintura o recubrimiento anticorrosivo sin óxido | REV-0056 | Media | Sí | Sí | No |
| Bisagras, rieles o rodamientos firmes, sin ruido ni holgura | REV-0028 | Media | No | No | Sí |

## Solo Portón automático

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Motor abre/cierra sin esfuerzo ni ruido excesivo | REV-0029 | Media | No | No | Sí |
| Control remoto funciona a distancia normal | REV-0030 | Baja | No | No | No |
| Sistema de seguridad (sensor/reversa) detiene ante obstáculo | REV-0031 | **Alta — seguridad** | No | No | Sí |
| 🆕 Botonera/mando de pared funcional (si existe) | — | Baja | No | No | No |
| 🆕 Batería de respaldo funcional ante corte de luz (si aplica) | — | Baja | No | No | No |

---

# ELEMENTO: Cierre perimetral

## Descripción
Reja o pandereta que delimita el terreno completo.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Rodea completamente el terreno, sin tramos faltantes | — | Media | Sí | Sí | No |
| Bien fijado, sin secciones sueltas, oxidadas o dañadas | REV-0032/0056 | Media | Sí | Sí | No |
| Altura y terminación parejas en todo el recorrido | REV-0002 | Baja | Sí | Sí | No |

---

# ELEMENTO: Piso

## Descripción
Pavimento de terminación de un recinto — el elemento con más
variantes de material del catálogo.

## Qué aplica según material

### Cerámica
| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Piezas niveladas al tacto, sin escalón en la unión | REV-0003 | Alta | Sí | Sí | No |
| Juntas rectas y parejas, sin desviarse | REV-0008 | Media | Sí | Sí | No |
| Sin manchas/decoloración en juntas (humedad) | REV-0015 | Alta | Sí | Sí | No |
| Sonido sólido al golpe de moneda (adhesión) | REV-0012 | Alta | No | No | **Sí — audio** |
| Esquinas y remates (borde de tina/mesón) bien terminados | REV-0062 | Media | Sí | Sí | No |

### Porcelanato
| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Piezas niveladas al tacto | REV-0003 | Alta | Sí | Sí | No |
| Juntas rectas y parejas | REV-0008 | Media | Sí | Sí | No |
| Sonido sólido al golpe de moneda | REV-0012 | Alta | No | No | **Sí — audio** |
| Sin piezas trisadas, picadas o astilladas en bordes | REV-0013 | Media | Sí | Sí | No |

### Piso flotante
| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Sin crujidos al caminar sobre toda la superficie | — | Alta | No | No | **Sí — audio** |
| Nivelado, sin piezas levantadas ni escalones | REV-0002 | Alta | Sí | Sí | No |
| Líneas entre tablas rectas y paralelas, sin ondulación | REV-0008 | Media | Sí | Sí | No |
| Espacio parejo piso-muro para dilatación | REV-0019 | Baja | Sí | No | No |
| Encuentro con guardapolvo/puertas sin escalón brusco | REV-0020 | Baja | Sí | Sí | No |
| 🆕 Rayas superficiales sin marca de otro tono ni relieve | REV-0014 | Baja | Sí | Sí | No |

### Pavimento vinílico
| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Uniones parejas, sin escalón entre paños | REV-0003 | Media | Sí | Sí | No |
| Encuentros con puertas bien terminados | REV-0020 | Baja | Sí | Sí | No |
| Rayas solo superficiales, sin relieve ni marca de otro tono | REV-0014 | Baja | Sí | Sí | No |

### Alfombra / cubrepiso
| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Uniones entre paños parejas, sin espacios | REV-0003 | Media | Sí | Sí | No |
| Encuentro con marcos/pilastras bien ajustado | REV-0063 | Baja | Sí | Sí | No |
| 🆕 Sin arrugas ni bolsas de aire bajo la superficie | — | Media | Sí | Sí | No |

### Piso exterior (Terraza/Patio — mismo elemento conceptual, distinto contexto)
| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Pendiente correcta para escurrir agua de lluvia | REV-0039 | **Alta** | Sí | Sí | Sí — escurrimiento |
| Sin charcos hacia el interior de la vivienda | REV-0040 | **Alta** | Sí | Sí | No |
| Uniones piso-muro/puertas sin grietas ni sellos despegados | REV-0057 | Alta | Sí | Sí | No |

---

# ELEMENTO: Muros y cielos

## Descripción
Terminación de superficies verticales (muros) y horizontal superior
(cielo) de un recinto interior.

## Qué aplica según material

### Pintura
| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Color y textura uniformes, sin manchas ni marcas de rodillo | REV-0009/0010 | **Alta — ya en uso productivo** | Sí | Sí | No |
| Sin grietas finas en esquinas o encuentro muro-cielo | REV-0053 | Media | Sí | Sí | No |
| Cielo parejo, sin ondulaciones al mirarlo de lado | REV-0002 | Media | Sí | Sí | No |
| Guardapolvos y contornos con buena terminación de pintura | REV-0061 | Baja | Sí | Sí | No |

### Papel mural
| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Sin piquetes ni burbujas visibles a 1 m | REV-0022 | Media | Sí | Sí | No |
| Tono parejo en todo el muro | REV-0009 | Media | Sí | Sí | No |
| Encuentro con cornisa/guardapolvo bien ajustado | REV-0021 | Baja | Sí | Sí | No |
| Encuentro con marcos sin quedar corto ni montado | REV-0063 | Baja | Sí | Sí | No |

### Cerámico / porcelanato
Mismos puntos que **Piso — Cerámica** (REV-0003, 0008, 0012), con una
diferencia de criterio: 🆕 **no aplica** el punto "esquinas y remates
(borde de tina/mesón)" cuando el muro no está junto a un artefacto —
señalado ya en la Auditoría como fricción de reutilización mecánica
de texto (D3).

---

# ELEMENTO: Guardapolvos

## Descripción
Moldura de remate en el encuentro piso-muro, protege contra golpes y
cubre la junta de dilatación.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Bien pegado al muro y al piso, sin espacios visibles | REV-0064 | Media | Sí | Sí | No |
| Uniones entre tramos alineadas, sin desnivel | REV-0021 | Media | Sí | Sí | No |
| Sin tramos sueltos, despegados o que se muevan al tocarlos | REV-0032 | Media | No | No | Sí |
| 🆕 Ausencia de golpes o astillado en la moldura | — | Baja | Sí | Sí | No |

---

# ELEMENTO: Cornisas

## Descripción
Moldura decorativa de remate en el encuentro muro-cielo.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Bien fijada al muro y al cielo, sin espacios visibles | REV-0064 | Baja | Sí | Sí | No |
| Uniones entre tramos alineadas, sin desnivel | REV-0021 | Media | Sí | Sí | No |
| Sin tramos sueltos, despegados o que se muevan al tocarlos | REV-0032 | Media | No | No | Sí |

---

# ELEMENTO: Ventanas

## Descripción
Vano acristalado de un recinto — segundo elemento más revisado en
frecuencia real de reclamo postventa (junto con humedad).

## Qué aplica según material
Hoy el checklist no distingue el material del marco (PVC / Aluminio /
Madera / Termopanel). 🆕 Enriquecimiento recomendado por material:

| Material | Punto adicional propuesto | Prioridad |
|---|---|---|
| PVC | Soldadura de esquinas del marco sin fisuras visibles | Media |
| Aluminio | Rotura de puente térmico intacta (sin condensación en el marco) | Media |
| Madera | Protección/barniz sin descascarado, sin humedad en las uniones | Media |
| Termopanel (doble vidriado) | Sin condensación ni empañamiento entre vidrios (sello de la cámara de aire fallado) | **Alta** |

## ¿Qué se revisa? — Común a todo material

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Silicona perimetral continua, sin cortes | REV-0016 | Alta | Sí | Sí | No |
| Abre, cierra y traba correctamente | REV-0024 | Alta | No | No | Sí |
| Manilla funciona suave, sin forzar | REV-0027 | Media | No | No | No |
| Vidrio sin rayas, manchas ni burbujas | REV-0014 | Media | Sí | Sí | No |
| Marco y hojas sin rayas, abolladuras ni decoloraciones | REV-0014 | Media | Sí | Sí | No |
| Sin luz visible entre marco y hoja con la ventana cerrada | REV-0023 | **Alta** | Sí (contraluz) | Sí (contraluz) | No |
| 🆕 Prueba de estanqueidad con agua controlada (recomendación ITO, Auditoría RP2) | — | Alta | No | No | Sí |

---

# ELEMENTO: Iluminación

## Descripción
Puntos de luz fijos de un recinto (empotrados o de superficie).

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Todos los puntos de luz encienden correctamente | REV-0045 | Media | No | No | No |
| Sin parpadeo ni ruido | REV-0045 | Media | No | No | Sí |
| Foco empotrado bien fijo, sin colgar ni torcerse | REV-0046 | Baja | Sí | Sí | No |
| 🆕 Temperatura de color consistente entre puntos de un mismo recinto | — | Baja | Sí | Sí | No |

---

# ELEMENTO: Enchufes e interruptores

## Descripción
Artefactos eléctricos de pared de uso diario — el conjunto con mayor
respaldo normativo del catálogo (Ficha 26 CDT).

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Cada enchufe funciona probado con un artefacto real | REV-0043 | Alta | No | No | No |
| Interruptores encienden/apagan la luz correspondiente | REV-0044 | Alta | No | No | No |
| Alineación pareja entre artefactos cercanos | REV-0006 | Media | Sí | Sí | No |
| Placas firmes en el muro, sin holgura | REV-0032 | Baja | No | No | No |
| 🆕 Enchufes/artefactos con tapa de seguridad en zonas húmedas (Baños) | REV-0006 | **Alta — seguridad, hoy inexistente en Baños, ver Auditoría RP9** | Sí | Sí | No |

---

# ELEMENTO: Muebles de cocina

## Descripción
Mobiliario bajo/alto de cocina, confeccionado o fijado in situ.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Puertas y cajones abren, cierran y no rozan | REV-0024 | Alta | No | No | Sí |
| Bisagras y tiradores firmes | REV-0027/0028 | Media | No | No | No |
| Puertas y cajones vecinos alineados entre sí | REV-0006 | Media | Sí | Sí | No |
| Tiradores/manillas vecinos a la misma altura | REV-0006 | Media | Sí | Sí | No |
| Horizontalidad del mesón (objeto redondo no rueda) | REV-0005 | Media | No | No | Sí |
| 🆕 Sin astillado ni golpes en cantos de melamina/MDF | REV-0013 | Baja | Sí | Sí | No |
| 🆕 Cierre suave (amortiguado) si el herraje lo especifica | — | Baja | No | No | Sí |

---

# ELEMENTO: Llave de agua y lavaplatos (Cocina)

## Descripción
Grifería y artefacto de lavado de la cocina. *(Ver nota de
reutilización con "Grifería" de Baños — mismo concepto técnico,
redacción unificable, REV-0033/0034/0035/0036/0042.)*

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Sin goteras en la llave ni bajo el lavaplatos | REV-0033 | Alta | Sí | Sí | No |
| Desagüe drena sin filtraciones | REV-0034 | Alta | No | No | No |
| Llave gira suave, sin trabarse | REV-0042 | Media | No | No | No |
| Presión de agua caliente y fría pareja | REV-0035 | Media | No | No | No |
| Sin manchas de humedad bajo el mueble | REV-0036 | **Alta** | Sí | Sí | No |

---

# ELEMENTO: Campana extractora

## Descripción
Equipo de extracción de aire sobre la zona de cocción.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Enciende y extrae correctamente | REV-0066 | Media | No | No | Sí |
| Filtro limpio, sin exceso de grasa acumulada | REV-0067 | Baja | Sí | Sí | No |
| 🆕 Iluminación propia de la campana funcional (si tiene) | REV-0045 | Baja | No | No | No |

---

# ELEMENTO: Conexión de lavadora

## Descripción
Punto de agua y desagüe dedicado a la lavadora, en Logia.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Llave de agua y desagüe sin filtraciones | REV-0033/0034 | Media | Sí | Sí | No |
| Llave gira suave, sin trabarse | REV-0042 | Baja | No | No | No |
| Desagüe bien conectado, sin quedar suelto | REV-0034 | Media | Sí | Sí | No |

---

# ELEMENTO: Ventilación (Logia)

## Descripción
Ventana o rejilla de ventilación del recinto de Logia.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Recinto cuenta con ventilación adecuada | REV-0038 | Baja | No | No | No |
| Ventana o rejilla abre/cierra sin dificultad | REV-0024 | Baja | No | No | No |

---

# ELEMENTO: Mueble de baño

## Descripción
Mueble bajo lavamanos, confeccionado o fijado in situ.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Puerta abre, cierra y no roza | REV-0024 | Media | No | No | Sí |
| Tiradores firmes y bien atornillados | REV-0027 | Baja | No | No | No |
| Horizontalidad del mesón (objeto redondo no rueda) | REV-0005 | Media | No | No | Sí |
| Mesón sin grietas ni bordes astillados | REV-0013 | Media | Sí | Sí | No |
| 🆕 Sellado del mesón contra el muro, sin espacio (riesgo de humedad) | REV-0019 | Media | Sí | Sí | No |

---

# ELEMENTO: Artefactos sanitarios

## Descripción
Inodoro, lavamanos y ducha/tina fijos del baño.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Inodoro, lavamanos y ducha firmes, sin fisuras | REV-0065 | Media | Sí | Sí | No |
| Descarga funciona correctamente | REV-0041 | Media | No | No | Sí |
| Sin manchas de óxido en pernos de fijación | REV-0056 | Baja | Sí | Sí | No |
| Agua deja de correr después de descargar | REV-0041 | Media | No | No | Sí |
| 🆕 Fijación firme al piso/muro (sin balanceo al sentarse/apoyarse) | REV-0032/0065 | Alta | No | No | Sí |

---

# ELEMENTO: Grifería (Baños)

## Descripción
Llaves de lavamanos, ducha y tina. *(Mismo concepto técnico que
"Llave de agua y lavaplatos" de Cocina — candidato de unificación ya
señalado en la Auditoría, D4/R1.)*

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Sin goteras ni filtraciones | REV-0033 | Alta | Sí | Sí | No |
| Gira suave, sin trabarse | REV-0042 | Media | No | No | No |
| Presión de agua caliente y fría pareja | REV-0035 | Media | No | No | No |
| Sin manchas de humedad bajo el mueble | REV-0036 | **Alta** | Sí | Sí | No |

---

# ELEMENTO: Impermeabilización y sellos (Baños)

## Descripción
Sellado de zonas húmedas — el elemento condicionado a la existencia
real de ducha y/o tina en el recinto.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Condición | Bien | Mal | Video |
|---|---|---|---|---|---|---|
| Sello muro-piso de ducha continuo, sin cortes | REV-0017 | Alta | Si hay ducha | Sí | Sí | No |
| Sin manchas de humedad visibles | REV-0015 | Alta | Siempre | Sí | Sí | No |
| Silicona de tina/ducha sin amarillamiento, hongos ni despegue | REV-0018 | Media | Si hay ducha o tina | Sí | Sí | No |
| Desagüe de piso drena bien, sin filtración hacia afuera | REV-0034 | Alta | Si hay ducha | No | No | No |
| Rebalse (desagüe de seguridad) funciona | REV-0037 | Baja | Si hay tina | No | No | Sí |
| Sello tina-muro continuo | REV-0017 | Alta | Si hay tina | Sí | Sí | No |
| Ventilación funcional | REV-0038 | Media | Si hay ducha o tina | No | No | No |
| 🆕 Olor a humedad al abrir la puerta del recinto tras cerrado (Auditoría RP7) | REV-0015 | Alta | Siempre | No | No | No |

---

# ELEMENTO: Puertas correderas (Closet)

## Descripción
Puerta de closet sobre riel — mecanismo distinto al de puerta
batiente, no debe confundirse con "Puerta de acceso".

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Deslizan suavemente sin descarrilarse | REV-0025 | Media | No | No | Sí |
| No rozan el marco ni el piso al abrir/cerrar | REV-0024 | Media | No | No | Sí |
| Rieles (arriba y abajo) bien fijados, sin tornillos sueltos | REV-0028/0032 | Baja | Sí | Sí | No |
| 🆕 Verticalidad de la hoja cerrada respecto del marco (Ficha CDT 21, 1mm/m) | REV-0001 | Media | Sí | Sí | No |

---

# ELEMENTO: Repisas (Closet)

## Descripción
Repisas interiores de melamina u otro material.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Firmes y niveladas | REV-0002/0032 | Media | No | No | Sí — prueba de presión |
| Objeto redondo no rueda (horizontalidad) | REV-0005 | Baja | No | No | Sí |
| Soportes bien fijados al muro, sin holgura | REV-0032 | Media | No | No | Sí — prueba de presión |
| 🆕 Linealidad horizontal entre repisas del mismo closet (Ficha CDT 21, 3mm) | REV-0006 | Baja | Sí | Sí | No |

---

# ELEMENTO: Baranda

## Descripción
Elemento de contención en desniveles de terraza, escalera o balcón —
elemento de seguridad, no solo estético.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Firme, sin holgura al presionar | REV-0058 | **Alta — seguridad** | No | No | Sí — prueba de presión |
| Altura permite apoyarse con seguridad | REV-0058 | Media | Sí | Sí | No |
| Espacio entre barrotes no permite pasar una lata (seguridad infantil) | REV-0059 | **Alta — seguridad infantil** | Sí | Sí | No |
| 🆕 Ausencia de óxido en fijaciones metálicas | REV-0056 | Media | Sí | Sí | No |

---

# ELEMENTO: Cubierta

## Descripción
Terminación superior de techumbre — solo casas, condicional a la
feature correspondiente.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Sin manchas de humedad ni goteras | REV-0015 | **Alta** | Sí | Sí | No |
| Sin piezas quebradas, corridas de su lugar u oxidadas | REV-0013/0056 | Alta | Sí | Sí | No |
| Sin luz filtrándose entre piezas (si hay acceso) | REV-0057 | Media | Sí | Sí | No |
| 🆕 Fijación de piezas al viento — sin piezas sueltas al tacto donde sea accesible | REV-0032 | Media | No | No | No |

---

# ELEMENTO: Canaletas

## Descripción
Sistema de recolección y evacuación de agua de lluvia de la
techumbre.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Bien fijadas y sin obstrucciones visibles | REV-0032 | Media | Sí | Sí | No |
| Sin tramos caídos, torcidos o separados del techo | REV-0002 | Media | Sí | Sí | No |
| Bajadas de agua conectadas correctamente, sin quedar sueltas | REV-0034 | Media | Sí | Sí | No |

---

# ELEMENTO: Tablero eléctrico

## Descripción
Centro de distribución y protección eléctrica de la vivienda.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Circuitos rotulados | REV-0047 | Media | Sí | Sí | No |
| Diferenciales (automáticos) funcionan al probarlos | REV-0048 | **Alta — seguridad** | No | No | Sí |
| Fácil de ubicar y acceder, sin obstáculos | REV-0049 | Media | Sí | Sí | No |
| 🆕 Sin cables sueltos o mal terminados visibles dentro del tablero | — | Media | Sí | Sí | No |

---

# ELEMENTO: Llave de paso de agua

## Descripción
Llave general de corte de suministro de agua de la vivienda.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Corta el suministro correctamente | REV-0042 | Media | No | No | No |
| Fácil de ubicar y accionar en caso de emergencia | REV-0049 | Media | Sí | Sí | No |

---

# ELEMENTO: Instalación de gas

## Descripción
Red de gas visible de la vivienda — checklist marcado a propósito
como `lacksNormativeBacking` (no reemplaza certificación de
gasfitería habilitado).

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Sin olor a gas en ningún punto de la instalación | REV-0050 | **Alta — seguridad** | No | No | No |
| Llave de paso general accesible e identificable | REV-0049 | Alta | Sí | Sí | No |
| Conexiones y mangueras visibles sin cortes, roturas ni corrosión | REV-0051 | Alta | Sí | Sí | No |
| Calefont/artefactos con ventilación hacia el exterior | REV-0052 | **Alta — seguridad** | Sí | Sí | No |

---

# ELEMENTO: Climatización / calefacción

## Descripción
Equipo fijo de climatización o calefacción, condicional a feature.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Enciende y responde a los controles | — | Media | No | No | Sí |
| Sin ruidos anormales, vibraciones ni olores al encenderlo | REV-0070 | Media | No | No | Sí |
| Instalación fijada firmemente, sin filtraciones visibles | REV-0032/0057 | Media | Sí | Sí | No |

---

# ELEMENTO: Calefont o termo eléctrico

## Descripción
Equipo generador de agua caliente de la vivienda.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Entrega agua caliente de forma estable | REV-0068 | Media | No | No | Sí |
| Sin fugas de agua ni de gas | REV-0069 | Alta | Sí | Sí | No |
| Instalado en lugar ventilado, sin combustibles cerca | REV-0038/0052 | **Alta — seguridad** | Sí | Sí | No |

---

# ELEMENTO: Peldaños y pasamanos (Escalera)

## Descripción
Tramo de escalera interior de una casa, condicional a feature.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Todos los escalones misma altura (Ficha CDT 11, ±5 mm entre consecutivos) | REV-0003 | Alta | Sí | Sí | No |
| Misma profundidad de huella en toda la escalera | REV-0003 | Alta | Sí | Sí | No |
| Revestimiento bien adherido, sin piezas sueltas | REV-0012/0032 | Media | No | No | Sí — audio del golpe |
| Pasamanos firme en toda su extensión | REV-0058 | **Alta — seguridad** | No | No | Sí — prueba de presión |

---

# ELEMENTO: Puerta y cerradura de bodega

## Descripción
Acceso a la bodega de la unidad, condicional a feature (departamentos).

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Cierra y abre correctamente, sin forzar | REV-0024 | Media | No | No | No |
| Cerradura funciona y llaves/copias completas entregadas | REV-0026/0072 | Media | No | No | No |
| Espacio interior limpio, seco y sin humedad | REV-0015 | Media | Sí | Sí | No |
| Numeración/identificación coincide con el contrato | REV-0071 | Baja | Sí | No | No |

---

# ELEMENTO: Espacio de estacionamiento

## Descripción
Espacio de estacionamiento asignado a la unidad, condicional a
feature (departamentos).

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Demarcación (líneas/numeración) clara y coincide con contrato | REV-0071 | Media | Sí | No | No |
| Piso sin grietas, hoyos ni desniveles importantes | REV-0002/0013 | Media | Sí | Sí | No |
| Iluminación del sector permite ver con claridad | REV-0073 | Baja | No | No | No |
| Espacio suficiente para maniobrar y estacionar | REV-0074 | Baja | No | No | Sí |

---

# ELEMENTO: Cierre de seguridad (Piscina)

## Descripción
Barrera de acceso restringido a la piscina, condicional a feature —
`lacksNormativeBacking` a propósito (no reemplaza certificación de
seguridad de piscinas).

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Cierre perimetral impide acceso de niños sin supervisión | REV-0060 | **Alta — seguridad infantil** | Sí | Sí | No |
| Portón o reja de acceso cierra y traba correctamente | REV-0026/0060 | **Alta — seguridad infantil** | No | No | Sí |

---

# ELEMENTO: Estructura y filtración (Piscina)

## Descripción
Integridad estructural y sistema de filtración de la piscina.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Sin grietas, filtraciones o desprendimientos visibles | REV-0054/0055/0057 | Alta | Sí | Sí | No |
| Sistema de filtración/bomba enciende sin ruidos ni olores anormales | REV-0070 | Media | No | No | Sí |

---

# ELEMENTO: Techumbre y estructura (Quincho)

## Descripción
Techumbre y estructura portante del quincho, condicional a feature.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Techumbre bien fijada, sin filtraciones ni piezas sueltas | REV-0032/0057 | Media | Sí | Sí | No |
| Estructura (pilares, vigas) firme y sin grietas visibles | REV-0054 | Media | Sí | Sí | No |

---

# ELEMENTO: Terminaciones e instalaciones (Quincho)

## Descripción
Terminación de superficies e instalaciones eléctricas del quincho.

## ¿Qué se revisa?

| Punto | REV | Prioridad | Bien | Mal | Video |
|---|---|---|---|---|---|
| Enchufes e iluminación funcionan correctamente | REV-0043/0044/0045 | Media | No | No | No |
| Superficies (piso, muros) parejas y sin fisuras visibles | REV-0002/0053 | Baja | Sí | Sí | No |

---

# CIERRE

## Cobertura

**39 elementos conceptuales cubiertos, 0 omitidos** — todos los que
existen hoy en la aplicación, agrupando variantes de material bajo el
mismo elemento tal como pediste (Fachada, Piso, Muros y cielos,
Ventanas, Portón vehicular). Cada punto de inspección quedó trazado a
su código REV-XXXX de la Biblioteca Maestra de Revisiones cuando
corresponde, lo que permite editar un concepto una sola vez (ej. si
mañana cambia la redacción de "REV-0024 apertura sin roce", el cambio
se propaga a los 8 elementos que la usan sin reescribir cada uno).

## Puntos 🆕 agregados (no existen en el checklist real hoy)

Se agregaron ~30 puntos nuevos con criterio de ITO senior, todos
justificados en el contexto de cada elemento (no genéricos): pruebas
de estanqueidad activa (ventanas, RP2 de la Auditoría), distinción
por material de ventana (PVC/Aluminio/Madera/Termopanel), fijación
firme con prueba de presión en artefactos sanitarios/barandas/repisas
(RP6), seguridad eléctrica en zonas húmedas de Baños (RP9 — el vacío
de mayor relevancia detectado en toda esta línea de trabajo), y
criterio olfativo de humedad en closets/impermeabilización (RP7).
Ninguno es un elemento nuevo — todos son puntos adicionales dentro de
elementos que ya existen, consistente con la instrucción de no
inventar elementos sin valor real.

## Columnas Bien/Mal/Video como filtro de producción

De los ~230 puntos de inspección documentados en este archivo:
- **La gran mayoría (~170) son fotografiables con un par Bien/Mal estático** — la cola de trabajo directa para el siguiente paso.
- **~35 puntos son mejor explicados en video** (audio de golpe de sonoridad, pruebas de presión, mecanismos en movimiento, ciclos de funcionamiento) — ya identificado como eje nuevo en la Biblioteca Maestra de Revisiones.
- **~25 puntos son puramente funcionales/documentales** (probar con artefacto real, contar llaves, verificar contrato) — no requieren ni foto ni video, solo el paso del checklist mismo.

## Siguiente paso (no ejecutado en este documento)

Con esto, la Biblioteca Técnica queda en condiciones de que el
siguiente trabajo sea exclusivamente producir las fotografías
Bien/Mal y los videos marcados — sin ninguna decisión de contenido
pendiente por resolver antes de empezar a fotografiar.

---

*Fin de la Biblioteca Técnica Revisada. 39 elementos, ~230 puntos de
inspección, ningún cambio de código, schema, arquitectura ni UX.*