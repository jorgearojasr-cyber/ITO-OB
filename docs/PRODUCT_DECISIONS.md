# Decisiones permanentes de producto — ObraBien

Reglas que aplican a todo el producto, no a un sprint en particular.
Se agregan acá cuando una decisión tomada durante un sprint tiene
alcance transversal — a diferencia de `ROADMAP_OBRABIEN.md`, que
registra el avance de cada pantalla, este documento registra **reglas
que cualquier sprint futuro debe respetar por defecto**, sin volver a
discutirlas desde cero.

---

## 1. Algoritmo único de "siguiente paso pendiente"

**Regla**: todo componente que sugiera el siguiente paso del usuario
deberá utilizar el algoritmo único de "primer trabajo pendiente,
respetando el orden definido". No se permiten implementaciones
paralelas basadas únicamente en índice o posición visual.

**Definición exacta del algoritmo**: dado un conjunto ordenado de
unidades de trabajo (hoy, recintos dentro de una inspección — el
concepto es genérico, no exclusivo de recintos), el "siguiente paso"
es la **primera unidad, en el orden ya definido, que todavía tenga al
menos un ítem pendiente** — nunca "la unidad en la posición
índice+1" ni ninguna otra noción de adyacencia puramente visual.

**Origen de la regla**: Sprint 3 (Flujo de Recintos), Etapa 4. Al
validar el `RoomCompletionBanner`, se detectó que una implementación
por índice+1 podía sugerir un recinto ya completado si el usuario
había avanzado fuera de orden (por ejemplo, saltando desde la lista
de recintos) — rompiendo el objetivo de que la app nunca envíe al
usuario a un lugar sin nada pendiente. La corrección fue adoptar
exactamente el mismo criterio que ya usaba `nextStep` en la Pantalla
de Inicio (Sprint 2a) desde antes de que existiera esta regla escrita.

**Implementación de referencia**: `src/lib/inspections/next-pending-room.ts`
— función compartida, consumida tanto por `getInicioData()`
(`nextStep`) como por `getRoomsListData()` (recinto "actual"
destacado en la lista) y `getRoomInstanceData()`
(`RoomCompletionBanner`). Cualquier pantalla futura que necesite
sugerir "qué sigue" debe importar esta misma función, no
reimplementar el cálculo.

**Objetivos que protege esta regla**:
- Nunca enviar al usuario a un lugar ya completado.
- Mantener una única definición de "siguiente paso" en toda la
  aplicación — un cambio de criterio se hace en un solo lugar, no se
  sincroniza a mano entre varias implementaciones.
- Reutilizar lógica existente en vez de crear implementaciones
  paralelas que puedan divergir con el tiempo.

---

## 2. El informe final firmado es un documento restringido — distinto de `/resumen`

**Regla**: `/resumen` y `/informe` mantienen niveles de autorización
**deliberadamente distintos**, y esto no se corrige ni se unifica sin
una decisión de producto explícita. Un colaborador externo
(`InspectionCollaborator`) puede ver `/resumen` (`inspectionAccessWhere`)
pero no `/informe` (`organizationId` puro) — el informe final firmado
queda restringido al propietario/gestor de la organización, o a quien
en el futuro se le otorgue ese permiso explícitamente.

**Origen de la decisión**: Sprint 4 (Experiencia del Resumen de
Inspección), Etapa 1→2. El análisis de la Etapa 1 encontró esta
asimetría y la marcó como pregunta abierta ("¿es una decisión de
producto o un descuido de la query?"). El usuario la resolvió: es
intencional. **No se modifica la autorización en el Sprint 4** — el
rediseño de `/resumen` trabaja sobre el modelo de acceso ya existente,
sin tocar `inspectionAccessWhere` ni la query de `/informe`.

**Objetivo que protege esta regla**:
- El informe final firmado (con datos de firma, información completa
  de la recepción) tiene un nivel de sensibilidad distinto al resumen
  de observaciones — no todo el que puede colaborar en una inspección
  debe poder ver o descargar su documento final.

---

## 3. `InspectionStatus.COMPLETED` es un estado reservado, no eliminado ni usado

**Regla**: el valor `COMPLETED` del enum `InspectionStatus` permanece
en el schema sin que ningún flujo lo escriba activamente. No se
elimina (podría estar reservado para un estado intermedio futuro,
p. ej. "100% revisado pero sin firmar todavía") y **no se diseña
ninguna experiencia asumiendo que es alcanzable hoy**. Toda pantalla
se diseña únicamente sobre los estados que el código realmente escribe:
`IN_PROGRESS` y `CLOSED`.

**Origen de la decisión**: Sprint 4, Etapa 1→2. El análisis encontró
que `get-inspections-list-data.ts` e `InspectionListItem` sí leen y
etiquetan este estado ("COMPLETADA") como si fuera alcanzable, pese a
que ningún Server Action lo escribe. El usuario confirmó: se mantiene
como reservado, sin resolver su propósito final en este sprint.

**Objetivo que protege esta regla**:
- Evita diseñar o implementar comportamiento condicionado a un estado
  que el sistema nunca produce hoy — cualquier lógica "para cuando
  `COMPLETED` exista" quedaría sin forma de probarse y sin dueño.
