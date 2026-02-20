import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  gridColumn: "2 / -2",
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gridTemplateRows: "auto 1fr",
  columnGap: "2rem",
  rowGap: "2rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / -1",
      rowGap: "1rem",
    },
    [media.tablet]: {
      columnGap: "1rem",
    },
  },
});

export const MediaContainer = style({
  position: "relative",
  gridRow: "1 / span 2",
  gridColumn: "1 / span 3",
  aspectRatio: "4 / 5",

  "@media": {
    [media.mobile]: {
      gridRow: "1",
    },
  },
});

export const Media = style({
  width: "100%",
  height: "100%",
  aspectRatio: "4 / 5",
});

export const Bio = style({
  gridColumn: "4 / -1",
  fontSize: vars.fontSize.md,

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.sm,
    },
    [media.mobile]: {
      gridRow: "1 / span 2",
    },
  },
});

export const MediaEmptyContainer = style({
  width: "100%",
  height: "100%",
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

export const Contacts = style({
  gridColumn: "4 / -1",
  display: "flex",
  flexDirection: "column",

  fontSize: vars.fontSize.sm,
  lineHeight: "1.33",
  alignSelf: "flex-end",
  gap: "0.5rem",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.xs,
    },
    [media.mobile]: {
      gridTemplateColumns: "1fr",
      gridColumn: "1 / span 3",
      gridRow: "2",
      rowGap: "0",
      alignSelf: "flex-start",
    },
  },
});

export const ContactItem = style({
  display: "grid",
  gridTemplateColumns: "6rem 1fr auto",
  columnGap: "0.5rem",
});

export const ContactName = style({
  "@media": {
    [media.mobile]: {
      fontWeight: "500",
    },
  },
});

export const ContactValue = style({
  wordBreak: "break-word",
  width: "fit-content",

  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "0.5",
    },
  },

  "@media": {
    [media.mobile]: {
      marginBottom: "0.5rem",
    },
  },
});

export const ContactEditButton = style({
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const ContactAddButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0.5rem",
  border: "1px solid #bbb",
  padding: "0.25rem",
  width: "100%",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      background: "#eeeeee",
    },
  },
});
