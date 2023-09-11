import { StaticImageData } from "next/image";
import { Points } from "@types/three";
export {};

declare global {
  export type PointsT = Points;

  interface IService {
    title: string;
    icon: StaticImageData;
  }

  interface ITechnology {
    name: string;
    icon: StaticImageData;
  }

  interface IExperience {
    title: string;
    company_name: string;
    icon: StaticImageData;
    iconBg: string;
    date: string;
    points: string[];
  }

  interface IProject {
    name: string;
    description: string;
    tags: { name: string; color: string }[];
    image: StaticImageData;
    source_code_link: string;
  }
}
