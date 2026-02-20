import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Content = style({
  position: "relative",
  gridColumn: "3 / -1",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});

export const Quadrant = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",

  fontSize: vars.fontSize.sm,
  fontWeight: "300",
  lineHeight: "1.54",
  letterSpacing: "-0.03em",

  "@media": {
    [media.mobile]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
});

export const QuadrantItem = style({
  gridColumn: "span 1",
  display: "grid",
  gridTemplateColumns: "2fr 5fr",
  rowGap: "2rem",
  columnGap: "1rem",
  padding: "1rem",
  alignItems: "center",
  fontSize: vars.fontSize.sm,

  selectors: {
    "&:nth-child(odd)": {
      borderRight: `1px solid ${vars.color.fg}`,
    },
    "&:not(:first-child):not(:nth-child(2))": {
      borderTop: `1px solid ${vars.color.fg}`,
    },
  },

  "@media": {
    [media.mobile]: {
      border: "none !important",

      selectors: {
        "&:not(:first-child)": {
          borderTop: `1px solid ${vars.color.fg} !important`,
        },
      },
    },
  },
});

export const QuadrantTitle = style({
  fontWeight: "400",
  textAlign: "center",
});

export const QuadrantList = style({
  listStyle: "none",
  padding: "0",
  margin: "0",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.xs,
    },
  },
});
