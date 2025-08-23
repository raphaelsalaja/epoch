"use client";

import styles from "./styles.module.css";

export function Quote() {
  return (
    <div className={styles.quote}>
      <svg
        width="2"
        height="72"
        viewBox="0 0 2 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.line}
      >
        <line
          opacity="0.4"
          x1="1"
          y1="1"
          x2="1"
          y2="71"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>

      <div className={styles.message}>
        <h2>
          The most important thing is to try and inspire people so that they can
          be great in whatever they want to do
        </h2>
        <h1>— Kobe Bryant</h1>
      </div>
    </div>
  );
}
