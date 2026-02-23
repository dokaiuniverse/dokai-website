import { vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Button = style({
  borderRadius: "999px",
  background: "rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(10px)",
  position: "relative",
  opacity: "0.7",
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
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

export const ButtonText = style({
  position: "absolute",
  color: "white",
  top: "0",
  right: "100%",
  background: "rgba(0, 0, 0, 0.3)",
  padding: "0.25rem 0.5rem",
  marginRight: "0.5rem",
  fontSize: vars.fontSize.sm,
  borderRadius: "0.5rem",
  width: "auto",
  overflow: "hidden",
  opacity: "0",
  maxWidth: "0",
  transition: "max-width 0.2s ease-in-out, opacity 0.2s ease-in-out",
  whiteSpace: "nowrap",
});

globalStyle(`.${Button}:hover .${ButtonText}`, {
  maxWidth: "10rem",
  opacity: "1",
});
