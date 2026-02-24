export const careersQueryKeys = {
  profileList: () => ["profile-list"] as const,
  profileDetail: (email: string) => ["profile-detail", email] as const,
  hasProfile: () => ["has-profile"] as const,
};
