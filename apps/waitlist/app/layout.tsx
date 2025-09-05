import clsx from "clsx";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { QueryProvider } from "@/components/providers/query-provider";
import { inter } from "@/lib/fonts";

import "@/styles/main.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Epoch",
  description:
    "Epoch helps you plan with clarity, track with intention, and grow in rhythm with life—structure without jargon, tools without friction, for long‑term training.",
  applicationName: "Epoch",
  keywords: [
    "epoch",
    "training",
    "fitness",
    "planning",
    "periodization",
    "tracking",
    "long-term",
    "coaching",
  ],
  authors: [{ name: "Raphael Salaja" }],
  creator: "Epoch",
  publisher: "Epoch",
  openGraph: {
    title: "Epoch",
    description:
      "Epoch helps you plan with clarity, track with intention, and grow in rhythm with life—structure without jargon, tools without friction, for long‑term training.",
    url: "/",
    siteName: "Epoch",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Epoch",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Epoch",
    description:
      "Epoch helps you plan with clarity, track with intention, and grow in rhythm with life—structure without jargon, tools without friction, for long‑term training.",
    images: ["/opengraph.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className={clsx(inter.className)}>
          <a href="#main-content" className="skip">
            Skip to content
          </a>
          <main id="main-content">{children}</main>
          <Footer />
        </body>
      </QueryProvider>
    </html>
  );
}
