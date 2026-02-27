import { fetchWorkCreate, fetchWorkDelete, fetchWorkUpdate } from "./fetch";
import { worksMutationKeys } from "./keys";
import { WorkUpsertRequest } from "./types";

export const worksMutations = {
  createWork: () => ({
    mutationKey: worksMutationKeys.createWork(),
    mutationFn: (body: WorkUpsertRequest) => fetchWorkCreate(body),
  }),
  updateWork: (id: string) => ({
    mutationKey: worksMutationKeys.updateWork(),
    mutationFn: (body: WorkUpsertRequest) => fetchWorkUpdate(id, body),
  }),
  deleteWork: (id: string) => ({
    mutationKey: worksMutationKeys.deleteWork(),
    mutationFn: () => fetchWorkDelete(id),
  }),
};
