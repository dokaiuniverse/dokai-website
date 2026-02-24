export type SessionStatus = {
  loggedIn: boolean;
  email: string | null;
  role: "admin" | "staff" | null;
};
