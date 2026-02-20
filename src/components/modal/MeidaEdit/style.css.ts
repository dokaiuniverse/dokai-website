import { vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const Overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 99999,
  padding: "2rem",
});

export const Modal = style({
  background: "white",
  borderRadius: 16,
  padding: 16,
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  fontSize: vars.fontSize.sm,
  overflow: "hidden",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  maxWidth: "48rem",
  gap: "1rem",
});

export const Header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: vars.fontSize.md,
});

export const CloseButton = style({
  all: "unset",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const BodyGrid = style({
  height: "32rem",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gap: "1rem",
});

export const LeftPane = style({
  gridColumn: "1 / span 6",
  display: "flex",
  flexDirection: "column",
});

export const RightPane = style({
  gridColumn: "7 / span 2",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  overflow: "hidden",
});

export const CenterPlaceholder = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const MascotWrap = style({
  position: "relative",
  width: "6rem",
  aspectRatio: "1 / 1",
});

export const PlaceholderTitle = style({
  fontSize: vars.fontSize.md,
});

export const TypePickerGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
  height: "100%",
});

export const TypePickerButton = style({
  all: "unset",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0.75rem",
  selectors: {
    "&:hover": { background: "rgba(0,0,0,0.04)" },
    "&:focus-visible": { outline: "2px solid rgba(0,0,0,0.5)" },
  },
});

export const TypePickerIcon = style({
  width: "4rem",
  aspectRatio: "1 / 1",
  height: "auto",
});

export const Detail = style({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const PreviewFrame = style({
  width: "100%",
  aspectRatio: "16 / 9",
  position: "relative",
});

export const Form = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  gap: "0.5rem",
});

export const FieldRow = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gap: "1rem",
  alignItems: "center",
});

export const FieldLabelSpan2 = style({
  gridColumn: "1 / span 2",
});

export const FieldInputSpanRest = style({
  gridColumn: "3 / -1",
});

export const HiddenFileInput = style({
  display: "none",
});

export const GrowSpacer = style({
  flexGrow: 1,
});

export const InlineRow = style({
  display: "flex",
  gap: "0.5rem",
  gridColumn: "3 / -1",
  alignItems: "center",
});

export const FlexGrowInput = style({
  flexGrow: 1,
});

export const ThumbButton = recipe({
  base: {
    position: "relative",
    all: "unset",
    cursor: "pointer",
    width: "100%",
    aspectRatio: "16 / 9",
    height: "auto",
    flexShrink: 0,
    borderRadius: "0.5rem",
    overflow: "hidden",
    border: "2px solid transparent",
    selectors: {
      "&:focus-visible": { border: "2px solid rgba(0,0,0,0.5)" },
    },
    boxSizing: "border-box",
  },
  variants: {
    selected: {
      true: {
        border: "2px solid rgba(0,0,0,0.7)",
      },
    },
  },
});

export const AddThumbInner = recipe({
  base: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.5rem",
    border: "1px solid gray",
    boxSizing: "border-box",
  },
  variants: {
    selected: {
      true: {
        border: "none",
      },
    },
  },
});

export const Footer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 8,
  scrollbarGutter: "stable",
});

export const FooterButton = style({
  all: "unset",
  cursor: "pointer",
  padding: "0.25rem 1rem",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.2)",
  selectors: {
    "&:hover": { background: "rgba(0,0,0,0.04)" },
    "&:focus-visible": { outline: "2px solid rgba(0,0,0,0.5)" },
  },
});

export const PrimaryButton = style([
  FooterButton,
  {
    border: "1px solid rgba(0,0,0,0.35)",
    fontWeight: 600,
  },
]);

// (선택) input 기본 스타일 통일
globalStyle(`${Modal} input[type="text"]`, {
  width: "100%",
  padding: "0.25rem 0.5rem",
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: "0.5rem",
  outline: "none",
});

globalStyle(`${Modal} input[type="text"]:focus`, {
  borderColor: "rgba(0,0,0,0.45)",
});

globalStyle(`${Modal} input[type="checkbox"]`, {
  flexShrink: "0",
  width: "1rem",
  height: "1rem",
});

export const Image = style({
  width: "100%",
  height: "100%",
});

export const DeleteButton = style({
  all: "unset",
  cursor: "pointer",
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0.5rem",
  stroke: "black",
  background: "white",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",
  padding: "0.25rem",
  margin: "0.5rem 0.5rem",

  selectors: {
    "&:hover": { opacity: "1" },
    "&:focus-visible": { outline: "2px solid rgba(0,0,0,0.5)" },
  },
});
