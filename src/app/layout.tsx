import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-clash",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vraj Mevawala - Full Stack Developer",
  description:
    "Full-stack developer specializing in React, Node.js, Django & AI-driven platforms. Building scalable digital systems that perform.",
  keywords: [
    "Vraj Mevawala",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Django Developer",
    "Portfolio",
    "Web Developer India",
  ],
  authors: [{ name: "Vraj Mevawala" }],
  creator: "Vraj Mevawala",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vrajmevawala.dev",
    title: "Vraj Mevawala — Full Stack Developer",
    description:
      "Full-stack developer specializing in React, Node.js, Django & AI-driven platforms. Building scalable digital systems that perform.",
    siteName: "Vraj Mevawala Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vraj Mevawala - Full Stack Developer",
    description:
      "Full-stack developer specializing in React, Node.js, Django & AI-driven platforms.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
