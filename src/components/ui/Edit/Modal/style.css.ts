import { vars } from "@styles/theme.css";
import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const TransitionDurationVar = createVar();
export const MaxWidthVar = createVar();

export const Overlay = recipe({
  base: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
    padding: "2rem",
    transition: `background ${TransitionDurationVar} ease-in-out, backdrop-filter ${TransitionDurationVar} ease-in-out`,
  },
  variants: {
    isVisible: {
      true: {
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(2px)",
      },
      false: {
        background: "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(0px)",
      },
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});

export const Layout = recipe({
  base: {
    width: "100%",
    maxWidth: MaxWidthVar,
    background: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    borderRadius: "1rem",
    transition: `transform ${TransitionDurationVar} ease-in-out, opacity ${TransitionDurationVar} ease-in-out`,
    overflow: "hidden",
  },
  variants: {
    isVisible: {
      true: {
        transform: "translateY(0)",
        opacity: 1,
      },
      false: {
        transform: "translateY(20rem)",
        opacity: 0,
      },
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});

export const Header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "1rem",
  marginBottom: "0",
});

export const HeaderTitle = style({
  fontSize: vars.fontSize.md,
});

export const CloseButton = style({});

export const CloseButtonIcon = style({
  width: "1.5rem",
  stroke: "black",
  height: "auto",
  aspectRatio: "1 / 1",
});
