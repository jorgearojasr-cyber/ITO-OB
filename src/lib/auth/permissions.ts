import type { UserRole } from "@prisma/client";

const MANAGE_INSPECTION_ROLES: readonly UserRole[] = ["PROPIETARIO", "ADMIN_ORGANIZACION"];

export function canManageInspection(role: UserRole): boolean {
  return MANAGE_INSPECTION_ROLES.includes(role);
}
