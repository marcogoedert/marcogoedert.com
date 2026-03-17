import Grid from "@/components/Grid";
import { ElementType } from "react";

const SectionWrapper = (
  Component: ElementType,
  idName: string,
  bgColor?: string
) =>
  function HOC() {
    return (
      <section className="col-start-2">
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
      </section>
    );
  };

export default SectionWrapper;
