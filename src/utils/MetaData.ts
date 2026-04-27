export const SITE_NAME = "DOKAI UNIVERSE";
export const DEFAULT_DESCRIPTION = "Image Beyond AI. Create with Humanity";
export const DEFAULT_OG_IMAGE = "/dokai-og-image.png";

export const createMetaTitle = (title?: string | null) => {
  if (!title) return SITE_NAME;
  return `${title} | ${SITE_NAME}`;
};
