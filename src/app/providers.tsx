"use client";

import { authQueriesClient } from "@controllers/auth/query.client";
import { prefetchAppQuery } from "@controllers/common";
import { createQueryClient } from "@lib/react-query/getQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  useEffect(() => {
    prefetchAppQuery(queryClient, authQueriesClient.sessionStatus());
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
