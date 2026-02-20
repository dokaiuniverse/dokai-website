import { vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gap: "1rem",
});

export const MediaContainer = style({
  position: "relative",
  gridColumn: "1 / span 4",
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
});

export const Media = style({
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
});

export const MediaEmptyContainer = style({
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #bbb",
  opacity: "0.4",
  cursor: "pointer",

  transition: "opacity 0.2s",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const MediaAddButton = style({
  padding: "0.25rem",
  background: "#bbb",
  borderRadius: "999px",
});

export const MediaAddButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "white",
});

export const ButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "#666",
});

export const EditButton = style({
  position: "absolute",
  top: "0",
  right: "0",
  padding: "0.5rem",
  borderRadius: "1rem",
  background: "white",
  margin: "0.5rem",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});
export const InfoContainer = style({
  gridColumn: "span 3",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const InfoItem = style({
  display: "flex",
  gap: "0.5rem",
  flexDirection: "column",
});

export const InfoTitle = style({
  fontSize: vars.fontSize.sm,
});

export const SlugInputContainer = style({
  display: "flex",
  gap: "0.5rem",
});

export const SlugInput = style({
  width: "100%",
  padding: "0.25em 0.5rem",
  fontSize: vars.fontSize.sm,
  borderRadius: "0.25rem",
  border: "1px solid #999",
});

export const SlugButton = style({
  border: "1px solid #999",
  padding: "0.25rem 0.5rem",
  borderRadius: "0.25rem",
  whiteSpace: "nowrap",
});

export const CategorySelectWrapper = style({
  position: "relative",
  display: "inline-block",
  width: "100%",
});

export const CategorySelect = style({
  width: "100%",
  appearance: "none",
  display: "flex",
  gap: "1rem",
  padding: "0.25em",
  border: "1px solid #999",
  borderRadius: "0.25rem",
  WebkitAppearance: "none",
  MozAppearance: "none",
});

export const CategorySelectIcon = style({
  position: "absolute",
  right: "0.5rem",
  top: "50%",
  transform: "translateY(-50%) rotate(180deg)",
  transition: "transform 0.2s",
});

globalStyle(`${CategorySelectWrapper}:focus-within ${CategorySelectIcon}`, {
  transform: "translateY(-50%) rotate(0deg)",
});

export const SummaryItem = style({
  flexGrow: "1",
});

export const SummaryTextArea = style({
  width: "100%",
  flexGrow: "1",
  padding: "0.25em 0.5rem",
  fontSize: vars.fontSize.sm,
  borderRadius: "0.25rem",
  resize: "none",
  border: "1px solid #999",
});

export const ToggleRow = style({
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
  padding: "0.25rem",

  background: "#e5e5e5",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 999,
  display: "flex",
  flexDirection: "column",
  transition: "background 160ms ease, border-color 160ms ease",

  selectors: {
    '&[data-on="true"]': {
      background: "#262626",
      borderColor: "rgba(0,0,0,0.85)",
    },
  },
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
    '&[data-on="true"]': {
      background: "rgba(0,0,0,0.85)",
      borderColor: "rgba(0,0,0,0.85)",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const Knob = style({
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
});

globalStyle(`${ToggleWrapper}[data-on="true"] ${Toggle}`, {
  background: "#262626",
});

globalStyle(`${ToggleWrapper}[data-on="true"] ${Knob}`, {
  transform: "translateX(1.5rem)",
});
