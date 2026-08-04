# Sprint 4 — Resumen de Inspección — Etapa 4: Validación

Objetivo: validar la Spec Visual v1 aprobada contra el **código real
actual**, antes de escribir ninguna línea de implementación. Mismo
criterio que en los Sprints 2a, 2b y 3: se re-verifican los supuestos
de la spec contra los archivos reales, no contra la memoria de lo que
se diseñó.

---

## Hallazgo — `ProgressRing` no escala su tipografía interna

**El más importante de esta validación**, y bloqueante antes de
implementar.

La spec (sección 1, inventario) da por reutilizado `ProgressRing`
"tal cual" para el anillo pequeño y subordinado de la síntesis. Al
leer `src/components/ui/ProgressRing.module.css` para confirmarlo, el
componente acepta un prop `size` (controla el `<svg>`), pero su
tipografía interna está en **píxeles fijos, no proporcionales al
`size`**: `.pct` (el número grande, "45%") es `font-size: 21px` fijo,
y `.cap` (la leyenda "Avance general") es `8.5px` fijo, siempre
presente aunque no se le pase `label` explícito.

La spec pide un anillo pequeño (~34–40px) y subordinado, siguiendo tu
indicación de esta vuelta de reforzar que sea información de apoyo.
A ese tamaño, un texto interno de 21px no cabe — se desborda del
círculo en vez de reducirse. El componente, tal como existe hoy, **no
sirve "tal cual" para el uso que le da la spec** en esos tamaños
pequeños; sí sirve sin cambios para los usos grandes que ya tiene
(Inicio, Elemento).

**Dos caminos, ninguno implementado todavía — pendiente tu decisión**:

1. **Extender `ProgressRing`** con un prop adicional (p. ej.
   `compact?: boolean`) que reduzca `.pct`/`.cap` proporcionalmente y
   permita ocultar la leyenda — mismo patrón ya usado para extender
   `DonJoseLuisAvatar` con el tamaño `"lg"` (Sprint 2b): aditivo, sin
   tocar los usos existentes en Inicio/Elemento.
2. **No reutilizar `ProgressRing` para el anillo pequeño** — mostrar el
   progreso de apoyo como texto simple ("45 de 45 elementos
   revisados"), sin anillo, y reservar `ProgressRing` para su uso
   grande de siempre. Coherente con que la spec ya pedía que el
   progreso "actúe únicamente como información de apoyo" — un texto
   plano cumple ese rol sin necesitar ningún cambio de componente.

Mi recomendación es la opción 2: es más simple, no toca ningún
componente ya cerrado (Sprint 1/2a), y refuerza aún más la jerarquía
que pediste (un anillo, aunque pequeño, sigue siendo un elemento
gráfico con peso propio; un texto lo subordina de forma más inequívoca
al titular). Queda a tu confirmación antes de la Etapa 5.

---

## Resto de la validación — sin hallazgos bloqueantes

- **`get-observations-summary-data.ts`** (`src/lib/inspections/`):
  confirmado que hoy solo devuelve `{ observations, rooms }` — el
  campo `progress` de la spec es, en efecto, una extensión aditiva
  real, no algo que ya exista con otro nombre. El cálculo que necesita
  (elementos totales/hechos por inspección) es el mismo ya usado en
  `get-inicio-data.ts` y `get-rooms-list-data.ts` — extensible sin
  tocar la firma de autorización (`inspectionAccessWhere` se mantiene
  igual).
- **`CloseInspectionSection.tsx`**: confirmado que el botón de cierre
  y su hint son un bloque autocontenido, sin ninguna dependencia
  externa que la síntesis pudiera romper al anteponerse — insertar la
  card de síntesis antes de este bloque no requiere tocarlo.
- **Estado del repositorio**: `git status` muestra trabajo no
  confirmado de los Sprints 1–3 y de este mismo sprint de
  consolidación, todo ya verificado en su momento — nada relacionado
  con `/resumen` que pudiera interferir con esta implementación.
- **`InspectionStatus`**: confirmado una vez más (coherente con la
  decisión de producto ya tomada) que el código solo escribe
  `IN_PROGRESS` y `CLOSED` — ninguna rama nueva de la síntesis
  necesita contemplar `COMPLETED`.
- **Autorización**: releída `resumen/page.tsx` completa — `isOrgMember`
  y `canManage` ya están calculados exactamente como la spec los
  necesita para decidir cuándo mostrar el CTA "Ver el informe firmado"
  tras el cierre; no hace falta ningún cálculo nuevo de rol.

---

## Resumen

| Punto | Severidad | Bloquea Etapa 5 |
|---|---|---|
| `ProgressRing` no escala tipografía a tamaños pequeños | Media | **Sí — requiere tu decisión (opción 1 o 2 de arriba)** |
| Extensión de `get-observations-summary-data.ts` | — | No (ya aprobada en la Etapa 3) |
| `CloseInspectionSection` compatible sin cambios | — | No |
| Estado del repositorio | — | No |
| `InspectionStatus` | — | No |
| Autorización (`isOrgMember`/`canManage`) | — | No |
