import { vars } from "@styles/theme.css";
import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const Container = style({
  display: "flex",
  flexDirection: "column",
});

export const TabContainer = style({
  display: "flex",
  gap: "1rem",
  padding: "0 1rem",
  borderBottom: "1px solid #ddd",
  position: "relative",
});

export const TabItem = style({
  width: "2.5rem",
  lineHeight: "2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",
  cursor: "pointer",
});

export const TabItemInput = style({
  display: "none",
});

export const TabIndicator = style({
  position: "absolute",
  left: "1rem",
  bottom: "0",
  height: "2px",
  width: "2.5rem",
  background: "black",
  borderRadius: "999px",
  transition: "transform 0.2s ease-in-out",
});

globalStyle(`${TabItem}:has(input:checked)`, {
  opacity: "1",
});

globalStyle(
  `${TabContainer}:has(label:nth-of-type(2) input:checked) ${TabIndicator}`,
  { transform: "translateX(3.5rem)" },
);

export const Content = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  padding: "1rem",
  height: "24rem",
});

export const Image = style({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});
// File

export const UploadContainer = style({
  position: "relative",
  borderRadius: "0.5rem",
  padding: "1rem",
  flexGrow: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      border: "3px dashed #ddd",
      borderRadius: "0.5rem",
      background: "#eee",
      transition: "border 0.2s ease-in-out, background 0.2s ease-in-out",
      zIndex: "-1",
    },
  },
});

globalStyle(`${UploadContainer}[data-dragging="true"]::before`, {
  border: "3px dashed #aaa",
  background: "#ccc",
});

export const UploadContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const UploadIcon = style({
  width: "5rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const UploadText = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "400",
});

export const UploadSubText = style({
  fontSize: vars.fontSize.xs,
});

globalStyle(`${UploadSubText} > span`, {
  color: "#296bc0",
  cursor: "pointer",
});

// URL

export const URLContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  flexGrow: "1",
});

export const URLHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const URLTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "400",
});

export const URLInputContainer = style({
  display: "flex",
  gap: "0.5rem",
});

export const URLInput = style({
  flexGrow: "1",
  padding: "0.25rem 0.5rem",
  border: "1px solid #ddd",
  borderRadius: "0.5rem",
});

export const URLButton = style({
  padding: "0.25rem 0.75rem",
  border: "1px solid #ddd",
  borderRadius: "0.5rem",
  cursor: "pointer",

  transition: "all 0.2s ease-in-out",
  selectors: {
    "&:hover": {
      background: "#eee",
    },
  },
});

export const URLContent = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexGrow: "1",
  border: "3px dashed #ddd",
  borderRadius: "0.5rem",
  padding: "1rem",
  background: "#eee",
  justifyContent: "center",
});

export const URLEmpty = style({
  width: "3rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const URLEmptyIcon = style({
  width: "100%",
  height: "100%",
});

// Status

export const StatusContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const StatusText = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "400",
});

export const StatusSubText = style({
  fontSize: vars.fontSize.xs,
});

export const StatusIconContainer = style({
  position: "relative",
  width: "4rem",
  height: "auto",
  aspectRatio: "1 / 1",
  marginBottom: "0.5rem",
});

export const StatusIcon = style({
  width: "100%",
  height: "100%",
});

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const LoadingIcon = style({
  animation: `${spin} 3s linear infinite`,
});

// Button

export const ButtonContainer = style({
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
});

export const CancelButton = style({
  padding: "0.25em 0.75em",
  borderRadius: "0.5em",
  border: "1px solid #ddd",
  cursor: "pointer",
  color: "#888",
  transition: "all 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      background: "#eeeeee",
      color: "#666",
    },
  },
});

export const AddButton = style({
  padding: "0.25em 0.75em",
  borderRadius: "0.5em",
  border: "1px solid #296bc0",
  cursor: "pointer",
  color: "white",
  background: "#296bc0",
  transition: "all 0.2s ease-in-out",

  selectors: {
    "&:not(:disabled):hover": {
      background: "#3989f1ff",
    },

    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
});
