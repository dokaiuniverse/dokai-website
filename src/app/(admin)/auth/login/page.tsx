import { getSessionStatusServer } from "@controllers/auth/session.server";
import LoginPageClient from "./page-client";

const LoginPage = async () => {
  const data = await getSessionStatusServer();

  return <LoginPageClient isAuthed={data.loggedIn} />;
};

export default LoginPage;
