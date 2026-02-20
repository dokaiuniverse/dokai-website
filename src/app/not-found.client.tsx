"use client";

import StatusPage from "@components/StatusPage/StatusPage";

export default function NotFoundClient() {
  return (
    <StatusPage
      code={404}
      title="Not Found"
      description="Can't find the page you're looking for."
    />
  );
}
