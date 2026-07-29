import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kaveeth Manodhya — Developer, Designer & Content Creator",
  description:
    "Personal portfolio of Kaveeth Manodhya — undergraduate at Wayamba University of Sri Lanka, full-stack developer, photographer, and YouTube content creator (Mr Kavvy).",
  keywords: [
    "Kaveeth Manodhya",
    "Mr Kavvy",
    "portfolio",
    "developer",
    "photographer",
    "Sri Lanka",
  ],
  openGraph: {
    title: "Kaveeth Manodhya — Developer, Designer & Content Creator",
    description:
      "Kaveeth Manodhya's personal portfolio showcasing projects, experience, and creative work.",
    type: "website",
  },
  icons: {
    icon: "/icon.png?v=5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
