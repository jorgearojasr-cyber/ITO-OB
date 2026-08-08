# ObraBien — Validación Funcional del Flujo Completo de Inspección

## Alcance

Revisión funcional en vivo, no de código. Se ejecutó de principio a fin
el recorrido de un ITO real: se creó un proyecto nuevo desde cero
("QA Simulacro Recepción — Casa 1"), se le agregó fotografía principal,
se revisaron elementos con respuestas y observaciones reales, se
adjuntó una fotografía real a una observación, se consultó la
Biblioteca Técnica a mitad de la inspección, se volvió al recorrido,
se cerró la inspección con firma de ambas partes, se generó el informe
PDF real (subido a Blob, no simulado) y se volvió a la lista de
proyectos, donde el proyecto de prueba se eliminó al terminar. No se
modificó código, Biblioteca Técnica, Producción Visual, Prisma ni
UX-03.

**Confirmado funcionando de punta a punta, sin fricción**: creación de
proyecto (3 pasos), fotografía principal, recorrido por recintos,
checklist con los 3 estados claros (Sin responder / Correcto /
Observación), adjuntar fotografía a una observación, selector de
material de fachada (UX-03), 7 respuestas concurrentes al checklist
sin errores ni condiciones de carrera, banner de "Continuar recorrido"
desde Inicio, firma de propietario y constructora, generación real del
PDF vía Puppeteer, eliminación de proyecto. Esto es una base sólida —
los problemas de abajo son puntuales, no estructurales.

---

# 🔴 Problemas críticos

## 1. Se puede cerrar una inspección casi vacía sin ninguna advertencia visible

**Dónde ocurre**: pantalla de Resumen (`/resumen`), botón "Cerrar
inspección", y la pantalla de celebración inmediatamente posterior
("Cerraste tu inspección").

**Por qué ocurre**: el botón "Cerrar inspección" no muestra el % de
avance junto a sí mismo, y el texto de advertencia que lo acompaña
("Esta acción no se puede deshacer") es genérico — no dice cuánto
queda pendiente. En la prueba real, cerré una inspección con **2 de 45
elementos revisados (4%)** y el sistema lo permitió sin fricción ni
segunda confirmación distinta a la firma misma. Recién en el informe
PDF final aparece la advertencia real ("Cerrada anticipadamente, con
elementos sin revisar") — pero para entonces la inspección ya está
cerrada y firmada, y la acción es irreversible.

**Cómo afecta al usuario**: un ITO que se distrae, comparte el
dispositivo con el propietario para firmar, o simplemente no se da
cuenta de cuánto le falta, puede cerrar y hacer firmar un documento
oficial de recepción cubriendo solo una fracción de la vivienda — sin
ninguna pantalla intermedia que lo detenga o al menos lo obligue a
confirmarlo explícitamente. Es la acción de mayor consecuencia de todo
el producto (firma de dos partes, no reversible) y hoy es la que menos
fricción de confirmación tiene en relación a su impacto real.

**Solución recomendada**: mostrar el % de avance (y, si es menor a
100%, un aviso explícito) en el mismo botón "Cerrar inspección" o
inmediatamente arriba de él en `/resumen`, y/o agregar un paso de
confirmación explícito dentro del propio modal de cierre cuando el
avance sea bajo (ej. "Vas a cerrar con 43 elementos sin revisar. ¿Estás
seguro?"), antes de llegar a la firma.

---

# 🟠 Problemas importantes

## 2. La fotografía principal no se puede agregar durante la creación del proyecto

**Dónde ocurre**: asistente "Nueva inspección" (3 pasos) →
`Inspecciones/[id]/editar/foto`.

**Por qué ocurre**: el campo de fotografía vive únicamente dentro de
"Editar inspección", una pantalla aparte a la que hay que entrar
después de que el proyecto ya fue creado — no existe como paso ni como
opción dentro del asistente de creación.

**Cómo afecta al usuario**: en terreno, el momento natural para sacar
la foto de portada es al llegar a la vivienda, junto con el resto de
los datos del proyecto. Hoy eso implica un desvío: terminar de crear
el proyecto, ir a "Editar inspección", entrar a "Fotografía principal",
recién ahí sacar la foto — 3 pantallas adicionales para algo que
conceptualmente pertenece al momento de creación.

**Solución recomendada**: ya identificado en la Auditoría UX anterior
(prioridad Media, hallazgo 7) — agregar un CTA visible apenas se crea
el proyecto ("Agrega ahora la foto de portada") en vez de depender de
que el usuario la descubra en "Editar".

## 3. Los materiales nuevos de Fachada (UX-03) no tienen ficha técnica durante la inspección real

**Dónde ocurre**: `/inspecciones/[id]/elementos/[elementId]` para el
elemento "Fachada" con material "Pintura lisa" (familia Húmeda sobre
estuco) — y, por extensión, Marmolina, Graniplast y Revestimiento
texturado, que comparten el mismo checklist.

**Por qué ocurre**: la pantalla de elemento muestra literalmente "Aún
no hay ficha técnica para este elemento" en el bloque "CÓMO
REVISARLO" — el checklist de 5 preguntas funciona perfecto, pero no
hay ni tips de "cómo revisarlo" ni comparación "Bien hecho vs. Mal
hecho" como sí tienen Puerta de acceso u otros elementos más antiguos.
Esto es consistente con el alcance ya documentado del primer vertical
slice de UX-03 ("sin biblioteca enriquecida"), pero significa que hoy,
en una inspección real, el elemento más visible de toda la fachada
(justo el que se revisa primero al llegar a la vivienda) es el que
menos guía ofrece.

**Cómo afecta al usuario**: para el público objetivo del producto
("no necesitas saber de construcción, yo te voy a guiar"), llegar al
primer elemento real de la inspección y encontrar un checklist sin
ningún contexto ni ejemplo visual rompe la promesa central del
producto justo en el peor momento (la primera impresión).

**Solución recomendada**: no es una tarea de este Sprint (implica
tocar UX-03/Biblioteca Técnica, explícitamente fuera de alcance), pero
debería ser de las primeras fichas a completar cuando se retome ese
backlog — ya existe contenido reutilizable en la Biblioteca Técnica
reorganizada (Fachadas → Pintura) que podría enlazarse.

## 4. Sin acceso directo de vuelta a la inspección activa desde la Biblioteca Técnica

**Dónde ocurre**: cualquier pantalla dentro de `/biblioteca` mientras
hay una inspección en curso.

**Por qué ocurre**: la Biblioteca no tiene ningún atajo tipo "volver a
mi inspección" — el único camino de regreso es ir a Inicio y usar
"Continuar recorrido" (que sí funciona perfecto y lleva al recinto
correcto), o ir a Inspecciones y buscar el proyecto.

**Cómo afecta al usuario**: es un salto adicional, no un bloqueo — en
terreno, alguien que consulta la Biblioteca a mitad de una revisión
para confirmar una tolerancia tiene que pasar por Inicio en vez de
volver directo. Fricción menor pero real, dado que "consultar la
Biblioteca durante la inspección" es exactamente el caso de uso que
este Sprint pidió validar.

**Solución recomendada**: un botón flotante o de header "Volver a mi
inspección" visible dentro de `/biblioteca` cuando exista una
inspección `IN_PROGRESS` — mismo dato que ya usa Inicio, solo
expuesto en un lugar adicional.

---

# 🟢 Mejoras futuras

## 5. El informe PDF lista cada elemento pendiente sin resumen compacto

**Dónde ocurre**: `/informe`, sección "Recorrido por recinto", para
inspecciones cerradas con bajo porcentaje de avance.

**Por qué ocurre**: cada elemento no revisado se imprime como una fila
"Pendiente" individual — en la prueba (2 de 45 revisados) el informe
igual listó los 43 elementos pendientes uno por uno.

**Cómo afecta al usuario**: no impide nada — el informe sigue siendo
correcto y honesto — pero para una inspección real muy incompleta, el
PDF puede volverse innecesariamente largo de leer.

**Solución recomendada**: agrupar los elementos pendientes de un mismo
recinto en una sola línea de resumen ("6 elementos pendientes") cuando
un recinto no tiene ningún avance, en vez de listarlos todos.

## 6. El selector "¿Es un proyecto que ya ingresaste?" no se probó a fondo

**Dónde ocurre**: paso 1 del asistente "Nueva inspección".

**Por qué ocurre**: no se validó en este Sprint qué datos autocompleta
exactamente al elegir un proyecto existente (¿inmobiliaria y
constructora también, o solo el nombre?) — queda pendiente de una
validación futura, no es un problema confirmado.

**Solución recomendada**: validar en un próximo Sprint funcional si
el autocompletado cubre todos los campos razonables (inmobiliaria,
constructora) al reutilizar un proyecto, para ahorrar tecleo real en
edificios con múltiples unidades.

---

# Resumen

**1 problema crítico** (cierre sin advertencia de avance — el de mayor
impacto real, porque la acción es irreversible y firmada por dos
partes), **3 problemas importantes** (foto principal fuera del flujo
de creación, fachada nueva sin ficha técnica, sin atajo de regreso
desde la Biblioteca) y **2 mejoras futuras** (resumen compacto de
pendientes en el PDF, validar autocompletado de proyecto existente).

Todo lo demás del recorrido — creación, checklist, fotos, firma,
generación real de PDF, navegación general — funcionó sin fricción
real en el escenario probado. ObraBien está en condiciones de
utilizarse en una inspección real; el hallazgo crítico (#1) es el que
recomiendo resolver antes de un uso productivo sin supervisión,
porque toca la acción menos reversible de todo el producto.

---

*Fin de la validación. Ningún cambio de código, arquitectura,
Biblioteca Técnica, Producción Visual, Prisma ni UX-03 — solo
diagnóstico funcional en vivo, con datos reales creados y eliminados
durante la prueba.*
