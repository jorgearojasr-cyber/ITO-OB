import type { UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      organizationId: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    organizationId: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    organizationId: string;
    role: UserRole;
  }
}
