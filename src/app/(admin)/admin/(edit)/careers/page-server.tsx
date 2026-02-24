import AdminCareersPageClient from "./page-client";

const AdminCareersPageServer = ({ email }: { email?: string }) => {
  return <AdminCareersPageClient email={email} />;
};

export default AdminCareersPageServer;
