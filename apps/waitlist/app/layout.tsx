import clsx from "clsx";
import type { Metadata } from "next";
import { inter, openrunde } from "@/lib/fonts";

import "@/styles/main.css";

export const metadata: Metadata = {
  title: "Epoch",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, openrunde.variable)}>
        <main>{children}</main>
      </body>
    </html>
  );
}
