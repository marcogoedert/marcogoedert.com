"use client";

import React from "react";
import { services } from "../constants";
import Image, { StaticImageData } from "next/image";
import SectionWrapper from "@/hoc/SectionWrapper";

interface ServiceCardProps {
  title: string;
  icon: StaticImageData;
}

const ServiceCard = ({ title, icon }: ServiceCardProps) => (
  <div className="xs:w-[250px] w-full">
    <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
      <div className="bg-surface rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
        <Image
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />
        <h3 className="text-foreground text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </div>
  </div>
);

const About = () => {
  return (
    <>
      <div>
        <p className="sectionSubText">Introduction</p>
        <h2 className="sectionHeadText">About me.</h2>
      </div>

      <p className="mt-4 text-muted text-[17px] max-w-3xl leading-[30px]">
        I&apos;m a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Next.js, Node.js,
        and Three.js. I&apos;m a quick learner and collaborate closely with
        clients to create efficient, scalable, and user-friendly solutions that
        solve real-world problems. Send me a message and let&apos;s work
        together to bring your ideas to life!
      </p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about", "bg-surface-alt");
