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
      fontSize: vars.fontSize.xs,
      display: "flex",
      flexDirection: "column",
      lineHeight: "1.0",
    },
  },
});

export const TeamRole = style({
  position: "relative",
  fontWeight: "500",
  paddingRight: "1.5rem",
  paddingBottom: "0.5rem",
  borderRight: `1px solid ${vars.color.fg}`,

  "@media": {
    [media.mobile]: {
      borderRight: "none",
      fontSize: vars.fontSize.sm,
    },
  },

  selectors: {
    "&::after": {
      "@media": {
        [media.mobile]: {
          content: '""',
          position: "absolute",
          display: "block",
          width: "0.75rem",
          height: "2px",
          background: "black",
          top: "-0.5rem",
        },
      },
    },
  },
});

export const TeamNames = style({
  fontWeight: "300",
  paddingBottom: "0.5rem",
  display: "flex",
  columnGap: "1rem",
  rowGap: "0",
  flexWrap: "wrap",

  "@media": {
    [media.mobile]: {
      marginBottom: "1.25rem",
      columnGap: "0.5rem",
      rowGap: "0.5rem",
    },
  },
});
