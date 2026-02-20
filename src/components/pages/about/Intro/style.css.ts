import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  gridColumn: "3 / span 4",
  whiteSpace: "pre-line",

  fontSize: vars.fontSize.md,
  marginBottom: "4rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "3 / -2",
    },
    [media.tablet]: {
      gridColumn: "1 / -2",
    },
  },
});
