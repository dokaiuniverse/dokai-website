import { Metadata } from "next";
import LoginPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = async () => {
  return <LoginPageClient />;
};

export default LoginPage;
