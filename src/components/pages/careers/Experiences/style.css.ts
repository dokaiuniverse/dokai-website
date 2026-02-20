import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  gridColumn: "2 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  columnGap: "1rem",
  rowGap: "1rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / -1",
    },
  },
});

export const Title = style({
  fontSize: vars.fontSize.md,
  gridColumn: "1 / span 1",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.sm,
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ListContainer = style({
  gridColumn: "3 / -1",
});

export const List = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.sm,
      gap: "1rem",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});
