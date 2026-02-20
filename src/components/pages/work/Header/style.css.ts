import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Grid = style({
  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "2rem",
  columnGap: "1rem",
});

export const Title = style({
  gridColumn: "1 / span 7",
  fontSize: vars.fontSize.xl,
  color: vars.color.border,
  fontWeight: "300",
  lineHeight: "1.33",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.lg,
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const MetaColumn = style({
  gridColumn: "1 / span 3",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  rowGap: "3rem",
  columnGap: "1rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / span 2",
    },
    [media.tablet]: {
      gridRow: "3",
      gridColumn: "1 / -1",
      flexDirection: "row",
    },
    [media.mobile]: {
      flexDirection: "column",
    },
  },
});

export const PrimaryMeta = style({
  display: "flex",
  flexDirection: "column",
  fontSize: vars.fontSize.md,
  fontWeight: "500",
  flexShrink: "0",

  "@media": {
    [media.mobile]: {
      justifyContent: "center",
      alignItems: "center",
      flexGrow: "1",
    },
  },
});

export const Divider = style({
  borderBottom: "1px solid black",
  width: "6rem",
  marginTop: "0.775rem",
});

export const MetaList = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontSize: vars.fontSize.sm,

  "@media": {
    [media.tablet]: {
      alignItems: "flex-end",
      textAlign: "right",
    },
    [media.mobile]: {
      alignItems: "center",
      textAlign: "center",
    },
  },
});

export const MetaItem = style({
  textTransform: "uppercase",
  display: "flex",
  flexDirection: "column",
});

export const MetaTitle = style({
  fontWeight: "600",
});

export const MetaContent = style({
  fontWeight: "300",
});

export const MediaContainer = style({
  position: "relative",
  gridColumn: "4 / span 5",
  aspectRatio: "16 / 9",

  "@media": {
    [media.desktop]: {
      gridColumn: "3 / span 6",
    },
    [media.tablet]: {
      gridRow: "2",
      gridColumn: "1 / -1",
    },
  },
});

export const Media = style({
  width: "100%",
  height: "auto",
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
