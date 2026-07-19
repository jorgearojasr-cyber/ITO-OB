# ObraBien — Asistente de Recepción de Viviendas

## Qué es esto
SaaS que guía a personas sin conocimientos técnicos durante la recepción de una
vivienda nueva: recorrido guiado recinto por recinto y elemento por elemento,
checklists, evidencia fotográfica y un informe final exportable a PDF.

La v1 **no usa IA**. Toda la inteligencia es organización del conocimiento
(biblioteca técnica curada + checklists estándar). La arquitectura debe dejar
espacio para incorporar IA sobre fotografías en fases futuras, sin rediseñar
el modelo de datos.

Documentos de referencia en la raíz del repo (léelos antes de tocar el módulo
correspondiente, no de memoria):
- `docs/obrabien-especificacion.docx` — especificación completa de producto
  (arquitectura, modelo de datos, roles, módulos, pantallas, modelo SaaS,
  roadmap).
- `docs/obrabien-inicio-prototipo.html` — prototipo visual aprobado de la
  pantalla de Inicio. Es la fuente de verdad del lenguaje visual: colores,
  tipografía, espaciados y jerarquía deben replicarse desde ahí, no
  reinventarse.

## Stack (propuesto, confirmar antes de escribir código)
- Frontend: Next.js (React), mobile-first, PWA instalable.
- Backend: API dentro del mismo monorepo Next.js o NestJS separado.
- Base de datos: PostgreSQL (Prisma como ORM).
- Almacenamiento de fotos: bucket de objetos (S3 o equivalente), la DB solo
  guarda referencias.
- Auth: JWT + soporte multi-tenant desde el día uno.

## Principios de arquitectura (no negociables)
- **Multi-tenant**: todo cuelga de `Organization`. Un usuario particular es
  una organización de un solo miembro.
- **Template vs Instance**: el catálogo maestro (`RoomTemplate`,
  `ElementTemplate`, `ChecklistItemTemplate`) es contenido editorial,
  separado de los datos de cada inspección (`RoomInstance`,
  `ElementInstance`, `Observation`). Nunca mezclar ambas capas.
- **Fotos desacopladas**: solo almacenamiento en v1, sin análisis. Dejar un
  campo de metadatos extensible (JSON) en `Observation`/`Photo` para IA
  futura, sin migrar esquema después.
- **Offline-first parcial**: las inspecciones ocurren dentro de la vivienda
  con conectividad variable; el cliente debe tolerar guardado local
  temporal y sincronizar después.

## Convenciones
- Idioma de UI y copy: español (Chile), lenguaje simple, cero jerga técnica
  de construcción sin explicar.
- Componentes UI derivados del prototipo de Inicio: reutilizar tokens de
  color/tipografía, no crear una paleta nueva por pantalla.
- Commits pequeños y descriptivos; nada de commits que mezclen modelo de
  datos + UI + config en uno solo.

## Cómo trabajar conmigo en este repo
- Antes de tocar el modelo de datos: leer la sección 5 del docx.
- Antes de tocar una pantalla: leer la sección 10 del docx + el HTML del
  prototipo.
- Para cambios de arquitectura o alcance: proponer primero en modo plan,
  no ejecutar directo.

## Comandos
(completar a medida que se definan: `npm run dev`, `npm run test`,
`npm run db:migrate`, etc.)

## Base de datos (Neon)
Proyecto Neon `obrabien-db` (org `Vercel: Jorge Rojas' projects`). Dos
branches, completamente separados desde 2026-07-19:

- **`main`** — usa producción (`ito-ob.vercel.app`, env vars de Vercel
  Production/Preview). No se toca desde este equipo salvo despliegue.
- **`development`** — usa el entorno local (`.env` y `.env.local`, ambos
  apuntan aquí). Creado como copia de `main` en ese momento; a partir de
  ahí evoluciona de forma independiente. Es seguro correr seed, resets
  de datos de prueba o migraciones experimentales aquí sin riesgo de
  afectar producción.

**Importante**: Prisma Client carga `.env` automáticamente al
importarse (no `.env.local`). Next.js sí prioriza `.env.local` sobre
`.env`. Como este proyecto corre tanto `next dev` como scripts sueltos
con `tsx`/`prisma` (seed, migraciones), **ambos archivos** deben apuntar
siempre al mismo branch para evitar que un comando golpee `development`
y otro golpee `main` sin darte cuenta.

Cómo traer datos nuevos de producción a `development` si hace falta
(por ejemplo, después de una fase donde se generaron datos reales en
producción que quieres tener también en local):

```
npx neonctl branches reset development --parent --project-id crimson-leaf-42265510 --org-id org-square-bread-45599210
```

Esto resetea `development` descartando lo que tenga y lo vuelve a crear
como copia fresca de `main` (su padre) al momento de correr el comando.
Alternativa equivalente: borrar el branch y crearlo de nuevo con
`neonctl branches create --name development --parent main`. En ambos
casos, después de resetear hay que volver a correr `npm run db:seed` si
quieres los datos demo, ya que un reset trae exactamente lo que tenga
`main` en ese momento (incluidos o no los datos demo, según el estado
de producción).

## Anti-patrones (no hacer)
- No introducir lógica de IA/ML en la v1, ni endpoints "preparados" que
  llamen a modelos externos.
- No hardcodear el catálogo de recintos/elementos en el frontend: debe
  venir de `RoomTemplate`/`ElementTemplate` en la base de datos.
- No usar `localStorage`/`sessionStorage` del navegador como fuente de
  verdad — solo como caché temporal offline.
