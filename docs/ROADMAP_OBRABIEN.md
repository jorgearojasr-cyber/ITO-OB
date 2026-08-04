# Roadmap ObraBien

Referencia oficial del avance de producto. Cada pantalla/feature se
trabaja como un sprint independiente y pasa por el mismo proceso de
6 etapas antes de darse por cerrado. Este documento se actualiza cada
vez que un sprint cambia de estado — es la fuente de verdad de "qué
está aprobado, qué está en curso y qué falta", no un changelog técnico
(para eso está el historial de git). Cuando un grupo de sprints
cerrados completa un objetivo de producto mayor, se registra como
**hito** (ver "Hitos del proyecto" más abajo).

Ver también `Indice-Documentacion-ObraBien.md` (metodología de
clasificación Visión de Producto vs. Implementación) — este roadmap
vive en la capa de Implementación: cada sprint que cierra "Completado"
debe estar respaldado por una especificación verificada contra el
código real, no solo contra los documentos de visión.

## Regla permanente (establecida en el Sprint 2a)

- Los documentos de Visión de Producto **inspiran** el diseño, pero
  **nunca sustituyen** el análisis del código existente.
- Toda implementación **comienza analizando primero el estado real
  del repositorio** — nunca partiendo directo de un documento de
  visión, por completo o detallado que sea.
- Solo después de ese análisis se construye la especificación oficial
  de implementación (Etapa 3).

## Proceso de sprint (6 etapas)

Cada pantalla nueva pasa, en orden, por:

1. **Análisis del código existente** — qué hay hoy, qué se puede
   reutilizar, qué restricciones de arquitectura/datos aplican.
2. **Diseño de la experiencia** — como Product Designer, sin escribir
   código: wireframe, jerarquía visual, estados, flujo de interacción.
3. **Especificación visual** — documento/artifact formal, verificado
   contra el código (no contra los documentos de visión de producto),
   que queda como fuente oficial de implementación.
4. **Validación** — el usuario aprueba la especificación antes de que
   se escriba una sola línea de código de la pantalla.
5. **Implementación** — respetando explícitamente: no modificar
   arquitectura, no modificar lógica de negocio, no modificar
   contratos de datos ni endpoints, sin IA, sin alterar el flujo
   funcional existente. Solo UX/UI/interacción/organización visual.
6. **Cierre del sprint** — resumen de archivos nuevos/modificados,
   decisiones técnicas, verificación en navegador, limitaciones
   encontradas y mejoras sugeridas (no implementadas sin aprobación
   explícita). A partir del cierre, la pantalla solo admite
   correcciones de bugs — no nuevas funcionalidades ni cambios
   visuales, salvo que se abra un sprint nuevo explícitamente.

## Estado de sprints

| Sprint | Pantalla / Feature | Estado | Especificación oficial |
|---|---|---|---|
| 1 | Pantalla de Elemento | ✅ **Completado** | *"Pantalla de Elemento — Rediseño v1"* (artifact `0610637a-0c77-4b39-bbbe-e87fe0c4d19c`) |
| 2a | Pantalla de Bienvenida — Inicio | ✅ **Completado** | *"Pantalla de Inicio — Spec Visual v1"* (artifact `cfadafc7-d06d-41c5-9852-ac8b04aa07f7`) |
| 2b | Pantalla de Bienvenida — Onboarding de inspección | ✅ **Completado** | *"Bienvenida a una Inspección — Spec Visual v1"* (artifact `a8ec7e8b-9081-4d05-bea1-1bd94bfb63d8`) |
| 3 | Flujo de Recintos (lista + detalle) | ✅ **Completado** | *"Flujo de Recintos — Spec Visual v1"* (artifact `97c2d824-5855-44f4-8a23-95f4ec9432db`) |
| C1 | Sprint de consolidación (documentación oficial) | ✅ **Completado** | Ver sección dedicada abajo |
| 4 | Experiencia del Resumen de Inspección | ✅ **Completado** | *"Resumen de Inspección — Spec Visual v1"* (artifact `302e09b1-77f8-4d17-8712-bedf63520340`) |
| UX-01 | Revisión integral del flujo (Inicio → Informe) | ✅ **Completado** | `Sprint-UX01-Revision-Integral-Flujo.md` — sprint de análisis, sin proceso de 6 etapas |
| 5 | Finalización de la Inspección (Resumen → Informe listo) | ✅ **Completado** | `Sprint-5-Analisis-Finalizacion-Inspeccion.md`, `Sprint-5-Diseno-Experiencia-Finalizacion-Inspeccion.md`, *"Especificación Visual v1"* (artifact `c28d0c49-6f3e-4fd3-af3e-e7732718b338`), `Sprint-5-Validacion-Finalizacion-Inspeccion.md` |
| — | Resto de pantallas del flujo | ⬜ No iniciadas | *(pendiente)* |

Leyenda: ⬜ No iniciado · 🔜 En preparación/análisis · 🛠️ En diseño ·
🚧 En implementación · ✅ Completado (solo bugfixes desde acá) · 🔒 Cerrado.

---

## Fases del proyecto

Una fase agrupa hitos bajo un objetivo estratégico aún mayor —
declarada y cerrada explícitamente por el usuario, no por completar
una lista de sprints.

### Fase 1 — Construcción de la Experiencia Principal

**Estado: ✅ Completada** (cerrada oficialmente tras el Sprint 5).
Objetivo: construir el recorrido completo de una inspección, de punta
a punta. Contiene el Milestone 1 (ver abajo) como único hito.

### Fase 2 — Validación del Producto

**Estado: 🔜 En curso** (iniciada tras el cierre de la Fase 1). Cambia
la prioridad del proyecto: **no se abren nuevos módulos funcionales
del recorrido principal por defecto** — antes de construir lo
siguiente, se confirma con usuarios reales que el Milestone 1 es
realmente excelente.

- **Plan de investigación**: `Fase2-Plan-Validacion-Producto.md` —
  metodología de pruebas con usuarios reales que nunca hayan recibido
  una vivienda, guion de tareas sobre los 7 tramos del Milestone 1,
  métricas cuantitativas (SUS, tasas de éxito, Likert por tramo) y
  cualitativas, criterios de triage en 3 caminos (bugfix / ajuste de
  UX en lote / nuevo sprint) y proceso de documentación y
  priorización del feedback.
- **Rondas de validación**: pendientes de agendar y ejecutar. Se
  registrarán acá a medida que se completen (`Fase2-Ronda-N-Hallazgos.md`
  por ronda).

---

## Hitos del proyecto

Un hito agrupa varios sprints ya cerrados bajo un objetivo de producto
mayor — a diferencia de un sprint, no pasa por las 6 etapas; se
registra cuando el usuario lo declara alcanzado.

### Milestone 1 — Experiencia Principal de Inspección

**Estado: ✅ Completado** (declarado tras el cierre del Sprint 5, como
único hito de la Fase 1).

Cubre el recorrido completo de una inspección, de punta a punta, cada
tramo cerrado siguiendo el proceso de 6 etapas:

| Tramo | Sprint que lo cerró |
|---|---|
| Inicio | Sprint 2a |
| Bienvenida | Sprint 2b |
| Recorrido (recintos) | Sprint 3 |
| Elementos | Sprint 1 |
| Resumen | Sprint 4 |
| Finalización | Sprint 5 |
| Informe | Sprint 5 |

**A partir de este hito, la prioridad del proyecto cambia**: deja de
ser construir el flujo principal (ya completo) y pasa a ser
**validarlo con usuarios reales** y **fortalecer el ecosistema
alrededor de él** (colaboradores, postventa, biblioteca técnica, y lo
que la validación real termine revelando como necesario) — no abrir
nuevos módulos funcionales del recorrido principal por costumbre.

---

## Sprint 1 — Pantalla de Elemento

**Estado: ✅ Completado — cerrado.** Desde este punto, esta pantalla
solo acepta correcciones de bugs. Nuevas funcionalidades o cambios
visuales requieren abrir un sprint nuevo explícito.

- **Especificación oficial**: *"Pantalla de Elemento — Rediseño v1"*
  (Claude Code, artifact `0610637a-0c77-4b39-bbbe-e87fe0c4d19c`),
  construida y verificada contra el código real de
  `src/components/elemento/` y `src/app/inspecciones/[inspectionId]/elementos/[elementId]/`.
- **Principios respetados**: arquitectura, lógica de negocio,
  contratos de datos (`saveChecklistAnswer`, `attachPhoto`) y flujo
  funcional existentes, sin cambios. Sin integración de IA (solo un
  espacio visual reservado e inerte). Cambios exclusivamente de
  UX/UI/interacción.
- **Componentes nuevos**: `DonJoseLuisAvatar`, `DonJoseLuisCard`,
  `GuidedCameraOverlay`, `ChecklistItemCard` (reemplaza a
  `ChecklistItemRow`), `ElementInspectionExperience` (orquestador,
  dueño del header sticky con progreso + avatar persistente de Don
  José Luis).
- **Componentes reutilizados tal cual**: `ElementLibraryCard`,
  `GoodBadExamplesSection`, `PhotoLightbox`, `BackHeader`.
- **Ajustes post-aprobación** (mismo sprint, antes del cierre): Don
  José Luis colapsa a un avatar persistente en el header en vez de
  desaparecer; indicador de progreso "N/M" en el header; ambos estados
  se derivan de los datos del servidor (`element.checklist`), no de
  `localStorage`, para persistir correctamente entre visitas.
- **Bug encontrado y corregido durante la verificación**: `setState`
  de un componente padre disparado desde el *updater* de `setState` de
  un componente hijo (`ElementChecklist` → `ElementInspectionExperience`)
  — resuelto moviendo el efecto a `useEffect`.
- **Limitaciones conocidas** (documentadas, no bloqueantes): sin
  layout de dos columnas en desktop (se mantiene el mismo
  `max-width: 480px` que el resto de la app); sin ícono de estado
  intermedio si el usuario recarga a mitad de una acción no guardada
  (el estado persistido es siempre el último guardado en servidor).

---

## Sprint 2 — Pantalla de Bienvenida

**Estado: 🔜 En preparación.** Aún no se ha escrito código.
"Pantalla de Bienvenida" cubre dos pantallas distintas del producto,
que se trabajan como dos sub-sprints independientes, cada uno con su
propio recorrido de 6 etapas y su propia especificación oficial:

- **Sprint 2a — Pantalla de Inicio**: la pantalla que ya tiene un
  prototipo visual aprobado en `docs/obrabien-inicio-prototipo.html`
  (home con avance general, siguiente paso, accesos rápidos,
  biblioteca técnica, etc.). Fuente de verdad del lenguaje visual del
  producto — colores, tipografía, espaciados, jerarquía.
- **Sprint 2b — Onboarding de inspección**: pantalla hoy inexistente
  en el código, que recibiría al usuario justo antes de comenzar el
  recorrido guiado de una inspección.

Se recomienda encarar primero el 2a (ya existe una implementación real
que analizar) y luego el 2b (pantalla nueva, sin código previo que
verificar). El orden final queda a definir al abrir cada sub-sprint.

### Sprint 2a — Pantalla de Inicio

| Etapa | Estado |
|---|---|
| 1. Análisis del código existente | ✅ Completado — ver `Sprint-2a-Analisis-Pantalla-Inicio.md` |
| 2. Diseño de la experiencia (Product Designer, sin código) | ✅ Completado — ver `Sprint-2a-Diseno-Experiencia-Pantalla-Inicio.md` |
| 3. Especificación visual (verificada contra código) | ✅ Completado — artifact `cfadafc7-d06d-41c5-9852-ac8b04aa07f7` ("Pantalla de Inicio — Spec Visual v1") |
| 4. Validación | ✅ Completado — aprobada por el usuario; validación técnica encontró 2 desviaciones reales (ver abajo), resueltas antes de implementar |
| 5. Implementación | ✅ Completado |
| 6. Cierre del sprint | ✅ Completado — ver resumen abajo |

**Estado: ✅ Completado — cerrado.** Desde este punto, esta pantalla
solo acepta correcciones de bugs.

- **Desviaciones encontradas en la Etapa 4** (antes de tocar código):
  `DonJoseLuisAvatar`/`DonJoseLuisCard` vivían en
  `src/components/elemento/` (no en una carpeta transversal) y
  `DonJoseLuisVariant` solo aceptaba `"enseñando" | "escuchando"`
  (semántica de Elemento, no aplicable a Inicio). Ambas se resolvieron
  con el visto bueno explícito del usuario antes de implementar, dado
  que tocaban archivos del Sprint 1 (cerrado).
- **Componentes nuevos**: `DonJoseLuisPresence` (`src/components/ui/`)
  — chip de altura fija, mensaje vía prop, pensado para reutilizarse en
  el header de cualquier pantalla del ecosistema.
- **Componentes movidos**: `DonJoseLuisAvatar.tsx`/`DonJoseLuisCard.tsx`
  de `src/components/elemento/` a `src/components/ui/` (mismo patrón
  que `BackHeader`/`ProgressRing`/`NormativeScopeNotice`). Cambio de
  ruta + imports únicamente — sin alterar su comportamiento en la
  Pantalla de Elemento.
- **Extensión aditiva**: `DonJoseLuisVariant` suma un tercer valor,
  `"presente"` (misma cara que las otras dos hoy) — las 2 variantes de
  Elemento quedan intactas.
- **Componentes modificados**: `TopBar.tsx` (slot opcional para
  `DonJoseLuisPresence`), `HeroProgressCard.tsx` (CTA en "sin
  inspección activa", stats a línea compacta bajo el CTA, badge visual
  en estados vacíos), `NextStepCard.tsx` (eyebrow "CONTINUEMOS", copy
  de continuidad, nueva prop `progress` para diferenciar "sin
  recintos" de "100% revisado"), `QuickAccessGrid.tsx` (Recintos como
  fila destacada + color-coding por categoría), `page.tsx` (calcula el
  mensaje de Don José Luis y lo pasa a `TopBar`).
- **Sin cambios**: `getInicioData()`, `getUnreadNotificationCount()`,
  `OnboardingCarousel`, `TipOfTheDayCard`, `LibraryCarousel`,
  `BottomNav`, `ProgressRing`.
- **Verificación en navegador**: `tsc`/`eslint` limpios. Probado en
  vivo con el usuario demo (estado "con pendientes") y con un usuario
  desechable creado y eliminado durante la sesión (estados "sin
  proyectos" y "sin inspección activa" — este último confirmó la
  corrección del problema de UX #1, ahora con CTA). El estado "100%
  revisado" se verificó por revisión de código y `tsc`, no con un
  click-through en vivo (armar esa combinación de datos en
  `development` habría requerido más andamiaje de seed del necesario
  para un cambio de UI condicional ya cubierto por tipos).
- **Limitaciones conocidas**: sin señal de múltiples inspecciones
  `IN_PROGRESS` simultáneas (decisión de la Etapa 2: fuera de
  alcance); imágenes de Biblioteca técnica siguen en Unsplash (TODO
  conocido, sin cambios).

### Sprint 2b — Onboarding de inspección

| Etapa | Estado |
|---|---|
| 1. Análisis del código existente | ✅ Completado — ver `Sprint-2b-Analisis-Onboarding-Inspeccion.md` |
| 2. Diseño de la experiencia (Product Designer, sin código) | ✅ Completado — ver `Sprint-2b-Diseno-Experiencia-Bienvenida-Inspeccion.md` |
| 3. Especificación visual (verificada contra código) | ✅ Completado — artifact `a8ec7e8b-9081-4d05-bea1-1bd94bfb63d8` ("Bienvenida a una Inspección — Spec Visual v1") |
| 4. Validación | ✅ Completado — aprobada con 3 ajustes de copy (CTA "Comenzar inspección", saludo centrado en la persona, línea de confianza junto al CTA) |
| 5. Implementación | ✅ Completado |
| 6. Cierre del sprint | ✅ Completado — ver resumen abajo |

**Estado: ✅ Completado — cerrado.** Desde este punto, esta pantalla
solo acepta correcciones de bugs.

- **Ruta nueva**: `src/app/inspecciones/[inspectionId]/bienvenida/page.tsx`
  — pantalla completa (sin `TopBar`/`BottomNav`), alcanzable solo desde
  el redirect de `createInspection`. Reanudar una inspección
  ("Continuar recorrido" desde Inicio) nunca pasa por acá.
- **Componentes nuevos**: `InspectionWelcome.tsx`
  (`src/components/onboarding/`, junto a `OnboardingCarousel` por ser,
  como él, una pantalla de una sola vez) y
  `get-inspection-welcome-data.ts` (query de solo lectura: `user.name`,
  `projectName`/`unitLabel`, primer recinto — mismo criterio de orden
  que ya usaba `createInspection`).
- **Extensión aditiva**: `DonJoseLuisAvatar` suma `size="lg"`
  (~108px) para el rol protagónico de esta pantalla — `"md"`/`"sm"`
  quedan intactos.
- **Único cambio a código existente**: el `redirect` final de
  `createInspection` pasa de `/recintos/{firstRoomId}` a
  `/bienvenida`; el fallback sin recintos (`redirect("/")`) se
  mantiene igual. Ambas desviaciones (este cambio + la extensión de
  `DonJoseLuisAvatar`) fueron aprobadas explícitamente en la Etapa 4
  antes de tocar código.
- **Copy final** (ajustado en la Etapa 4 sobre la spec visual): saludo
  centrado en la persona ("Hola, {nombre}. Bienvenido. Hoy
  comenzaremos la inspección de tu vivienda."), promesa de
  acompañamiento explícita, contexto del proyecto en una pill aparte,
  línea de confianza discreta pegada al CTA (no al mensaje de Don José
  Luis, para no competir con el principio de "respiro"), CTA
  "Comenzar inspección".
- **Sin cambios**: `OnboardingCarousel`, modelo de datos (sin campos
  ni tablas nuevas — la "no repetición" es un efecto de la
  navegación), `saveChecklistAnswer`/`attachPhoto`/cualquier otra
  Server Action de negocio.
- **Verificación en navegador**: `tsc`/`eslint` limpios. Flujo
  completo probado en vivo con el usuario demo: formulario de 3 pasos
  → creación real de una inspección → aterrizaje en `/bienvenida` con
  el nombre real del usuario y el proyecto correcto → CTA lleva
  exactamente al primer recinto (`/recintos/{firstRoomId}`) →
  contenido del recinto carga con normalidad. Datos de prueba
  eliminados al terminar.
- **Incidente durante la verificación (no relacionado con el código
  del sprint)**: una sesión de navegador con una cookie de un usuario
  de prueba ya eliminado en una vuelta anterior causó un error de
  clave foránea al crear una inspección — resuelto cerrando sesión
  correctamente (vía el endpoint de `signout`, ya que la propia
  pantalla de Perfil fallaba al intentar cargar un usuario inexistente)
  y volviendo a autenticar con el usuario demo. No requirió ningún
  cambio de código.
- **Limitaciones conocidas**: la variante de copy para colaboradores
  invitados (extensión futura, documentada en la Etapa 2) no está
  implementada — hoy un invitado sigue yendo directo al recinto, igual
  que antes de este sprint.

**Insumo de visión de producto disponible** (a contrastar contra el
código real antes de convertirse en especificación oficial de
cualquiera de los dos sub-sprints, no a usar directamente):
`Spec-01-Bienvenida-Inicio-Inspeccion.md`,
`Storyboard-Experiencia-ObraBien.md`, `Guion-Inspector-Recepcion-Vivienda.md`,
`Master-Character-Bible-Don-Jose-Luis.md` y
`Protocolo-Interaccion-Don-Jose-Luis.md` (ver
`Indice-Documentacion-ObraBien.md`). Estos documentos representan la
dirección de largo plazo del producto y **no reflejan necesariamente
el estado actual del código**. Ninguno de los 4 está físicamente en
el repositorio (confirmado por búsqueda en la Etapa 1 del Sprint 2b)
— el usuario confirmó que esto no bloquea el sprint: viven en la capa
de Visión de Producto (fuera del repo por diseño, ver
`Indice-Documentacion-ObraBien.md`) y se usan como referencia de tono
al contrastarlos contra el diseño, nunca como especificación directa.

---

## Sprint 3 — Flujo de Recintos

**Estado: 🔜 En preparación.** Aún no se ha escrito código ni
diseñado la experiencia.

| Etapa | Estado |
|---|---|
| 1. Análisis del código existente | ✅ Completado — ver `Sprint-3-Analisis-Flujo-Recintos.md` |
| 2. Diseño de la experiencia (Product Designer, sin código) | ✅ Completado — ver `Sprint-3-Diseno-Experiencia-Flujo-Recintos.md` |
| 3. Especificación visual (verificada contra código) | ✅ Completado — artifact `97c2d824-5855-44f4-8a23-95f4ec9432db` ("Flujo de Recintos — Spec Visual v1") |
| 4. Validación | ✅ Completado — ver `Sprint-3-Validacion-Flujo-Recintos.md` |
| 5. Implementación | ✅ Completado |
| 6. Cierre del sprint | ✅ Completado — ver resumen abajo |

**Estado: ✅ Completado — cerrado.** Desde este punto, este flujo
solo acepta correcciones de bugs.

- **Decisión de producto permanente**: algoritmo único de "primer
  trabajo pendiente" — ver `PRODUCT_DECISIONS.md`. Extraído a
  `src/lib/inspections/next-pending-room.ts`, usado ahora por
  `getInicioData()` (`nextStep`, Sprint 2a — refactor sin cambio de
  comportamiento), `getRoomsListData()` (recinto "actual" en la
  lista) y `getRoomInstanceData()` (`RoomCompletionBanner`). Ninguna
  implementación paralela por índice.
- **Componente nuevo**: `RoomCompletionBanner` — un único CTA hacia el
  siguiente recinto con trabajo pendiente, o "Ir al resumen" si no
  queda ninguno.
- **Componentes/queries modificados**: `get-room-instance-data.ts`
  (suma `projectName`/`unitLabel`, `position`/`totalRooms`,
  `nextPendingRoom` — todo de solo lectura, sin campos nuevos en el
  schema), `recintos/[roomId]/page.tsx` (`BackHeader` con `subtitle` +
  píldora de posición, `backHref` ahora a la lista, renderiza el
  banner), `get-rooms-list-data.ts`/`RoomListRow` (recinto "actual"
  resaltado con borde de acento), color de barra unificado a
  `var(--accent-600)` en lista y detalle, `EmptyState` de "Aún no hay
  recintos" con `action` hacia Inicio.
- **Sin cambios**: modelo de datos (ningún campo nuevo), flujo de
  material/ducha-tina (Sprint 1), `OnboardingCarousel`,
  `saveChecklistAnswer`/`attachPhoto`. Don José Luis no se incorporó a
  este flujo (evaluación explícita en la Etapa 3 — sin momento
  genuino identificado).
- **Verificación en navegador**: `tsc`/`eslint` limpios. Los 5
  escenarios de la Etapa 4 probados en vivo con el usuario demo
  (estados de datos simulados vía script y revertidos al terminar):
  primer recinto con orientación completa, reanudación saltando
  correctamente recintos ya completos, `RoomCompletionBanner`
  sugiriendo el siguiente recinto pendiente real, último recinto con
  CTA "Ir al resumen", y `backHref` volviendo a la lista de recintos.
  Un 404 transitorio por caché de compilación de Turbopack al primer
  hit tras los cambios, resuelto por el siguiente hot-reload — no era
  un defecto de la implementación.
- **Limitaciones conocidas**: los hallazgos menores no priorizados en
  la Etapa 3 (cómputo de progreso duplicado entre `get-rooms-list-data.ts`
  y `get-room-instance-data.ts`, mapa de íconos incompleto, doble
  query de autorización en la lista, estado vacío de "cero elementos"
  en un recinto) quedan sin resolver, documentados como tal desde la
  Etapa 3.

Alcance: las dos pantallas del flujo — lista de recintos
(`/recintos`) y detalle de un recinto (`/recintos/[roomId]`). El
análisis de la Etapa 1 encontró 11 problemas concretos de código
(cómputo de progreso duplicado, colores inconsistentes entre lista y
detalle, `backHref` fijo que salta la lista, sin navegación
recinto→recinto, sin tratamiento de "recinto completo", mapa de
íconos incompleto, entre otros — ver el documento completo) y 8
preguntas abiertas que una Etapa 2 debería resolver antes de diseñar.

---

## Sprint de consolidación C1 — Documentación oficial

**Estado: ✅ Completado.** Sprint corto, sin cambios de código ni de
comportamiento — fortalece la base documental del producto tras
cerrar los Sprints 1, 2a, 2b y 3, antes de abrir el Sprint 4.

Cuatro documentos nuevos, todos en `docs/`:

- **`DESIGN_SYSTEM_OBRABIEN.md`** — colores, tipografía, espaciados,
  radios, sombras, componentes, iconografía, animaciones, Don José
  Luis y principios de UX, tal como existen hoy en el código (fuente:
  `src/styles/tokens.css` y los `.module.css` reales).
- **`USER_FLOW_OBRABIEN.md`** — flujo completo de la aplicación,
  puntos de entrada, transiciones y estados finales, verificado contra
  cada `page.tsx` real bajo `src/app/`.
- **`COMPONENT_INVENTORY.md`** — inventario completo de componentes
  reutilizables con ubicación, tipo (Server/Client) y nivel de
  reutilización real (confirmado por uso, no supuesto).
- **`DESIGN_DECISIONS.md`** — principios permanentes aprobados durante
  los Sprints 1, 2a, 2b y 3, organizados por origen y sintetizados en
  10 reglas vigentes para cualquier pantalla futura. Complementa (no
  reemplaza) a `PRODUCT_DECISIONS.md`.

Sin implementación — ninguna pantalla, componente ni comportamiento
fue modificado durante este sprint.

---

## Sprint 4 — Experiencia del Resumen de Inspección

**Estado: 🔜 En preparación.** Aún no se ha diseñado ni escrito
código. Alcance: todo el flujo de cierre, no solo `/resumen` — incluye
`/informe`, generación del PDF, ciclo de vida de observaciones,
invitación de colaboradores en este tramo, y firmas.

| Etapa | Estado |
|---|---|
| 1. Análisis del código existente | ✅ Completado — ver `Sprint-4-Analisis-Resumen-Inspeccion.md` |
| 2. Diseño de la experiencia (Product Designer, sin código) | ✅ Completado — ver `Sprint-4-Diseno-Experiencia-Resumen-Inspeccion.md` |
| 3. Especificación visual (verificada contra código) | ✅ Completado — artifact `302e09b1-77f8-4d17-8712-bedf63520340` ("Resumen de Inspección — Spec Visual v1") |
| 4. Validación | ✅ Completado — ver `Sprint-4-Validacion-Resumen-Inspeccion.md` |
| 5. Implementación | ✅ Completado |
| 6. Cierre del sprint | ✅ Completado — ver resumen abajo |

**Estado: ✅ Completado — cerrado.** Desde este punto, esta pantalla
solo acepta correcciones de bugs.

- **`/resumen` responde ahora "¿Cómo quedó esta vivienda?"** antes de
  mostrar la lista de observaciones — síntesis calculada por
  `synthesis-rules.ts` (motor de reglas deterministas, extensible,
  3 reglas en la V1), con el progreso como texto plano de apoyo
  (nunca `ProgressRing` — decisión de la Etapa 4, para no reabrir un
  componente de un sprint cerrado y adaptarlo a un tamaño para el que
  no fue construido).
- **Extensión de datos, la única de este sprint**: `get-observations-summary-data.ts`
  suma `progress: { totalElements, doneElements, percent }`, mismo
  cálculo ya usado en Inicio/Recintos, sin campo nuevo en el schema ni
  cambio en `inspectionAccessWhere`.
- **Componentes nuevos**: `InspectionSynthesisCard.tsx` (reutiliza
  `PriorityBadge` para los chips, ya tal cual existía).
- **`/resumen` ahora señaliza el cierre**: badge "✓ Inspección
  cerrada" + CTA "Ver el informe firmado" reemplazan al botón de
  cierre una vez que la inspección está `CLOSED` — antes no había
  ninguna señal visual de ese estado en esta pantalla.
- **Sin cambios**: autorización (`/informe` sigue restringida,
  `/resumen` sigue con `inspectionAccessWhere`), `InspectionStatus.COMPLETED`
  no se usó en ninguna rama, `CloseInspectionSection`/
  `InviteCollaboratorSection`/`ObservationsSummaryList` sin tocar.
  Don José Luis no se incorporó, por decisión explícita documentada en
  la Etapa 3.
- **Verificación en navegador**: `tsc`/`eslint` limpios. Los 3 tonos
  de la síntesis probados en vivo con datos reales (sin observaciones,
  con observaciones de prioridad alta, con inspección cerrada) —
  incluyendo la frase de progreso completo ("Se revisaron los 45
  elementos de la inspección") vs. parcial ("Se revisaron 0 de 45
  elementos"). Datos de prueba creados y revertidos al terminar.
- **Limitaciones conocidas**: los hallazgos menores de la Etapa 1 no
  priorizados (terminología "cerrada" vs. "completada", umbral
  duplicado de generación lenta, asimetría de autorización
  `/resumen`/`/informe` ya documentada como decisión de producto)
  quedan sin resolver, tal como se acordó desde la Etapa 2.

**Decisiones de producto resueltas antes de la Etapa 2** (ver
`PRODUCT_DECISIONS.md` #2 y #3): la autorización de `/informe` no se
toca en este sprint (sigue restringida al propietario/gestor,
distinta de `/resumen`); `InspectionStatus.COMPLETED` queda como
estado reservado, sin usarse en el diseño.

**Objetivo central de la Etapa 2**: `/resumen` deja de organizarse
como una lista de observaciones y pasa a responder una única
pregunta — "¿Cómo quedó esta vivienda después de la inspección?" —
con una síntesis calculada (no redactada a mano) que antecede a la
evidencia (observaciones, prioridades, fotos), la cual pasa a un rol
de apoyo en vez de ser el contenido principal.

**Hallazgos clave de la Etapa 1** (9 problemas, 6 inconsistencias, 9
preguntas abiertas — ver el documento para el detalle completo):
`/informe` es inalcanzable para colaboradores externos pese a que
`/resumen` sí lo es; una reconciliación de estado muta la base de
datos dentro de un GET; `InspectionStatus.COMPLETED` no tiene ningún
escritor en el código actual; dos "colores primarios" compiten en
`/resumen` sin jerarquía declarada; `EmptyState` compartido no se
reutiliza en esta pantalla pese a estar documentado desde el Sprint 3.

Punto de partida ya despejado gracias al análisis: el PDF y las firmas
son capacidades reales y funcionales hoy (no aspiracionales); lo que
falta resolver es sobre todo jerarquía visual, señalización de estado
del reporte, y una decisión de producto sobre el acceso de
colaboradores externos a `/informe`.

---

## Sprint UX-01 — Revisión integral del flujo

**No sigue el proceso de 6 etapas** — es un sprint corto de análisis
puro, sin diseño ni implementación, pedido explícitamente entre el
cierre del Sprint 4 y la apertura del próximo módulo funcional.
Objetivo: recorrer la aplicación completa (Inicio → Crear inspección →
Bienvenida → Recorrido de recintos → Inspección de elementos → Resumen
→ Informe) como una persona sin conocimientos técnicos que recibe su
vivienda por primera vez, documentando qué transmite cada etapa,
fricciones, inconsistencias, oportunidades de simplificación, de
acompañamiento y de continuidad entre pantallas — sin proponer
soluciones todavía.

Documento: `Sprint-UX01-Revision-Integral-Flujo.md`.

**Hallazgos principales**: el algoritmo único de "próximo pendiente"
sostiene la continuidad entre Inicio, recintos y el banner de fin de
recinto; Don José Luis está bien calibrado por pantalla (presente en
Bienvenida y Elementos, discreto en Inicio, ausente en Resumen/Informe);
dos inconsistencias de copy (el paso 2 del onboarding describe
"Marca ✔ u ⚠" mientras la UI real usa "✓ Está bien" / "Reportar un
problema"; el saludo de Bienvenida usa nombre completo y "Bienvenido"
con género marcado); un vacío de contenido (falta ficha técnica para
"Calefont o termo eléctrico"); una construcción de frase algo forzada
en el mensaje "Enseñando" de Don José Luis cuando el tip ya trae su
propio prefijo de categoría; y la ausencia de una pantalla explícita
de "generando informe" durante el cierre (la generación se resolvió
dentro del mismo estado "Cerrando…" del botón de firma). Se registró
también, solo como observación de experiencia (no como bug de
aplicación), el 404 transitorio de primera-compilación de Turbopack ya
visto antes en el Sprint 3, en el peor momento narrativo posible: el
primer tap del usuario hacia el recorrido guiado.

Sin decisiones de implementación tomadas — quedan como insumo para
definir el próximo sprint funcional.

---

## Sprint 5 — Finalización de la Inspección

**Estado: 🔜 En preparación.** Aún no se había diseñado ni escrito
código. Alcance, más angosto que el análisis general de cierre ya
hecho en el Sprint 4: el tramo **Resumen → Firma → Finalizando la
inspección → Generación del informe → Informe listo → Acciones
posteriores**. Objetivo declarado: que el cierre de una inspección
tenga el mismo nivel de calidad emocional y narrativa que Inicio,
Bienvenida y el recorrido de recintos.

| Etapa | Estado |
|---|---|
| 1. Análisis del código existente | ✅ Completado — ver `Sprint-5-Analisis-Finalizacion-Inspeccion.md` |
| 2. Diseño de la experiencia (Product Designer, sin código) | ✅ Completado — ver `Sprint-5-Diseno-Experiencia-Finalizacion-Inspeccion.md` |
| 3. Especificación visual (verificada contra código) | ✅ Completado — artifact `c28d0c49-6f3e-4fd3-af3e-e7732718b338` ("Especificación Visual v1") |
| 4. Validación | ✅ Completado — ver `Sprint-5-Validacion-Finalizacion-Inspeccion.md` |
| 5. Implementación | ✅ Completado |
| 6. Cierre del sprint | ✅ Completado — ver resumen abajo |

**Estado: ✅ Completado — cerrado.** Desde este punto, este tramo solo
acepta correcciones de bugs.

- **Hallazgo central de la Etapa 1**: hoy no existía una experiencia
  de cierre, solo una transición técnica entre la firma y el informe
  ("Cerrando…" en un botón, seguido de `router.push` directo a
  `/informe`).
- **Dos principios permanentes agregados tras aprobar la Etapa 2**: el
  cierre nunca transmite urgencia; el informe nunca es el protagonista
  de este tramo (lo es la finalización correcta de la inspección). Un
  tercero se agregó tras la Etapa 3: la pantalla de cierre nunca deja
  al usuario sin una salida.
- **Decisión de arquitectura de implementación** (Etapa 4, Escenario
  6): la pantalla de cierre vive como el **estado inicial de
  `/informe`**, no como una ruta nueva — reutiliza íntegramente el
  polling y la reconciliación de `PENDING → FAILED` que ya existían.
  `CloseInspectionModal` navega con `?justClosed=1`; un nuevo
  `InformeCloseGate` (cliente) decide mostrar la experiencia de cierre
  o revelar el documento ya renderizado por el servidor, sin duplicar
  la consulta de datos.
- **Componentes nuevos**: `ClosingExperience.tsx` (+ `.module.css`) —
  titular, Don José Luis, recap del recorrido, pill de estado del
  informe y CTA; `InformeCloseGate.tsx` — el interruptor cliente entre
  cierre y documento.
- **Refactor sin cambio de comportamiento**: el polling y el umbral de
  "esto se está demorando" (antes duplicados como constantes
  independientes, señalado como inconsistencia desde el Sprint 4) se
  extrajeron a `src/lib/informe/use-report-polling.ts`, usado ahora
  tanto por `InformeToolbar` como por `ClosingExperience` — una sola
  fuente de verdad.
- **Extensión de datos, la única de este sprint**: `getInformeData()`
  suma `summary.doneElements` (el numerador que ya se calculaba
  internamente para `percent`, ahora expuesto) — sin campo nuevo en el
  schema.
- **Copy ajustado en la validación con el usuario** (antes de
  implementar): titular "Terminaste de recorrer tu vivienda" (100%) /
  "Cerraste tu inspección" (avance parcial) — nunca presupone
  completitud, porque el sistema sigue permitiendo cerrar con
  elementos pendientes (decisión de producto explícita: no se tocó esa
  lógica en este sprint); el recap muestra "revisados/total", no el
  total crudo; mensaje de Don José Luis centrado en el valor del
  respaldo obtenido, no en "quedó guardado"; nota de postventa en
  lenguaje cercano al usuario final.
- **Confirmación visual de firmas** (`CloseInspectionModal.tsx`): cada
  firma trazada pasa a un estado "capturado" (borde/fondo verde + ✓),
  con una línea de texto que en la segunda firma confirma
  explícitamente que ambas partes ya quedaron registradas.
- **Sin cambios**: `closeInspection`/`retryReportGeneration` (lógica
  de negocio intacta), modelo de datos (sin migración), autorización.
- **Verificación en navegador**: `tsc`/`eslint` limpios. Los dos
  escenarios reales probados en vivo con datos de prueba (creados y
  eliminados al terminar): cierre al 100% (título "Terminaste de
  recorrer tu vivienda", 64/64 elementos, pill pasando directo a
  "Informe listo") y cierre parcial (título "Cerraste tu inspección",
  32/64 elementos, pill mostrando "Generando informe…" y pasando solo
  —vía el polling real, sin recarga manual— a "Informe listo" cuando
  el servidor confirmó `READY`). "Ver informe" verificado revelando el
  documento real en ambos casos.
- **Limitaciones conocidas**: los hallazgos menores de la Etapa 4 no
  priorizados (autorización asimétrica `/resumen`/`/informe`, firmas
  huérfanas en Blob si `closeInspection` falla después de subirlas,
  filtrado 100% client-side en `/resumen`, `InspectionStatus.COMPLETED`
  sin escritor) quedan sin resolver, documentados como tal desde la
  Etapa 4 — mismos hallazgos ya registrados en el Sprint 4, no nuevos
  de este sprint.

---

## Próximas pantallas (sin iniciar)

Pendientes de numerarse como sprint una vez que el Sprint 3 cierre.
Se irán agregando a esta tabla a medida que se definan, siguiendo el
mismo proceso de 6 etapas.
