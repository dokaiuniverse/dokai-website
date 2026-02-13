import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gridTemplateRows: "auto auto auto",
  columnGap: "0.5rem",
});

export const Title = style({
  position: "sticky",
  top: `0`,
  gridRow: "3",
  gridColumn: "1 / -1",
  zIndex: 10,
  fontSize: vars.fontSize.xl,
  marginBottom: "2rem",

  selectors: {
    "&[data-stuck='true']": {
      opacity: "0",
    },
  },
});

export const Content = style({
  position: "sticky",
  gridColumn: "1 / span 3",
  fontSize: vars.fontSize.md,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  height: "fit-content",
  top: `calc(2rem + var(--title-height))`,
  maxHeight: `calc(100dvh - 60px - 2rem - 1.5rem - var(--title-height) - 2rem)`,
  overflowX: "hidden",
  overflowY: "auto",
  paddingRight: "0.5rem",
  paddingBottom: "2rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },

  selectors: {
    "&[data-stuck='true']": {
      top: `-2rem`,
      gridRow: "2 / -1",

      maxHeight: `calc(100dvh - 60px)`,
    },

    "&::-webkit-scrollbar": {
      width: "0.5rem",

      "@media": {
        [media.tablet]: {
          width: "8px",
        },
      },
    },
    "&::-webkit-scrollbar-track": {
      margin: "0 0 2rem",
      background: "transparent",
    },
    "&[data-stuck='true']::-webkit-scrollbar-track": {
      margin: "2rem 0",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#D9D9D9",
      borderRadius: "999px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: vars.color.border,
    },
  },
});

export const ContentTitle = style({
  fontSize: vars.fontSize.xl,
  marginTop: "2rem",
  marginBottom: "1rem",
});

export const ContentItem = style({
  display: "flex",
  flexDirection: "column",
});

export const ContentItemName = style({
  color: vars.color.border,
  lineHeight: "1.83",
});

export const ContentItemText = style({
  fontSize: vars.fontSize.sm,
});

export const ContentItemList = style({
  display: "flex",
  listStyle: "none",
  padding: "0",
  margin: "0",
  gap: "0.5rem",
});

export const ContentItemListItem = style({
  margin: "0",
  padding: "0.25em 0.5em",
  fontSize: vars.fontSize.sm,
  background: "#D9D9D9",
  borderRadius: "0.25em",
  lineHeight: "1",
});

export const MediaContainer = style({
  gridColumn: "4 / -1",
  gridRow: "3",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
      gap: "1rem",
    },
  },
});

export const Media = style({
  width: "100%",
  aspectRatio: "16 / 9",
});
