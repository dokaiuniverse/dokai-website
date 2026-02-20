"use client";

import * as Styles from "./style.css";
import { handleLogout } from "@controllers/auth/logout";
import ArrowRightSVG from "@assets/icons/arrow-right.svg";
import { useSessionStatusQuery } from "@controllers/auth/session";
import useMount from "@hooks/useMount";
import Link from "next/link";

const DrawerAdminNav = () => {
  const mounted = useMount();
  const { data: session } = useSessionStatusQuery();

  if (!mounted || !session?.loggedIn) return null;

  return (
    <>
      <Link href="/admin" className={Styles.NavLink}>
        <ArrowRightSVG className={Styles.NavArrowIcon} />
        <p>ADMIN</p>
      </Link>
      <button
        className={Styles.NavLink}
        onClick={handleLogout}
        style={{
          marginTop: "1rem",
        }}
      >
        <ArrowRightSVG className={Styles.NavArrowIcon} />
        <p>LOGOUT</p>
      </button>
    </>
  );
};

export default DrawerAdminNav;
