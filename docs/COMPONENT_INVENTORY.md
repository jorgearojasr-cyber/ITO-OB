# Inventario de Componentes — ObraBien

Documento de consolidación. Todo componente reutilizable del código
actual, con ubicación, tipo (Server/Client), y estado de reutilización
real (confirmado por uso, no supuesto). Fuente: lectura directa del
código en el Sprint de consolidación posterior al Sprint 3.

Leyenda de **Reutilización**: 🔁 *Transversal* (usado por 3+ pantallas o
flujos distintos) · 🔂 *Compartido puntual* (usado por 2 lugares
relacionados) · 📍 *Específico* (un solo lugar de uso, pero extraído
como componente propio por claridad/tamaño).

---

## `src/components/ui/` — compartidos transversales

| Componente | Tipo | Reutilización | Notas |
|---|---|---|---|
| `BackHeader.tsx` | Server | 🔁 | Header sticky con título/subtítulo/back/action. El componente más reutilizado del proyecto — presente en prácticamente toda pantalla que no sea Inicio. |
| `EmptyState.tsx` | Server | 🔁 | Estado vacío genérico con `action` opcional. Usado en fotos, inspecciones, elementos, recintos. |
| `StatusChip.tsx` | Server | 🔂 | Chip de `Status` (Pendiente/Correcto/Con observación). Usado en `recinto/ElementListItem` e `informe/InformeElementRow`. |
| `PriorityBadge.tsx` | Server | 🔂 | Badge de `Priority`. Usado en `fotos/PhotoListItem`, `informe/*`, `resumen/ObservationSummaryRow`. |
| `LifecycleBadge.tsx` | Server | 📍 | Badge de `ObservationLifecycleStatus`. Usado solo por `ObservationSummaryRow`. |
| `NormativeScopeNotice.tsx` | Server | 🔂 | Aviso de alcance normativo. Usado por `ElementLibraryCard` e `InformeElementRow`. |
| `ProgressRing.tsx` | Server | 📍 | Anillo circular SVG de progreso. Usado solo por `HeroProgressCard` (Inicio) — el flujo de Recintos usa una barra lineal propia, no este componente (hallazgo documentado en el Sprint 3, no corregido). |
| `PhotoLightbox.tsx` | Client | 🔂 | Visor de fotos a pantalla completa. Usado por `ChecklistItemCard` y `fotos/PhotoListItem`. |
| `ShareReportButton.tsx` | Client | 🔂 | Botón de compartir/copiar link (Web Share API con fallback). Usado en `/resumen` y `InformeToolbar`. |
| `form/FormField.tsx` | Server | 🔁 | Wrapper de label+error para inputs. Usado por todos los formularios de auth y de edición de inspección. |
| `form/ToggleGroup.tsx` | Client | 🔂 | Control tipo segmented/radio. Usado por `EditFeaturesForm`, `EditPropertyTypeForm`, `NuevaInspeccionForm`. |
| `DonJoseLuisAvatar.tsx` | Server | 🔁 | Avatar del personaje, 3 tamaños. Movido a `ui/` en el Sprint 2a (antes vivía en `elemento/`) explícitamente para ser transversal. Usado por `ElementInspectionExperience`, `DonJoseLuisCard`, `DonJoseLuisPresence`, `InspectionWelcome`. |
| `DonJoseLuisCard.tsx` | Server | 📍 | Card/toast con mensaje del personaje. Usado solo por `ElementInspectionExperience` (variantes "enseñando"/"escuchando"). |
| `DonJoseLuisPresence.tsx` | Server | 📍 | Chip de presencia discreta. Usado solo por `TopBar` (Inicio). |

---

## `src/components/inicio/` — Pantalla de Inicio

| Componente | Tipo | Reutilización | Notas |
|---|---|---|---|
| `BottomNav.tsx` | Server | 🔁 | Navegación inferior persistente. Usado en 18+ pantallas autenticadas — el segundo componente más reutilizado del proyecto tras `BackHeader`. |
| `TopBar.tsx` | Server | 📍 | Header de Inicio (logo + campana + presencia de Don José Luis). Exclusivo de `/`. |
| `HeroProgressCard.tsx` | Server | 📍 | Hero de progreso con CTA principal. Exclusivo de `/`. |
| `NextStepCard.tsx` | Server | 📍 | Card "Continuemos". Exclusivo de `/`. |
| `QuickAccessGrid.tsx` | Server | 📍 | Grid de accesos rápidos. Exclusivo de `/`. |
| `LibraryCarousel.tsx` | Server | 📍 | Carrusel de categorías de biblioteca. Exclusivo de `/`. |
| `TipOfTheDayCard.tsx` | Client | 📍 | Tip rotativo del día. Exclusivo de `/`. |

---

## `src/components/recinto/` — flujo de Recintos (Sprint 3)

| Componente | Tipo | Reutilización | Notas |
|---|---|---|---|
| `ElementListItem.tsx` | Server | 🔂 | Fila de elemento con ícono+chip. Usado por el detalle de recinto y por `elementos/ElementListRow` (lista plana de elementos). |
| `RoomListRow.tsx` | Server | 📍 | Fila de recinto en la lista, con estado "actual". Exclusivo de `/recintos`. |
| `RoomProgressBar.tsx` | Server | 📍 | Barra lineal de progreso de un recinto. Exclusivo del detalle de recinto. |
| `RoomCompletionBanner.tsx` | Server | 📍 | Banner de cierre con CTA único (siguiente recinto o resumen). Nuevo en el Sprint 3. Exclusivo del detalle de recinto. |
| `element-icons.tsx` | Server | 🔂 | Mapa de íconos por slug de elemento. Usado por `ElementListItem` (y por tanto indirectamente en dos pantallas). Cobertura parcial (hallazgo documentado). |

---

## `src/components/elemento/` — Pantalla de Elemento (Sprint 1)

| Componente | Tipo | Reutilización | Notas |
|---|---|---|---|
| `ElementInspectionExperience.tsx` | Client | 📍 | Orquestador de la pantalla de elemento (header, Don José Luis, checklist). Exclusivo de `/elementos/[elementId]`. |
| `ElementChecklist.tsx` | Client | 📍 | Lista de `ChecklistItemCard`. Exclusivo del flujo de elemento. |
| `ChecklistItemCard.tsx` | Client | 📍 | Card de un ítem de checklist (camino rápido + panel + foto). El componente más complejo del proyecto en cuanto a estado local. |
| `GuidedCameraOverlay.tsx` | Server | 📍 | Overlay de encuadre + confirmar/repetir sobre la captura nativa. Usado solo por `ChecklistItemCard`. |
| `ElementLibraryCard.tsx` | Server | 🔂 | Ficha técnica de un elemento. Usada por `ElementInspectionExperience` y por la página de artículo de Biblioteca. |
| `ElementDetailAccordion.tsx` | Server | 📍 | Acordeón de detalle técnico. Usado solo por `ElementLibraryCard`. |
| `RoomMaterialQuestion.tsx` | Server | 📍 | Pregunta de material de piso/muro, una vez por recinto. Exclusiva de `/elementos/[elementId]`, aunque conceptualmente pertenece al "recinto" (ver `USER_FLOW_OBRABIEN.md`). |
| `ShowerTubQuestion.tsx` | Client | 📍 | Pregunta ducha/tina, una vez por recinto (solo Baños). Misma ubicación que la anterior. |

---

## `src/components/onboarding/`

| Componente | Tipo | Reutilización | Notas |
|---|---|---|---|
| `OnboardingCarousel.tsx` | Client | 📍 | Bienvenida global a la app, una sola vez por usuario. Exclusivo de `/` (primera visita). |
| `InspectionWelcome.tsx` | Server | 📍 | Bienvenida a una inspección recién creada (Sprint 2b). Exclusiva de `/bienvenida`. Vive junto a `OnboardingCarousel` por ser, como él, una pantalla de una sola vez — no un componente de trabajo continuo. |

---

## `src/components/biblioteca/`

| Componente | Tipo | Reutilización | Notas |
|---|---|---|---|
| `GoodBadExamplesSection.tsx` | Server | 🔂 | Comparación Bien/Mal. Usada por la página de categoría de Biblioteca y por `ElementInspectionExperience` (reuso documentado en el Sprint 1). |
| `CategoryToleranceCard.tsx` | Server | 📍 | Card de tolerancia/distancia de luz. Exclusiva de la página de categoría. |
| `LibraryArticleListItem.tsx` | Server | 📍 | Fila de artículo. Exclusiva de la página de categoría. |
| `LibraryCategoryGrid.tsx` | Client | 📍 | Grid de categorías. Exclusiva de la home de Biblioteca. |
| `TechnicalDetailAccordion.tsx` | Client | 📍 | Acordeón técnico. Exclusiva de la página de categoría. |

---

## Otros directorios por pantalla (sin reutilización cruzada relevante)

| Directorio | Componentes | Notas |
|---|---|---|
| `src/components/inspecciones/` | `InspectionListItem`, `NuevaInspeccionForm`, `EditPropertyTypeForm`, `EditFeaturesForm`, `EditDistributionForm`, `PendingRemovalsPanel`, `DeleteRoomModal`, `CloseInspectionModal` | `PendingRemovalsPanel` y `DeleteRoomModal` son 🔂 (usados por más de un formulario de edición); el resto es 📍. |
| `src/components/invitaciones/` | `AcceptInviteAuthTabs`, `AcceptInviteButton`, `AcceptInviteLoginForm`, `AcceptInviteRegisterForm` | Todos 📍, exclusivos de `/invitaciones/[token]`. |
| `src/components/kit/` | `ToolCard`, `ToolIcon` | 📍, exclusivos de `/kit-inspeccion`. |
| `src/components/elementos/` | `ElementListRow` | 📍, exclusivo de la lista plana de elementos (reutiliza `recinto/ElementListItem` internamente). |
| `src/components/fotos/` | `PhotoListItem`, `ProjectFilterChips` | 📍, exclusivos de `/fotos`. |
| `src/components/informe/` | `InformeCover`, `InformeElementRow`, `InformeRoomSection`, `InformeSignatures`, `InformeSummary`, `InformeToolbar` | 📍, exclusivos de `/informe`. |
| `src/components/notificaciones/` | `NotificationsList` | 📍. |
| `src/components/resumen/` | `CloseInspectionSection`, `InviteCollaboratorModal`, `InviteCollaboratorSection`, `ObservationLifecycleModal`, `ObservationSummaryRow`, `ObservationsSummaryList` | 📍, exclusivos de `/resumen`, salvo `ObservationLifecycleModal` (🔂 con `ObservationSummaryRow`). |
| `src/components/auth/` | `LoginForm`, `RegisterForm`, `RequestPasswordResetForm`, `ResetPasswordForm` | 📍, uno por ruta pública de auth. |

---

## Resumen cuantitativo

- **Componentes transversales (🔁)**: 6 — `BackHeader`, `EmptyState`,
  `form/FormField`, `DonJoseLuisAvatar`, `BottomNav`, y a nivel de
  patrón (no de componente único) el algoritmo de "primer trabajo
  pendiente" (`next-pending-room.ts`, no es un componente visual pero
  es la pieza de lógica más reutilizada del proyecto).
- **Compartidos puntuales (🔂)**: ~14.
- **Específicos de una pantalla (📍)**: la mayoría — patrón esperado en
  una app con muchas pantallas de propósito único.
- **Ningún componente quedó sin uso confirmado** — no se encontró
  código muerto en `src/components/` durante este inventario.
