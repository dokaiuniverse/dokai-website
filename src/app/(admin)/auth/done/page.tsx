"use client";

import { useEffect } from "react";

export default function AuthDonePage() {
  useEffect(() => {
    (async () => {
      const url = new URL(window.location.href);
      const next = url.searchParams.get("next") || "/";
      const error = url.searchParams.get("error");
      console.log(window.location.href);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const target = error
        ? `/auth/login?error=${encodeURIComponent(error)}`
        : next;

      if (window.opener) {
        window.opener.location.href = target;
        window.close();
        return;
      }

      window.location.href = target;
    })();
  }, []);

  return <div style={{ padding: 24 }}>Finishing...</div>;
}
