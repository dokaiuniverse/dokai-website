import { Role } from "@lib/auth/types";

export type SessionStatus = {
  email: string | null;
  role: Role;
  hasProfile: boolean;
};
