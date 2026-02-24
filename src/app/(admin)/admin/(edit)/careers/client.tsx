"use client";

import CareerExperiences from "@components/pages/career_tmp/Experiences";
import CareerProfile from "@components/pages/career_tmp/Profile";
import CareerProjects from "@components/pages/career_tmp/Projects";
import EditModeToggle from "@components/ui/Edit/EditModeToggle/EditModeToggle";
import PrivateMark from "@components/ui/PrivateMark/PrivateMark";
import { ProfileDetail } from "@domain/careers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSessionEmail } from "@controllers/auth/session";
import {
  initalProfile,
  profileSchema,
} from "@components/pages/career_tmp/career";
import { ProfileFormInput } from "./page-client";
import CareerEditInfo from "@components/pages/career_tmp/EditInfo";
import CareerEditProfile from "@components/pages/career_tmp/EditProfile";
import CareerEditExperiences from "@components/pages/career_tmp/EditExperiences";
import * as Styles from "./style.css";
import { useModalStackStore } from "@stores/modalStackStore";
import {
  fetchProfileCheckEmail,
  fetchProfileCreate,
  fetchProfileDelete,
  fetchProfileUpdate,
} from "@controllers/careers/fetch";
import { useRouter } from "nextjs-toploader/app";
import FloatingButton from "@components/ui/Edit/FloatingButton/FloatingButton";

const AdminCareersPageClient = ({
  id,
  profileDetail,
  isPublished,
  email,
}: {
  id?: string;
  profileDetail: ProfileDetail;
  isPublished: boolean;
  email?: string;
}) => {
  const router = useRouter();
  const [mode, setMode] = useState<"VIEW" | "EDIT">("EDIT");
  const [profileId, setProfileId] = useState<string | null>(id ?? null);
  const userEmail = useSessionEmail();

  const form = useForm<ProfileFormInput>({
    mode: "onBlur",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...initalProfile,
      ...profileDetail,
      isPublished: isPublished,
    },
  });
  const { setValue, trigger, getValues, setError, clearErrors } = form;

  useEffect(() => {
    if (!email && userEmail) {
      setValue("email", userEmail);
    }
  }, [email, userEmail]);

  const push = useModalStackStore((s) => s.push);

  const validateAndPush = async (mode: "create" | "update") => {
    const valid = await trigger();
    if (!valid) return;

    const formValues = getValues();
    const { isPublished: nextIsPublished, ...rest } = formValues;
    const nextProfileDetail = rest as ProfileDetail;
    const nextEmail = nextProfileDetail.email;

    const shouldCheck = mode === "create" || (email && nextEmail !== email);

    if (shouldCheck) {
      try {
        const result = await fetchProfileCheckEmail(nextEmail);

        if (!result.ok) {
          setError("email", {
            type: "manual",
            message: result.message ?? "This email is already in use",
          });
          return;
        }
      } catch {
        setError("email", {
          type: "manual",
          message: "Email check failed",
        });
      }

      clearErrors("email");
    }

    if (mode === "create") {
      push("API", {
        title: "Create New Profile",
        onFetch: async () =>
          fetchProfileCreate({
            isPublished: nextIsPublished,
            data: nextProfileDetail,
          }),
        onSuccess: (data) => {
          setProfileId(data.id);
        },
        onConfirm: () => {
          router.replace(`/careers/${encodeURIComponent(nextEmail)}`);
        },
      });
    } else {
      if (!profileId) return;

      push("API", {
        title: "Update Profile",
        onFetch: async () =>
          fetchProfileUpdate({
            id: profileId,
            isPublished: nextIsPublished,
            data: nextProfileDetail,
          }),
        onConfirm: () => {
          router.replace(`/careers/${encodeURIComponent(nextEmail)}`);
        },
      });
    }
  };

  const handleCreateProfile = async () => {
    await validateAndPush("create");
  };

  const handleUpdateProfile = async () => {
    await validateAndPush("update");
  };

  const handleDeleteProfile = async () => {
    if (!profileId) return;
    push("CONFIRM", {
      title: "Delete Profile",
      content: "Are you sure to delete this profile?",
      onConfirm: () => {
        push("API", {
          title: "Delete Profile",
          onFetch: async () => fetchProfileDelete(profileId),
          onConfirm: () => {
            router.replace(`/careers`);
          },
        });
      },
    });
  };

  return (
    <>
      <div className={Styles.HeaderContainer}>
        <EditModeToggle mode={mode} setMode={setMode} />
        <PrivateMark
          isPrivate={!isPublished}
          className={Styles.HeaderPrivateMark}
        />
      </div>
      {mode === "VIEW" ? (
        <>
          <CareerProfile profileDetail={profileDetail} />
          <CareerProjects
            projects={profileDetail.projects}
            email={profileDetail.email}
          />
          <CareerExperiences experiences={profileDetail.experiences} />
        </>
      ) : (
        <FormProvider {...form}>
          <CareerEditInfo />
          <CareerEditProfile />
          <CareerProjects
            projects={profileDetail.projects}
            email={profileDetail.email}
            isReadOnly
          />
          <CareerEditExperiences />
        </FormProvider>
      )}
      <div className={Styles.ButtonContainer}>
        {profileId ? (
          <>
            <FloatingButton
              type="SAVE"
              text="Update Profile"
              onClick={handleUpdateProfile}
            />
            <FloatingButton
              type="REMOVE"
              text="Delete Profile"
              onClick={handleDeleteProfile}
            />
          </>
        ) : (
          <FloatingButton
            type="SAVE"
            text="Create Profile"
            onClick={handleCreateProfile}
          />
        )}
      </div>
    </>
  );
};

export default AdminCareersPageClient;
