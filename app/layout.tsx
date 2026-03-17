import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

// Runs before React hydrates to prevent flash of unstyled content.
// Reads the color-scheme cookie and sets data-color-scheme on <html>
// immediately, before any CSS transitions fire.
const fouc = `(function(){
  var c=document.cookie.match(/(?:^|;\\s*)color-scheme=([^;]+)/);
  var s=c?c[1]:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.setAttribute('data-color-scheme',s);
})();`;

export const metadata: Metadata = {
  title: "Marco Goedert",
  description: "Marco Goedert is a software engineer from Brazil.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
          <script dangerouslySetInnerHTML={{ __html: fouc }} />
      </head>
      <body className={montserrat.variable}>{children}</body>
    </html>
  );
}
