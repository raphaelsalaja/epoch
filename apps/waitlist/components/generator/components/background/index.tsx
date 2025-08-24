"use client";

import styles from "./styles.module.css";

const img =
  "https://cdn-images.dzcdn.net/images/cover/de5b9b704cd4ec36f8bf49beb3e17ba2/1900x1900-000000-80-0-0.jpg";

export function Background() {
  return (
    <div className={styles.background}>
      <img className={styles.image} src={img} alt="Background" />
      <div className={styles.overlay} />
    </div>
  );
}
