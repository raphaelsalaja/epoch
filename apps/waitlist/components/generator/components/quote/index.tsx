"use client";

import styles from "./styles.module.css";

export function Quote() {
  return (
    <button
      type="button"
      className={styles.quote}
      title="Click for a new quote"
    />
  );
}
