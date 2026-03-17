"use client";

import React from "react";
import { experiences } from "../constants";
import Image from "next/image";
import SectionWrapper from "@/hoc/SectionWrapper";

interface ExperienceCardProps {
  experience: IExperience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="w-12 h-12 rounded-full flex justify-center items-center shrink-0"
          style={{ background: experience.iconBg }}
        >
          <Image
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
        <div className="w-[2px] flex-1 bg-secondary/30" />
      </div>

      <div className="pb-8">
        <h3 className="text-foreground text-xl font-bold">{experience.title}</h3>
        <p className="text-muted text-base font-semibold">
          {experience.company_name}
        </p>
        <p className="text-muted/60 text-sm mt-1">{experience.date}</p>

        <ul className="mt-4 list-disc ml-5 space-y-2">
          {experience.points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-foreground text-sm pl-1 tracking-wider"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <>
      <div>
        <p className="sectionSubText text-center">What I have done so far</p>
        <h2 className="sectionHeadText text-center">Work Experience.</h2>
      </div>

      <div className="mt-20 flex flex-col">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
