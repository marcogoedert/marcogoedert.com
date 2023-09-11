import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Tech from "@/components/Tech";
import Works from "@/components/Works";
import StarsCanvas from "@/components/canvas/Stars";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="relative z-0 bg-primary">
          <div className="relative z-0">
            <Hero />
            {/* <StarsCanvas /> */}
          </div>
          <About />
          <Experience />
          {/* <Tech /> */}
          {/* <Works /> */}
        </div>
      </main>
    </>
  );
}
