"use client";

import { getRandomLightColor } from "@utils/Color";
import { useEffect, useRef, useState } from "react";
import * as Styles from "./style.css";
import DrawerNav from "./Nav";
import DrawerFooter from "./Footer";
import { createPortal } from "react-dom";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import useLockBodyScroll from "@hooks/useLockBodyScroll";

const TRANSITION_DURATION = 250;

type Props = {
  closeMenuRef: React.RefObject<(() => void) | null>;
  closeSearchRef: React.RefObject<(() => void) | null>;
  onClose: () => void;
};

const DrawerMenu = ({ closeMenuRef, closeSearchRef, onClose }: Props) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  useLockBodyScroll(true);

  useEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
    }, 0);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    closeSearchRef.current?.();
    setTimeout(() => {
      onClose();
    }, TRANSITION_DURATION);
  };

  useEffect(() => {
    overlayRef.current?.style.setProperty("--drawer-bg", getRandomLightColor());
    closeMenuRef.current = handleClose;
  }, []);

  return createPortal(
    <div
      className={Styles.Overlay({ isVisible: isVisible })}
      style={assignInlineVars({
        [Styles.TransitionDurationVar]: `${TRANSITION_DURATION}ms`,
      })}
      onMouseDown={handleClose}
    >
      <div
        ref={overlayRef}
        className={`${Styles.Layout({ isVisible: isVisible })} layout-wrapper`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <DrawerNav closeSearchRef={closeSearchRef} />
        <DrawerFooter />
      </div>
    </div>,
    document.body,
  );
};

export default DrawerMenu;
