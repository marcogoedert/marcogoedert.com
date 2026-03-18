import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Shell } from "@/components/layout/Shell";
import { PageTransition } from "@/components/layout/PageTransition";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400"],
  style: ["italic"],
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const fouc = `(function(){
  var c=document.cookie.match(/(?:^|;\\s*)color-scheme=([^;]+)/);
  var s=c?c[1]:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.setAttribute('data-color-scheme',s);
})();`;

export const metadata: Metadata = {
  title: {
    default: "Marco Goedert",
    template: "%s — Marco Goedert",
  },
  description: "Software engineer. Updated occasionally.",
  openGraph: {
    siteName: "Marco Goedert",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: fouc }} />
      </head>
      <body
        className={`${fraunces.variable} ${geist.variable} ${geistMono.variable} bg-background text-foreground`}
      >
        <Shell>
          <PageTransition>{children}</PageTransition>
        </Shell>
      </body>
    </html>
  );
}
