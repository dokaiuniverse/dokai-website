import { vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  gridColumn: "2 / span 3",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
});

export const InputContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const InputTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 600,
});

export const InputColumn = style({
  display: "flex",
  gap: "0.25rem",
});

export const Input = style({
  flex: 1,
  fontSize: vars.fontSize.sm,
  padding: "0.25rem 0.75rem",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "0.5rem",
});

export const InputButton = style({
  padding: "0.25rem 0.75rem",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "0.5rem",
  fontSize: vars.fontSize.sm,
});

export const InputError = style({
  color: "red",
  fontSize: vars.fontSize.xs,
  margin: "0 0.75rem",
});

export const ToggleContainer = style({
  gridColumn: "1 / -2",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.5rem 0.75rem",
  border: "1px solid rgba(0,0,0,0.10)",
  borderRadius: "0.5rem",
});

export const ToggleText = style({
  display: "flex",
  flexDirection: "column",
  fontSize: vars.fontSize.sm,
});

export const ToggleTitle = style({
  fontWeight: 600,
});

export const ToggleDesc = style({
  fontSize: "0.75em",
  opacity: 0.7,
});

export const ToggleWrapper = style({
  padding: "0.2rem",

  background: "#e5e5e5",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 999,
  display: "flex",
  flexDirection: "column",
  transition: "background 160ms ease, border-color 160ms ease",

  selectors: {
    "&:has(input:checked)": {
      background: "#262626",
      borderColor: "rgba(0,0,0,0.85)",
    },
  },
});

export const ToggleInput = style({
  display: "none",
});

export const Toggle = style({
  height: "1.5rem",
  width: "3rem",
  borderRadius: 999,
  background: "#e5e5e5",
  position: "relative",
  cursor: "pointer",
  transition: "background 160ms ease",
  outline: "none",
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      left: "0",
      top: "0",
      width: "1.5rem",
      height: "1.5rem",
      borderRadius: 999,
      background: "#fff",
      boxShadow: "0 1px 2px rgba(0,0,0,0.18)",
      transform: "translateX(0px)",
      transition: "transform 160ms ease",
    },
  },
});

globalStyle(`${ToggleWrapper}:has(input:checked) ${Toggle}`, {
  background: "#262626",
});

globalStyle(`${ToggleWrapper}:has(input:checked) ${Toggle}::after`, {
  transform: "translateX(1.5rem)",
});
