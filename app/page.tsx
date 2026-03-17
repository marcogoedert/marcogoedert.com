import About from "@/components/About";
import Experience from "@/components/Experience";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <main>
        <a
          className="hidden"
          aria-label="Find me on LinkedIn"
          title="Find me on LinkedIn"
          rel="me"
          href="https://www.linkedin.com/in/marco-goedert"
        >
          @Marco-Goedert
        </a>
        <Navbar />
        <div id="home" className="h-44" />
        <Grid id="content">
          <Hero />
          <About />
          <Experience />
        </Grid>
      </main>
    </>
  );
}
