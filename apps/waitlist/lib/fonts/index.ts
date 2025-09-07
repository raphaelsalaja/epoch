import clsx from "clsx";
import { Newsreader } from "next/font/google";
import localFont from "next/font/local";

const inter = localFont({
  src: "../../app/fonts/inter/variable.ttf",
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const openrunde = localFont({
  variable: "--font-openrunde",
  display: "swap",
  preload: true,
  src: [
    {
      path: "../../app/fonts/openrunde/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../app/fonts/openrunde/medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../app/fonts/openrunde/semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../app/fonts/openrunde/bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const font = clsx(
  inter.className,
  newsreader.variable,
  openrunde.variable,
);
