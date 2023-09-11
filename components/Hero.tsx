"use client";

import { motion } from "framer-motion";
import EarthCanvas from "./canvas/Earth";

export default function Hero() {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <div className="absolute inset-0 top-28 max-w-7xl max-h-[calc(100%-112px)] mx-auto paddingX flex flex-col xl:flex-row items-start">
        <span className="flex gap-2 w-fit">
          <div
            id="purple-line"
            className="flex flex-col justify-center items-center mt-5"
          >
            <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
            <div className="w-1 xl:h-80 h-40 violet-gradient" />
          </div>

          <div id="hero-text-container">
            <h1 className="heroHeadText text-white">
              Hi, I&apos;m <span className="text-[#915EFF]">Marco</span>.👋
            </h1>
            <p className="heroSubText mt-2 text-white-100">
              I&apos;m a software engineer from Brazil, passionate about science
              and technology.
            </p>
            <button className="hover:scale-110 transition-transform border border-white rounded-full mt-4 px-2 py-1">
              <a
                href="https://www.linkedin.com/in/marco-goedert/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-linkedin text-white p-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                  <p className="text-white-100 font-semibold text-sm lg:text-xl ">
                    Send me a message
                  </p>
                </div>
              </a>
            </button>
          </div>
        </span>
        <span className="w-full h-full">
          <EarthCanvas />
        </span>
      </div>
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
