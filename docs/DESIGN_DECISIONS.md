# Decisiones de Diseño — ObraBien

Documento de consolidación. Reúne los principios aprobados por el
usuario durante los Sprints 1, 2a, 2b y 3, organizados por origen y
luego sintetizados en las reglas que aplican de aquí en adelante a
cualquier pantalla futura. Complementa (no reemplaza) a
`PRODUCT_DECISIONS.md`, que registra específicamente reglas de
arquitectura/lógica con impacto en el código; este documento cubre
principios de **experiencia y diseño**.

---

## Metodología (transversal a los 4 sprints)

Estas reglas de proceso quedaron establecidas desde el Sprint 1 y se
reafirmaron en cada sprint posterior — aplican a cualquier trabajo
futuro sobre el producto, no a una pantalla en particular:

1. **Proceso de 6 etapas obligatorio** para toda pantalla nueva:
   análisis del código existente → diseño de experiencia (sin código)
   → especificación visual (verificada contra código) → validación →
   implementación → cierre.
2. **La visión de producto inspira, nunca sustituye el análisis de
   código real.** Toda implementación empieza analizando el estado
   real del repositorio, nunca partiendo directo de un documento de
   visión (regla explícita desde el Sprint 2a, ver `ROADMAP_OBRABIEN.md`).
3. **Un sprint cerrado solo admite correcciones de bugs.** Nuevas
   funcionalidades o cambios visuales sobre una pantalla ya cerrada
   requieren abrir un sprint nuevo explícito.
4. **No modificar arquitectura, lógica de negocio, contratos de datos
   ni endpoints existentes** sin aprobación explícita — toda
   implementación se limita a UX/UI/interacción/organización visual,
   salvo desviaciones puntuales acordadas caso a caso (ver ejemplos en
   cada sprint abajo).
5. **Toda desviación de una regla previa se detiene y se consulta
   antes de proceder** — no se asume, no se implementa primero y se
   avisa después.

---

## Sprint 1 — Pantalla de Elemento

- El camino rápido ("✓ Está bien") y el panel expandible
  ("Reportar un problema") son la misma lógica de negocio existente,
  solo reetiquetada y reordenada visualmente — cero cambio de payload
  a los Server Actions.
- Don José Luis "Enseñando" explica una vez al entrar a un elemento;
  "Escuchando" confirma brevemente tras una acción — nunca repite
  instrucciones ya dadas.
- Cámara guiada envuelve el mismo pipeline de captura nativa +
  `upload()` + `attachPhoto` de siempre — agrega un paso de
  confirmar/repetir, no reemplaza el mecanismo de subida.
- El espacio reservado para IA futura es un badge visual inerte —
  ningún componente nuevo hace fetch a un servicio de IA ni deja un
  endpoint "preparado".

## Sprint 2a — Pantalla de Inicio

1. Una pregunta domina — "¿puedo seguir donde quedé?" ordena toda la
   pantalla.
2. Estado y acción van juntos, nunca separados por scroll ni por otro
   contenido.
3. Cada estado vacío es una pantalla completa propia, no una versión
   pobre del estado con datos.
4. Lo que no ayuda a decidir el siguiente paso pesa menos y va
   después — nunca antes.
5. Don José Luis acompaña, no interrumpe — presencia fija y discreta,
   sin animación que compita por atención.
6. Ningún ajuste depende de un dato nuevo — todo se construye con lo
   que la query ya devuelve hoy.

## Sprint 2b — Bienvenida a una inspección

1. Un respiro, no un formulario ni una lección.
2. Don José Luis es el centro, no un acompañante — único momento del
   producto donde ocupa el rol protagónico.
3. Un solo camino hacia adelante — sin botón de saltar, sin
   bifurcaciones.
4. A la persona, no al proyecto — el nombre del proyecto es contexto
   secundario, nunca el sujeto de la frase de saludo.
5. Sin nueva persistencia — la "no repetición" es un efecto de dónde
   vive la pantalla en la navegación, no de una bandera guardada.
6. No reemplaza ni le explica de nuevo a nadie —
   `OnboardingCarousel` sigue siendo el único que "enseña a usar"
   ObraBien.
7. **(Permanente)** Es un respiro antes de comenzar — nunca un paso
   funcional del flujo de creación.
8. **(Permanente)** Don José Luis nunca instruye la interacción — no
   dice "presiona" ni "toca"; la acción siempre la comunica el botón.
9. **(Permanente)** Don José Luis nunca genera sensación de urgencia —
   siempre transmite calma y acompañamiento.
10. **(Permanente)** Esta pantalla es la única del recorrido donde
    Don José Luis sostiene una conversación breve — en el resto del
    producto, sus mensajes vuelven a ser breves y contextuales.

## Sprint 3 — Flujo de Recintos

1. Se camina, no se tilda — el recorrido se siente como avanzar por
   la vivienda, no como vaciar una lista de tareas.
2. Completar un recinto es una transición, no un final — el cierre y
   el inicio del siguiente son, para la experiencia, el mismo gesto.
3. El camino hacia adelante es el default — Inicio y la lista de
   recintos siguen existiendo, pero dejan de ser el único mecanismo
   entre recintos.
4. La orientación es doble — local (dónde estoy) y global (cuánto
   llevo del recorrido completo); ninguna reemplaza a la otra.
5. Los hallazgos menores (color, duplicación, iconografía) no dirigen
   el diseño — se resuelven como parte de la implementación, no como
   objetivo de la etapa de experiencia.
6. Nada requiere un dato nuevo — el orden de recintos y el progreso
   por elemento ya existen.
7. **(Permanente, ver `PRODUCT_DECISIONS.md`)** Nunca se obliga a
   decidir cuál es el siguiente paso — se sugiere el recorrido
   natural cuando existe, con el algoritmo único de "primer trabajo
   pendiente".
8. **(Permanente)** La interrupción y reanudación no rompen la
   sensación de continuidad — la orientación completa está siempre
   presente, no solo la primera vez.
9. Don José Luis: evaluado explícitamente y **no incorporado** — sin
   un momento genuino propio de este flujo que no esté ya cubierto en
   Elemento o Inicio.

---

## Síntesis — principios permanentes vigentes para cualquier pantalla futura

Extraídos de los 4 sprints, estos son los que aplican **de aquí en
adelante**, no solo a la pantalla donde se originaron:

1. **Un solo CTA por decisión real.** Nunca presentar una elección
   genérica cuando ya existe una respuesta obvia derivada de datos
   existentes (Sprint 2b principio 3, Sprint 3 principio 7 y
   `PRODUCT_DECISIONS.md`).
2. **Algoritmo único de "siguiente paso pendiente".** Cualquier
   componente que sugiera qué sigue debe reutilizar
   `next-pending-room.ts` (o su equivalente si el concepto se
   extiende más allá de recintos) — nunca una implementación paralela
   por índice o posición visual.
3. **Sin nueva persistencia salvo aprobación explícita.** Preferir
   estado derivado en vivo sobre banderas guardadas — la
   "no repetición" o "continuidad" de una experiencia se resuelve por
   estructura de navegación o por datos ya existentes, no por
   políticas de sesión nuevas.
4. **Orientación doble en cualquier pantalla de recorrido.** Local
   (dónde estoy) y global (cuánto llevo) — ninguna sustituye a la
   otra.
5. **Reglas permanentes de Don José Luis**: nunca instruye la
   interacción ("presiona"/"toca" — eso lo dice el control, no el
   personaje); nunca genera urgencia; sus mensajes son breves y
   contextuales salvo en la Bienvenida a una inspección, que es la
   única excepción reconocida de "conversación extendida"; se evalúa
   explícitamente antes de incorporarlo a una pantalla nueva — no se
   agrega por costumbre.
6. **Estados vacíos con acción cuando hay un camino de recuperación
   real** (Sprint 2a, aplicado también en el Sprint 3 al `EmptyState`
   de recintos).
7. **Interrupción y reanudación nunca requieren una pantalla
   especial** — el contexto correcto siempre llega resuelto en el
   primer render desde el servidor.
8. **Ningún ajuste de experiencia depende de un dato nuevo** salvo que
   se apruebe explícitamente como desviación — y cuando se aprueba,
   se documenta como tal (ver ejemplos de desviaciones aprobadas en
   `ROADMAP_OBRABIEN.md`, Sprints 2a y 2b).
9. **Sin IA activa en v1** — cualquier espacio reservado para IA
   futura es inerte, sin lógica ni llamada a servicio externo.
10. **Reutilizar antes que duplicar.** Cuando un componente deja de
    ser específico de una pantalla, se mueve a `src/components/ui/`
    (precedente: `DonJoseLuisAvatar`/`DonJoseLuisCard`, movidos desde
    `elemento/` en el Sprint 2a) — nunca se copia su lógica en un
    segundo lugar.
