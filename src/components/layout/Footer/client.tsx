"use client";

import Link from "next/link";
import LogoPNG from "@assets/dokai.png";
import * as Styles from "./Footer.css";
import Image from "next/image";
import ExternalLinks from "@ts/external_links";
import { getRandomColor, getReadableTextColor } from "@utils/Color";
import CompanyInfo from "@ts/company_info";
import dynamic from "next/dynamic";
const NaverMap = dynamic(() => import("@components/ui/NaverMap/NaverMap"), {
  ssr: false,
});
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const FooterClient = ({ initialColor }: { initialColor: string }) => {
  const pathname = usePathname();
  const [randomColor, setRandomColor] = useState(initialColor);

  const footerRef = useRef<HTMLDivElement>(null);
  const fg = getReadableTextColor(randomColor);
  const { email, tel, address } = CompanyInfo;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setRandomColor(getRandomColor());
  }, [pathname]);

  return (
    <footer
      ref={footerRef}
      className={`${Styles.Layout} layout-wrapper`}
      style={
        {
          ["--footer-bg"]: randomColor,
          ["--footer-fg"]: fg,
          ["--footer-logo-invert"]: fg === "black" ? "0" : "1",
        } as React.CSSProperties
      }
    >
      <div className={Styles.Content}>
        <p className={Styles.ContentTitle}>Contact</p>
        <div className={Styles.ContentWrapper}>
          <div className={Styles.ItemContainer}>
            <p className={Styles.ItemTitle}>{email.label}</p>
            <Link
              href={`mailto:${email.address}`}
              className={`${Styles.ItemSub}`}
            >
              {email.value}
            </Link>
          </div>
          <div className={Styles.ItemContainer}>
            <p className={Styles.ItemTitle}>{tel.label}</p>
            <Link href={`tel:${tel.number}`} className={`${Styles.ItemSub}`}>
              {tel.value}
            </Link>
          </div>
          <div className={Styles.ItemContainer}>
            <p className={Styles.ItemTitle}>{address.label}</p>
            <Link
              href={address.mapsUrl}
              className={`${Styles.ItemSub} address`}
            >
              {address.value}
            </Link>
            <div className={Styles.ItemMapContainer}>
              <NaverMap />
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.Footer}>
        <p className={Styles.FooterTitle}>© 2026 DOKAI. All Rights Reserved.</p>
        <nav className={Styles.SocialRow}>
          {ExternalLinks.map((link) => (
            <Link
              href={link.href}
              key={`FOOTER_LINK_${link.label}`}
              className={Styles.SocialLink}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className={Styles.FooterIconButton}>
          <Image src={LogoPNG} alt="logo" className={Styles.FooterIcon} />
        </Link>
      </div>
    </footer>
  );
};

export default FooterClient;
