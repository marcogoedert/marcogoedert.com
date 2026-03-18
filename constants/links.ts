export const SOCIAL_LINKS = {
  github: {
    label: "GitHub",
    handle: "marcogoedert",
    url: "https://github.com/marcogoedert",
  },
  linkedin: {
    label: "LinkedIn",
    handle: "marcogoedert",
    url: "https://www.linkedin.com/in/marcogoedert",
  },
  x: {
    label: "X",
    handle: "@marco_goedert",
    url: "https://x.com/marco_goedert",
  },
  bluesky: {
    label: "Bluesky",
    handle: "marcogoedert.bsky.social",
    url: "https://bsky.app/profile/marcogoedert.bsky.social",
  },
} as const;

export const CONTACT_LINKS = {
  email: {
    label: "Email",
    value: "hello@marcogoedert.com",
    url: "mailto:hello@marcogoedert.com",
  },
  ...SOCIAL_LINKS,
} as const;
