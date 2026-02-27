export const careersQueryKeys = {
  profileList: () => ["careers", "profile-list"] as const,
  profileDetail: (email: string) =>
    ["careers", "profile-detail", email] as const,
  hasProfile: () => ["careers", "has-profile"] as const,
  profileExist: (email: string) => ["careers", "profile-exist", email] as const,
  projectDetail: (projectId: string) =>
    ["careers", "project-detail", projectId] as const,
};

export const careersMutationKeys = {
  createProfile: () => ["careers", "create-profile"] as const,
  updateProfile: () => ["careers", "update-profile"] as const,
  deleteProfile: () => ["careers", "delete-profile"] as const,
  createProject: () => ["careers", "create-project"] as const,
  updateProject: () => ["careers", "update-project"] as const,
  deleteProject: () => ["careers", "delete-project"] as const,
};
