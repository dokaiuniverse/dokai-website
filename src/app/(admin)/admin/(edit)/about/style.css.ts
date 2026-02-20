import { media } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const AddButton = style({
  gridColumn: "2 / -2",
  display: "flex",
  border: "1px solid black",
  borderRadius: "1rem",
  padding: "1rem",
  alignItems: "center",
  justifyContent: "center",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const AddButtonIcon = style({
  width: "2rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "black",
});

export const Button = style({
  position: "fixed",
  bottom: "0",
  right: "0",
  margin: "2rem",

  borderRadius: "999px",
  background: "rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(10px)",

  zIndex: "100",
});

export const ButtonIcon = style({
  width: "2rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "white",
  strokeWidth: "2px",
  padding: "0.5rem",
  boxSizing: "content-box",
});

export const SideButtonContainer = recipe({
  base: {
    position: "absolute",
    width: "5rem",
    top: "0",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  variants: {
    align: {
      LEFT: {
        left: "100%",
        right: "auto",
      },
      RIGHT: {
        left: "auto",
        right: "100%",
      },
    },
  },
  defaultVariants: {
    align: "LEFT",
  },
});

export const SideButton = style({
  padding: "0.5rem",
  borderRadius: "999px",
  background: "white",
  border: "1px solid rgba(0, 0, 0, 0.3)",

  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out, background 0.2s ease-in-out",

  "@media": {
    [media.tablet]: {
      display: "none",
    },
  },

  selectors: {
    "&:hover": {
      opacity: "1",
      background: "rgba(0, 0, 0, 0.1)",
    },
  },
});

export const SideButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
});
