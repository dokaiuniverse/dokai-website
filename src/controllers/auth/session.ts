import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "..";
import { SessionStatus } from "./session.type";

export const fetchSessionStatus = async (
  init?: RequestInit,
): Promise<SessionStatus> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/public/auth/session`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      ...init,
    },
  )
    .then(async (res) => {
      return await res.json();
    })
    .catch((err) => {
      throw new Error(err);
    });

  return res;
};

export const useSessionStatusQuery = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: fetchSessionStatus,
    ...queryOptions,
  });
};
