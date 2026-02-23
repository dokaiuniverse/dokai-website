"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Styles from "./style.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoPNG from "@assets/dokai.png";
import { IMAGE_SIZES } from "@ts/image";
import useIsPastSentinel from "@hooks/useIsPastSentinel";
import { useModalStackStore } from "@stores/modalStackStore";
import SearchSVG from "@assets/icons/search.svg";
import HamburgerXSVG from "@assets/icons/hamburger-x.svg";
import MenuBGSVG from "@assets/icons/menu-bg.svg";

const navList = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

const Header = () => {
  const pathname = usePathname();
  const { sentinelRef, isPast: isFloatingMenu } = useIsPastSentinel();
  const { push } = useModalStackStore();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const closeMenuRef = useRef<() => void>(null);
  const closeSearchRef = useRef<() => void>(null);

  const handleCloseModals = useCallback(() => {
    setIsOpenMenu(false);
    closeMenuRef.current?.();
    closeSearchRef.current?.();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    handleCloseModals();
  }, [pathname]);

  const handleClickMenu = () => {
    if (!isOpenMenu) {
      setIsOpenMenu(true);
      push("DRAWER_MENU", { closeMenuRef, closeSearchRef });
    } else {
      setIsOpenMenu(false);
      closeMenuRef.current?.();
    }
  };

  const handleClickSearch = () => {
    push("SEARCH", { closeSearchRef });
  };

  return (
    <header className={`${Styles.Layout} layout-wrapper`}>
      <Link
        href="/"
        className={Styles.LogoContainer}
        onClick={handleCloseModals}
      >
        <Image
          src={LogoPNG}
          alt="logo"
          className={Styles.LogoImage}
          sizes={IMAGE_SIZES}
          priority
        />
      </Link>
      <nav ref={sentinelRef} className={Styles.NavContainer}>
        {navList.map((nav) => (
          <Link
            key={`HEADER_NAV_${nav.label}`}
            href={nav.href}
            className={Styles.NavLabel}
          >
            {nav.label}
          </Link>
        ))}
        <button onClick={handleClickSearch} className={Styles.NavSearchButton}>
          <SearchSVG className={Styles.NavIcon} />
        </button>
        <button
          onClick={handleClickMenu}
          className={Styles.NavDrawerButton}
          data-floating={isFloatingMenu}
          aria-expanded={isOpenMenu}
          aria-label="Open menu"
        >
          <MenuBGSVG className={Styles.NavDrawerButtonDeco} />
          <HamburgerXSVG className={Styles.NavIcon} data-open={isOpenMenu} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
