# Sistema de Diseño — ObraBien

Documento de consolidación (Sprint de consolidación, posterior al Sprint 3).
Describe el lenguaje visual **tal como existe hoy en el código**, no una
aspiración — cada valor de este documento está tomado directamente de
`src/styles/tokens.css` y de los `.module.css` reales del proyecto. No
introduce ningún token, componente ni comportamiento nuevo.

---

## Colores

Fuente única: `src/styles/tokens.css`. El comentario de cabecera del
archivo señala que fueron "extraídos" del prototipo HTML de Inicio
(`docs/obrabien-inicio-prototipo.html`), pero en la práctica ya
divergieron de ese prototipo (rebrand de azul a naranjo, documentado en
el análisis del Sprint 2a) — **este archivo, no el HTML del prototipo,
es la fuente de verdad vigente.**

| Token | Valor | Uso principal |
|---|---|---|
| `--navy-900` | `#222b49` | Texto de marca, fondo de toast/CTA final oscuro (`RoomCompletionBanner` último recinto) |
| `--navy-800` | `#2c3760` | Reservado, poco usado directamente |
| `--navy-700` | `#3b4d82` | Reservado, poco usado directamente |
| `--accent-600` | `#dd7a36` | **Color de acento principal** — CTAs primarios, chips activos, barras de progreso, bordes de énfasis |
| `--accent-700` | `#944b1e` | Texto sobre fondo `--accent-100`, eyebrows, links secundarios |
| `--accent-100` | `#fbe8da` | Fondos suaves de acento (chips, badges, avatar de Don José Luis) |
| `--green-500` | `#3fc98a` | Éxito / completado — CTA de "Está bien", badges "Completo" |
| `--green-100` | `#e4f8ee` | Fondo suave de éxito (banners de cierre, badges) |
| `--amber-500` | `#e08a2e` | Advertencia / observación |
| `--amber-100` | `#fdefd8` | Fondo suave de advertencia (panel de observación, tip del día) |
| `--purple-500` | `#8e6ef0` | Acento secundario — badge "IA (futuro)" (espacio reservado, inerte), color-coding de "Recintos" en accesos rápidos |
| `--purple-100` | `#efe8fe` | Fondo suave del acento secundario |
| `--ink-900` | `#101828` | Texto principal |
| `--ink-600` | `#475066` | Texto secundario |
| `--ink-400` | `#525f7a` | Texto terciario / metadatos |
| `--ink-200` | `#e4e8f0` | Bordes, tracks de barra de progreso, fondos de tile |
| `--paper` | `#f8f5f1` | Fondo de pantalla (off-white cálido) |
| `--white` | `#ffffff` | Fondo de tarjetas |

**Regla de uso**: el naranjo (`--accent-600`) es el único color de CTA
primario en toda la app. Verde y ámbar son semánticos (éxito/
advertencia), nunca decorativos. El morado es el único acento
secundario, reservado para casos puntuales (IA futura, una categoría de
acceso rápido) — no compite con el naranjo como color de acción.

**Hallazgo documentado, no corregido**: algunos SVG de ícono usan hex
hardcodeado en vez de `var(--token)` (`HeroProgressCard.tsx`,
`element-icons.tsx`) — señalado como hallazgo menor en los Sprints 2a y
3, sin prioridad de corrección.

---

## Tipografía

Dos familias, vía CSS variables inyectadas por Next Fonts:

| Token | Familia | Uso |
|---|---|---|
| `--font-display` | Manrope | Títulos, nombres de recinto/elemento, cifras destacadas (`font-weight: 800` casi siempre) |
| `--font-body` | Inter | Todo el texto de cuerpo, botones, labels, inputs |

No existe una escala tipográfica centralizada (no hay tokens
`--text-sm/md/lg`) — cada componente define su propio `font-size` en
píxeles dentro de su `.module.css`. Rango observado en la práctica:
10–11px (labels/eyebrows/badges) · 12–13.5px (cuerpo secundario) · 14–16px
(cuerpo principal, botones) · 17–22px (títulos de tarjeta) · 26–27px
(títulos de pantalla, hero). `font-weight` sigue una convención
implícita: 500–600 para texto de cuerpo, 700 para énfasis/botones, 800
para todo lo que usa `--font-display`.

---

## Espaciados

Tampoco hay una escala de espaciado tokenizada — los valores viven
directamente en cada `.module.css`, pero siguen un patrón consistente
observable en todo el código:

- **Padding lateral de pantalla**: `20px` a cada lado, casi sin
  excepción (`.content`, `.list`, tarjetas de sección).
- **Gap entre elementos de una lista/columna**: `8px`–`10px` para
  elementos relacionados de cerca (chips, íconos+texto), `12px`–`18px`
  entre bloques/tarjetas.
- **Padding interno de tarjeta**: `12px`–`18px`, `14px` es el valor más
  frecuente.
- **`max-width` de pantalla**: `480px`, centrado (`margin: 0 auto`) —
  mobile-first estricto; ninguna pantalla define un layout de escritorio
  distinto (limitación conocida, documentada desde el Sprint 1).

---

## Radios

Tres tokens, usados de forma consistente por tamaño de elemento:

| Token | Valor | Uso |
|---|---|---|
| `--radius-lg` | `22px` | Tarjetas grandes (hero, banners de bienvenida/cierre) |
| `--radius-md` | `16px` | Tarjetas de tamaño medio (cards de lista, paneles) |
| `--radius-sm` | `12px` | Botones, chips grandes, inputs |

Elementos circulares (avatares, dots, badges) usan `border-radius: 50%`
o `999px` directamente, sin token propio — patrón consistente pero no
tokenizado.

---

## Sombras

No hay tokens de sombra — cada componente define su propia
`box-shadow`, pero con una fórmula repetida en todo el código: sombra
de color del propio fondo del elemento, difusa y desplazada hacia
abajo, del tipo `0 Npx Mpx -Kpx rgba(color, alpha)`. Ejemplos reales:

- CTA naranjo: `0 8px 16px -8px rgba(221, 122, 54, 0.4–0.6)`
- CTA/cierre final (navy): `0 8px 16px -8px rgba(34, 43, 73, 0.5)`
- Hero/tarjetas elevadas: `0 8px 24px -14px rgba(16, 24, 40, 0.18)`
- Avatar grande de Don José Luis: `0 16px 32px -16px rgba(221, 122, 54, 0.4)`

Regla implícita: la sombra siempre "combina" con el color del elemento
que la proyecta (naranjo bajo botón naranjo, navy bajo botón navy) —
nunca una sombra gris genérica.

---

## Componentes

Ver `COMPONENT_INVENTORY.md` para el listado completo con ubicación y
props. Categorías principales:

- **Compartidos transversales** (`src/components/ui/`): `BackHeader`,
  `EmptyState`, `StatusChip`, `PriorityBadge`, `LifecycleBadge`,
  `ProgressRing`, `PhotoLightbox`, `NormativeScopeNotice`,
  `ShareReportButton`, `form/FormField`, `form/ToggleGroup`, y la
  familia de Don José Luis (`DonJoseLuisAvatar`, `DonJoseLuisCard`,
  `DonJoseLuisPresence`).
- **Por pantalla/flujo**: `inicio/`, `recinto/`, `elemento/`,
  `onboarding/`, `biblioteca/`, `inspecciones/`, `invitaciones/`,
  `kit/`, `elementos/`, `fotos/`, `informe/`, `notificaciones/`,
  `resumen/`, `auth/`.

Patrón arquitectónico consistente en todo el proyecto: componentes
**Server** por defecto; `"use client"` solo cuando hay estado local,
interacción inmediata o hooks de navegación (formularios, modales,
carruseles, lightbox). Los datos siempre llegan resueltos por props
desde un `get-*-data.ts` o desde la propia `page.tsx` — ningún
componente de presentación hace fetching propio.

---

## Iconografía

Sin librería de íconos externa — todo es SVG inline hecho a mano,
`stroke`-based, trazos de 1.4–2.6px. Tres sistemas de íconos
independientes, cada uno con su propio mapa interno:

1. **`recinto/element-icons.tsx`** — mapa `slug de ElementTemplate →
   categoría de ícono` (7 categorías: WINDOW/DOOR/FLOOR/ELECTRICAL/
   WATER/VENTILATION/STRUCTURE). Cobertura parcial (17 de ~39 slugs
   reales) — hallazgo documentado en el Sprint 3, sin resolver.
2. **`kit/ToolIcon.tsx`** — mapa interno por `id` de herramienta.
3. Íconos sueltos definidos inline en varios componentes (flechas de
   navegación, chevrons, check/cross de `GoodBadExamplesSection`,
   campana de notificaciones, logo de marca en `TopBar`) — reutilizan
   el mismo trazo `stroke="currentColor"` o un color de token cuando
   corresponde.

Don José Luis usa un **emoji** (🧑‍🔧) como placeholder, no un ícono SVG
propio — ver sección dedicada más abajo.

---

## Animaciones

8 animaciones `@keyframes` en todo el código, todas locales a su
`.module.css` (sin duplicación de nombre real gracias a CSS Modules,
aunque existen dos `fadeIn` distintas en archivos distintos —
consolidable a futuro, no urgente):

| Animación | Archivo | Duración | Uso |
|---|---|---|---|
| `pulse` | `HeroProgressCard.module.css` | 2s infinite | Punto verde de "en curso" en el eyebrow del hero |
| `cardIn` | `DonJoseLuisCard.module.css` | 320ms ease-out | Entrada de la card "Enseñando" |
| `toastIn` | `DonJoseLuisCard.module.css` | 260ms ease-out | Entrada del toast "Escuchando" |
| `fadeIn` (Presence) | `DonJoseLuisPresence.module.css` | 200ms ease-out | Aparición del chip de Inicio |
| `fadeIn` (Cámara) | `GuidedCameraOverlay.module.css` | 150ms ease-out | Apertura del overlay de cámara guiada |
| `expandIn` | `ChecklistItemCard.module.css` | 220ms ease-out | Expansión del panel de observación |
| `fadeInUp` | `InspectionWelcome.module.css` | 320ms ease-out | Entrada de la pantalla de bienvenida a la inspección |
| `bannerIn` | `RoomCompletionBanner.module.css` | 300ms ease-out | Aparición del banner de recinto completo |

**Principio transversal** (establecido desde el Sprint 1, reafirmado en
cada sprint posterior): toda animación respeta
`prefers-reduced-motion: reduce`, degradando a solo `opacity` sin
desplazamiento, o directamente sin animación. Ninguna animación se
repite en cada render — todas son animaciones de entrada de una sola
vez.

---

## Don José Luis

**Estado actual: placeholder temporal**, explícitamente reemplazable
sin tocar el layout de quien lo usa (ver Master Character Bible,
documento de visión de producto, no en este repo).

- **Representación visual**: emoji 🧑‍🔧 dentro de un círculo con
  gradiente `linear-gradient(160deg, var(--accent-100), var(--white))`
  y borde `var(--accent-600)` — `DonJoseLuisAvatar.tsx`.
- **Tamaños**: `sm` (28px, chip de header), `md` (44px, default —
  card de intro), `lg` (108px, protagonista de la Bienvenida a una
  inspección).
- **Variantes de comportamiento** (`DonJoseLuisVariant`):
  - `"enseñando"` — Pantalla de Elemento, al entrar por primera vez a
    un elemento. Explica brevemente qué revisar, invita a comenzar.
  - `"escuchando"` — Pantalla de Elemento, confirmación breve tras una
    acción (marcar, subir foto). Toast, no card.
  - `"presente"` — Pantalla de Inicio, acompañamiento ambiental
    discreto en el header. No enseña ni confirma nada.
  - (La Bienvenida a una inspección reutiliza `"presente"` en tamaño
    `lg`, con mensaje propio vía prop — no es una variante nueva.)
- **Reglas permanentes de personaje** (ver `DESIGN_DECISIONS.md` para
  el detalle completo): nunca instruye la interacción ("presiona",
  "toca"); nunca genera urgencia; la Bienvenida a una inspección es la
  única pantalla donde sostiene algo parecido a una conversación
  extendida — en el resto del producto, sus mensajes son breves y
  contextuales.
- **No aparece** en el flujo de Recintos (evaluación explícita en el
  Sprint 3: ningún momento genuino identificado que no esté ya cubierto
  por su rol en Elemento o Inicio) ni en `OnboardingCarousel` (flujo
  global de bienvenida a la app, sin mascota).

---

## Principios de UX (consolidados)

Acumulados a través de los Sprints 1, 2a, 2b y 3 — ver
`DESIGN_DECISIONS.md` para el detalle y el origen exacto de cada uno.
Resumen ejecutivo:

1. Mobile-first estricto, sin layout de escritorio propio.
2. Un solo CTA primario por pantalla/estado — nunca una elección
   genérica donde ya hay una respuesta obvia.
3. El progreso y el "siguiente paso" siempre se calculan en vivo desde
   los datos reales, nunca se cachean ni se duplican en paralelo (regla
   permanente, ver algoritmo único de "primer trabajo pendiente").
4. Orientación local (dónde estoy) y global (cuánto llevo) conviven,
   ninguna reemplaza a la otra.
5. Los estados vacíos usan `EmptyState` con una acción cuando existe un
   camino de recuperación razonable.
6. Ninguna pantalla nueva introduce IA activa — cuando se reserva un
   espacio para IA futura, es un badge visual inerte, sin lógica ni
   llamada a servicio externo.
7. La interrupción y reanudación del recorrido nunca requieren una
   pantalla especial — el estado correcto siempre llega resuelto desde
   el servidor en el primer render.
