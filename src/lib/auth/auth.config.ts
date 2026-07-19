import type { NextAuthConfig } from "next-auth";

// Config edge-safe: sin Prisma ni bcrypt (el middleware corre en Edge
// runtime). La lógica real de autenticación vive en auth.ts.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
