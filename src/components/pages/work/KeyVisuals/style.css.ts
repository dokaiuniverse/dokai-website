import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  position: "relative",
  gridColumn: "3 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});

export const Title = style({
  gridColumn: "1 / -1",
  fontSize: vars.fontSize.md,
  fontWeight: "500",
});

export const MediaContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  rowGap: "2rem",
  columnGap: "3rem",

  "@media": {
    [media.mobile]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
});

export const Media = style({
  gridColumn: "span 1",
  aspectRatio: "16 / 9",
});

export const MediaEmptyContainer = style({
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
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

export const MediaAddButton = style({
  padding: "0.25rem",
  background: "#bbb",
  borderRadius: "999px",
});

export const MediaAddButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "white",
});

export const ButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "#666",
});

export const EditButton = style({
  position: "absolute",
  top: "0",
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
