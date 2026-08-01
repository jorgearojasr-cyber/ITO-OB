import type { NextAuthConfig } from "next-auth";

// Config edge-safe: sin Prisma ni bcrypt (el middleware corre en Edge
// runtime). La lógica real de autenticación vive en auth.ts.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    // Antes: sin maxAge explícito (default de NextAuth, 30 días). Sin
    // sessionVersion ni revalidación por request, un JWT emitido antes
    // de un reset de contraseña sigue siendo válido hasta que expira
    // solo -- acortar la ventana a 7 días es la mitigación elegida en
    // vez de agregar una consulta a la base en cada request.
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
