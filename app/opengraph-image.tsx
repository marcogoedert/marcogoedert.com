import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Marco Goedert — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(familyQuery: string, text: string): Promise<ArrayBuffer> {
  const params = new URLSearchParams({ family: familyQuery, text });
  const css = await fetch(
    `https://fonts.googleapis.com/css2?${params}`,
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\)/)?.[1];
  if (!url) throw new Error(`Font URL not found for ${familyQuery}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const [fontNormal, fontItalic, fontMono] = await Promise.all([
    loadFont("Fraunces:ital,wght@0,400", "Marco"),
    loadFont("Fraunces:ital,wght@1,400", "Goedert"),
    loadFont("Geist Mono:wght@400", "SOFTWARE ENGINEER"),
  ]);

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          gap: "0.25em",
          margin: 0,
          lineHeight: 1,
        }}
      >
        <span
          style={{
            color: "#0a0a0a",
            fontSize: 120,
            fontWeight: 400,
            fontStyle: "normal",
            fontFamily: "Fraunces",
          }}
        >
          Marco
        </span>
        <span
          style={{
            color: "#0a0a0a",
            fontSize: 120,
            fontWeight: 400,
            fontStyle: "italic",
            fontFamily: "Fraunces",
          }}
        >
          Goedert
        </span>
      </div>
      <p
        style={{
          color: "#808080",
          fontSize: 30,
          fontFamily: "Geist Mono",
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
          data: fontNormal,
          style: "normal",
          weight: 400,
        },
        {
          name: "Fraunces",
          data: fontItalic,
          style: "italic",
          weight: 400,
        },
        {
          name: "Geist Mono",
          data: fontMono,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
