# ObraBien — Auditoría UX Completa

## Alcance

Auditoría de producto, no de código. **No se modificó ningún archivo, no
se tocó UX-03, la Biblioteca Técnica, el Sistema Maestro de Producción
Visual ni el flujo de inspección.** Se recorrió la aplicación en vivo
(navegador, sesión real con datos de prueba existentes) como lo haría
un cliente que acaba de recibir su vivienda nueva.

**Nota de método**: no pude capturar screenshots (limitación del panel
del navegador en este entorno, ya documentada antes en esta sesión) —
la auditoría se hizo leyendo el contenido y la estructura real
renderizada de cada pantalla, no de memoria ni del código. Cuando un
hallazgo depende de algo puramente visual que no pude confirmar sin
imagen, lo dejo explícitamente marcado como de menor confianza.

---

## 1-2. Inicio / Dashboard

*(Hoy son la misma pantalla — no existe un "Dashboard" separado de
"Inicio". Lo dejo anotado como hallazgo, no como error de mi parte.)*

**Estado**: 🟡 Mejorable

**Observaciones**
1. El saludo ("¡Qué bien vas! Sigamos") es genérico y no usa el
   nombre real de quien inspecciona — la pantalla que más se va a ver
   en toda la app no se siente personal.
2. El carrusel "Biblioteca Técnica" de esta pantalla todavía muestra
   el índice **antiguo** por categorías (Ventanas, Cerámicas,
   Porcelanatos, Interruptores, Enchufes por separado, etc.) — no
   coincide con el índice de 23 elementos ya reorganizado y aprobado
   que se ve al entrar a `/biblioteca` directamente. Es una
   inconsistencia real que un usuario puede notar si navega por los
   dos caminos.
3. La tarjeta principal tiene dos botones de igual peso visual
   ("Continuar recorrido" y "Ver resumen") — no queda claro cuál es
   la acción principal esperada en ese momento.
4. "1 observaciones" — error de concordancia de plural, menor pero
   visible.

**Propuesta**: usar el nombre real de la sesión en el saludo cuando
exista; actualizar el carrusel del Home para que use el mismo índice
por elemento ya vigente en la Biblioteca Técnica; dar mayor peso
visual a un solo CTA primario.

---

## 3. Lista de proyectos

**Estado**: 🟡 Mejorable

**Observaciones**
1. Varias tarjetas dicen **"Completada"** con **0%, 33% o 49% de
   avance**. Para un usuario esto lee como contradictorio —
   "Completada" sugiere que la vivienda se revisó entera, pero en
   realidad significa que la inspección fue **cerrada/firmada**, sin
   relación directa con cuánto se alcanzó a revisar. Es el hallazgo
   más importante de esta pantalla.
2. El placeholder "📷 Agregar fotografía de la vivienda" que aparece
   en las tarjetas sin foto no es clickeable — el usuario no tiene
   forma de saber, mirando la lista, cómo agregar esa foto sin entrar
   al proyecto y buscar "Editar".
3. No existe filtro ni buscador — no es un problema hoy con 4
   proyectos, pero para una inmobiliaria con muchas unidades sí lo
   sería.

**Propuesta**: separar visualmente dos conceptos que hoy comparten
una sola palabra ambigua — "Cerrada/Firmada" (estado del documento) y
"Revisión completa" (% de elementos revisados) son cosas distintas y
merecen comunicarse por separado.

---

## 4. Crear proyecto

**Estado**: 🟢 Correcta

**Observaciones**
1. El selector "¿Es un proyecto que ya ingresaste?" al inicio es un
   detalle bien pensado — evita reescribir los datos de un proyecto
   inmobiliario con varias unidades.
2. Los 3 pasos son claros, con campos agrupados con sentido y
   progreso visible ("Paso 1 de 3").
3. No se puede agregar la fotografía principal durante la creación —
   hay que terminar de crear el proyecto y después ir a buscarla en
   "Editar". Para alguien que quiere dejar todo listo en un solo
   momento, se siente como un paso perdido.

**Propuesta**: no es necesario meter la foto dentro del wizard (el
proyecto no existe todavía como fila en la base mientras se completa),
pero sí ofrecer un CTA visible apenas se crea ("Agrega ahora la foto
de portada") en vez de dejar que el usuario lo descubra solo.

---

## 5. Fotografía principal

**Estado**: 🟢 Correcta

**Observaciones**
1. El placeholder es claro y la acción "Subir o tomar fotografía" es
   directa, sin pasos de más.
2. Vive escondida dentro de "Editar inspección" — "editar" suena a
   corregir datos, no a personalizar visualmente el proyecto; alguien
   recién llegado no necesariamente la busca ahí.
3. El texto de ayuda sobre formato recomendado aparece **después** de
   subir la foto, cuando sería más útil antes de elegir el archivo.

**Propuesta**: dar más visibilidad al acceso (ej. que el placeholder
de la tarjeta del proyecto o del header de Recintos sea clickeable
directo a esta pantalla), no solo enterrado en el hub de edición.

---

## 6. Resumen del proyecto (pantalla de bienvenida)

**Estado**: 🟡 Mejorable

**Observaciones**
1. **"Hola, Usuario."** — saludo con nombre genérico de reemplazo, en
   el momento más personal y emotivo de todo el producto: el instante
   en que alguien empieza a inspeccionar SU casa nueva. Contradice
   directamente la frase siguiente ("yo te voy a guiar, paso a
   paso") si el sistema ni siquiera sabe mi nombre.
2. El resto del mensaje ("No necesitas saber de construcción...") usa
   exactamente el tono correcto para el público objetivo — vale la
   pena mantenerlo intacto.
3. Un solo CTA ("Comenzar inspección") — sin ambigüedad, correcto.

**Propuesta**: usar el nombre real cuando exista en la sesión; si no
existe (cuenta sin nombre configurado, colaborador externo), usar un
saludo neutro que no suene a placeholder roto ("¡Hola! Empecemos" en
vez de "Hola, Usuario.").

---

## 7. Biblioteca Técnica

**Estado**: 🟢 Correcta la navegación reorganizada / 🔴 el punto de
inconsistencia con el Home (ya señalado en la sección 1-2)

**Observaciones**
1. La navegación Elemento → Material → Ficha es rápida de recorrer y
   se entiende de inmediato.
2. Los placeholders "Disponible próximamente" en las fichas comunican
   honestamente que el contenido visual todavía no existe, sin dejar
   espacios vacíos — bien resuelto.
3. Dentro de una inspección real, la ficha de un elemento tiene su
   propio bloque educativo ("Cómo revisarlo" + "Bien hecho vs. Mal
   hecho") que **no está conectado** con el artículo equivalente de
   la Biblioteca Técnica standalone — son dos fuentes de contenido
   educativo que hoy no se referencian entre sí.

**Propuesta**: agregar un link cruzado desde la ficha de inspección
hacia el artículo/elemento correspondiente de la Biblioteca Técnica,
para que el usuario que quiere profundizar no tenga que buscarlo por
su cuenta.

---

## 8. Inicio de inspección

**Estado**: 🟢 Correcta

**Observaciones**
1. El paso de "Comenzar inspección" lleva directo al primer recinto
   pendiente, sin pantallas intermedias innecesarias — lineal y sin
   dudas.

**Propuesta**: ninguna — funciona bien tal como está.

---

## 9. Recintos

**Estado**: 🟢 Correcta

**Observaciones**
1. "Recinto 1 de 11" junto al contador de elementos revisados por
   recinto da una sensación de avance clara y predecible en todo
   momento.
2. "Cambiar recinto" como bottom sheet permite saltar el orden sin
   perder el hilo del recorrido — buena decisión ya implementada.

**Propuesta**: ninguna relevante.

---

## 10. Elementos

**Estado**: 🟡 Mejorable

**Observaciones**
1. Cada botón de checklist **sin responder** muestra el texto "✓ Está
   bien" con el ícono de check ya presente, aunque nadie lo haya
   presionado todavía. Un usuario apurado puede leer eso como "ya
   quedó marcado" y saltarse la revisión real. Es el hallazgo de
   mayor riesgo de toda la auditoría porque afecta directamente la
   calidad del dato final — que es el objetivo completo del producto.
2. Aparece la etiqueta **"✨ IA (futuro)"** junto a una de las
   preguntas del checklist, sin ninguna explicación de qué significa.
   Un cliente real no tiene contexto de que es una nota de roadmap
   interno — se ve como una función a medio construir o rota, y
   contradice que la v1 del producto no usa IA.
3. El bloque "Bien hecho vs. Mal hecho" es de lo mejor logrado del
   producto: comparación visual con criterio de tolerancia explícito
   ("±3 mm"), justo lo que un usuario sin conocimiento técnico
   necesita para decidir.

**Propuesta**: que el ícono de check solo aparezca **después** de
hacer clic en "Está bien" (hoy es parte fija de la etiqueta del
botón, se vea o no se haya respondido); quitar la etiqueta "IA
(futuro)" de la vista de producción hasta que esa función exista.

---

## 11. Registro de observaciones

**Estado**: 🟢 Correcta

**Observaciones**
1. El flujo "Reportar un problema" → aparece descripción libre +
   selector de prioridad + botón "En realidad está bien" (deshacer)
   está completo y tiene una salida clara si el usuario se equivocó.
2. La prioridad (Alta/Media/Baja) se pide de inmediato, sin pasos
   adicionales.

**Propuesta**: ninguna adicional — el único ajuste pendiente en esta
pantalla es la etiqueta "IA (futuro)" ya señalada en la sección 10.

---

## 12. Fotografías

**Estado**: 🟡 Mejorable *(confianza menor — no pude probar la cámara
real en este entorno, ver nota de método al inicio)*

**Observaciones**
1. El botón "Agregar fotografía guiada" promete una experiencia con
   instrucciones, coherente con el tono del resto del producto.
2. No pude confirmar en vivo el comportamiento real de la cámara
   (limitación del entorno de pruebas, no necesariamente del
   producto).

**Propuesta**: validar en un dispositivo real que el flujo de cámara
mantenga el mismo nivel de guía visual que el resto del recorrido.

---

## 13. Resumen final

**Estado**: 🟡 Mejorable

**Observaciones**
1. "Cómo quedó la vivienda", con el conteo de observaciones por
   prioridad, es el resumen más útil de todo el producto — en una
   frase comunica si conviene firmar o no.
2. Una inspección puede aparecer "Inspección cerrada" con apenas 49%
   de elementos revisados, y esta pantalla **no muestra ninguna
   advertencia** sobre eso — el dato de avance real solo aparece
   después, en el PDF del informe, cuando ya es tarde para reconsiderar.
3. "Invitar a constructora" convive con la sección de cierre sin una
   jerarquía visual clara de cuál acción es más urgente en qué
   momento del proceso.

**Propuesta**: mostrar el % de avance junto al botón "Cerrar
inspección" (no solo en el PDF final), para que cerrar con elementos
pendientes sea una decisión consciente del usuario, no un dato que
descubre después de firmado.

---

## 14. Informe

**Estado**: 🔴 Requiere rediseño (en el punto específico de elementos
pendientes en un documento ya firmado)

**Observaciones**
1. El informe **firmado** que revisé lista abiertamente decenas de
   elementos como "Pendiente" — recintos completos (Baños,
   Dormitorios, Closets, Terraza, Instalaciones, Equipamiento) sin
   ninguna revisión, dentro de un documento con firma de propietario
   y constructora ya capturadas. **Es el hallazgo más importante de
   toda esta auditoría**: un "Informe de Recepción" oficial y firmado
   no debería poder salir con más de la mitad de la vivienda sin
   revisar sin, al menos, una advertencia explícita dentro del propio
   documento.
2. El informe muestra "PROPIETARIO: Usuario Demo" — el mismo nombre
   genérico señalado en la sección 6, ahora dentro de un documento
   legal/formal, donde es aún más visible y menos aceptable.
3. El resto del documento (recorrido completo por recinto, resumen
   general con conteos, firmas) está bien estructurado y se lee como
   un informe profesional real — el problema es puntual, no general.

**Propuesta**: agregar una advertencia visible dentro del propio PDF
cuando existan elementos "Pendiente" al momento del cierre ("Este
informe se firmó con N elementos sin revisar") — no necesariamente
bloquear el cierre (puede ser una decisión legítima del usuario en
casos reales), pero no dejarlo invisible en un documento ya firmado.

---

## 15. Historial

**Estado**: 🔴 Requiere rediseño (no existe como pantalla propia hoy)

**Observaciones**
1. No hay una pantalla de "Historial" independiente — la única forma
   de ver inspecciones pasadas es filtrar mentalmente la lista
   general de "Inspecciones" por las que dicen "Completada" (con la
   ambigüedad ya señalada en la sección 3).
2. No existe manera de repasar rápidamente, por ejemplo, "qué
   inspecciones cerré este año" o comparar inspecciones anteriores
   del mismo edificio o inmobiliaria.

**Propuesta**: si el caso de uso real lo justifica (por ejemplo, un
ITO que trabaja con la misma inmobiliaria en múltiples unidades), vale
la pena evaluar una vista separada con filtro por estado/fecha/
inmobiliaria. No es urgente mientras el volumen de proyectos por
cuenta sea bajo.

---

## 16. Configuración

**Estado**: 🔴 Requiere rediseño (no existe como pantalla propia hoy)

**Observaciones**
1. "Perfil" hoy es solo nombre, correo, organización y "Cerrar
   sesión" — no hay ninguna preferencia configurable.
2. El producto ya maneja invitaciones a colaboradores externos y
   notificaciones de postventa — la ausencia total de preferencias
   (por ejemplo, activar/desactivar notificaciones) es notoria frente
   a esas funciones ya existentes.

**Propuesta**: no es urgente mientras el número de usuarios activos
por organización sea bajo, pero cuando la colaboración multi-usuario
se use más intensamente, un mínimo de configuración (notificaciones)
se vuelve necesario.

---

# BACKLOG DEFINITIVO DE UX

## 🔴 Alta prioridad

1. **Informe firmado sin advertencia de elementos pendientes** — un
   documento oficial con firmas puede transmitir una revisión
   completa que no ocurrió. Afecta directamente la confianza en el
   producto y su valor legal/probatorio.
2. **Etiqueta "✨ IA (futuro)" visible en producción** — lenguaje de
   roadmap interno expuesto a clientes reales; contradice
   explícitamente que la v1 no usa IA y se ve como una función rota.
3. **Checklist sin responder muestra el check "✓" ya activado** —
   riesgo real de que el usuario salte preguntas creyendo que el
   sistema ya las marcó, comprometiendo la calidad del dato que es el
   objetivo central del producto.
4. **"Completada" es una palabra ambigua** — se usa para "cerrada/
   firmada" sin relación con "100% revisada", generando expectativas
   equivocadas tanto en la lista de proyectos como en el informe.
5. **Saludo con nombre genérico** ("Hola, Usuario.", "Usuario Demo"
   en el informe firmado) — rompe la promesa de acompañamiento
   personal justo en los dos momentos de mayor carga emocional del
   producto: el inicio de la inspección y el documento final.

## 🟡 Media prioridad

6. Inconsistencia entre el carrusel de Biblioteca del Home (índice
   antiguo por categoría) y la Biblioteca Técnica ya reorganizada
   (índice por elemento).
7. La fotografía principal no se puede agregar durante la creación
   del proyecto, y vive escondida dentro de "Editar inspección" en
   vez de tener un acceso más visible.
8. El % de avance no aparece junto al botón "Cerrar inspección" en el
   resumen — solo se ve después, en el PDF, cuando ya no se puede
   reconsiderar.
9. Sin conexión cruzada entre la ficha de un elemento durante la
   inspección y su artículo equivalente en la Biblioteca Técnica.
10. Ausencia de una pantalla de Historial dedicada.

## 🟢 Baja prioridad

11. Ausencia de preferencias en Perfil/Configuración — no urgente con
    el volumen actual de usuarios por organización.
12. Ajustes menores de copy (concordancia de plural "1 observaciones",
    jerarquía de los dos CTAs de Inicio).
13. Falta de búsqueda/filtro en la lista de proyectos — no urgente
    mientras el número de proyectos por cuenta sea bajo.

---

*Fin de la auditoría. 16 pantallas revisadas en vivo, ningún cambio de
código, arquitectura, Biblioteca Técnica, UX-03, Sistema Maestro de
Producción Visual ni flujo de inspección.*
