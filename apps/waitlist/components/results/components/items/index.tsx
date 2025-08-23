"use client";

import styles from "./styles.module.css";

const img =
  "https://cdn-images.dzcdn.net/images/cover/de5b9b704cd4ec36f8bf49beb3e17ba2/1900x1900-000000-80-0-0.jpg";

export function Items() {
  return (
    <div className={styles.items}>
      <div className={styles.item}>
        <div className={styles.icon}>
          <img className={styles.image} src={img} alt="Item" />
        </div>
        <div className={styles.details}>
          <h1>Let It Happen</h1>
          <h2>Tame Impala</h2>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.icon} />
        <div className={styles.details}>
          <h1>Let It Happen</h1>
          <h2>Tame Impala</h2>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.icon} />
        <div className={styles.details}>
          <h1>Let It Happen</h1>
          <h2>Tame Impala</h2>
        </div>
      </div>
    </div>
  );
}
