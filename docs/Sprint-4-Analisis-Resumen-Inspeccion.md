# Sprint 4 — Experiencia del Resumen de Inspección — Etapa 1: Análisis del código existente

Ver `ROADMAP_OBRABIEN.md`. Mismo nivel de rigor que los análisis de los
Sprints 1, 2a, 2b y 3: solo lo que existe hoy en el repositorio,
verificado leyendo el código real. Sin propuestas de diseño ni de
solución — eso corresponde a una Etapa 2 futura.

**Alcance**: el flujo completo de cierre de una inspección, no solo la
pantalla `/resumen` — incluye `/informe`, la generación del PDF, la
gestión de ciclo de vida de observaciones, la invitación de
colaboradores desde este tramo, y las firmas.

Archivos leídos íntegramente: `resumen/page.tsx`, `informe/page.tsx`
(+ `print.css`), `actions.ts` (`closeInspection`,
`retryReportGeneration`, `advanceObservationLifecycle`),
`get-informe-data.ts`, `get-observations-summary-data.ts`,
`get-invite-data.ts`, `invite-actions.ts`, `report-retry-config.ts`,
`generate-report-pdf.ts`, `schema.prisma` (modelos `Report`,
`Observation`, `Inspection` y sus enums), los 6 componentes de
`components/resumen/`, los 6 de `components/informe/`,
`CloseInspectionModal.tsx`, y los componentes compartidos usados en
este flujo.

---

## 1. Arquitectura actual

Mismo patrón que el resto de la app: ambas páginas
(`resumen/page.tsx`, `informe/page.tsx`) son Server Components puros
que autorizan y delegan el cómputo a un `get-*-data.ts`; todo lo
interactivo vive en Client Components hijos. La lógica de negocio real
vive enteramente en `src/lib/inspections/actions.ts` — los componentes
cliente arman inputs (fotos, firmas) y llaman Server Actions, sin
calcular nada de negocio por su cuenta.

**Generación del informe — el mecanismo real** (`closeInspection`,
`actions.ts:1246-1298`): en una única transacción,
`Inspection.status: IN_PROGRESS → CLOSED` + `Report.create({ status:
"PENDING", firmas, snapshot, signedAt, lastAttemptAt })`, donde
`snapshot` es `getInformeData()` serializada en ese instante. **Fuera**
de la transacción, tras responder al cliente, corre
`after(() => generateReportPdf(report.id))` en background —
Puppeteer visita la propia URL `/informe` (con las cookies de sesión),
espera un marcador DOM, imprime a PDF, sube a Vercel Blob, y marca
`Report.status: READY`. Es "mejor esfuerzo": no hay cola ni cron: si el
proceso serverless se recicla a mitad de camino, el `Report` queda en
`PENDING` para siempre sin que nada lo detecte proactivamente del lado
del servidor.

**Reconciliación perezosa** (`informe/page.tsx:25-37,68-72`): si al
cargar `/informe` el `Report` sigue `PENDING` y pasaron más de 90s
desde `lastAttemptAt`, **la propia carga de la página** hace
`prisma.report.update({ status: "FAILED" })` antes de renderizar — una
petición de lectura muta la base de datos como efecto colateral.
`InformeToolbar` (cliente) hace polling cada 3s vía `router.refresh()`
mientras esté `PENDING`, con un umbral propio de "esto se está
demorando" a los 90s — **mismo valor, dos constantes independientes**
(`STALE_PENDING_THRESHOLD_MS` en el server, `SLOW_GENERATION_WARNING_MS`
en el cliente), sin relación entre sí en el código.

**Retry** (`retryReportGeneration`, `actions.ts:1307-1349`): máximo 3
reintentos, cooldown de 30s entre intentos, ventana de reset de 1h
(pasada esa hora, un nuevo intento reinicia el contador a 1, no a 0).
El comentario del propio código es explícito: el `disabled` del botón
en el cliente es "solo UX", toda la validación real es server-side.
No vuelve a generar el `snapshot` ni las firmas — reintenta la misma
generación de PDF sobre lo ya congelado.

**Autorización — dos criterios distintos conviven en el mismo flujo**:
`/resumen` usa `inspectionAccessWhere` (un colaborador externo sí
puede verla); `/informe` usa `organizationId` puro (un colaborador
externo **no** puede verla, recibe `notFound()`) — mismo patrón en
`getInformeData`. `getObservationsSummaryData` sí usa
`inspectionAccessWhere`. `closeInspection`, `retryReportGeneration`,
`createInspectionInvite`/`revokeInspectionInvite` exigen
`organizationId` puro + `canManageInspection(role)`.
`advanceObservationLifecycle` usa `inspectionAccessWhere` y
**sigue funcionando después de que la inspección está `CLOSED`**
(comentario explícito en el código) — es el único punto de escritura
de este flujo activo post-cierre.

## 2. Componentes

| Componente | Archivo | Rol |
|---|---|---|
| `ObservationsSummaryPage` | `app/.../resumen/page.tsx` | Orquesta `/resumen` |
| `ObservationsSummaryList` | `components/resumen/ObservationsSummaryList.tsx` | Filtros (prioridad + recinto) sobre observaciones |
| `ObservationSummaryRow` | `components/resumen/ObservationSummaryRow.tsx` | Tarjeta de observación, link al elemento |
| `ObservationLifecycleModal` | `components/resumen/ObservationLifecycleModal.tsx` | Cambiar estado de ciclo de vida, subir fotos de reparación |
| `CloseInspectionSection` | `components/resumen/CloseInspectionSection.tsx` | Botón "Cerrar inspección" + hint |
| `CloseInspectionModal` | `components/inspecciones/CloseInspectionModal.tsx` | Wizard de firma en 2 pasos, llama `closeInspection` |
| `InviteCollaboratorSection` | `components/resumen/InviteCollaboratorSection.tsx` | Botón invitar + lista de invitaciones + revocar |
| `InviteCollaboratorModal` | `components/resumen/InviteCollaboratorModal.tsx` | Generar link de invitación por email |
| `InformePage` | `app/.../informe/page.tsx` | Orquesta `/informe`, decide snapshot vs. vivo |
| `InformeToolbar` | `components/informe/InformeToolbar.tsx` | Volver, exportar/descargar/reintentar PDF, polling, compartir |
| `InformeCover` | `components/informe/InformeCover.tsx` | Portada: proyecto, metadatos, % avance |
| `InformeSummary` | `components/informe/InformeSummary.tsx` | Stats + conteo por prioridad |
| `InformeRoomSection` / `InformeElementRow` | `components/informe/*.tsx` | Recorrido por recinto y elemento |
| `InformeSignatures` | `components/informe/InformeSignatures.tsx` | Imágenes de firma + fecha, solo si `isClosed` |

## 3. Rutas involucradas

- `/inspecciones/[inspectionId]/resumen`
- `/inspecciones/[inspectionId]/informe`
- `/inspecciones/[inspectionId]/elementos/[elementInstanceId]` (destino de cada observación)
- `/invitaciones/[token]` (destino del link de invitación)
- `/api/blob/upload` (subida de firmas y fotos de reparación)
- URL absoluta de Vercel Blob (descarga directa del PDF, no es ruta de la app)

## 4. Flujo completo desde el último recinto hasta el informe final

1. **Llegada a `/resumen`** — sin origen único: `RoomCompletionBanner`
   ("Ir al resumen", último recinto), `HeroProgressCard` de Inicio,
   `QuickAccessGrid`, `InspectionListItem` (colaboradores externos e
   inspecciones `COMPLETADA` van directo acá), o tras aceptar una
   invitación.
2. **En `/resumen`**: se listan solo las observaciones marcadas
   `OBSERVATION` (los elementos `CORRECT` no aparecen en esta
   pantalla). Filtros client-side. Secciones de cierre e invitación
   condicionadas por rol y por `status`.
3. **Cierre** (`CloseInspectionModal`): firma del propietario (paso 1)
   → firma de la constructora (paso 2) → ambas firmas se suben a
   Vercel Blob **antes** de que exista transacción o `Report` → se
   llama `closeInspection` → éxito → `router.push` a `/informe`
   (navegación de cliente, no `redirect()` server-side).
4. **Transacción de cierre**: única escritura en todo el código que
   cambia `Inspection.status` a `CLOSED`. Crea el `Report` en el mismo
   paso, con el snapshot ya congelado y `signedAt` fijado server-side.
5. **`generateReportPdf` en background**: el usuario típicamente llega
   a `/informe` mientras el PDF sigue `PENDING`.
6. **En `/informe`**: si `isClosed` (status `CLOSED` **y** existe
   `Report`), se lee el **snapshot JSON congelado** — no vuelve a
   consultar `RoomInstance`/`ElementInstance`/`Observation` en
   absoluto. Si no, es una consulta en vivo idéntica a la que arma el
   snapshot (vista previa mientras la inspección sigue en curso).
   `InformeSignatures` solo se renderiza si `isClosed`.
7. **El PDF es literalmente esta misma página**: Puppeteer visita
   `/informe` autenticado y la imprime con `print.css` — no hay una
   plantilla de PDF separada.

## 5. Navegación

Entradas ya listadas en §4.1. Salidas: `/resumen` → `/` (back fijo),
`/resumen` → `/informe` ("Ver informe", solo miembros de
organización), `/resumen` → cada elemento con observación, `/informe`
→ `/resumen` (back fijo), `/informe` → PDF descargable (solo
`READY`), ambas pantallas comparten un link externo a `/informe` vía
`ShareReportButton` (no a `/resumen`), invitación → link externo
copiado manualmente (sin envío de email, por diseño explícito).

## 6. Jerarquía de información

**`/resumen`**: header (título fijo + subtítulo proyecto/unidad, acción
"Ver informe" solo para miembros) → lista de observaciones (contenido
sustantivo principal) → cierre (separador, botón ancho completo fondo
`--ink-900`, el color más sólido/oscuro de toda la pantalla) →
invitar (mismo patrón visual pero en outline, visualmente subordinado
al cierre).

**`/informe`**: toolbar (no imprimible) → portada (`break-after: page`
en impresión) → resumen agregado (stats + prioridades) → recorrido
completo por recinto/elemento → firmas (solo si cerrada) → marcador
invisible para Puppeteer.

## 7. Reutilización de componentes existentes

Usados tal cual: `BackHeader`, `StatusChip`, `PriorityBadge`,
`LifecycleBadge`, `NormativeScopeNotice` (variante `"line"`, único uso
de esa variante en todo el repo), `BottomNav`.

**No usado, pese a existir y estar documentado en Sprint 3**:
`EmptyState` — el estado "Sin observaciones registradas todavía" de
`ObservationsSummaryList` reimplementa su propio `<div>` con estilo
propio en vez de reutilizar el componente compartido.
`DonJoseLuisAvatar`/`Card`/`Presence` — confirmado ausente en todo
este flujo.

## 8. Oportunidades de UX (observación pura)

1. Ninguna señal visual en `/resumen` de que la inspección ya está
   `CLOSED` — la única pista es que la sección de cierre desaparece.
2. `ObservationsSummaryList` no agrupa ni ordena por estado de ciclo
   de vida, solo por prioridad vía filtro.
3. El polling de `InformeToolbar` no tiene backoff ni límite visible
   más allá del aviso a los 90s.
4. "Exportar a PDF" (impresión de navegador) y "Descargar PDF"
   (archivo generado server-side) son capacidades de naturaleza
   distinta pero comparten ícono/clase CSS y nunca coexisten (una
   reemplaza a la otra según si ya existe `Report`).
5. "Ver informe"/compartir en `/resumen` no distingue si el `Report`
   existe, está `PENDING`, `FAILED` o `READY` — el destino es siempre
   el mismo link.
6. Se puede seguir invitando colaboradores después de cerrada la
   inspección, pero un colaborador invitado no puede ver el informe
   final de la inspección en la que colabora (ver problema #1).

## 9. Problemas detectados (código, no opinión)

1. **`/informe` es inalcanzable para colaboradores externos** —
   filtra por `organizationId` puro, sin `inspectionAccessWhere`,
   pese a que `/resumen` sí les permite acceso (aunque les oculta el
   link "Ver informe"). La constructora invitada nunca puede ver el
   informe final firmado de la inspección en la que colabora.
2. **Mutación de datos dentro de un GET**: la reconciliación
   `PENDING → FAILED` ocurre en el render de `/informe`, no en una
   Server Action.
3. **Umbral de "generación lenta" duplicado** en dos constantes
   independientes (servidor y cliente), mismo valor hoy, sin relación
   en el código — pueden desincronizarse silenciosamente.
4. **`InspectionStatus.COMPLETED` sin ningún escritor** en el código
   actual — solo se escriben `IN_PROGRESS` y `CLOSED`, pero
   `get-inspections-list-data.ts` y `InspectionListItem` sí lo leen y
   lo tratan como alcanzable.
5. **`retryReportGeneration` no revalida `/resumen`** (solo
   `/informe`), a diferencia de `closeInspection` que revalida ambas
   rutas más `/`.
6. **Firmas subidas a Blob antes de que exista transacción o
   `Report`** — si `closeInspection` falla después de subir ambas
   imágenes, quedan huérfanas en Vercel Blob sin ninguna fila que las
   referencie ni limpieza automática.
7. **Filtrado 100% client-side sin paginación** en
   `ObservationsSummaryList` — todo el payload SSR se filtra en el
   navegador.
8. **Sin borrador de firma**: cerrar el modal de cierre en cualquier
   paso descarta ambas firmas ya trazadas, sin advertencia adicional.
9. **Ningún componente de `/resumen` refleja el estado del `Report`**
   — toda esa superficie vive exclusivamente en `/informe`; un usuario
   que se queda en `/resumen` tras cerrar no tiene ninguna señal de si
   el PDF terminó, sigue generándose, o falló.

## 10. Inconsistencias

1. Autorización asimétrica entre `/resumen` e `/informe` para el
   mismo flujo de cierre (ya descrita como problema #1).
2. Dos "colores primarios" compitiendo en `/resumen`: `--ink-900`
   sólido para "Cerrar inspección", `--accent-600` para "Ver informe"
   — sin jerarquía única declarada entre ambos.
3. `EmptyState` compartido, documentado y usado en Recintos (Sprint
   3), no se usa en `/resumen` — estado vacío reimplementado en su
   lugar.
4. Terminología doble para el mismo hecho de negocio: `status:
   "CLOSED"` en el modelo, "Cerrar inspección" en la UI de acción,
   "COMPLETADA" como label en el listado general de inspecciones —
   ningún término es claramente el canónico en toda la app.
5. `ShareReportButton` en `/resumen` comparte la URL de `/informe`,
   no la de `/resumen` misma — consistente pero no obvio por el
   nombre del componente/pantalla donde vive.
6. El texto compartido ("Informe de recepción") está hardcodeado de
   forma independiente en `resumen/page.tsx` e `informe/page.tsx`, sin
   una constante común.

## 11. Preguntas abiertas para la Etapa 2

1. ¿`/informe` debería ser alcanzable por un colaborador externo
   invitado — decisión de producto o descuido de la query?
2. ¿Corresponde que `/resumen` refleje el estado del `Report`, o es
   intencional que esa superficie viva solo en `/informe`?
3. ¿Qué debería pasar si el usuario abandona justo después de cerrar
   pero antes de que termine la generación del PDF — hoy depende
   enteramente de volver a `/informe` para que la reconciliación (90s)
   lo detecte?
4. ¿`InspectionStatus.COMPLETED` es un estado planeado (ej. "100% pero
   sin firmar todavía") aún no implementado, o un remanente sin uso?
5. ¿Deben "Cerrar inspección" y "Ver informe" convivir con la misma
   jerarquía visual actual, o uno debería subordinarse al otro?
6. ¿Qué debería significar "compartir" a futuro, dado que hoy comparte
   un link que exige sesión y pertenencia — se espera una vista
   pública sin login?
7. ¿Las firmas deberían tener algún mecanismo de recuperación de
   borrador si el modal se cierra a medio camino?
8. ¿Corresponde algún tipo de intervención/alerta cuando un `Report`
   agota sus 3 reintentos, más allá del mensaje transitorio en
   `InformeToolbar`?
9. ¿El límite de duración de función serverless (mencionado en un
   comentario del propio código) sigue siendo la restricción operativa
   vigente para la generación del PDF?

---

## Respuestas a las 5 preguntas del encargo

**1. ¿Cuál es el momento exacto en que una inspección deja de estar
"en progreso" y pasa a estar "finalizada"?**
Exclusivamente dentro de `closeInspection` (`actions.ts:1246-1298`),
en el `tx.inspection.update({ data: { status: "CLOSED" } })` dentro de
la transacción que también crea el `Report`. Se invoca desde
`CloseInspectionModal` tras completar el wizard de firma en 2 pasos.
Precondiciones: sesión válida, pertenencia por organización,
`status !== "CLOSED"` todavía, y rol `PROPIETARIO`/
`ADMIN_ORGANIZACION`. No existe ningún otro punto del código que
escriba este cambio de estado.

**2. ¿Qué información necesita realmente el usuario antes de generar
el informe?**
`/resumen` muestra: header con proyecto/unidad; la lista completa de
observaciones (`OBSERVATION`, no las `CORRECT`) con foto, breadcrumb
recinto›elemento, comentario, prioridad y estado de ciclo de vida;
filtros de prioridad/recinto; y, si corresponde al rol, las secciones
de cierre e invitación. **No muestra** ningún `%` de avance ni conteo
de recintos/elementos/fotos en esta pantalla — esos datos agregados
solo aparecen en `/informe` (`InformeSummary`).

**3. ¿Qué decisiones toma el usuario en este tramo del flujo?**
Filtrar observaciones (no persiste); avanzar el ciclo de vida de una
observación (con foto obligatoria si el nuevo estado es "Resuelto");
cerrar la inspección firmando en dos pasos (acción irreversible,
`status !== "CLOSED"` lo impide una segunda vez); invitar a un
colaborador por email (link generado, sin envío); revocar una
invitación existente (inmediato, sin confirmación intermedia); y, ya
en `/informe`, reintentar la generación del PDF si falló, o
descargarlo/exportarlo/compartirlo.

**4. ¿Qué información es solo de lectura y cuál requiere interacción?**
Ver el detalle completo en la sección 4 del reporte de investigación
citado arriba, resumido: en `/resumen`, todo el contenido de cada
tarjeta de observación es lectura salvo el botón "Actualizar estado" y
el link de la tarjeta completa; los filtros, los tres modales
(ciclo de vida, cierre, invitación) y sus botones son 100%
interactivos. En `/informe`, **todo el contenido del documento mismo
es de solo lectura** — cero controles dentro del área imprimible; toda
la interacción de esa pantalla vive en `InformeToolbar`, fuera del
área marcada `no-print`.

**5. ¿Cómo se conecta este módulo con el informe PDF y con futuras
funciones de compartir o firmar?**
El PDF es real y funcional: Puppeteer imprime la propia página
`/informe` ya renderizada (no hay plantilla separada), sube el
binario a Vercel Blob, y queda descargable. Las firmas son reales:
capturadas con `react-signature-canvas`, subidas como PNG a Blob,
persistidas en el `Report` y mostradas (e impresas) en
`InformeSignatures` — pero **están 100% acopladas al momento del
cierre**: no existe ningún flujo de "firmar después" o "volver a
firmar". "Compartir" es real pero limitado — comparte un link
autenticado (`navigator.share` o portapapeles), nunca el archivo PDF
en sí, y no hay ninguna vista pública sin sesión. Estructuralmente
preparado pero sin superficie de uso completa: el sistema de
reintentos (`retryCount`/`lastAttemptAt`) es robusto server-side pero
no tiene ningún panel para que un administrador intervenga si un
informe queda `FAILED` de forma definitiva; la invitación de
colaboradores está completa a nivel de datos pero sin infraestructura
de email real, por diseño explícito.
