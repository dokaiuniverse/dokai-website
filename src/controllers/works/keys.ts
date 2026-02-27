export const worksQueryKeys = {
  workDetail: (slug: string) => ["works", "work-detail", slug] as const,
  checkSlug: (slug: string) => ["works", "check-slug", slug] as const,
};

export const worksMutationKeys = {
  createWork: () => ["works", "create-work"] as const,
  updateWork: () => ["works", "update-work"] as const,
  deleteWork: () => ["works", "delete-work"] as const,
};
