"use client";

import * as Styles from "./style.css";
import { handleLogout } from "@controllers/auth/logout";
import ArrowRightSVG from "@assets/icons/arrow-right.svg";
import { useSessionStatusQuery } from "@controllers/auth/session";
import { useEffect, useState } from "react";

const DrawerLogoutButton = () => {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSessionStatusQuery();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (!session?.loggedIn) return null;

  return (
    <button
      className={Styles.NavLink}
      style={{
        marginTop: "1rem",
      }}
      onClick={handleLogout}
    >
      <ArrowRightSVG className={Styles.NavArrowIcon} />
      <p>LOG OUT</p>
    </button>
  );
};

export default DrawerLogoutButton;
