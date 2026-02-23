import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Content = style({
  position: "relative",
});

export const TeamContainer = style({
  gridColumn: "3 / -1",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  columnGap: "1.5rem",
  fontSize: vars.fontSize.sm,
  lineHeight: "1.83",
  letterSpacing: "-0.03em",
  marginTop: "1rem",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
    [media.mobile]: {
      fontSize: vars.fontSize.xs,
    },
  },
});

export const TeamRole = style({
  fontWeight: "500",
  paddingRight: "1.5rem",
  paddingBottom: "0.5rem",
  borderRight: `1px solid ${vars.color.fg}`,
});

export const TeamNames = style({
  fontWeight: "300",
  paddingBottom: "0.5rem",
  display: "flex",
  columnGap: "1rem",
  rowGap: "0",
  flexWrap: "wrap",
});
