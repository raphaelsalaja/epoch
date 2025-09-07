import type { Metadata } from "next";

const url =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const metadata: Metadata = {
  metadataBase: new URL(url),
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

export const site = {
  metadata,
  url,
};
