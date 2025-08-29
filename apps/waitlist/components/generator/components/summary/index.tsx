"use client";

import type { Acitivty } from "../../../../lib/hooks/use-generator-state";
import styles from "./styles.module.css";

interface SummaryProps {
  summary: Acitivty;
}

export function Summary({ summary }: SummaryProps) {
  return (
    <div className={styles.summary}>
      <h1>{summary.title}</h1>
      <p>{summary.description}</p>
    </div>
  );
}
