import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { QueryProvider } from "@/components/providers/query-provider";
import { font } from "@/lib/fonts";
import { site } from "@/lib/site";

import "@/styles/main.css";

export const metadata: Metadata = site.metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className={font}>
          <main>{children}</main>
          <Footer />
        </body>
      </QueryProvider>
    </html>
  );
}
