import clsx from "clsx";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { QueryProvider } from "@/components/providers/query-provider";
import { openrunde } from "@/lib/fonts";

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
      <body className={clsx(openrunde.className)}>
        <a href="#main-content" className="skip">
          Skip to content
        </a>
        <QueryProvider>
          <main>{children}</main>
        </QueryProvider>
      </body>
      <Footer />
    </html>
  );
}
