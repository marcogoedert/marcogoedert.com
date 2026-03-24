import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Marco Goedert — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(family: string, text: string): Promise<ArrayBuffer> {
  const params = new URLSearchParams({
    family: `${family}:ital,wght@1,400`,
    text,
  });
  const css = await fetch(
    `https://fonts.googleapis.com/css2?${params}`,
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\)/)?.[1];
  if (!url) throw new Error(`Font URL not found for ${family}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const fontData = await loadFont("Fraunces", "Marco Goedert");

  return new ImageResponse(
    <div
      style={{
        background: "#ffffff",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "48px",
      }}
    >
      <h1
        style={{
          color: "#0a0a0a",
          fontSize: 96,
          fontWeight: 400,
          fontStyle: "italic",
          fontFamily: "Fraunces",
          margin: 0,
          lineHeight: 1,
        }}
      >
        Marco Goedert
      </h1>
      <p
        style={{
          color: "#808080",
          fontSize: 30,
          fontFamily: "monospace",
          margin: 0,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Software Engineer
      </p>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Fraunces",
          data: fontData,
          style: "italic",
          weight: 400,
        },
      ],
    },
  );
}
