import {
  QueryClient,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

export const queryOptions = {
  retry: 1,
  staleTime: 1000,
  suspense: false,
};

type FetchApiOptions<TBody> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  headers?: Record<string, string>;
  cache?: RequestCache;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export async function fetchApi<TResponse = unknown, TBody = unknown>(
  path: string,
  opts: FetchApiOptions<TBody> = {},
): Promise<TResponse> {
  const { method = "GET", body, headers, cache } = opts;

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    cache: cache ?? (method === "GET" ? "force-cache" : "no-store"),
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(headers ?? {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let msg = "";
    try {
      const ct = res.headers.get("content-type") ?? "";
      msg = ct.includes("application/json")
        ? JSON.stringify(await res.json())
        : await res.text();
    } catch {}
    throw new Error(
      `${method} ${path} failed: ${res.status}${msg ? ` - ${msg}` : ""}`,
    );
  }

  if (res.status === 204) return undefined as TResponse;

  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) return (await res.json()) as TResponse;
  return (await res.text()) as unknown as TResponse;
}

//

export type QueryDef<TData, TKey extends QueryKey = QueryKey> = {
  queryKey: TKey;
  queryFn: () => Promise<TData>;
  staleTime?: number;
  gcTime?: number;
  retry?: number | boolean;
};

export const withDefaults = <TData, TKey extends QueryKey>(
  def: QueryDef<TData, TKey>,
): QueryDef<TData, TKey> => ({
  staleTime: 5_000,
  gcTime: 5 * 60_000,
  retry: 2,
  ...def,
});

export async function prefetchAppQuery<TData, TKey extends QueryKey>(
  qc: QueryClient,
  def: QueryDef<TData, TKey>,
) {
  const d = withDefaults(def);
  return qc.prefetchQuery({
    queryKey: d.queryKey,
    queryFn: d.queryFn,
    staleTime: d.staleTime,
    gcTime: d.gcTime,
    retry: d.retry,
  });
}

export function useAppQuery<TData, TKey extends readonly unknown[]>(
  def: QueryDef<TData, TKey>,
  opts?: Omit<
    UseQueryOptions<TData, unknown, TData, TKey>,
    "queryKey" | "queryFn"
  >,
) {
  const d = withDefaults(def);

  return useQuery({
    queryKey: d.queryKey,
    queryFn: d.queryFn,
    staleTime: d.staleTime,
    gcTime: d.gcTime,
    retry: d.retry,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...(opts ?? {}),
  });
}
