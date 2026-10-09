export const MANAGEMENT_SESSION_USER_KEY = "rm_management_user";

export type ManagementSessionUser = {
  id?: string;
  name: string;
  email: string;
  role: string;
};

export function readManagementSessionUser(): ManagementSessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(MANAGEMENT_SESSION_USER_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as Partial<ManagementSessionUser>;
    if (
      typeof o.name === "string" &&
      typeof o.email === "string" &&
      typeof o.role === "string"
    ) {
      return {
        ...(typeof o.id === "string" ? { id: o.id } : {}),
        name: o.name,
        email: o.email,
        role: o.role,
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function clearManagementSessionUser(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(MANAGEMENT_SESSION_USER_KEY);
}
