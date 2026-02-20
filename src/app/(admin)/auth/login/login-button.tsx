"use client";

import { createSupabaseBrowserClient } from "@lib/supabase/browser";
import GoogleSVG from "@assets/google.svg";
import * as Styles from "./style.css";

export default function LoginButton() {
  const handleLogin = async () => {
    const supabase = createSupabaseBrowserClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        skipBrowserRedirect: true, // ✅ 자동 페이지 이동 막기
      },
    });

    if (error || !data?.url) {
      console.error(error);
      return;
    }

    const w = 520;
    const h = 720;
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + (window.outerHeight - h) / 2;

    window.open(
      data.url,
      "supabase-oauth",
      `popup=yes,width=${w},height=${h},left=${left},top=${top}`,
    );
  };

  return (
    <button onClick={handleLogin} className={Styles.Button}>
      <GoogleSVG
        style={{
          width: "1.5rem",
          height: "auto",
          aspectRatio: "1 / 1",
        }}
      />
      <p className={Styles.ButtonText}>Sign in with Google</p>
    </button>
  );
}
