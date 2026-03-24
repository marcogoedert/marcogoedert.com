import {
  ExperienceArraySchema,
  MediaItemArraySchema,
  type IExperience,
  type IMediaItem,
} from "./schemas";
import experiencesRaw from "@/content/experiences.json";
import listensRaw from "@/content/listens.json";
import watchesRaw from "@/content/watches.json";
import readsRaw from "@/content/reads.json";

export function getExperiences(): IExperience[] {
  try {
    return ExperienceArraySchema.parse(experiencesRaw);
  } catch (e) {
    console.error("Failed to parse experiences.json:", e);
    return [];
  }
}

export function getListens(): IMediaItem[] {
  try {
    return MediaItemArraySchema.parse(listensRaw);
  } catch (e) {
    console.error("Failed to parse listens.json:", e);
    return [];
  }
}

export function getWatches(): IMediaItem[] {
  try {
    return MediaItemArraySchema.parse(watchesRaw);
  } catch (e) {
    console.error("Failed to parse watches.json:", e);
    return [];
  }
}

export function getReads(): IMediaItem[] {
  try {
    return MediaItemArraySchema.parse(readsRaw);
  } catch (e) {
    console.error("Failed to parse reads.json:", e);
    return [];
  }
}
