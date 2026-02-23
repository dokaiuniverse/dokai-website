import { media } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const Container = style({
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
});

export const Content = style({
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
});

export const ButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "#666",
});

export const EmptyContaienr = style({
  width: "100%",
  height: "100%",
  border: "1px solid black",
  borderRadius: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

export const AddButton = style({
  padding: "0.5rem",
  borderRadius: "999px",
  background: "#ddd",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",
  border: "1px solid lightgray",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const EditButton = style({
  position: "absolute",
  bottom: "0",
  right: "0",
  padding: "0.5rem",
  borderRadius: "1rem",
  background: "white",
  margin: "0.5rem",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const AlignButton = recipe({
  base: {
    position: "absolute",
    top: "0",
    padding: "0.5rem",
    borderRadius: "1rem",
    background: "white",
    margin: "0.5rem",
    opacity: "0.5",
    transition: "opacity 0.2s ease-in-out, rotate 0.2s ease-in-out",

    selectors: {
      "&:hover": {
        opacity: "1",
      },
    },
  },
  variants: {
    align: {
      LEFT: {
        right: "0",
        rotate: "0deg",
      },
      RIGHT: {
        left: "0",
        rotate: "180deg",
      },
    },
  },
});
