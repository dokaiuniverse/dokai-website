import * as Styles from "./style.css";
import { ProfileDetail } from "@domain/careers";
import AdminCareersPageClient from "./client";

const initialProfileDetail: ProfileDetail = {
  email: "",
  name: "",
  role: "",
  avatar: null,
  bio: "",
  contacts: [],
  experiences: [],
  projects: [],
};

const AdminCareersPageServer = ({
  id,
  profileDetail,
  isPublished,
  email,
}: {
  id?: string;
  profileDetail?: ProfileDetail;
  isPublished?: boolean;
  email?: string;
}) => {
  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <AdminCareersPageClient
        id={id}
        profileDetail={profileDetail ?? initialProfileDetail}
        isPublished={isPublished ?? false}
        email={email}
      />
    </div>
  );
};

export default AdminCareersPageServer;
