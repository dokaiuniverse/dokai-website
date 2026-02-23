import { media, vars } from "@styles/theme.css";
import { createVar, globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const TransitionDurationVar = createVar();

export const Overlay = recipe({
  base: {
    position: "fixed",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 99999,
    overflow: "hidden",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "30px",

    transition: `background ${TransitionDurationVar} ease-in-out, backdropFilter ${TransitionDurationVar} ease-in-out`,

    "@media": {
      [media.tablet]: {
        padding: "24px",
      },
      [media.mobile]: {
        padding: "20px",
      },
    },
  },
  variants: {
    isVisible: {
      true: {
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(2px)",
      },
      false: {
        background: "rgba(0, 0, 0, 0)",
        backdropFilter: "none",
      },
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});

export const Layout = recipe({
  base: {
    background: "white",
    borderRadius: "1rem",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",

    transition: `transform ${TransitionDurationVar} ease-in-out, opacity ${TransitionDurationVar} ease-in-out`,

    padding: "1rem",
    paddingRight: "0.75rem",
    paddingBottom: "0",

    "@media": {
      [media.tablet]: {
        paddingRight: "8px",
      },
      [media.mobile]: {
        paddingRight: "6px",
      },
    },
  },
  variants: {
    isVisible: {
      true: { transform: "translateY(0)", opacity: 1 },
      false: { transform: "translateY(100%)", opacity: 0 },
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});

export const Header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const EditToggleContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  cursor: "pointer",
});

export const EditToggleTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "400",
});

export const EditToggleInput = style({ display: "none" });

export const EditToggle = style({
  position: "relative",
  width: "2rem",
  height: "auto",
  aspectRatio: "2 / 1",

  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      left: "0",
      top: "0",
      width: "auto",
      height: "100%",
      aspectRatio: "1 / 1",
      borderRadius: 999,
      background: "#fff",
      boxShadow: "0 1px 2px rgba(0,0,0,0.18)",
      transform: "translateX(0px)",
      transition: "transform 160ms ease",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      padding: "10%",
      boxSizing: "content-box",
      transformOrigin: "center",
      borderRadius: 999,
      background: "#e5e5e5",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      transition: "background 160ms ease",
    },
  },
});

globalStyle(`${EditToggleInput}:checked + ${EditToggle}::after`, {
  transform: "translateX(100%)",
});

globalStyle(`${EditToggleInput}:checked + ${EditToggle}::before`, {
  background: "#262626",
});

export const CloseButton = style({
  position: "relative",
  marginLeft: "auto",
});

export const CloseButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const Container = style({
  position: "sticky",
  gridColumn: "1 / span 3",
  fontSize: vars.fontSize.md,
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  columnGap: "1rem",
  height: "fit-content",
  top: `calc(2rem + var(--title-height))`,
  maxHeight: `calc(100dvh - 60px - 2rem - 1.5rem - var(--title-height) - 2rem)`,
  overflowX: "hidden",
  overflowY: "auto",
  paddingRight: "0.5rem",
  paddingBottom: "2rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },

  selectors: {
    "&::-webkit-scrollbar": {
      width: "0.5rem",

      "@media": {
        [media.tablet]: {
          width: "8px",
        },
      },
    },
    "&::-webkit-scrollbar-track": {
      margin: "1rem 0 2rem",
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#D9D9D9",
      borderRadius: "999px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: vars.color.border,
    },
  },
});

export const Title = style({
  gridColumn: "1 / -1",
  zIndex: 10,
  fontSize: vars.fontSize.xl,
  marginBottom: "2rem",

  selectors: {
    "&[data-stuck='true']": {
      opacity: "0",
    },
  },
});

export const Content = style({
  gridColumn: "1 / span 3",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const ContentItem = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
});

export const ContentItemName = style({
  color: vars.color.border,
  lineHeight: "1.83",
});

export const ContentItemText = style({
  fontSize: vars.fontSize.sm,
});

export const ContentItemList = style({
  display: "flex",
  listStyle: "none",
  padding: "0",
  margin: "0",
  gap: "0.5rem",
});

export const ContentItemListItem = style({
  margin: "0",
  padding: "0.25em 0.5em",
  fontSize: vars.fontSize.sm,
  background: "#D9D9D9",
  borderRadius: "0.25em",
  lineHeight: "1",
});

export const MediaContainer = style({
  position: "relative",
  gridColumn: "4 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
      gap: "1rem",
    },
  },
});

export const Media = style({
  width: "100%",
  aspectRatio: "16 / 9",
});

// Edit

export const SaveButton = style({
  position: "absolute",
  right: "2rem",
  bottom: "2rem",
  padding: "1rem",
  borderRadius: "999px",
  background: "#fff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.18)",
  cursor: "pointer",
});

export const SaveButtonIcon = style({
  width: "2rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const ThumbnailEditContainer = style({
  gridColumn: "1 / span 4",
  marginTop: "1rem",
  marginBottom: "2rem",
});

export const InfoEditContainer = style({
  gridColumn: "5 / -2",
  marginBottom: "2rem",
  marginTop: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const TitleEditContainer = style({
  width: "100%",
});

export const PublishedEditContainer = style({
  width: "100%",
});

export const ContentEditButton = style({
  position: "absolute",
  right: "0",
  padding: "0.25rem",
  borderRadius: "0.5rem",
  background: "white",
  margin: "0.5rem",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",
  border: "1px solid #999",
  backdropFilter: "blur(1rem)",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const ContentAddButton = style({
  padding: "0.5rem",
  borderRadius: "0.5rem",
  background: "white",
  marginTop: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",
  border: "1px solid #999",
  backdropFilter: "blur(1rem)",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const ButtonIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const EditMediaContainer = style({
  position: "relative",
  gridColumn: "4 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
      gap: "0.5rem",
    },
  },
});

export const FloatingButtonContainer = style({
  position: "absolute",
  bottom: "2rem",
  right: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});
