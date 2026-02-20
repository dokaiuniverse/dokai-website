import { vars } from "@styles/theme.css";
import { createVar, style } from "@vanilla-extract/css";

export const percentVar = createVar();

export const Container = style({
  height: "24rem",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  paddingTop: "0rem",
});

export const Content = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  flexGrow: "1",
});

export const Donut = style({
  width: "10rem",
  height: "auto",
  aspectRatio: "1 / 1",
  borderRadius: "50%",
  position: "relative",
  textAlign: "center",
  transition: "background 0.3s ease-in-out",
  background: `conic-gradient(#3F8BC9 0% ${percentVar}, #F2F2F2 ${percentVar} 100%)`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  selectors: {
    "&::before": {
      content: "''",
      color: "black",
      width: "80%",
      height: "auto",
      aspectRatio: "1 / 1",
      background: "white",
      borderRadius: "50%",
      position: "absolute",
      left: "10%",
      top: "10%",
      display: "block",
      margin: "auto",
      fontSize: vars.fontSize.lg,
      textAlign: "center",
      verticalAlign: "middle",
    },
  },
});

export const DonutText = style({
  position: "relative",
  fontSize: vars.fontSize.lg,
  fontWeight: "500",
  color: "black",
});

export const Title = style({
  fontSize: vars.fontSize.lg,
  fontWeight: "500",
});

// Button Container

export const ButtonContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "0.5rem",
});

export const CloseButton = style({
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

export const SaveButton = style({
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
