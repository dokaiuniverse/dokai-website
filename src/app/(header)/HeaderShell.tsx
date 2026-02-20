"use client";

import dynamic from "next/dynamic";

// ✅ 여기서만 ssr:false 가능
const Header = dynamic(() => import("@components/layout/Header/Header"), {
  ssr: false,
});
const Modals = dynamic(() => import("./Modals"), { ssr: false });

export default function HeaderShell() {
  return (
    <>
      <Modals />
      <Header />
    </>
  );
}
