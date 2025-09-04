"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { viewTransition } from "@/lib/motion";
import styles from "./styles.module.css";

export function Manifesto({ children }: PropsWithChildren) {
  return (
    <motion.div {...viewTransition} className={styles.manifesto}>
      <Link href="/" className={styles.return}>
        Return
      </Link>
      <header className={styles.header}>
        <h1 className={styles.title}>Manifesto</h1>
        <span className={styles.subtitle}>
          by{" "}
          <a
            href="https://x.com/intent/follow?screen_name=raphaelsalaja"
            target="_blank"
            rel="noreferrer"
            className={styles.author}
          >
            Raphael Salaja
          </a>{" "}
          on Sep 4, 2025
        </span>
      </header>
      <article className={styles.article}>{children}</article>
    </motion.div>
  );
}
