# Flujo de Usuario — ObraBien

Documento de consolidación. Describe el recorrido completo de la
aplicación **tal como existe en el código hoy** — cada ruta y
transición listada acá corresponde a un archivo `page.tsx` real. No
propone cambios de flujo.

---

## 1. Puntos de entrada

| Ruta | Acceso | Rol |
|---|---|---|
| `/login` | Público | Inicio de sesión. Redirige a `/` si ya hay sesión. |
| `/registro` | Público | Creación de cuenta nueva. Redirige a `/` si ya hay sesión. |
| `/recuperar-password` | Público | Solicitud de link de recuperación por email. |
| `/reset-password` | Público | Define nueva contraseña usando un token de un solo uso. |
| `/invitaciones/[token]` | Público | Acceso de un colaborador invitado — login/registro embebido o botón de aceptar si ya está autenticado. |

Todo lo demás bajo `src/app/` está protegido por el middleware
(`src/proxy.ts`) por defecto — cualquier ruta no listada arriba exige
sesión.

---

## 2. El recorrido principal (creador de la inspección)

```
/login
  └─ /  (Inicio)
       ├─ hasAnyInspections=false, hasSeenOnboarding=false
       │    └─ OnboardingCarousel (pantalla completa, sin header/nav)
       │         └─ "Comenzar mi primera inspección" → /inspecciones/nueva
       │
       ├─ Sin inspección activa (o sin proyectos)
       │    └─ CTA "+ Nueva inspección" → /inspecciones/nueva
       │
       └─ Inspección IN_PROGRESS activa
            ├─ CTA "Continuar recorrido" → /recintos/{nextPendingRoom}
            │    (algoritmo único de "primer trabajo pendiente")
            └─ CTA "Ver resumen" (si 100% o sin nextStep) → /resumen

/inspecciones/nueva
  └─ crear inspección (Server Action, transacción: Inspection + Rooms + Elements)
       └─ redirect → /inspecciones/{id}/bienvenida

/inspecciones/{id}/bienvenida
  └─ CTA único "Comenzar inspección" → /recintos/{firstPendingRoom}
       (pantalla de un solo uso, alcanzable solo desde este redirect)

/inspecciones/{id}/recintos            (lista de recintos)
  └─ cada fila → /recintos/{roomId}
       (recinto "actual" resaltado con borde de acento)

/inspecciones/{id}/recintos/{roomId}   (detalle de recinto)
  ├─ header: subtítulo proyecto/unidad + "Recinto N de M"
  ├─ backHref → lista de recintos
  ├─ lista de elementos → /elementos/{elementId}
  └─ si percent === 100 → RoomCompletionBanner
       ├─ hay recinto pendiente → "Continuar con {recinto} →" → ese recinto
       └─ no queda ninguno → "Ir al resumen →" → /resumen

/inspecciones/{id}/elementos/{elementId}   (inspección de un elemento)
  ├─ rama 1: pregunta de material (piso/muro) — una vez por recinto
  ├─ rama 2: pregunta ducha/tina — una vez por recinto (solo Baños)
  └─ rama 3 (normal): ficha técnica + checklist
       ├─ Don José Luis "Enseñando" (primera vez) → colapsa a avatar en header
       ├─ cada ítem: "✓ Está bien" (rápido) o "Reportar un problema" (panel)
       ├─ foto vía cámara guiada
       ├─ Don José Luis "Escuchando" (toast, tras cada acción)
       └─ al responder todo → "✓ Elemento revisado — Volver a {recinto}"
            → vuelve al detalle de ese recinto (posible RoomCompletionBanner)
```

---

## 3. Flujos secundarios (navegación libre, no lineales)

Todos accesibles desde `BottomNav` (persistente en toda pantalla
autenticada) o desde `QuickAccessGrid` de Inicio:

- **`/inspecciones`** — lista de todas las inspecciones del usuario/
  organización. Cada `InspectionListItem` enlaza al primer recinto
  pendiente (si es propietario/gestiona) o directo a `/resumen` (si es
  colaborador externo o la inspección está `COMPLETADA`).
- **`/biblioteca`** → **`/biblioteca/{categoria}`** →
  **`/biblioteca/{categoria}/{articulo}`** — consulta de contenido
  técnico, independiente de cualquier inspección puntual.
- **`/fotos`** — galería de todas las fotos, con filtro por proyecto/
  inspección vía `searchParams`.
- **`/kit-inspeccion`** — checklist estático de herramientas a llevar
  a terreno.
- **`/notificaciones`** — lista de notificaciones del usuario.
- **`/perfil`** — datos de cuenta + cerrar sesión.

---

## 4. Flujo de edición de una inspección (solo propietario/gestor)

```
/inspecciones/{id}/editar   (hub)
  ├─ /tipo-vivienda    (editar tipo de propiedad)
  ├─ /caracteristicas  (editar flags de características)
  └─ /distribucion     (editar distribución de recintos)
       └─ puede listar recintos/elementos pendientes de eliminación
            (PendingRemovalsPanel + DeleteRoomModal)

Los tres formularios de edición vuelven a → /inspecciones/{id}/recintos
al terminar.
```

Esta rama exige `canManageInspection` además de sesión — un
colaborador externo no puede editarla (mismo criterio que le impide
entrar al recorrido de recintos).

---

## 5. Cierre de una inspección

```
/inspecciones/{id}/resumen
  ├─ lista de observaciones (ObservationsSummaryList)
  │    └─ cada una: cambiar estado de ciclo de vida (ObservationLifecycleModal)
  ├─ invitar colaboradores (InviteCollaboratorSection/Modal)
  │    → genera InspectionInvite → link compartible → /invitaciones/{token}
  └─ CloseInspectionSection
       └─ CloseInspectionModal (confirmación)
            └─ closeInspection (Server Action) → genera Report (PDF)
                 └─ status: COMPLETADA

/inspecciones/{id}/informe   (solo tras cerrar)
  ├─ portada, resumen, secciones por recinto, firmas
  ├─ InformeToolbar: compartir / reintentar generación si falló
  └─ estado congelado — snapshot del momento del cierre
```

---

## 6. Estados finales de una inspección

| Estado (`Inspection.status`) | Cómo se llega | Qué ve el usuario en Inicio |
|---|---|---|
| `IN_PROGRESS` | Creación (`createInspection` la crea directo en este estado) | Hero con progreso real, CTA "Continuar recorrido" o "Ver resumen" |
| `COMPLETADA` | `closeInspection` (Server Action, desde `/resumen`) | Ya no aparece como "activa" en Inicio — accesible desde `/inspecciones` |

No existe un estado "abandonada" ni "en pausa" explícito — una
inspección `IN_PROGRESS` sin actividad reciente se ve, para el sistema,
igual que una recién creada: el progreso se recalcula en vivo, sin
importar cuánto tiempo pasó.

---

## 7. Transiciones que nunca ocurren (confirmado por código, no supuesto)

- No hay navegación directa recinto → recinto sin pasar por el banner
  de cierre, la lista, o Inicio.
- Ningún flujo redirige automáticamente a `/informe` sin pasar antes
  por el cierre explícito en `/resumen`.
- `OnboardingCarousel` y la Bienvenida a una inspección
  (`/bienvenida`) son mutuamente excluyentes en el tiempo — el primero
  es anterior a tener ninguna inspección, el segundo ocurre solo al
  crear una.
- Un colaborador externo nunca llega a `/recintos` ni a
  `/inspecciones/{id}/editar` — sus únicos destinos dentro de una
  inspección ajena son `/resumen` y `/elementos/{id}`.
