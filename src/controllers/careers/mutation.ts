import {
  fetchCareerPageUpdate,
  fetchProfileCreate,
  fetchProfileDelete,
  fetchProfileUpdate,
  fetchProjectCreate,
  fetchProjectDelete,
  fetchProjectUpdate,
} from "./fetch";
import { careersMutationKeys, careersQueryKeys } from "./keys";
import {
  CareerPageUpsertRequest,
  ProfileUpsertRequest,
  ProjectUpsertRequest,
} from "./types";

export const careersMutations = {
  updateCareersPage: () => ({
    mutationKey: careersMutationKeys.careerPageUpdate(),
    mutationFn: (body: CareerPageUpsertRequest) => fetchCareerPageUpdate(body),
    invalidateQueries: [careersQueryKeys.careerPageDetail()],
  }),
  createProfile: () => ({
    mutationKey: careersMutationKeys.createProfile(),
    mutationFn: (body: ProfileUpsertRequest) => fetchProfileCreate(body),
  }),
  updateProfile: (id: string) => ({
    mutationKey: careersMutationKeys.updateProfile(),
    mutationFn: (body: ProfileUpsertRequest) => fetchProfileUpdate(id, body),
  }),
  deleteProfile: (id: string) => ({
    mutationKey: careersMutationKeys.deleteProfile(),
    mutationFn: () => fetchProfileDelete(id),
  }),
  createProject: () => ({
    mutationKey: careersMutationKeys.createProject(),
    mutationFn: (body: ProjectUpsertRequest) => fetchProjectCreate(body),
  }),
  updateProject: (id: string) => ({
    mutationKey: careersMutationKeys.updateProject(),
    mutationFn: (body: ProjectUpsertRequest) => fetchProjectUpdate(id, body),
  }),
  deleteProject: (id: string) => ({
    mutationKey: careersMutationKeys.deleteProject(),
    mutationFn: () => fetchProjectDelete(id),
  }),
};
