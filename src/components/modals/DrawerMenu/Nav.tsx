"use client";

import SearchSVG from "@assets/icons/search.svg";
import * as Styles from "./style.css";
import Link from "next/link";
import ArrowRightSVG from "@assets/icons/arrow-right.svg";
import DrawerAdminNav from "./AdminNav";
import { useModalStackStore } from "@stores/modalStackStore";

const drawerNavItems = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const DrawerNav = ({
  closeSearchRef,
}: {
  closeSearchRef: React.RefObject<(() => void) | null>;
}) => {
  const { push } = useModalStackStore();

  const handleClickSearch = () => {
    push("SEARCH", { closeSearchRef });
  };

  return (
    <nav className={Styles.NavGrid}>
      <div className={Styles.NavColumn}>
        <button onClick={handleClickSearch} className={Styles.NavSearchButton}>
          <SearchSVG className={Styles.NavSearchIcon} />
        </button>
        {drawerNavItems.map((menu) => (
          <Link
            key={`DRAWER_MENU_${menu.label}`}
            href={menu.href}
            className={Styles.NavLink}
          >
            <ArrowRightSVG className={Styles.NavArrowIcon} />
            <p>{menu.label}</p>
          </Link>
        ))}
        <DrawerAdminNav />
      </div>
    </nav>
  );
};

export default DrawerNav;
