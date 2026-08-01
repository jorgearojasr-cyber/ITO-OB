import "server-only";

import crypto from "node:crypto";

// SHA-256 del token plano -- ver comentario en el modelo
// PasswordResetToken (schema.prisma) sobre por qué no se usa bcrypt acá.
// Compartido entre la generación (password-reset-actions.ts) y la
// lectura de estado (get-password-reset-token.ts) para que el hasheo
// nunca pueda desincronizarse entre los dos.
export function hashResetToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
