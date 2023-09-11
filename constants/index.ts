import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  petInformatica,
  portosys,
  dell,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "tech",
    title: "Tech",
  },
  // {
  //   id: "contact",
  //   title: "Contact",
  // },
];

const services: IService[] = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "DevOps Developer",
    icon: creator,
  },
];

const technologies: ITechnology[] = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences: IExperience[] = [
  {
    title: "Undergraduate Student Researcher",
    company_name: "PET-Informatica PUC-RS",
    icon: petInformatica,
    iconBg: "#E6DEDD",
    date: "Mar 2018 - Nov 2018",
    points: [
      "Researching and developing projects using Arduino, C and other related technologies.",
      "Proactively looking for solutions to problems and proposing improvements.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company_name: "Portosys Information Systems",
    icon: portosys,
    iconBg: "#383E56",
    date: "Oct 2019 - May 2020",
    points: [
      "Developing and maintaining ERP applications using C#, PL/SQL and other related technologies.",
      "Proactively looking for solutions to problems and proposing improvements.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company_name: "Dell Technologies",
    icon: dell,
    iconBg: "#e1e1e1",
    date: "May 2020 - Oct 2021",
    points: [
      "IT Academy Program: 4 months of training in IT technologies and processes. Training and activities required skills in Scrum, Agile Methods C#/ASP.NET, Flutter, Angular.js, Python.",
      "Developing and maintaining applications using C#/ASP.NET, Prometheus, Grafana, PowerShell, Docker, Kubernetes and other related technologies.",
      "Collaborating with cross-functional teams including product managers and other developers to create high-quality products.",
    ],
  },
  {
    title: "Software Engineer 1",
    company_name: "Dell Technologies",
    icon: dell,
    iconBg: "#e1e1e1",
    date: "Oct 2021 - Present",
    points: [
      "Developing and maintaining many UI applications with React, TypeScript, Babel, TailwindCSS, Next.js and other related technologies.",
      "Collaborating with cross-functional teams including product managers and other developers to create high-quality products.",
    ],
  },
];

// const projects: IProject[] = [
//   {
//     name: "Car Rent",
//     description:
//       "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
//     tags: [
//       {
//         name: "react",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "mongodb",
//         color: "green-text-gradient",
//       },
//       {
//         name: "tailwind",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: carrent,
//     source_code_link: "https://github.com/",
//   },
//   {
//     name: "Job IT",
//     description:
//       "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
//     tags: [
//       {
//         name: "react",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "restapi",
//         color: "green-text-gradient",
//       },
//       {
//         name: "scss",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: jobit,
//     source_code_link: "https://github.com/",
//   },
//   {
//     name: "Trip Guide",
//     description:
//       "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
//     tags: [
//       {
//         name: "nextjs",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "supabase",
//         color: "green-text-gradient",
//       },
//       {
//         name: "css",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: tripguide,
//     source_code_link: "https://github.com/",
//   },
// ];

export { services, technologies, experiences };
