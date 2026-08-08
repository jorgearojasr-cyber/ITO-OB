# ObraBien — Índice Definitivo de la Biblioteca Técnica

## Alcance

Documento puramente editorial. **No se implementó código, no se
tocó Prisma, no se modificó UX-03, no se cambió ningún componente ni
el flujo de inspección.** Este documento define cómo debería
organizarse el **índice de navegación** de la Biblioteca Técnica —
la sección que el usuario recorre por sí mismo para aprender, antes o
durante una inspección — separándolo por completo de cómo se organiza
el **recorrido guiado** de una inspección (que sigue siendo por
recinto, sin cambios, es un problema distinto).

**Prueba aplicada a cada elemento**: *"Si una persona compró una
vivienda nueva o contrató un maestro para una remodelación, ¿esperaría
encontrar este elemento dentro de una biblioteca de inspección?"* —
todo lo que sigue pasó esa prueba; lo que no la pasó se documenta en
la sección de eliminados, con la razón concreta.

---

# 1. ÍNDICE DEFINITIVO

23 elementos constructivos, cada uno con sus materiales/tipos como
segundo nivel — la profundidad exacta que pediste, ni más ni menos.
Los encabezados de grupo (FACHADA Y EXTERIOR, INTERIORES, etc.) son
solo un ordenamiento editorial de este documento para que se lea
mejor — **el índice real es la lista plana de 23 elementos**, no
tres niveles de navegación (eso sería una decisión de UX, fuera de
alcance de este documento).

## FACHADA Y EXTERIOR

**1. Fachadas**
- Pintura lisa
- Marmolina
- Graniplast
- Revestimiento texturado
- Fibrocemento (Siding)
- SmartPanel
- EIFS
- Piedra
- Enchapes
- Madera
- Hormigón visto
- Estuco visto
- Ladrillo a la vista

**2. Rejas y Portones**
- Reja peatonal
- Portón vehicular manual
- Portón vehicular automático
- Cierre perimetral

**3. Pavimentos Exteriores**
- Hormigón (terraza/patio)
- Adoquín
- Piedra
- Deck de madera / composite

**4. Barandas**
- Metálica
- Vidrio templado
- Madera

**5. Techumbre y Cubiertas**
- Teja de arcilla
- Teja asfáltica
- Plancha metálica (zinc / acero prepintado)
- Fibrocemento / pizarreño

**6. Canaletas**
- PVC
- Zinc
- Aluminio

**7. Áreas Verdes**
- Jardín / paisajismo entregado
- Riego automático

**8. Piscinas**
- Estructura y revestimiento
- Sistema de filtración
- Cierre de seguridad

**9. Quinchos**
- Techumbre y estructura
- Terminaciones e instalaciones

## INTERIORES — ESTRUCTURA Y REVESTIMIENTOS

**10. Muros y Cielos**
- Pintura
- Papel mural
- Cerámico / Porcelanato
- Enlucido de yeso

**11. Pisos**
- Cerámica
- Porcelanato
- Piso flotante
- Vinílico
- Alfombra / cubrepiso
- Hormigón (radier a la vista)
- Madera (parquet/maciza) — 🆕 recomendado, ver sección 7

**12. Molduras y Remates**
- Guardapolvo (madera, MDF, PVC, cerámico)
- Cornisa (yeso, poliestireno, madera)
- Junquillo

## PUERTAS Y VENTANAS

**13. Puertas**
- Madera maciza
- Madera enchapada
- Metálica
- PVC / Aluminio (vidriada)

**14. Ventanas**
- PVC
- Aluminio
- Madera
- *(vidrio: simple / termopanel / laminado — ver nota en sección 2)*

## MOBILIARIO FIJO

**15. Closets**
- Puertas correderas
- Puertas abatibles / plegables
- Repisas

**16. Muebles**
- Melamina
- MDF lacado
- Madera maciza
- Cubierta: cuarzo
- Cubierta: granito
- Cubierta: acero inoxidable

## INSTALACIONES

**17. Instalación Eléctrica**
- Enchufes
- Interruptores
- Tablero eléctrico

**18. Iluminación**
- Empotrada
- Sobrepuesta
- Exterior

**19. Instalación Sanitaria y de Gas**
- Red de agua potable / llave de paso
- Red de gas
- Desagües y alcantarillado

**20. Grifería**
- Cocina
- Lavamanos
- Ducha / tina

**21. Artefactos Sanitarios**
- Inodoro
- Lavamanos
- Tina
- Ducha / receptáculo

**22. Equipos y Artefactos del Hogar**
- Calefont / termo eléctrico
- Campana extractora
- Climatización / calefacción

## ESTRUCTURA VERTICAL

**23. Escaleras**
- Hormigón revestido
- Madera
- Metálica

---

# 2. JUSTIFICACIÓN DE LOS CAMBIOS

## El problema de fondo que se corrige

La Biblioteca Técnica actual (`LibraryCategory`, 24 categorías) está
organizada por una mezcla inconsistente de **elemento** (Ventanas,
Puertas, Muebles) y **material** (Porcelanatos, Cerámicas, Pavimentos
Vinílicos, Alfombras y Cubrepisos son, los cuatro, materiales de
**un mismo elemento constructivo: Pisos**). Eso es exactamente lo que
generaba la fricción ya detectada en la Auditoría Maestra (D3): el
mismo contenido de "Cerámica" aparece disociado según si el usuario
llegó buscando por Piso o por Muro, en vez de vivir en un solo lugar
con dos puntos de entrada. Este índice resuelve eso estructuralmente:
**el elemento es siempre el nivel 1; el material es siempre el nivel
2** — nunca al revés.

## Por qué no se organiza por recinto (ni se toca el recorrido)

El recorrido guiado de la inspección seguirá por recinto — no se
propone ni se implica cambiarlo, es una decisión de experiencia ya
resuelta y fuera de este alcance. Lo único que cambia es **cómo se
organiza el conocimiento cuando el usuario lo busca por sí mismo**:
nadie busca en una biblioteca "¿cómo inspecciono mi Dormitorio 2?" —
busca "¿cómo inspecciono un piso flotante?", sin importar en qué
recinto esté.

## Por qué "Pinturas" deja de ser un elemento propio

Es el cambio de mayor impacto de este documento. Hoy "Pinturas" es
una categoría independiente con 2 artículos (interior/exterior) — el
contenido de mejor calidad de todo el sistema. Pero la pintura **no
es un elemento constructivo**, es un **material de terminación** que
se aplica sobre otros dos elementos reales: Fachada (exterior) y
Muros y Cielos (interior). Convertirla en top-level obligaba a elegir
entre duplicar su contenido en Fachada y en Muros, o dejarla aislada
sin conexión clara a ninguno de los dos — exactamente el problema que
ya generó el bug de UX-02 P0 (Fachada mostrando ejemplos de pintura
interior). Este índice la resuelve como material de ambos elementos,
compartiendo un único cuerpo de contenido (la Biblioteca Maestra de
Revisiones ya deja esto preparado: REV-0009/0010 se citan una vez y
se referencian desde los dos lugares).

## Por qué "Ventanas" no incluye Termopanel como material al mismo nivel que PVC/Aluminio/Madera

Se detectó una inconsistencia de eje en el propio ejemplo de la
solicitud: PVC/Aluminio/Madera son materiales del **marco**;
Termopanel es un atributo del **vidrio** (doble vidriado con cámara
de aire) — un marco de PVC puede tener o no tener termopanel, no son
alternativas excluyentes entre sí. Se mantienen los 3 materiales de
marco como segundo nivel, y "tipo de vidrio" queda como un atributo
transversal documentado dentro del contenido de cada material, no
como un cuarto material — evita que el índice sugiera una elección
que en la realidad no es así.

---

# 3. ELEMENTOS AGREGADOS

| Elemento agregado | Por qué pasa la prueba del homeowner |
|---|---|
| **Instalación Sanitaria y de Gas** (unificado) | Hoy existe contenido de agua y de gas por separado sin un lugar único; cualquier propietario busca "instalación sanitaria" como un solo concepto de "por dónde corre el agua y el gas de mi casa". |
| **Equipos y Artefactos del Hogar** | Calefont, campana extractora y climatización hoy no tienen ningún lugar propio en la biblioteca (viven solo como checklist). Un propietario claramente esperaría encontrar "cómo revisar mi calefont" en una biblioteca de inspección. |
| **Áreas Verdes** | Presente en tu lista de ejemplo; hoy no existe ningún contenido — se agrega como elemento de prioridad baja/contenido pendiente (ver sección 7), no como trabajo ya resuelto. |
| **Pavimentos Exteriores** | Ya existe como elemento de inspección (`piso-exterior` de Terraza/Patio) pero no tiene entrada propia en la biblioteca — se separa de "Pisos" porque la técnica y tolerancia (pendiente, drenaje) es genuinamente distinta a un piso interior, no una variante de material. |
| **Madera** como material de Pisos | Parquet/piso de madera maciza es real en el segmento 2.000-3.500 UF (especialmente casas) y hoy no existe como variante — se marca 🆕 como recomendación de contenido, no como elemento estructural nuevo. |

---

# 4. ELEMENTOS ELIMINADOS

| Elemento eliminado (de la categorización actual o de tu lista de ejemplo) | Razón |
|---|---|
| **Sanitarios** (como categoría separada de "Artefactos Sanitarios") | Es el mismo elemento con dos nombres distintos en el sistema actual — se unifica bajo un solo nombre. |
| **Siliconas** | No es un elemento constructivo — es una técnica/material transversal que aparece en Ventanas, Artefactos Sanitarios y Muebles (sello perimetral). Nadie busca "Siliconas" como destino de biblioteca; busca "cómo sellar mi ventana" o "por qué mi ducha filtra". Se distribuye como contenido dentro de esos tres elementos. |
| **Impermeabilizaciones** | Mismo caso que Siliconas — es una técnica transversal (Baños, Pavimentos Exteriores, Techumbre), no un elemento constructivo propio. |
| **Cubrejuntas** | Ficha CDT real, pero es un accesorio de encuentro entre dos pisos distintos, no un elemento que un propietario buscaría por sí solo — se documenta como contenido dentro de Pisos. |
| **Pilastras** | Mismo caso — es una moldura de marco de puerta, se documenta dentro de Puertas, no como entrada propia. |
| **Bodega** | No es un elemento constructivo — es una verificación de conformidad contractual (numeración, llaves). No hay ninguna "técnica de inspección de bodega" que enseñar; sigue existiendo en el checklist de inspección, pero no necesita artículo de biblioteca. |
| **Estacionamiento** | Mismo caso que Bodega — conformidad contractual, no elemento constructivo. |
| **Conexión de lavadora** / **Ventilación (Logia)** | Demasiado específicos para ser entradas propias — se absorben como contenido dentro de Instalación Sanitaria (la conexión de agua) y no requieren artículo propio (la ventilación de un recinto no es, por sí sola, un elemento constructivo enseñable). |

---

# 5. ELEMENTOS FUSIONADOS

| Fusión | Elementos de origen | Por qué |
|---|---|---|
| **Molduras y Remates** | Guardapolvos + Cornisas + Junquillos | Son, constructivamente, el mismo elemento (moldura perimetral de remate) aplicado en dos ubicaciones distintas (piso-muro vs. muro-cielo) con materiales casi idénticos. Mantenerlos separados obligaba a triplicar contenido casi idéntico (alineación de junta, desajuste, fijación) que la propia Biblioteca Maestra de Revisiones ya fusionó a nivel de concepto (REV-0021, REV-0064). |
| **Rejas y Portones** | Reja peatonal + Portón vehicular manual + Portón vehicular automático + Cierre perimetral | Mismo elemento constructivo (cierre metálico con mecanismo de apertura), variando en escala y automatización — no en técnica de inspección de fondo (anticorrosivo, fijación, bisagras son idénticos; la motorización es la única diferencia real, y queda como contenido adicional dentro del mismo elemento, no como elemento aparte). |
| **Techumbre y Cubiertas** | Cubierta + Techumbre (nombre de recinto) | "Techumbre" en el sistema actual es el nombre del *recinto*, no del elemento — el elemento real es "Cubierta". Se renombra al elemento real y se elimina la confusión recinto/elemento. Canaletas se mantiene como elemento propio porque es un oficio y una técnica de inspección genuinamente distinta (sistema de evacuación de agua, no terminación de techo). |
| **Muebles** | Muebles de cocina + Mueble de baño | Mismo elemento constructivo (mobiliario con puertas, cajones y mesón), hoy separado únicamente porque vive en dos recintos distintos — exactamente el patrón de fragmentación por recinto que este documento existe para corregir. |
| **Instalación Eléctrica** | Enchufes + Interruptores + Tablero eléctrico | Tres partes de un mismo sistema; hoy son 3 categorías de biblioteca separadas (Enchufes, Interruptores, Tableros eléctricos) que un propietario reconoce como una sola cosa: "la instalación eléctrica de mi casa". Iluminación se mantiene separada a propósito (ver más abajo). |

**Nota sobre por qué Iluminación no se fusionó también en Instalación
Eléctrica**: se evaluó fusionarla, pero se mantiene separada porque
la pregunta real del usuario es distinta — "¿mi instalación eléctrica
es segura?" (enchufes/interruptores/tablero) vs. "¿mi iluminación se
ve bien y funciona?" (estética + funcional, con su propia lógica de
temperatura de color y disposición). Fusionarla habría sido forzar
una unificación que no pasa la prueba del homeowner en un sentido
(nadie busca "iluminación" pensando en el tablero eléctrico).

---

# 6. MATERIALES POR ELEMENTO — resumen consolidado

*(Ya detallado completo en la Sección 1 — esta tabla es solo el
conteo, para dimensionar el trabajo de contenido de la siguiente
etapa.)*

| Elemento | N° de materiales/tipos |
|---|---|
| Fachadas | 13 |
| Muros y Cielos | 4 |
| Pisos | 7 (1 nuevo recomendado) |
| Puertas | 4 |
| Ventanas | 3 (+ atributo de vidrio) |
| Molduras y Remates | 3 |
| Closets | 3 (tipos) |
| Muebles | 6 |
| Techumbre y Cubiertas | 4 |
| Canaletas | 3 |
| Grifería | 3 (ubicaciones) |
| Artefactos Sanitarios | 4 (tipos) |
| Instalación Eléctrica | 3 |
| Iluminación | 3 |
| Instalación Sanitaria y de Gas | 3 |
| Equipos y Artefactos del Hogar | 3 |
| Pavimentos Exteriores | 4 |
| Rejas y Portones | 4 |
| Escaleras | 3 |
| Barandas | 3 |
| Áreas Verdes | 2 |
| Piscinas | 3 |
| Quinchos | 2 |
| **Total** | **23 elementos, ~92 combinaciones elemento×material** |

---

# 7. RECOMENDACIONES PARA LA SIGUIENTE ETAPA (imágenes Bien/Mal)

1. **Priorizar por profundidad de contenido ya existente, no por
   orden alfabético.** Fachadas, Pisos, Muros y Cielos, Puertas,
   Ventanas y Artefactos Sanitarios ya tienen la Biblioteca Maestra de
   Revisiones (REV-XXXX) y la Biblioteca Técnica Revisada completas —
   son los 6 elementos donde se puede empezar a fotografiar
   directamente, sin ningún trabajo de contenido previo pendiente.
2. **Los materiales marcados 🆕 en este índice** (Madera en Pisos,
   Áreas Verdes completo) necesitan una pasada de contenido
   (checklist + revisiones) **antes** de fotografiar — no tiene
   sentido producir imágenes para un material sin preguntas de
   checklist que las use.
3. **Molduras y Remates, Rejas y Portones, Muebles e Instalación
   Eléctrica** son fusiones de contenido ya existente — antes de
   fotografiar, conviene una pasada breve de unificación de
   redacción (ya identificada como Reutilización R1-R4 en la
   Auditoría Maestra) para no fotografiar dos veces el mismo concepto
   con nombres distintos.
4. **Los materiales que son técnicas transversales eliminadas como
   top-level** (Silicona, Impermeabilización) siguen necesitando
   imágenes — simplemente no como "portada" de biblioteca, sino como
   contenido incrustado dentro de Ventanas / Artefactos Sanitarios /
   Muebles / Pavimentos Exteriores / Techumbre. No se pierde ningún
   punto de inspección de las etapas anteriores, solo cambia dónde
   vive dentro del índice.
5. **Grifería y Artefactos Sanitarios siguen siendo los elementos con
   menor respaldo normativo de todo el sistema** (0 fichas CDT, ya
   documentado en la Auditoría) — su biblioteca visual dependerá 100%
   de criterio editorial propio, sin nada que transcribir de una
   fuente externa; conviene planificar más tiempo de redacción antes
   de fotografiar, no solo de producción fotográfica.

---

*Fin del Índice Definitivo. 23 elementos, ningún cambio de código,
schema, arquitectura, UX ni flujo de inspección — solo la
reorganización editorial del índice de la Biblioteca Técnica.*