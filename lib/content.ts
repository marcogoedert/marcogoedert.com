import { ExperienceArraySchema, MediaItemArraySchema, type IExperience, type IMediaItem } from "./schemas";
import experiencesRaw from "@/content/experiences.json";
import listensRaw from "@/content/listens.json";
import watchesRaw from "@/content/watches.json";
import readsRaw from "@/content/reads.json";

export function getExperiences(): IExperience[] {
  return ExperienceArraySchema.parse(experiencesRaw);
}

export function getListens(): IMediaItem[] {
  return MediaItemArraySchema.parse(listensRaw);
}

export function getWatches(): IMediaItem[] {
  return MediaItemArraySchema.parse(watchesRaw);
}

export function getReads(): IMediaItem[] {
  return MediaItemArraySchema.parse(readsRaw);
}
