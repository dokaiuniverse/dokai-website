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
  const { data: profiles } = useAppQuery(careersQueriesClient.profileList());
  const { data: sessionStatus } = useAppQuery(
    authQueriesClient.sessionStatus(),
  );
  const { data: hasProfile } = useAppQuery(careersQueriesClient.hasProfile(), {
    enabled: sessionStatus?.loggedIn,
  });
  console.log(profiles);

  console.log(sessionStatus);

  // admin : +, edit => 있으면 두개 다
  // staff : + or edit => 있으면 edit만

  const handleAddProfile = () => {
    router.push(`/admin/careers`);
  };

  const handleEditProfile = () => {
    router.push(
      `/admin/careers?email=${encodeURIComponent(sessionStatus?.email ?? "")}`,
    );
  };

  if (!profiles) return null;

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
