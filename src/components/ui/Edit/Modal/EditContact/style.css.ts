import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  margin: "0.5rem 0 1rem",
  gap: "1rem",
});

export const IconTable = style({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  padding: "0 1rem 0.5rem",
  borderBottom: "1px solid #999",
});

export const IconBtn = style({});

export const Icon = style({});

export const Content = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  margin: "0 1rem",
});

export const Title = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});
export const TitleIcon = style({
  width: "1.25rem",
  height: "1.25rem",
});

export const Field = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const Label = style({});

export const Input = style({
  width: "100%",
});

export const ButtonContainer = style({
  margin: "0 1rem",
  display: "flex",
  justifyContent: "end",
  gap: "0.5rem",
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

export const ApplyButton = style({
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
