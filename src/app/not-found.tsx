import StatusPage from "@components/StatusPage/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      code={404}
      title="Not Found"
      description="Can't find the page you're looking for."
    />
  );
}
