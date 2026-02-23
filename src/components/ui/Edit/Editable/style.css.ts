import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const Container = recipe({
  base: {
    position: "relative",

    selectors: {
      "&::before": {
        content: '""',
        position: "absolute",
        top: "-0.5rem",
        left: "-0.75rem",
        right: "-0.75rem",
        bottom: "-0.5rem",
        border: "1px solid black",
        borderRadius: "0 0.5rem 0.5rem 0.5rem",
        opacity: "0",
        zIndex: "0",
        background: "white",
      },
    },
  },
  variants: {
    isFocus: {
      true: {
        zIndex: "1",
        selectors: {
          "&::before": {
            opacity: "1",
          },
        },
      },
    },
    isRichText: {
      false: {
        selectors: {
          "&::before": {
            borderRadius: "0.5rem",
          },
        },
      },
    },
  },
  defaultVariants: {
    isFocus: false,
    isRichText: false,
  },
});

// Placeholder

export const Placeholder = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  pointerEvents: "none",
  opacity: 0.6,
  whiteSpace: "pre-wrap",
});

// Toolbar

export const ToolbarContainer = style({
  position: "absolute",
  bottom: "calc(100% + 0.5rem)",
  left: "-0.75rem",
  border: "1px solid black",
  zIndex: "100",
  display: "flex",
  borderRadius: "0.5rem 0.5rem 0 0",
  borderBottom: "none",
  overflow: "hidden",
  background: "white",
});

export const ToolbarButton = style({
  all: "unset",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem",
  transition: "background 0.1s ease-in-out",

  selectors: {
    "&:hover": {
      background: "lightgray",
    },
    "&:focus-visible": {
      outline: "2px solid black",
      outlineOffset: "-2px",
    },
  },
});

export const ToolbarButtonIcon = style({
  width: "1rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

// Content

export const Content = style({
  position: "relative",
  border: "none",
  outline: "none",
});

globalStyle(`${Content} a`, {
  color: "blue",
  position: "relative",
});

globalStyle(`${Content} a:hover`, {
  textDecoration: "underline",
});

globalStyle(`${Content} a:hover::after`, {
  content: "attr(href)",
  position: "absolute",
  left: "0",
  bottom: "calc(100% + 0.25rem)",
  whiteSpace: "nowrap",
  padding: "0.25em 0.5em",
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: "0.75em",
  background: "white",
  boxShadow: "0 0.5em 1em rgba(0,0,0,0.12)",
  fontSize: "0.5em",
  color: "black",
  zIndex: "9999",
});

export const RichTextContent = style({});

globalStyle(`${RichTextContent} a`, {
  opacity: "0.3",
  transition: "opacity 0.1s ease-in-out",
  position: "relative",
});

globalStyle(`${RichTextContent} a:hover`, {
  opacity: 1,
  textDecoration: "underline",
});

globalStyle(`${RichTextContent} a:hover::after`, {
  content: "attr(href)",
  position: "absolute",
  left: "0",
  bottom: "calc(100% + 0.25rem)",
  whiteSpace: "nowrap",
  padding: "0.25em 0.5em",
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: "0.75em",
  background: "white",
  boxShadow: "0 0.5em 1em rgba(0,0,0,0.12)",
  fontSize: "0.5em",
  color: "black",
  zIndex: "9999",
});
