import "server-only";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
  // El SDK de Resend NO lanza excepción en errores de la API (dominio
  // sin verificar, API key inválida, etc.) -- devuelve { data, error }.
  // Si no se chequea `error` acá, un fallo real de envío pasaría como
  // éxito silencioso para el caller.
  const { error } = await resend.emails.send({
    from: "ObraBien Inspección <noreply@obrabien.cl>",
    to,
    subject: "Recupera tu contraseña",
    html: `
      <p>Recibimos una solicitud para restablecer tu contraseña en ObraBien Inspección.</p>
      <p><a href="${resetUrl}">Haz clic aquí para elegir una contraseña nueva</a>.</p>
      <p>Este link vence en 1 hora. Si no pediste este cambio, puedes ignorar este correo.</p>
    `,
  });
  if (error) {
    throw new Error(`Resend rechazó el envío: ${error.message}`);
  }
}
