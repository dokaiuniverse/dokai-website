export const aboutQueryKeys = {
  aboutDetail: () => ["about", "about-detail"] as const,
};

export const aboutMutationKeys = {
  updateAbout: () => ["about", "update-about"] as const,
  deleteAbout: () => ["about", "delete-about"] as const,
};
