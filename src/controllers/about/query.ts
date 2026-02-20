import { useMutation, useQuery } from "@tanstack/react-query";
import { queryOptions } from "..";
import { fetchAbout, fetchAboutUpdate } from "./fetch";
import { About } from "@domain/about";

export const useAboutQuery = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: () => fetchAbout(),
    ...queryOptions,
  });
};

export const useAboutUpdateMutation = () => {
  return useMutation({
    mutationFn: (data: About) => fetchAboutUpdate(data),
    ...queryOptions,
  });
};
