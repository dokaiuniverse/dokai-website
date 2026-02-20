import { Profile, ProfileDetail, ProjectCard } from "@domain/careers";

const projects: ProjectCard[] = [
  {
    thumbnail: {
      type: "IMAGE",
      src: "/nhi_0.png",
      alt: "nhi_0",
    },
    title: "title",
    id: "projectId",
  },
  {
    thumbnail: {
      type: "IMAGE",
      src: "/nhi_0.png",
      alt: "nhi_0",
    },
    title: "title",
    id: "projectId",
  },
  {
    thumbnail: {
      type: "IMAGE",
      src: "/nhi_0.png",
      alt: "nhi_0",
    },
    title: "title",
    id: "projectId",
  },
  {
    thumbnail: {
      type: "IMAGE",
      src: "/nhi_0.png",
      alt: "nhi_0",
    },
    title: "title",
    id: "projectId",
  },
];

const profile: Profile = {
  email: "jadest13x03@gmail.com",
  name: "name",
  role: "Developer",
  avatar: {
    type: "IMAGE",
    src: "/nhi_0.png",
    alt: "nhi_0",
  },
  bio: "BUCK is always looking for dynamic, passionate, and talented artists to join our team.\nBelow is a list of our current vacancies - if you don't see anything, check back again soon. If you don't see any positions that match your skills, feel free to send an email with a link to your work.",
  contacts: [
    {
      name: "Instagram",
      value: "@dokai123_",
      href: "https://www.instagram.com/dokai123_",
    },
    {
      name: "Behance",
      value: "dokai123_",
      href: "https://www.behance.net/dokai123_",
    },
    {
      name: "Email",
      value: "dokai.solart@gmail.com",
      href: "mailto:dokai.solart@gmail.com",
    },
  ],
  experiences: [
    "2020.10.12 Media art project ~",
    "2020.10.12 Media art project ~",
    "2020.10.12 Media art project ~",
    "2020.10.12 Media art project ~",
  ],
};

export const fetchCareersDetail = async (
  profileId: string,
): Promise<ProfileDetail> => {
  return await Promise.resolve({
    ...profile,
    projects,
  });
};
