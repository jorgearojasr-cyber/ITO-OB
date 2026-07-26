// Compartido entre actions.ts (Server Action, valida el límite real) y
// InformeToolbar.tsx (cliente, solo para reflejar el mismo criterio en la
// UI) — sin "use server" porque un módulo "use server" solo puede
// exportar funciones async, no constantes.
export const MAX_REPORT_RETRIES = 3;
export const REPORT_RETRY_COOLDOWN_MS = 30_000;
// Si pasó más de esto desde el último intento, un Report que agotó sus
// reintentos puede volver a intentarlo — cubre el caso de un problema
// transitorio de la plataforma (ej. Vercel) en vez de dejar al usuario
// sin salida para siempre.
export const REPORT_RETRY_COUNT_RESET_MS = 60 * 60 * 1000;
