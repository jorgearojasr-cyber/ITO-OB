# Sprint 2b — Onboarding de inspección — Etapa 1: Análisis del código existente

Ver `ROADMAP_OBRABIEN.md`. Este documento es el insumo de la Etapa 1
del Sprint 2b. Foco solicitado: `OnboardingCarousel` (implementación
actual, componentes que reutiliza, cómo se decide mostrarlo, qué datos
consume), más el punto de inserción real de una futura pantalla de
"bienvenida a una inspección" en el flujo de creación/reanudación.
Sin propuestas de diseño — eso es la Etapa 2.

**Nota importante sobre `Spec-01-Bienvenida-Inicio-Inspeccion.md`**:
este documento de visión, que corresponde exclusivamente a este
sprint, **no existe en el repositorio** (confirmado por búsqueda en
todo `src/`, `docs/` y también en la carpeta de Descargas del
usuario). El `ROADMAP_OBRABIEN.md` lo referencia como insumo pendiente
desde el Sprint 2a, pero nunca se adjuntó al repo. Antes de la Etapa 2
(diseño de experiencia) voy a necesitar que el usuario lo comparta —
por ahora este análisis se basa exclusivamente en el código real, sin
ese contraste todavía.

---

## 1. `OnboardingCarousel` — implementación actual

Archivo: `src/components/onboarding/OnboardingCarousel.tsx` (125
líneas) + `OnboardingCarousel.module.css`. `"use client"`. Cero props
— se invoca como `<OnboardingCarousel />` sin argumentos; todo el
copy vive hardcodeado en un array local `STEPS`.

**3 pasos, contenido exacto:**

1. Eyebrow "Bienvenido" — título "Bienvenido a ObraBien Inspección" —
   cuerpo: "Registra la recepción de tu vivienda nueva: recorre cada
   recinto, revisa cada elemento y deja registro con fotos,
   prioridades y respaldo del Manual de Tolerancias CDT."
2. Eyebrow "Cómo funciona" — título "Recorre en 3 pasos" — sin cuerpo,
   solo una mini-lista: Recintos ("Elige el recinto que estás
   revisando"), Elementos ("Repasa cada elemento de ese recinto"),
   Observaciones ("Marca ✔ u ⚠ — con foto y prioridad si hay un
   problema").
3. Eyebrow "Todo listo" — título "Empecemos" — cuerpo: "Crea tu
   primera inspección y arranca el recorrido guiado, recinto por
   recinto."

**Navegación**: `useState` para el paso actual, dots de progreso,
swipe táctil (umbral 40px) además de botones "Atrás"/"Siguiente".
"Saltar" siempre visible arriba a la derecha. Tanto "Saltar" como
terminar el paso 3 pasan por la misma función `finish(destination)`,
que hace `await markOnboardingSeen()` y luego `router.push(destination)`
dentro de un `useTransition` — la única diferencia es el destino:
"Saltar" → `/`, terminar → `/inspecciones/nueva`.

**Server Action que llama**: `markOnboardingSeen()`
(`src/lib/auth/actions.ts`) — sin parámetros, solo
`prisma.user.update({ where: { id: session.user.id }, data: { hasSeenOnboarding: true } })`.
Es **global, de una sola vez y permanente por usuario** — no hay forma
de volver a ver el carrusel una vez marcado, ni de resetearlo desde la
app.

**Visual**: reemplazo de pantalla completa (`min-height: 100vh`, sin
`TopBar` ni `BottomNav`). Estructura: fila superior (dots + Saltar) →
contenido centrado verticalmente → nav inferior (Atrás/Siguiente).
**No hay ninguna ilustración, mascota ni referencia a Don José Luis**
en el componente ni en su CSS — es texto + dots + lista numerada,
usando los tokens compartidos de siempre.

## 2. Cómo se decide mostrarlo

`src/app/page.tsx`, línea 16:
```ts
if (!data.hasAnyInspections && !data.hasSeenOnboarding) {
  return <OnboardingCarousel />;
}
```
Condición doble: cero inspecciones jamás **y** onboarding no visto.
Confirmado por grep en todo `src/`: este es el **único** lugar donde
`OnboardingCarousel` se importa o renderiza en todo el proyecto.

## 3. Qué datos consume

Nada vía props. La única bandera relevante es `User.hasSeenOnboarding`
(`prisma/schema.prisma`, boolean, default `false`) — un campo global
por usuario, no por organización ni por inspección. Grep de
`hasSeenIntro|onboarding|welcome|tutorial` (insensible a mayúsculas)
en todo el schema y en todo `src/` no encuentra ningún equivalente
per-inspección — ni en `Inspection`, ni en `RoomInstance`, ni en
ningún otro modelo. Hoy **no existe ningún campo en el modelo de datos
capaz de recordar "el usuario ya vio la bienvenida de esta inspección
en particular"**.

## 4. Punto de inserción real en el flujo actual

**Creación de inspección** (`createInspection`,
`src/lib/inspections/actions.ts:296-474`): crea la `Inspection` (con
`status: "IN_PROGRESS"` directo) y sus `RoomInstance`/`ElementInstance`
en una transacción, y al final:
```ts
const firstRoomId = roomsData[0]?.id;
if (firstRoomId) redirect(`/inspecciones/${inspectionId}/recintos/${firstRoomId}`);
redirect("/");
```
Hoy el usuario cae **directo** en el primer recinto — cero pantalla
intermedia de bienvenida o confirmación.

**"Continuar recorrido" desde Inicio** (`HeroProgressCard.tsx`,
`NextStepCard.tsx`): ambos son `<Link>` planos hacia
`/inspecciones/{id}/recintos/{roomId}` — sin Server Action, sin
ninguna verificación en el camino.

**Página de recinto**
(`src/app/inspecciones/[inspectionId]/recintos/[roomId]/page.tsx`):
consulta `getRoomInstanceData` y renderiza contenido directo. **No
existe ningún gate de "primera vez en esta inspección"** — se
comporta igual la primera vez que se abre un recinto que la
centésima.

**Conclusión de código**: no hay ningún punto de inserción ya
preparado para una "bienvenida a la inspección" — habría que crearlo.
Los dos candidatos naturales, sin decidir nada todavía, son: (a) justo
después de `createInspection`, antes del primer recinto, o (b) un
gate más amplio que también aplique al reanudar una inspección ya
creada por otra persona (invitados vía `InspectionInvite`, Sprint 2 de
la fase de roles) — ninguno de los dos existe hoy.

## 5. Referencias ya existentes a esta pantalla futura

Nada en el código fuente (`.tsx`/`.ts`) — solo en `docs/`:

- `ROADMAP_OBRABIEN.md` ya define el Sprint 2b como "pantalla hoy
  inexistente en el código, que recibiría al usuario justo antes de
  comenzar el recorrido guiado de una inspección".
- `Sprint-2a-Analisis-Pantalla-Inicio.md` deja constancia de que
  `Spec-01-Bienvenida-Inicio-Inspeccion.md` pertenece a este sprint, y
  que `OnboardingCarousel` quedó fuera de alcance del Sprint 2a como
  "posible sprint propio más adelante, quizás vinculado a Don José
  Luis" — una pista (no una decisión) de que el personaje podría
  aparecer acá, a diferencia de `OnboardingCarousel` actual que no lo
  usa en absoluto.

---

## Preguntas abiertas antes de la Etapa 2

1. **Necesito el contenido de `Spec-01-Bienvenida-Inicio-Inspeccion.md`** —
   no está en el repo. Sin él, la Etapa 2 solo podría apoyarse en lo
   que ya sabemos del código (arriba), sin el contraste de visión de
   producto que pediste explícitamente.
2. **¿Es esta pantalla una evolución/reemplazo de `OnboardingCarousel`,
   o un flujo completamente aparte?** Son arquitectónicamente
   distintos hoy: uno es global y de una sola vez por usuario
   (`User.hasSeenOnboarding`), el otro necesitaría ser por inspección
   (dato que no existe todavía en el schema).
3. **¿Aplica también a un colaborador invitado** que entra por primera
   vez a una inspección que no creó él (`InspectionInvite`), o solo al
   creador?
4. **¿Se necesita un campo nuevo en el modelo de datos** (ej.
   `Inspection.welcomeShownAt` o similar) para recordar que ya se
   mostró, o la pantalla puede resolverse sin persistencia (ej.
   mostrarse siempre justo después de crear, nunca al reanudar)? Esto
   es zona gris respecto a "no modificar el modelo de datos" — a
   definir explícitamente antes de diseñar, no a asumir.
