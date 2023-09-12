import Grid from "@/components/Grid";
import { motion } from "framer-motion";
import { ElementType } from "react";

const SectionWrapper = (
  Component: ElementType,
  idName: string,
  bgColor?: string
) =>
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
        className="col-start-2"
      >
        <div
          id={idName}
          className={
            "w-screen -ml-[50vw] -mr-[50vw] left-1/2 right-1/2 relative backdrop-blur-[8px] py-12 " +
            bgColor
          }
        >
          <Grid>
            <div className="col-start-2">
              <Component />
            </div>
          </Grid>
        </div>
      </motion.section>
    );
  };

export default SectionWrapper;
