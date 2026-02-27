import { Role } from "@lib/auth/types";

export type SessionStatus = {
  loggedIn: boolean;
  email: string | null;
  role: Role | null;
};
