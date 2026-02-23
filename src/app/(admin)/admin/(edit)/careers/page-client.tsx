"use client";

import * as CareersStyles from "@app/(header)/(footer)/careers/[email]/style.css";
import CareerDetailProfile from "@components/pages/careers/Profile/Profile";
import { useEffect, useState } from "react";
import { ProfileDetail } from "@domain/careers";
import CareerDetailProjects from "@components/pages/careers/Projects/Projects";
import CareerDetailExperiences from "@components/pages/careers/Experiences/Experiences";
import AdminButtons from "@components/ui/AdminButtons/AdminButtons";
import { useSession } from "@lib/auth/useSession";
import {
  fetchProfileCreate,
  fetchProfileDelete,
  fetchProfileUpdate,
} from "@controllers/careers/fetch";
import { useRouter } from "nextjs-toploader/app";
import { useModalStackStore } from "@stores/modalStackStore";
import { ProfileDetailResponse } from "@controllers/careers/types";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EditInfoSection from "../../../../../components/pages/careers/EditInfo/EditInfo";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  role: z.string().min(1),
  isPublished: z.boolean(),
  avatar: z.unknown().nullable(),
  bio: z.string(),
  contacts: z
    .array(
      z.object({
        name: z.string().min(1),
        value: z.string().min(1),
        href: z.string().url().or(z.literal("")),
      }),
    )
    .default([]),
  experiences: z.array(z.string().min(1)).default([]),
});

export type ProfileFormInput = z.input<typeof schema>; // ✅ year: unknown
type FormOutput = z.output<typeof schema>; // ✅ year: number

const initalProfile: ProfileDetail = {
  email: "",
  name: "",
  role: "",
  bio: "",
  contacts: [],
  avatar: null,
  experiences: [],
  projects: [],
};

const AdminCareersPageClient = ({
  profileDetail,
}: {
  profileDetail?: ProfileDetailResponse;
}) => {
  const form = useForm<ProfileFormInput>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      ...initalProfile,
      ...profileDetail?.data,
      isPublished: profileDetail?.isPublished ?? false,
    },
  });

  const router = useRouter();
  const session = useSession();
  const [profileId, setProfileId] = useState(profileDetail?.id ?? null);
  const [profile, setProfile] = useState<ProfileDetail>(
    profileDetail?.data ?? initalProfile,
  );
  const emailEditable = !!(
    !profileId &&
    session.me &&
    session.me.role === "admin"
  );
  const [isPublic, setIsPublic] = useState(profileDetail?.isPublished ?? false);

  useEffect(() => {
    if (!profileDetail && session.me) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setProfile({
        ...initalProfile,
        email: session.me.email,
      });
    }
  }, [profileDetail, session.me]);

  const push = useModalStackStore((s) => s.push);

  const handleCreateProfile = async () => {
    push("API", {
      title: "Create New Profile",
      onFetch: async () =>
        fetchProfileCreate({
          isPublished: isPublic,
          data: profile,
        }),
      onSuccess: (data) => {
        setProfileId(data.id);
      },
      onConfirm: () => {
        router.replace(`/careers/${encodeURIComponent(profile.email)}`);
      },
    });
  };

  const handleUpdateProfile = async () => {
    if (!profileId) return;
    push("API", {
      title: "Update Profile",
      onFetch: async () =>
        fetchProfileUpdate({
          id: profileId,
          isPublished: isPublic,
          data: profile,
        }),
      onConfirm: () => {
        router.replace(`/careers/${encodeURIComponent(profile.email)}`);
      },
    });
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
    <div className={`${CareersStyles.Container} page-wrapper layout-wrapper`}>
      <FormProvider {...form}>
        <EditInfoSection emailEditable={emailEditable} />
        {/* <EditProfileSection /> */}
      </FormProvider>
      <CareerDetailProfile
        profile={profile}
        editable
        updateProfile={setProfile}
      />
      <CareerDetailProjects
        email={profile.email}
        projects={profile.projects}
        editable
      />
      <CareerDetailExperiences
        experiences={profile.experiences}
        editable
        updateProfile={setProfile}
      />
      <AdminButtons
        adminButtons={
          !profileId
            ? [
                {
                  role: "STAFF",
                  type: "SAVE",
                  click: {
                    type: "FUNCTION",
                    onClick: handleCreateProfile,
                  },
                  email: profile.email,
                  text: "Create New Profile",
                },
              ]
            : [
                {
                  role: "STAFF",
                  type: "SAVE",
                  click: {
                    type: "FUNCTION",
                    onClick: handleUpdateProfile,
                  },
                  email: profile.email,
                  text: "Update Profile",
                },
                {
                  role: "ADMIN",
                  type: "REMOVE",
                  click: {
                    type: "FUNCTION",
                    onClick: handleDeleteProfile,
                  },
                  email: profile.email,
                  text: "Delete Profile",
                },
              ]
        }
      />
    </div>
  );
};

export default AdminCareersPageClient;
