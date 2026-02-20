import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const WorkflowToolIconContainer = style({
  gridColumn: "1 / span 2",
  position: "relative",
  width: "100%",
  height: "auto",
  aspectRatio: "9 / 5",
  overflow: "hidden",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
      display: "flex",
      alignItems: "center",
      height: "4rem",
      marginTop: "2rem",
    },
  },
});

export const WorkflowToolIcon = style({
  objectFit: "contain",
});

export const WorkflowToolTextContainer = style({
  position: "relative",
  gridColumn: "3 / -1",
  display: "flex",
  flexDirection: "column",
  fontSize: vars.fontSize.md,
  gap: "0.5rem",
  margin: "0.5rem 0",
  justifyContent: "center",
  alignSelf: "center",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
      alignItems: "center",
      textAlign: "center",
    },
  },
});

export const WorkflowToolTitle = style({
  lineHeight: "1.25",
  fontWeight: "500",
});

export const WorkflowToolText = style({
  lineHeight: "1.33",
  fontWeight: "300",
});

//

// Modal

export const ModalOverlay = style({
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
  width: "100%",
  maxWidth: "34rem",
  background: "white",
  borderRadius: 16,
  padding: 16,
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const ModalHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const ModalClose = style({
  all: "unset",
  cursor: "pointer",
  padding: 8,
  borderRadius: 10,
  selectors: { "&:hover": { background: "rgba(0,0,0,0.06)" } },
});

export const ModalTabs = style({
  display: "flex",
  gap: 8,
});

export const ModalTab = recipe({
  base: {
    all: "unset",
    cursor: "pointer",
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.2)",
  },
  variants: {
    active: {
      true: {
        border: "1px solid rgba(0,0,0,0.5)",
        fontWeight: 600,
      },
    },
  },
});

export const ModalBody = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

export const ModalPreview = style({
  position: "relative",
  width: "100%",
  aspectRatio: "9 / 5",
  border: "1px solid rgba(0,0,0,0.15)",
  borderRadius: 12,
  overflow: "hidden",
});

export const ModalPreviewEmpty = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.6,
});

export const ModalRow = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const ModalLabel = style({
  fontWeight: 600,
});

export const ModalRowRight = style({
  display: "flex",
  gap: 8,
});

export const ModalInput = style({
  flexGrow: 1,
  padding: "10px 12px",
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: 10,
  outline: "none",
});

export const ModalHint = style({
  fontSize: 12,
  opacity: 0.7,
});

export const ModalFooter = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  marginTop: 4,
});

export const ModalButton = style({
  all: "unset",
  cursor: "pointer",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.2)",
  selectors: { "&:hover": { background: "rgba(0,0,0,0.04)" } },
});

export const ModalPrimaryButton = style([
  ModalButton,
  {
    border: "1px solid rgba(0,0,0,0.35)",
    fontWeight: 600,
    selectors: {
      "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    },
  },
]);

export const RemoveButton = style({
  position: "absolute",
  top: "0",
  right: "0",
  padding: "0.25rem",
  borderRadius: "0.5rem",
  background: "white",
  marginRight: "1rem",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out, background 0.2s ease-in-out",
  border: "1px solid black",

  selectors: {
    "&:hover": {
      opacity: "1",
      background: "rgba(0, 0, 0, 0.1)",
    },
  },
});

export const RemoveButtonIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const AddButton = style({
  gridColumn: "1 / -1",
  padding: "1rem",
  borderRadius: "0.5rem",
  background: "white",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",
  border: "1px solid #666",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const AddButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  justifySelf: "center",
});
