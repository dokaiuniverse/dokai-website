import InstagramSVG from "@assets/social/Instagram.svg";
import XSVG from "@assets/social/X.svg";
import FacebookSVG from "@assets/social/Facebook.svg";
import LinkedInSVG from "@assets/social/LinkedIn.svg";
import BehanceSVG from "@assets/social/Behance.svg";
import EmailSVG from "@assets/social/Email.svg";
import URLSVG from "@assets/icons/url.svg";
import z from "zod";
import { ProfileDetail } from "@domain/careers";
import { id } from "zod/locales";

export type ContactType =
  | "Instagram"
  | "X"
  | "Facebook"
  | "LinkedIn"
  | "Behance"
  | "Email"
  | "Other";

export const ContactIconMap = {
  Instagram: InstagramSVG,
  X: XSVG,
  Facebook: FacebookSVG,
  LinkedIn: LinkedInSVG,
  Behance: BehanceSVG,
  Email: EmailSVG,
  Other: URLSVG,
};

export const profileContactSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  href: z.string().url().or(z.literal("")),
});

export const profileSchema = z.object({
  email: z.string().email("Email is invalid"),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  isPublished: z.boolean(),
  avatar: z.unknown().nullable(),
  bio: z.string().min(1, "Bio is required"),
  contacts: z
    .array(profileContactSchema)
    .min(1, "At least one contact is required")
    .default([]),
  projects: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        thumbnail: z.unknown().nullable(),
      }),
    )
    .default([]),
  experiences: z.array(z.string().min(1)).default([]),
});

export type ProfileFormInput = z.input<typeof profileSchema>; // ✅ year: unknown
type FormOutput = z.output<typeof profileSchema>; // ✅ year: number

export const initalProfile: ProfileDetail = {
  email: "",
  name: "",
  role: "",
  bio: "",
  contacts: [],
  avatar: null,
  experiences: [],
  projects: [],
};
