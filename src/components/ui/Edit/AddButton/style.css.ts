import { style } from "@vanilla-extract/css";

export const Button = style({
  padding: "0.5rem",
  borderRadius: "0.5rem",
  background: "white",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",
  border: "1px solid #999",
  backdropFilter: "blur(1rem)",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const ButtonIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
});
