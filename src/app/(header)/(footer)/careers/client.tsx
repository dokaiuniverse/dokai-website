"use client";

import * as Styles from "./style.css";
import Link from "next/link";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import {
  useHasProfileQuery,
  useProfileListQuery,
} from "@controllers/careers/query";
import AdminButtons from "@components/ui/AdminButtons/AdminButtons";
import { SessionStatus } from "@controllers/auth/session.type";

const careersCopy =
  "BUCK is always looking for dynamic, passionate, and talented artists to join our team.Below is a list of our current vacancies - if you don't see anything, check back again soon. If you don't see any positions that match your skills, feel free to send an email with a link to your work.";

const CareersPageClient = ({ session }: { session: SessionStatus }) => {
  const { data: profiles, isLoading } = useProfileListQuery();
  const { data: hasProfile } = useHasProfileQuery({
    enabled: session.loggedIn,
  });

  if (!profiles || isLoading) return null;

  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <p className={Styles.Title}>Careers</p>
      <p className={Styles.Copy}>{careersCopy}</p>
      <p className={Styles.Title}>Artists</p>
      <p className={Styles.Copy}>
        {
          "See what it's like to work at DOKAI through these Day in the Life staff profiles."
        }
      </p>
      <div className={Styles.ProfileContainer}>
        {profiles?.items?.map((profile) => (
          <Link
            href={`/careers/${encodeURIComponent(profile.email)}`}
            className={Styles.ProfileItem}
            key={`CAREERS_${profile.email}`}
          >
            <MediaHoverOverlay
              media={profile.avatar}
              className={Styles.ProfileItemImage}
            >
              <div className={Styles.ProfileItemOverlay}>
                <p>{profile.role}</p>
                <p>{profile.name}</p>
              </div>
            </MediaHoverOverlay>
          </Link>
        ))}
      </div>
      <AdminButtons
        adminButtons={[
          {
            role: "ADMIN",
            type: "ADD",
            click: {
              type: "HREF",
              href: `/admin/careers`,
            },
            text: "Create New Profile",
          },
          hasProfile
            ? {
                role: "STAFF",
                type: "EDIT",
                click: {
                  type: "HREF",
                  href: `/admin/careers?email=${encodeURIComponent(session.email ?? "")}`,
                },
                text: "Update My Profile",
              }
            : {
                role: "STAFF",
                type: "ADD",
                click: {
                  type: "HREF",
                  href: `/admin/careers`,
                },
                text: "Create My Profile",
              },
        ]}
      />
    </div>
  );
};

export default CareersPageClient;
