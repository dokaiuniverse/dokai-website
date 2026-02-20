import CrossSVG from "@assets/icons/cross.svg";
import { useEffect, useRef, useState } from "react";
import * as Styles from "./style.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createPortal } from "react-dom";

const TRANSITION_DURATION = 200;

type Props = {
  title?: string;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  maxWidth?: string;
  className?: string;
};

const EditModalLayout = ({
  title,
  className,
  open,
  onClose,
  children,
  maxWidth = "34rem",
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const showModalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showModalTimeoutRef.current)
      window.clearTimeout(showModalTimeoutRef.current);

    if (open) {
      setIsMounted(true);

      showModalTimeoutRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsVisible(true));
        });
      }, 0);
    } else {
      setIsVisible(false);

      showModalTimeoutRef.current = setTimeout(() => {
        setIsMounted(false);
      }, TRANSITION_DURATION);
    }

    return () => {
      if (showModalTimeoutRef.current)
        window.clearTimeout(showModalTimeoutRef.current);
    };
  }, [open]);

  if (!isMounted) return null;

  return createPortal(
    <div
      className={Styles.Overlay({ isVisible: isVisible })}
      style={assignInlineVars({
        [Styles.TransitionDurationVar]: `${TRANSITION_DURATION}ms`,
        [Styles.MaxWidthVar]: maxWidth,
      })}
      onMouseDown={onClose}
    >
      <div
        className={Styles.Layout({ isVisible: isVisible })}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={Styles.Header}>
          <p className={Styles.HeaderTitle}>{title}</p>
          <button className={Styles.CloseButton} onClick={onClose}>
            <CrossSVG className={Styles.CloseButtonIcon} />
          </button>
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default EditModalLayout;
