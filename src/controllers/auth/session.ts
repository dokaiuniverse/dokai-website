import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "../common";
import { SessionStatus } from "./types";

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

export const useSessionOwner = (email: string | null) => {
  const { data } = useSessionStatusQuery();
  if (!data?.loggedIn) return false;
  if (data.role === "admin") return true;
  return data.email === email;
};

export const useSessionRole = () => {
  const { data } = useSessionStatusQuery();
  return data?.role;
};

export const useSessionEmail = () => {
  const { data } = useSessionStatusQuery();
  return data?.email;
};
