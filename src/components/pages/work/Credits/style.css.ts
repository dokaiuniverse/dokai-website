import { style } from "@vanilla-extract/css";
import { media, vars } from "@styles/theme.css";

export const Container = style({
  gridColumn: "3 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "@media": {
    [media.desktop]: {
      gridTemplateColumns: "2fr 2fr 3fr",
    },
    [media.tablet]: {
      gridColumn: "1 / -1",
      fontSize: vars.fontSize.sm,
    },
    [media.mobile]: {
      gridTemplateColumns: "1fr auto",
      // fontSize: vars.fontSize.xs,
      fontSize: "14px",
    },
  },
});

export const Title = style({
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.83",
  letterSpacing: "-0.03em",
  color: vars.color.border,
});

export const ListContainer = style({
  width: "100%",
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.83",
  letterSpacing: "-0.03em",
});

export const ListGrid = style({
  display: "grid",
  gridTemplateColumns: "2fr 2fr 5fr",
  columnGap: "3rem",
});

export const CreditsTeamCell = style({
  gridColumn: "1 / span 1",
  fontWeight: "500",

  "@media": {
    [media.tablet]: {
      // fontSize: vars.fontSize.md,
      fontSize: "16px",
      gridColumn: "1 / span 2",
    },
  },
});

export const CreditsRoleCell = style({
  gridColumn: "2 / span 1",
  borderRight: "1px solid black",
  fontWeight: "500",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / span 1",
    },
  },
});

export const CreditsNameCell = style({
  display: "flex",
  flexWrap: "wrap",
  columnGap: "1rem",
});

export const CreditsDivider = style({
  gridColumn: "1 / -1",
  height: "2rem",
});
