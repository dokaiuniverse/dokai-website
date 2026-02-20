import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  gridColumn: "2 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(10, 1fr)",
  columnGap: "1rem",
  rowGap: "1rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / -1",
    },
  },
});

export const FakeLayout = style({
  opacity: "0.5",
  pointerEvents: "none",
});

export const Title = style({
  fontSize: vars.fontSize.md,
  gridColumn: "1 / span 2",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const Content = style({
  gridColumn: "3 / -2",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  columnGap: "1rem",
  rowGap: "1rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "3 / -1",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const Item = style({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
});

export const ItemMedia = style({
  aspectRatio: "1 / 1",
});

export const ItemOverlay = style({
  padding: "1rem",
  textAlign: "left",

  fontSize: vars.fontSize.lg,
});

export const AddButton = style({
  width: "100%",
  height: "auto",
  aspectRatio: "1 / 1",
  overflow: "hidden",
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #bbb",
  opacity: "0.4",
  cursor: "pointer",

  transition: "opacity 0.2s",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const AddButtonIcon = style({
  padding: "0.5rem",
  background: "#bbb",
  borderRadius: "999px",
  width: "2.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "white",
});
