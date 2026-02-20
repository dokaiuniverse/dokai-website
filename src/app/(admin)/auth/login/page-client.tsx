"use client";

import Image from "next/image";
import LoginButton from "./login-button";
import * as Styles from "./style.css";
import LogoSVG from "@assets/dokai.svg";

const LoginPageClient = ({ isAuthed }: { isAuthed: boolean }) => {
  return (
    <main className={Styles.Layout}>
      <div className={Styles.Container}>
        <LogoSVG className={Styles.Logo} />
        <p className={Styles.Title}>Login</p>

        {isAuthed ? (
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className={Styles.Button}
          >
            <p className={Styles.ButtonText}>Already Logged In</p>
          </button>
        ) : (
          <LoginButton />
        )}

        <p className={Styles.Description}>
          로그인 후에도 접근이 안 되면 허용 목록에 이메일이 등록되어 있는지
          확인하세요.
        </p>
      </div>
    </main>
  );
};

export default LoginPageClient;
