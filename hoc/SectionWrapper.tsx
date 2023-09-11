import { motion } from "framer-motion";
import { ElementType } from "react";

const SectionWrapper = (Component: ElementType, idName: string) =>
  function HOC() {
    return (
      <motion.section
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.5, delayChildren: 0.5 } },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="padding max-w-7xl mx-auto relative z-0"
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
