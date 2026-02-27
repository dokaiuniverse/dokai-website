import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  whiteSpace: "pre-line",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "1rem",
  columnGap: "1rem",

  alignItems: "flex-start",

  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.83",
  letterSpacing: "-0.03em",
});

export const Title = style({
  gridColumn: "1 / span 2",
  fontSize: vars.fontSize.md,

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const Text = style({
  gridColumn: "3 / -1",
  fontSize: vars.fontSize.md,

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

//

export const IntroContainer = style({
  gridColumn: "3 / span 6",
  whiteSpace: "pre-line",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "1rem",
  columnGap: "1rem",

  alignItems: "flex-start",

  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.83",
  letterSpacing: "-0.03em",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});
