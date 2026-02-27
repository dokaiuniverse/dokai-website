"use client";

import * as Styles from "./style.css";
import Link from "next/link";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import { useAppQuery } from "@controllers/common";
import { authQueriesClient } from "@controllers/auth/query.client";
import { careersQueriesClient } from "@controllers/careers/query.client";
import { useRouter } from "nextjs-toploader/app";
import FloatingButton from "@components/ui/Edit/FloatingButton/FloatingButton";

const careersCopy =
  "BUCK is always looking for dynamic, passionate, and talented artists to join our team.Below is a list of our current vacancies - if you don't see anything, check back again soon. If you don't see any positions that match your skills, feel free to send an email with a link to your work.";

const CareersPageClient = () => {
  const router = useRouter();
  const { data } = useAppQuery(careersQueriesClient.profileList());
  const { data: sessionStatus } = useAppQuery(
    authQueriesClient.sessionStatus(),
  );
  const { data: hasProfile } = useAppQuery(careersQueriesClient.hasProfile(), {
    enabled: sessionStatus?.loggedIn,
  });

  const handleAddProfile = () => {
    router.push(`/admin/careers`);
  };

  const handleEditProfile = () => {
    router.push(
      `/admin/careers?email=${encodeURIComponent(hasProfile?.email ?? "")}`,
    );
  };

  if (!data) return null;

  const profiles = data.items;

  return (
    <>
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
          {profiles.map((profile) => (
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
      </div>
      {sessionStatus?.loggedIn && (
        <div className={Styles.FloatingButtonContainer}>
          {sessionStatus?.role === "admin" ? (
            <>
              {hasProfile?.hasProfile && (
                <FloatingButton
                  type="EDIT"
                  onClick={handleEditProfile}
                  text="Edit My Profile"
                />
              )}
              <FloatingButton
                type="ADD"
                onClick={handleAddProfile}
                text="Add Profile"
              />
            </>
          ) : hasProfile?.hasProfile ? (
            <FloatingButton
              type="EDIT"
              onClick={handleEditProfile}
              text="Edit My Profile"
            />
          ) : (
            <FloatingButton
              type="ADD"
              onClick={handleAddProfile}
              text="Add Profile"
            />
          )}
        </div>
      )}
    </>
  );
};

export default CareersPageClient;
