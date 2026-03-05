import { media, vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Layout = style({
  position: "relative",
  background: "gray",
  flexGrow: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",

  "@media": {
    [media.mobile]: {
      padding: "1rem",
    },
  },
});

export const Container = style({
  width: "100%",
  maxWidth: "640px",
  height: "100%",
  background: "white",
  flexGrow: "1",
  borderRadius: "1rem",
  paddingTop: "1rem",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  gap: "1rem",
});

//

export const Header = style({
  padding: "0 1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const HeaderTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: 500,
});

export const HeaderAddButton = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  overflow: "hidden",
  maxWidth: "2rem",
  padding: "0.25rem",
  transition: "max-width 0.3s ease-in-out",
  borderRadius: "999px",
  border: "1px solid rgba(0,0,0,0.12)",

  selectors: {
    "&:hover": {
      maxWidth: "12rem",
    },
  },
});

export const HeaderAddButtonIcon = style({
  flexShrink: "0",
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const HeaderAddButtonText = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 300,
  whiteSpace: "nowrap",
  paddingRight: "0.5rem",
});

//

export const AddMemberForm = style({
  padding: "0 1rem",
  display: "flex",
  gap: "0.5rem",
  flexWrap: "wrap",
  justifyContent: "flex-end",
});

export const AddMemberInput = style({
  flex: "1",
  padding: "0rem 0.5rem",
  borderRadius: "0.25rem",
  border: "1px solid #999",
});

export const AddMemberSelect = style({
  fontSize: vars.fontSize.xs,
  border: "1px solid #999",
  borderRadius: "0.25rem",
  padding: "0rem 0.25rem",
});

export const AddMemberSelectOption = style({
  fontSize: vars.fontSize.xs,
  fontWeight: 300,
});

export const AddMemberButton = style({
  fontSize: vars.fontSize.xs,
  fontWeight: 300,
  padding: "0.25rem 0.5rem",
  border: "1px solid #999",
  borderRadius: "0.25rem",
});

//

export const Content = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "0 1rem 1rem",
});

export const Member = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  columnGap: "1rem",
  rowGap: "0.5rem",
  padding: "0.5rem 1rem",
  borderBottom: "1px solid rgba(0,0,0,0.12)",
  flexWrap: "wrap",

  "@media": {
    [media.mobile]: {
      padding: "0.5rem 0.5rem",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
});

export const MemberEmail = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
  flexGrow: "1",
});

export const MemberContent = style({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  justifyContent: "space-between",

  "@media": {
    [media.mobile]: {
      width: "100%",
    },
  },
});

export const MemberRoleForm = style({
  display: "flex",
  gap: "0.5rem",
  position: "relative",
  width: "4rem",
});

export const MemberRole = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 300,
  cursor: "pointer",
  border: "1px solid #999",
  borderRadius: "1rem",
  padding: "0.25rem 0.5rem",
  width: "100%",
  textAlign: "center",

  selectors: {
    "&:has(input[type='checkbox']:checked)": {
      border: "1px solid #005ac2ff",
    },
  },
});

export const MemberRoleInput = style({
  display: "none",
});

export const MemberRoleSelectBox = style({
  display: "none",
  // display: "flex",
  gap: "0.25rem",
  position: "absolute",
  top: "100%",
  flexDirection: "column",
  marginTop: "0.25rem",
  background: "white",
  width: "100%",
  alignItems: "center",
  borderRadius: "1rem",
  border: "1px solid #005ac2ff",
  padding: "0.25rem 0",
  zIndex: "1",
});

globalStyle(
  `${MemberRoleForm}:has(input[type='checkbox']:checked) ${MemberRoleSelectBox}`,
  {
    display: "flex",
  },
);

export const MemberRoleSelectButton = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 300,
  background: "transparent",
  border: "none",
  cursor: "pointer",

  selectors: {
    "&:first-child": {
      paddingBottom: "0.25rem",
      borderBottom: "1px solid #999",
    },
  },
});

export const MemberDeleteButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.25rem",
  borderRadius: "0.5rem",
  border: "1px solid rgba(0,0,0,0.12)",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const MemberDeleteButtonIcon = style({
  width: "1rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

//

export const LoadingOverlay = style({
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(5px)",
  zIndex: "100",
});

export const LoadingOverlayContent = style({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "12rem !important",
  width: "12rem !important",
});
