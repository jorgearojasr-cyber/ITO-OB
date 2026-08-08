# ObraBien — Plan de Producción de la Biblioteca Visual

## Alcance

Documento puramente de planificación. **No se generó ninguna imagen, no
se modificó código, componentes, Prisma, navegación ni UX.** La
Biblioteca Técnica (23 elementos, 265 puntos de inspección) se
considera terminada y congelada — este documento no le agrega ni le
quita contenido, solo planifica cómo fotografiarla.

Objetivo del documento: dejar una **metodología repetible** para pasar
de "puntos de inspección" (lo que ya existe en
`inspection-points-data.ts`) a "sesiones fotográficas" (lo que hay que
salir a producir), y aplicarla en detalle a la primera familia
solicitada — **Fachadas → Pintura sobre estuco**.

---

# 1. Metodología (reutilizable para todo el resto de la Biblioteca)

Un punto de inspección no es una foto. Varios puntos de inspección
suelen resolverse **en la misma ubicación física, con el mismo
encuadre o con la misma condición de luz** — la unidad real de
producción no es el punto, es la **toma** (setup fotográfico: una
ubicación + un encuadre + una condición de luz, de la que pueden salir
1 o más pares Bien/Mal).

Para agrupar puntos en tomas se usan tres preguntas, en este orden:

1. **¿Misma ubicación física en el muro/elemento?** (ej. la esquina de
   una ventana resuelve a la vez "esquinas y contornos" y "sellos en
   marcos" — es el mismo lugar, solo cambia el zoom).
2. **¿Misma condición de luz?** Dos puntos en la misma ubicación pero
   que necesitan luz distinta (difusa vs. rasante) **no** se agrupan en
   la misma toma, aunque compartan ubicación — se agrupan en la misma
   **sesión** (mismo día, distinto momento u origen de luz) si es
   posible, o en sesiones separadas si no.
3. **¿El mismo par Bien/Mal enseña el concepto completo?** La mayoría
   de los puntos sí. Cuando un punto distingue entre dos tipos de
   defecto que un usuario podría confundir (ej. fisura capilar vs.
   estructural), el par Bien/Mal se extiende a un **trío** (1 Bien + 2
   Mal) en vez de forzarlo a dos fotos que no enseñan la distinción.

Encuadre estándar (se reutiliza en toda la Biblioteca, no solo acá):

| Encuadre | Distancia | Para qué sirve |
|---|---|---|
| **General** | ~4-5 m | Uniformidad de color/textura, visión de conjunto |
| **Medio** | ~1-1,5 m | Alineación, escuadra, terminación de un tramo o encuentro |
| **Primer plano** | ~20-40 cm | Defectos puntuales: fisuras, sellos, juntas, manchas |

Condición de luz estándar:

| Condición | Cuándo | Para qué sirve |
|---|---|---|
| **Luz de día difusa** | Mediodía, cielo cubierto o sombra | Uniformidad de color/textura, manchas, humedad |
| **Luz rasante (angulada)** | Temprano/tarde, o flash lateral portátil | Ondulaciones, planeidad, textura/grano — revela lo que la luz plana esconde |

**Fuente de las imágenes MAL**: no se pueden "fabricar" defectos a
pedido en una casa terminada. La recomendación de producción es un
**banco oportunista**: cada vez que un ITO encuentre en terreno (en
una inspección real) un defecto que calce con un punto de esta
Biblioteca, lo fotografía con el encuadre ya definido acá y lo etiqueta
con el código del punto — así el banco de imágenes MAL crece con el
uso normal de la app, en vez de depender de una sola sesión de
producción forzada. Las imágenes BIEN sí conviene producirlas en una
sesión dedicada, en una vivienda de referencia con terminación
impecable, para mantener consistencia de luz y encuadre en todo el par.

---

# 2. Ficha de producción — Fachadas / Pintura sobre estuco

9 puntos de inspección definidos hoy para esta familia
(`fachadas:pintura` en `inspection-points-data.ts`). De ellos, **8
aplican directamente a Pintura**; el noveno ("Uniformidad de grano")
está escrito para las variantes con relieve (Marmolina, Graniplast,
Revestimiento texturado) y **no aplica** a Pintura lisa — queda fuera
del plan de esta ficha y se retoma en la ficha de esas 3 variantes.

## 2.1 Puntos → Tomas

| # | Punto de inspección | Toma asignada | Encuadre | Imágenes |
|---|---|---|---|---|
| 1 | Color y textura uniformes | Toma A — General de fachada | General | Bien + Mal (2) |
| 2 | Plomo y regla | Toma B — Regla apoyada en el muro | Medio | Bien + Mal (2) |
| 3 | Fisuras de retracción | Toma C — Primer plano de fisuras | Primer plano | Bien + Mal-capilar (2) |
| 4 | Fisuras estructurales | Toma C — Primer plano de fisuras *(misma toma que #3)* | Primer plano | + Mal-estructural (1) |
| 5 | Filtraciones muro-alero | Toma D — Encuentro muro-alero | Medio | Bien + Mal (2) |
| 6 | Esquinas y contornos de vanos | Toma E — Esquina de vano | Medio | Bien + Mal (2) |
| 7 | Sellos en marcos | Toma E — Esquina de vano *(mismo lugar, más zoom)* | Primer plano | Bien + Mal (2) |
| 8 | Humedad ascendente | Toma F — Base del muro | Medio | Bien + Mal (2) |
| — | Uniformidad de grano | *No aplica a Pintura lisa* | — | — |

**8 puntos → 6 tomas → 15 imágenes** (en vez de las 16-17 que saldrían
de fotografiar cada punto por separado sin agrupar).

## 2.2 Detalle de cada toma

**Toma A — General de fachada**
Ubicación: frente al muro completo, ~4-5 m de distancia, encuadrando
un paño limpio sin vehículos ni personas. Luz: difusa, día despejado o
nublado (evitar sombras duras de mediodía en verano). Resuelve:
uniformidad de color y textura. También sirve como **foto de portada**
del material en la Biblioteca Visual (uso doble, sin costo adicional).

**Toma B — Regla apoyada en el muro**
Ubicación: cualquier paño representativo, regla de 2 m apoyada
horizontal o verticalmente contra el muro. Encuadre medio, incluyendo
la regla completa y el punto de contacto con el muro. Luz: rasante
(angulada), para que la sombra bajo la regla sea visible si hay
ondulación. Requiere el mismo prop (regla de aluminio de 2 m) que ya
usa el equipo de terreno para esta medición.

**Toma C — Primer plano de fisuras**
Ubicación: sobre una fisura real (para MAL) o un paño sano (para
BIEN). Encuadre primer plano, con una regla o moneda de referencia de
escala en el marco. Luz: rasante, misma condición que la Toma B —
**agrupable en la misma sesión de luz rasante**. Produce 3 imágenes:
Bien (sin fisuras), Mal-capilar (fisura fina, sin espesor) y
Mal-estructural (fisura con espesor visible o que cruza una esquina) —
el trío es necesario porque el punto pide explícitamente enseñar la
diferencia entre ambas, no solo "hay o no hay fisura".

**Toma D — Encuentro muro-alero**
Ubicación: mirando hacia arriba, el punto de unión entre el muro y el
alero. Encuadre medio. Luz: difusa. Resuelve filtraciones/manchas de
humedad en esa unión.

**Toma E — Esquina de vano (ventana o puerta)**
Ubicación: cualquier esquina de un vano exterior. Dos capturas en el
mismo lugar sin mover el trípode: (1) encuadre medio del vano completo
para "esquinas y contornos", (2) primer plano de la línea de sello
para "sellos en marcos". Luz: difusa. Es el ejemplo más claro de
reutilización de encuadre: una sola visita al mismo punto físico
produce 2 de los 6 setups.

**Toma F — Base del muro**
Ubicación: a nivel de piso, la franja inferior del muro cercana al
terreno. Encuadre medio, agachado o con la cámara baja. Luz: difusa.
Resuelve humedad ascendente por capilaridad o salpicadura.

## 2.3 Agrupación en sesiones fotográficas

| Sesión | Tomas incluidas | Condición requerida |
|---|---|---|
| **Sesión 1 — Luz difusa** | A, D, E, F | Cualquier día despejado o nublado, sin restricción de horario |
| **Sesión 2 — Luz rasante** | B, C | Temprano en la mañana o al atardecer, o flash lateral portátil si no se puede esperar el horario |

Las 4 tomas de la Sesión 1 se pueden resolver en una sola visita a la
vivienda de referencia, en cualquier momento del día. La Sesión 2
conviene agendarla aparte (o al final del mismo día, cerca del
atardecer) porque depende de un ángulo de luz específico — intentar
hacerla a mediodía arriesga fotos que no muestran el defecto aunque
exista.

## 2.4 Total de producción para esta ficha

- **6 tomas** (visitas/setups distintos dentro de la vivienda de referencia)
- **2 sesiones** (1 de luz difusa, 1 de luz rasante)
- **15 imágenes finales** (11 pares Bien/Mal + el trío de fisuras)
- Imágenes BIEN: production en 1 sola vivienda de referencia con
  terminación impecable, la misma para las 6 tomas.
- Imágenes MAL: banco oportunista desde inspecciones reales (ver
  metodología, sección 1) — no todas necesitan salir de la misma
  sesión ni de la misma vivienda.

---

# 3. Reutilización hacia el resto de la familia Fachadas

Marmolina, Graniplast y Revestimiento texturado comparten el mismo
checklist base de 9 puntos que Pintura (misma familia UX-03, "Húmeda
sobre estuco"). El plan de tomas de esta ficha aplica casi 1:1:

- Tomas A, B, C, D, E, F se repiten igual, en la vivienda de
  referencia que corresponda a cada material.
- El punto que en Pintura no aplicaba ("Uniformidad de grano") sí
  aplica en estos 3 materiales — agrega **una toma adicional** (primer
  plano del relieve/grano de la superficie, luz rasante para que el
  relieve se note — agrupable en la Sesión 2 de esas 3 fichas).

Esto significa que, al planificar Marmolina/Graniplast/Texturado, no
hace falta rediseñar la metodología — solo replicar esta ficha y sumar
la toma de grano. El resto de las 9 variantes de Fachada (Siding,
SmartPanel, EIFS, Piedra, Enchapes, Madera, Hormigón visto, Estuco
visto, Ladrillo a la vista) tiene checklists propios y les
corresponderá su propia ficha cuando se aborden.

---

# 4. Próximos pasos (no ejecutados en este documento)

1. Validar esta ficha (Fachadas → Pintura sobre estuco) antes de
   replicar la metodología al resto de los 265 puntos.
2. Una vez aprobada, generar la ficha equivalente para
   Marmolina/Graniplast/Texturado (reutilizando este plan casi
   completo, según sección 3).
3. Definir la vivienda(s) de referencia real donde se va a producir la
   Sesión 1 y la Sesión 2 de esta ficha.
4. Recién después de eso, producir las 15 imágenes — no se generó
   ninguna en este documento.

---

*Fin del Plan de Producción — Fachadas / Pintura sobre estuco. Ningún
cambio de código, Prisma, navegación, componentes ni UX. Ninguna
imagen generada.*
