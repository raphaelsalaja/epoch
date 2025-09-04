"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/manifesto")) return null;

  return (
    <footer className={styles.footer}>
      <ul className={styles.links}>
        <li>
          <Link href="/manifesto">Manifesto</Link>
        </li>
        <li>
          <a
            href="https://x.com/intent/follow?screen_name=raphaelsalaja"
            target="_blank"
            rel="noreferrer"
          >
            X (Twitter)
          </a>
        </li>

        <li>
          <a
            href="https://github.com/raphaelsalaja/epoch"
            target="_blank"
            rel="noreferrer"
          >
            Source Code
          </a>
        </li>

        <li>
          <a
            href="mailto:raphaelsalaja@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}
