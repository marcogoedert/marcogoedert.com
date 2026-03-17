import WavingHand from "@/components/WavingHand";
import LinkedinIcon from "@/components/icons/Linkedin";
import Button from "@/components/Button";

export default function Hero() {
  return (
    <div
      data-testid="main-section"
      className="relative z-0 gap-9 col-start-2 w-full h-96 flex flex-col items-start justify-center"
    >
      <h1
        id="description"
        className="text-white text-4xl leading-loose font-bold flex-wrap"
      >
        <span className="text-gray-300">Hello! Olá! ¡Holá!</span>{" "}
        <WavingHand /> I&apos;m <span className="text-brand">Marco</span>, a
        Porto Alegre 🧉 based space enthusiast 🚀 and DevOps software engineer
        👨‍💻 working with React and Typescript.
      </h1>
      <div id="actions" className="flex justify-between w-full">
        <div className="flex gap-2 flex-nowrap">
          <a href="#about">
            <Button variant="secondary">About me</Button>
          </a>
          <a href="#work">
            <Button variant="secondary">Work</Button>
          </a>
        </div>
        <a
          href="https://www.linkedin.com/in/marco-goedert/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" className="gap-1">
            <LinkedinIcon /> @Marco-Goedert
          </Button>
        </a>
      </div>
    </div>
  );
}
