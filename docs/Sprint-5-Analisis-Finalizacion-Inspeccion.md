# Sprint 5 — Finalización de la Inspección — Etapa 1: Análisis del código existente

Ver `ROADMAP_OBRABIEN.md`. Mismo rigor que los análisis de los Sprints
1, 2a, 2b, 3 y 4: solo lo que existe hoy en el repositorio, verificado
leyendo el código real. **Sin propuestas de diseño ni de solución** —
eso corresponde a una Etapa 2 futura.

**Alcance exacto de este sprint** (más angosto que el análisis
general de cierre ya hecho en el Sprint 4): el tramo **Resumen → Firma
→ Finalizando la inspección → Generación del informe → Informe listo →
Acciones posteriores**. El objetivo declarado del sprint es que este
tramo alcance el mismo nivel de calidad emocional y narrativa que
Inicio, Bienvenida y el recorrido de recintos — así que, a diferencia
de los análisis anteriores, este documento pone el foco en **qué
experimenta el usuario en cada estado y transición**, no solo en la
arquitectura de datos.

**El Sprint 4 (Etapa 1) ya documentó en detalle la arquitectura, los
componentes, las rutas, la jerarquía de información y 9 problemas / 6
inconsistencias / 9 preguntas abiertas de todo este flujo** —
`Sprint-4-Analisis-Resumen-Inspeccion.md`. Ese análisis sigue vigente
y no se repite acá punto por punto; este documento lo asume como base
y agrega la capa que faltaba: un inventario momento a momento de la
experiencia actual (copy real, estados visuales, presencia o ausencia
de acompañamiento, feedback de espera) en las seis etapas del tramo
que este sprint cubre, más lo que cambió desde entonces (Sprint UX-01
ya corrigió el saludo con nombre completo de Bienvenida y el copy de
onboarding — sin relación directa con este tramo, pero mismo criterio
de revisión).

Archivos leídos íntegramente para este documento, además de los ya
citados en el análisis del Sprint 4: `CloseInspectionSection.tsx`,
`CloseInspectionModal.tsx` (+ `.module.css`), `InformeToolbar.tsx` (+
`.module.css`), `InformeSignatures.tsx`, `ShareReportButton.tsx`,
`informe/page.tsx`, `actions.ts` (`closeInspection`,
`retryReportGeneration`, líneas 1233-1349 completas).

---

## 1. Las seis etapas del encargo, mapeadas a lo que existe hoy

### 1. Resumen

Ya analizado en profundidad en el Sprint 4 (síntesis "Cómo quedó la
vivienda", card `InspectionSynthesisCard`, sin Don José Luis por
decisión explícita). Punto de partida hacia el cierre: al final de la
pantalla, `CloseInspectionSection` — un botón ancho completo, texto
"Cerrar inspección", fondo `--ink-900` (el color más sólido de toda la
pantalla), y una única línea de aviso: *"Al cerrar, se capturan las
firmas del propietario y la constructora y se genera el informe final
en PDF. Esta acción no se puede deshacer."* No hay ceremonia previa:
el botón convive visualmente con el resto de acciones secundarias de
la pantalla (mismo patrón de card que "Invitar a constructora", solo
con color invertido).

### 2. Firma

`CloseInspectionModal`: overlay estándar (`rgba(10,14,24,0.55)`) sobre
una card blanca de 400px máx., **el mismo patrón visual genérico usado
en el resto de la app para cualquier confirmación** — sin elemento
distintivo que marque este modal como el cierre de todo el recorrido.
Dos pasos secuenciales, mismo componente `SignatureCanvas` reutilizado
con props distintas:

1. *"Firma del propietario"* — *"Pide al propietario que firme dentro
   del recuadro para cerrar la inspección."*
2. *"Firma de la constructora"* — *"Ahora el representante de la
   constructora firma para confirmar el cierre."*

Botones: "Limpiar" (por firma), "Cancelar"/"Atrás", "Siguiente"
(deshabilitado hasta que `onEnd` del canvas dispare) y "Firmar y
cerrar" en el paso 2. **Don José Luis no aparece en ningún momento de
este modal** — es el único punto de todo el flujo de cierre donde el
usuario firma algo con implicancia legal/formal y lo hace sin ningún
acompañamiento de marca, ni siquiera el texto de aviso que sí existe
en `CloseInspectionSection` un paso antes.

Cerrar el modal en cualquier punto (click fuera de la card, "Cancelar"
en paso 1, o recargar la página) **descarta ambas firmas ya trazadas
sin ninguna advertencia** — no hay diálogo de confirmación ni mensaje
de "vas a perder lo que firmaste".

### 3. "Finalizando la inspección"

**Esta etapa, tal como está nombrada en el encargo, no existe hoy como
un momento propio de la interfaz.** Lo que ocurre técnicamente:

- Al tocar "Firmar y cerrar" (`CloseInspectionModal.handleConfirm`),
  el botón cambia su propio texto a *"Cerrando…"* (mismo botón, mismo
  tamaño, sin overlay ni pantalla de transición dedicada) mientras en
  paralelo: (a) ambas firmas se suben a Vercel Blob, (b) se llama a
  `closeInspection` (transacción que cambia `Inspection.status` a
  `CLOSED` y crea el `Report` en `PENDING`).
- Al resolver, `router.push` navega del cliente directo a `/informe`
  — **no hay redirección server-side, ni pantalla intermedia, ni
  mensaje de confirmación de que el cierre fue exitoso.** El primer
  indicio para el usuario de que algo cambió es la nueva URL y el
  contenido de `/informe`.
- La generación real del PDF (`generateReportPdf`, Puppeteer) se
  dispara con `after()` **después** de responder al cliente — es
  decir, ocurre en segundo plano, típicamente mientras el usuario ya
  está mirando `/informe` con el `Report` en estado `PENDING`.

En la práctica, "Cerrando…" (el texto del botón, unos segundos) es
hoy el único momento que podría llamarse "finalizando la inspección",
y su duración real depende de cuánto tarden las dos subidas a Blob
más la transacción — no de la generación del PDF en sí, que ya ocurre
en la siguiente etapa.

### 4. Generación del informe

Ocurre en `/informe` con `Report.status === "PENDING"`.
`InformeToolbar` muestra un botón deshabilitado con ícono de PDF y el
texto *"Generando…"*, que cambia a *"Esto se está demorando…"* pasados
90 segundos (`SLOW_GENERATION_WARNING_MS`, constante del cliente).
Mientras tanto hace `router.refresh()` cada 3 segundos — sin
websockets ni SSE en el proyecto, es polling simple. **No hay barra de
progreso, ni porcentaje, ni ningún mensaje explicando qué se está
generando o por qué toma tiempo** — el resto de la pantalla (portada,
resumen, recorrido por recinto) ya se renderiza completo y en vivo
debajo de ese botón, así que el usuario ve el contenido final del
informe mientras el botón todavía dice "Generando…", lo cual puede
leerse como contradictorio (¿ya está o no está listo?).

Si pasan más de 90 segundos desde `lastAttemptAt` **la próxima vez que
se carga la página**, el propio `informe/page.tsx` reconcilia el
`Report` a `FAILED` con el mensaje *"Se agotó el tiempo de espera al
generar el informe."* — no hay ningún proceso activo vigilando esto
del lado del servidor; depende de que alguien vuelva a cargar
`/informe`.

### 5. Informe listo

`Report.status === "READY"`: el botón de `InformeToolbar` pasa a un
link real *"Descargar PDF"* (`href` directo al blob, atributo
`download`). No hay ningún mensaje de éxito, ninguna transición ni
confirmación visual de que la generación terminó más allá del cambio
de texto del botón — el usuario tiene que notar el cambio por sí
mismo (o, si dejó la pestaña abierta, el polling de 3s se lo actualiza
solo).

Si `inspection.status === "CLOSED"` y existe `Report`, aparece además
la sección `InformeSignatures` al final del documento: ambas imágenes
de firma más *"Firmado el [fecha en formato largo es-CL]"*. Es la
única confirmación explícita, visual y permanente, de que el cierre
fue real — pero vive al final de un documento largo (portada + resumen
+ recorrido completo por recinto), no como un momento propio.

### 6. Acciones posteriores

Desde `/informe`, con el informe `READY`: "Descargar PDF" (archivo
real), "Compartir" (`ShareReportButton` — `navigator.share` si existe,
si no copia el link autenticado al portapapeles con un tooltip *"¡Enlace
copiado!"* por 2s), y "Exportar a PDF" (impresión del navegador, solo
visible si **no** existe `Report` todavía — mutuamente excluyente con
"Descargar PDF"). No hay ningún otro control dentro del documento
mismo: todo es de solo lectura.

**No existe ningún puente explícito desde este tramo hacia el ciclo de
vida de postventa** (`advanceObservationLifecycle`, el sistema de
`Notification` ya construido y conectado a `TopBar`) — un usuario que
termina de cerrar y descargar el informe no recibe ninguna indicación
de que las observaciones con prioridad seguirán su propio proceso de
reparación/verificación después. La única salida explícita de
`/informe` es el back fijo hacia `/resumen`; volver a `/` requiere usar
`BottomNav`, sin ningún mensaje de cierre de ciclo ("tu inspección
quedó guardada", "esto es lo que sigue").

---

## 2. Lo que ya funciona bien en este tramo (para no perderlo en la Etapa 2)

- El PDF y las firmas son **reales y funcionales hoy**, no
  aspiracionales — confirmado en el Sprint 4 y de nuevo en el
  recorrido en vivo del Sprint UX-01 (cierre completo, con firma real
  de ambas partes, generación y descarga del PDF en segundos).
- El informe usa exactamente los mismos componentes/datos que el
  usuario ya vio en `/resumen` (mismo `StatusChip`, `PriorityBadge`,
  terminología) — no hay una "vista alterna" con su propio lenguaje.
- El aviso de irreversibilidad en `CloseInspectionSection` es directo
  y sin ambigüedad — coherente con el tono del resto de la app para
  acciones que no se pueden deshacer.

## 3. Vacíos de experiencia detectados en este tramo (observación, no propuesta)

1. **"Finalizando la inspección" no tiene ningún momento visual propio**
   — hoy es el texto de un botón ("Cerrando…") seguido de una
   navegación de cliente sin transición ni confirmación.
2. **Cero acompañamiento de marca (Don José Luis) en todo el tramo**
   — presente en Bienvenida y Elementos, ausente aquí incluso en el
   momento de mayor carga emocional/formal de todo el recorrido (firmar
   el cierre de la recepción de una vivienda).
3. **El modal de firma usa el mismo patrón visual genérico** que
   cualquier confirmación menor de la app — nada en su tratamiento
   visual comunica que es el cierre del recorrido completo.
4. **Contradicción aparente durante la generación**: el documento
   completo ya se ve renderizado mientras el botón todavía dice
   "Generando…", sin ninguna aclaración de qué falta exactamente.
5. **Ninguna confirmación de éxito explícita** al terminar de firmar
   ni al terminar de generar el PDF — ambos son cambios de estado
   silenciosos que el usuario debe inferir por sí mismo.
6. **Pérdida silenciosa de firmas ya trazadas** si el modal se cierra
   a medio camino, sin aviso.
7. **Ningún cierre narrativo del recorrido completo** — tras
   descargar el informe, no hay ningún mensaje que reconozca que el
   usuario completó todo el proceso (comparable, en tono, a lo que
   Bienvenida hace al principio), ni ningún puente hacia lo que sigue
   (postventa).

## 4. Alcance no cubierto por este documento

Por ser continuación directa del Sprint 4, no se repiten acá: el
detalle de autorización (`inspectionAccessWhere` vs. `organizationId`
puro), el sistema de reintentos (`retryCount`/cooldown/ventana de
reset), la reconciliación perezosa dentro del GET, ni las preguntas de
producto ya abiertas sobre acceso de colaboradores externos a
`/informe` — todo eso sigue documentado y vigente en
`Sprint-4-Analisis-Resumen-Inspeccion.md`, secciones 9, 10 y 11.

---

Sin propuestas de diseño en este documento. Queda para la Etapa 2
definir qué tratamiento visual y narrativo corresponde a cada uno de
los vacíos listados en la sección 3.
