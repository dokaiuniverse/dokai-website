import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  columnGap: "1rem",
  rowGap: "2rem",
});

export const Title = style({
  gridColumn: "1 / -1",
  fontSize: vars.fontSize.xl,
});

export const Content = style({
  gridColumn: "1 / span 3",
  fontSize: vars.fontSize.md,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ContentItem = style({
  display: "flex",
  flexDirection: "column",
});

export const ContentItemName = style({
  color: vars.color.border,
});

export const ContentItemValue = style({});

export const MediaContainer = style({
  gridColumn: "4 / -1",
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
