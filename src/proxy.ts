import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/((?!login|registro|invitaciones|recuperar-password|reset-password|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
