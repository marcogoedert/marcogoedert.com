import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Marco Goedert, Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
        }}
      >
        <p
          style={{
            color: "#808080",
            fontSize: 16,
            fontFamily: "monospace",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          marcogoedert.com
        </p>
        <h1
          style={{
            color: "#f0f0f0",
            fontSize: 72,
            fontWeight: 400,
            margin: "20px 0 0",
            lineHeight: 1,
          }}
        >
          Marco Goedert
        </h1>
        <p
          style={{
            color: "#808080",
            fontSize: 20,
            fontFamily: "monospace",
            margin: "20px 0 0",
            letterSpacing: "0.1em",
          }}
        >
          Software Engineer
        </p>
      </div>
    ),
    { ...size }
  );
}
