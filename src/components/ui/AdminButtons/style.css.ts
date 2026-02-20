import { style } from "@vanilla-extract/css";

export const ButtonsContainer = style({
  position: "fixed",
  bottom: "0",
  right: "0",
  margin: "2rem",

  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  zIndex: "100",
});

export const Button = style({
  borderRadius: "999px",
  background: "rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(10px)",
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
