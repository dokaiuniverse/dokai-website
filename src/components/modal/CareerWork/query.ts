import { useQuery } from "@tanstack/react-query";
import fetchCareerWork from "./fetch";

export const queryOptions = {
  retry: 5,
  staleTime: 1000,
};

export const useCareerWorkQuery = (careerWorkId: string) => {
  return useQuery({
    queryKey: ["career_work", careerWorkId],
    queryFn: () => fetchCareerWork(careerWorkId),
    enabled: careerWorkId.length > 0,
  });
};
