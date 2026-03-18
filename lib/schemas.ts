import { z } from "zod";

export const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string().regex(/^\d{4}-\d{2}$/, "Format: YYYY-MM"),
  endDate: z.string().regex(/^\d{4}-\d{2}$/).nullable(),
});

export const ExperienceArraySchema = ExperienceSchema.array();

export const MediaItemSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  creator: z.string(),
  coverImage: z.string().startsWith("/"),
  note: z.string().nullable(),
});

export const MediaItemArraySchema = MediaItemSchema.array().refine(
  (items) => new Set(items.map((i) => i.id)).size === items.length,
  { message: "Duplicate ids found in media items" }
);

export type IExperience = z.infer<typeof ExperienceSchema>;
export type IMediaItem = z.infer<typeof MediaItemSchema>;
