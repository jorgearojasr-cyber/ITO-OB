# Sprint 2a — Pantalla de Inicio — Etapa 1: Análisis del código existente

Ver `ROADMAP_OBRABIEN.md`. Este documento es el insumo de la Etapa 1
del Sprint 2a. No contiene propuestas de diseño ni opiniones de UX
como conclusión de acción — solo lo que existe hoy en el repositorio,
verificado leyendo el código real.

**Aclaración de alcance** (confirmada por el usuario): este análisis
cubre exclusivamente la Pantalla de Inicio (`/`, home post-login). El
documento de visión `Spec-01-Bienvenida-Inicio-Inspeccion.md`
pertenece al Sprint 2b (onboarding de una inspección ya iniciada/
asignada) y **no se usa como referencia acá**.

---

## 1. Componentes existentes

Ruta: `src/app/page.tsx` — Server Component async, `/`. Orquesta todo
lo demás; no contiene marcado propio más allá del wrapper de layout.

| Sección visual | Archivo | Tipo | Props |
|---|---|---|---|
| Barra superior | `src/components/inicio/TopBar.tsx` | Server | `unreadCount?: number` |
| Hero / progreso | `src/components/inicio/HeroProgressCard.tsx` | Server | `inspection`, `progress`, `nextStep`, `hasAnyInspections` |
| Anillo de progreso (dentro del hero) | `src/components/ui/ProgressRing.tsx` | Server | `percent`, `size`, `strokeWidth`, `label` |
| Siguiente paso | `src/components/inicio/NextStepCard.tsx` | Server | `inspectionId`, `nextStep`, `hasAnyInspections` |
| Acceso rápido + Kit de inspección | `src/components/inicio/QuickAccessGrid.tsx` | Server | `inspectionId: string \| null` |
| Consejo del día | `src/components/inicio/TipOfTheDayCard.tsx` | **Client** (`useState`) | sin props — lee `tolerance-tips.ts` directamente |
| Biblioteca técnica (carrusel) | `src/components/inicio/LibraryCarousel.tsx` | Server | `categories` |
| Navegación inferior | `src/components/inicio/BottomNav.tsx` | Server | `active` (compartido con toda la app) |
| Onboarding (reemplaza toda la pantalla) | `src/components/onboarding/OnboardingCarousel.tsx` | **Client** (`useState`, `useTransition`, `useRouter`) | sin props, pasos hardcodeados |

Solo dos Client Components en toda la pantalla: `TipOfTheDayCard`
(estado local del carrusel de tips) y `OnboardingCarousel` (flujo de
onboarding + Server Action). Todo lo demás es Server Component puro,
sin fetching adicional en cliente.

**Fuentes de datos que alimentan la pantalla**:
- `src/lib/inspections/get-inicio-data.ts` — `getInicioData()`, la
  consulta agregada principal.
- `src/lib/notifications/get-notifications-data.ts` —
  `getUnreadNotificationCount()`, solo para el punto rojo del `TopBar`.
- `src/lib/library/tolerance-tips.ts` — array estático de tips,
  consumido en cliente, no viene de la base de datos.
- `src/lib/library/category-images.ts` — mapa estático slug→URL de
  imagen (Unsplash), no viene de la base de datos.
- `src/lib/auth/session.ts` (`requireSession`) y
  `src/lib/auth/actions.ts` (`markOnboardingSeen`).

---

## 2. Flujo actual

`getInicioData()` (`src/lib/inspections/get-inicio-data.ts:45-142`)
hace, en paralelo:

1. Busca **la inspección `IN_PROGRESS` más recientemente actualizada**
   de la organización (`orderBy: updatedAt desc`, `findFirst`). Si la
   organización tiene varias inspecciones `IN_PROGRESS` a la vez
   (varios inspectores/unidades), **solo se muestra una en Inicio** —
   no existe ningún selector de inspección en esta pantalla.
2. Trae `LibraryCategory` con conteo de artículos (siempre, sin
   importar el estado de inspección).
3. Cuenta el total de inspecciones de la organización (todos los
   estados) → `hasAnyInspections`.
4. Lee `User.hasSeenOnboarding`.

Si hay inspección activa, además carga sus recintos con elementos y
cuenta observaciones/fotos, y calcula ahí mismo (no en los
componentes) el porcentaje de avance y el "siguiente paso" — ver §4.

`page.tsx` decide, con esos datos, uno de cuatro caminos de render
(detalle completo en §5 "Estados vacíos"):
- Onboarding de bienvenida (reemplaza toda la pantalla).
- Home normal con hero en variante "sin proyectos".
- Home normal con hero en variante "sin inspección activa".
- Home normal con hero e información real de la inspección en curso.

La navegación de esta pantalla hacia el resto de la app es 100%
enlaces (`<Link>`) — no hay mutaciones ni Server Actions disparadas
desde Inicio, salvo `markOnboardingSeen()` dentro del onboarding.

---

## 3. Qué se reutiliza

- `BottomNav` y sus tokens de `tokens.css` — ya compartidos con el
  resto de la app (incluida la Pantalla de Elemento del Sprint 1).
- `ProgressRing` — genérico, ya pensado para reutilizarse (no es
  específico de Inicio).
- El propio patrón arquitectónico del Sprint 1: Server Components
  presentacionales + un único `get-*.ts` que concentra todo el cálculo
  de negocio, sin lógica duplicada en los componentes. Confirmado: acá
  se repite exactamente ese mismo patrón — no hay lógica de negocio
  duplicada entre `get-inicio-data.ts` y los componentes.

Nada de lo anterior necesita cambiar de lugar ni de contrato para
rediseñar la pantalla — es exactamente el tipo de base que ya
demostró funcionar en la Pantalla de Elemento.

---

## 4. Lógica de negocio embebida en esta pantalla

Toda vive en `get-inicio-data.ts`, no en los componentes:

- **% de avance** (líneas 104-109): `doneElements / totalElements`,
  donde "hecho" = `ElementInstance.status !== "PENDING"` (es decir,
  `CORRECT` y `OBSERVATION` cuentan igual para el progreso). Protegido
  contra división por cero. `ProgressRing` vuelve a clampear/redondear
  el mismo valor — redundante pero inofensivo.
- **Siguiente paso**: primer recinto, **en orden de `order`**, que
  tenga al menos un elemento `PENDING` — no el recinto con más
  pendientes, no el menos tocado recientemente. Simplemente el primero
  en el orden fijo del recinto.
- **Conteos de las 4 tarjetas** (Recintos/Elementos/Observaciones/
  Fotos): consultas Prisma independientes, no derivadas del array en
  memoria.
- **`hasAnyInspections`**: único booleano que distingue "organización
  nueva" de "tiene inspecciones pero ninguna activa" — se usa tanto
  en `get-inicio-data.ts` como en `HeroProgressCard`/`NextStepCard`.
- **Selección del tip del día**: **no** es lógica de servidor — ocurre
  en cliente, en `TipOfTheDayCard.tsx:8`:
  `new Date().getDate() % toleranceTips.length`. Depende del reloj del
  navegador, no del servidor; se repite a mitad de mes (9 tips); es
  igual para todos los usuarios en la misma fecha, sin variación por
  organización.
- **Gate de onboarding**: `!hasAnyInspections && !hasSeenOnboarding`
  (`page.tsx:16`). Una vez que `markOnboardingSeen()` corre, la
  bandera queda en `true` para siempre — aunque el usuario borre todas
  sus inspecciones, el onboarding no vuelve a aparecer.

---

## 5. Comparación contra el prototipo aprobado (`docs/obrabien-inicio-prototipo.html`)

La estructura de secciones coincide 1:1 con el prototipo (topbar →
hero → siguiente paso → acceso rápido + kit → tip → biblioteca →
bottom nav). Las divergencias concretas encontradas:

1. **Paleta de color** — `tokens.css` dice en su propio comentario de
   cabecera que fue "extraída de" el prototipo, pero los valores reales
   difieren: el prototipo usa **azul** (`--blue-600:#2F5FE0`) como
   color primario/interactivo en CTAs, nav activo y FAB; la
   implementación real usa **naranjo** (`--accent-600:#DD7A36`) en
   todos esos mismos lugares. Los `--navy-900/800/700` también tienen
   hex distintos bajo el mismo nombre de variable. Esto es un rebrand
   deliberado y consistente en toda la app — no una inconsistencia
   entre componentes.
2. **Tratamiento del hero** — el prototipo tiene una card oscura
   (`gradient navy-700→navy-900`, texto blanco) con **un solo** botón
   "Ver información". La implementación real es una card **blanca**
   con texto oscuro y **dos** CTAs apiladas ("Continuar recorrido" +
   "Ver resumen"). Es un cambio estructural real, no solo de color.
3. **Chips de íconos del hero**: el prototipo usa fondo translúcido
   blanco (pensado para la card oscura); la implementación real no
   tiene fondo en el ícono, solo el SVG suelto dentro de una tile con
   `border` — la card ya no es oscura, así que el prototipo no aplica
   directamente acá.
4. **TopBar**: el prototipo tiene 3 elementos (botón hamburguesa +
   marca + campana); la implementación real tiene solo 2 (marca +
   campana) — **no existe botón de menú** en el código actual.
5. **Texto de marca**: el prototipo muestra dos líneas ("ObraBien" +
   subtítulo "Asistente de Recepción"); la implementación real muestra
   una sola línea ("ObraBien Inspección") — no hay elemento ni clase
   CSS para un subtítulo.
6. **Colores hardcodeados fuera de tokens**: varios `stroke` de SVG en
   `HeroProgressCard.tsx` usan hex directo (`#8892A6`, `#222B49`,
   `#E08A2E`, `#3FC98A`, `#DD7A36`) en lugar de `var(--token)`,
   inconsistente con la disciplina de tokens del resto del código.
7. **Chips de "Acceso rápido"**: el prototipo colorea cada ícono
   distinto por categoría (fondo pastel + stroke de color propio); la
   implementación real usa el mismo fondo plano (`var(--paper)`) y el
   mismo stroke navy para casi todos (excepto Observaciones, en
   naranjo) — el code-coloring por categoría del prototipo no se llevó
   a la implementación.
8. **Cards de Biblioteca técnica**: el prototipo usa ilustraciones SVG
   sobre fondo pastel por categoría; la implementación real usa
   **fotos** (`<img>`, URLs de Unsplash vía `category-images.ts`) — un
   tratamiento visual distinto (fotográfico vs. ilustrado), no solo un
   detalle de color.
9. **Consejo del día**: el prototipo tiene 3 tips genéricos sin fuente
   citada; la implementación real cita fuente ("Fuente: {tip.source}")
   y categoría (`tolerance-tips.ts`) — la real es más rica en
   contenido, expected dado que usa datos reales del manual de
   tolerancias.
10. **Bottom nav / FAB**: prácticamente un port fiel del prototipo,
    salvo el cambio de color de acento ya mencionado en el punto 1.

---

## 6. Estados vacíos (código real, no supuestos)

| Estado | Condición | Render |
|---|---|---|
| Cero inspecciones jamás + onboarding no visto | `!hasAnyInspections && !hasSeenOnboarding` | Reemplaza **toda** la pantalla por `OnboardingCarousel` — sin TopBar ni BottomNav; solo sale vía "Saltar" o terminar el flujo |
| Cero inspecciones jamás, onboarding ya visto | `!inspection && !hasAnyInspections` | Hero "SIN PROYECTOS" + CTA "+ Nueva inspección"; `NextStepCard` "Crea tu primera inspección"; `QuickAccessGrid` degrada Recintos/Elementos/Observaciones a `<div>` no clickeables (Mis fotos sigue siendo link) |
| Tiene inspecciones, pero ninguna `IN_PROGRESS` (todas DRAFT/COMPLETED/CLOSED) | `!inspection && hasAnyInspections` | Hero "SIN INSPECCIÓN ACTIVA" — **sin ningún botón CTA**; `NextStepCard` muestra "Sin pendientes" (copy pensado para inspección terminada, no para "nunca empezada" — puede ser engañoso si la razón es que quedó en DRAFT) |
| Inspección activa sin recintos, o con todos los elementos ya revisados | — | Ambos casos caen en el mismo "Sin pendientes" — no se distinguen entre sí |
| `libraryCategories` vacío | — | `LibraryCarousel` no tiene mensaje de estado vacío explícito; renderiza el título con un contenedor scroll vacío |

**Hallazgo relevante para el diseño**: el estado "sin inspección
activa" (tiene inspecciones pero ninguna en curso) es el único de los
tres estados vacíos del hero sin ningún camino de acción visible —
queda a que el usuario use el FAB de `BottomNav` por su cuenta.

---

## 7. TODOs / comentarios / cabos sueltos encontrados

- `src/lib/library/category-images.ts:1-3` — TODO explícito: las 19+1
  imágenes de categoría son fotos de stock de Unsplash "temporales",
  a reemplazar por fotos propias de terreno. Dependencia de red externa
  en cada render de Inicio.
- `src/lib/library/tolerance-tips.ts:9-13` — comentario del autor
  original señalando que "Enchapes de madera" aparece como tip sin
  tener categoría equivalente en Biblioteca técnica — el carrusel de
  tips y la grilla de categorías no comparten una única taxonomía.
- `src/styles/tokens.css:1-3` — el comentario dice que los tokens
  fueron "extraídos" del prototipo; en la práctica ya divergieron
  (rebrand azul→naranjo) — útil saber que la paleta ya cambió una vez
  respecto al prototipo "fuente de verdad".
- No se encontraron marcadores `TODO`/`FIXME`/`XXX`/`HACK` en el resto
  de los archivos de esta pantalla.

---

## Problemas de UX detectados (observación, no decisión de diseño)

1. El estado "sin inspección activa" (con inspecciones existentes, pero
   ninguna en curso) no ofrece ningún CTA — a diferencia de los otros
   dos estados vacíos del hero, que sí tienen uno.
2. "Sin recintos" y "todos los elementos revisados" muestran el mismo
   copy de `NextStepCard` ("Sin pendientes"), aunque son situaciones
   distintas para el usuario.
3. Solo se muestra 1 de N inspecciones `IN_PROGRESS` simultáneas, sin
   ninguna señal en pantalla de que existan otras corriendo en
   paralelo (relevante si un mismo usuario/organización maneja más de
   una unidad a la vez).
4. El tip del día no varía por usuario/organización y se repite cada 9
   días del mes — puede sentirse "random" o repetitivo para uso
   frecuente.
5. El carrusel de Biblioteca técnica depende de imágenes externas
   (Unsplash) para cargar — impacto en velocidad/consistencia visual
   y en el principio "offline-first parcial" del proyecto (sin
   conexión, esas imágenes no cargan).

## Oportunidades de mejora sin tocar lógica de negocio

1. Dar un CTA al estado "sin inspección activa" del hero, igual que ya
   tienen los otros dos estados vacíos — es un cambio puramente visual
   (agregar un botón que enlace a una ruta ya existente), no requiere
   nuevo cálculo en `get-inicio-data.ts`.
2. Diferenciar visualmente (copy/ícono) "sin recintos" vs. "todo
   revisado" dentro de `NextStepCard` **sin** necesidad de nueva
   lógica: ambas señales ya están disponibles hoy mismo con los datos
   existentes (`totalRooms === 0` vs. `totalElements > 0 && percent
   === 100`), calculables en el componente a partir de props que ya
   recibe, sin tocar la query.
3. Reforzar la señal de "hay más de una inspección en curso" (si
   `inspection.count({status: IN_PROGRESS}) > 1`) es calculable con la
   data que ya se trae, aunque hoy no se expone — a evaluar en diseño
   si vale la pena mostrarlo o si excede el alcance de "solo visual".
4. Unificar el color-coding por categoría de "Acceso rápido" con el
   que ya existe en el prototipo — cambio puramente de estilos
   (`QuickAccessGrid.module.css`), sin tocar props ni datos.
5. Mover los strokes SVG hardcodeados de `HeroProgressCard.tsx` a
   variables de `tokens.css` — limpieza visual, cero riesgo funcional.

---

## Dudas resueltas por el usuario (decisiones de alcance)

1. **`OnboardingCarousel`**: **fuera de alcance** de este sprint. Se
   mantiene tal cual; posible sprint propio más adelante, quizás
   vinculado a Don José Luis.
2. **Problemas de UX detectados** (§ "Problemas de UX detectados"):
   **sí se corrigen** dentro de este sprint — entran como parte
   natural del rediseño visual, ya que ninguno requiere tocar lógica
   de negocio.
3. **Múltiples inspecciones `IN_PROGRESS` simultáneas**: sin decisión
   explícita todavía — se retoma en la Etapa 2 (diseño) si aplica,
   dado que no fue parte de las 4 preguntas cerradas con el usuario.
4. **Fotos de Unsplash de Biblioteca técnica**: sin decisión explícita
   — se mantiene el TODO conocido, no es parte del alcance confirmado
   de este sprint salvo que surja en diseño.
5. **Don José Luis**: **sí aparece, con un rol menor** (ej. saludo
   breve), reutilizando los componentes ya creados en el Sprint 1
   (`DonJoseLuisAvatar`/`DonJoseLuisCard`) — sin duplicar código ni
   inventar una nueva implementación del personaje.
6. **Paleta de color**: **los tokens reales (naranjo)** son la fuente
   de verdad vigente. El prototipo HTML queda documentado como
   desactualizado en este punto — el diseño de la Etapa 2 sigue
   `tokens.css`, no el azul del HTML.
7. **Selección del tip del día**: sin decisión explícita — a evaluar
   en la Etapa 2 si se trata como mejora visual/interacción dentro de
   alcance o se deja igual.
