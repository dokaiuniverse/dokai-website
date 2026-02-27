import z from "zod";

export const WorkCategoryList = [
  "ANIMATE",
  "BRANDING",
  "CHARACTER",
  "AWARD",
  "FILM",
  "COMMERCIAL",
  "SOCIAL_CONTENTS",
] as const;

const mediaSourceSchema = z.unknown();

export const workCategorySchema = z.enum(WorkCategoryList);

export const profileContactSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  href: z.string().url().or(z.literal("")),
});

export const workMetaFieldSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  values: z
    .array(z.string().trim().min(1, "Value is required"))
    .min(1, "At least one value is required"),
});

export const creditSchema = z.object({
  team: z.string().min(1, "Team is required"),
  members: z
    .array(
      z.object({
        role: z.string().min(1, "Role is required"),
        names: z
          .array(z.string().min(1, "Name is required"))
          .min(1, "At least one name is required"),
      }),
    )
    .min(1, "At least one member is required"),
});

export const workSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: mediaSourceSchema
    .nullable()
    .refine((v) => !!v, "Thumbnail is required"),
  category: workCategorySchema,
  summary: z.string().min(1, "Summary is required"),
  productionDate: z
    .object({
      date: z.date(),
      text: z.string(),
    })
    .nullable()
    .refine(
      (v) => !!v && !Number.isNaN(v.date.getTime()) && v.text.trim().length > 0,
      "Production date is invalid",
    ),
  productionType: z.string().min(1, "Production type is required"),
  meta: z
    .array(workMetaFieldSchema)
    .min(1, "At least one meta is required")
    .default([]),
  isShortForm: z.boolean(),
  mainMedia: mediaSourceSchema
    .nullable()
    .refine((v) => !!v, "Main media is required"),
  keyVisuals: z
    .array(mediaSourceSchema)
    .min(1, "At least one key visual is required")
    .default([]),
  credits: z
    .array(creditSchema)
    .min(1, "At least one credit is required")
    .default([]),
  isPublished: z.boolean(),
  slug: z.string().min(1, "Slug is required"),
});

export type WorkInput = z.input<typeof workSchema>; // ✅ year: unknown
export type WorkOutput = z.output<typeof workSchema>; // ✅ year: number

export const initalWork: WorkInput = {
  title: "",
  thumbnail: null,
  category: "ANIMATE",
  summary: "",
  productionDate: null,
  productionType: "",
  meta: [],
  isShortForm: false,
  mainMedia: null,
  keyVisuals: [],
  credits: [],
  isPublished: false,
  slug: "",
};
