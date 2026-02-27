import { style } from "@vanilla-extract/css";

export const Button = style({
  padding: "0.25rem",
  borderRadius: "0.5rem",
  background: "white",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out, outline-color 0.2s ease-in-out",
  border: "1px solid #999",
  outline: `1px solid transparent`,
  backdropFilter: "blur(1rem)",

  selectors: {
    "&:hover": {
      opacity: "1",
      outlineColor: "#999",
    },
  },
});

export const ButtonIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
});
