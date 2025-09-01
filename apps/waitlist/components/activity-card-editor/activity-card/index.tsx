"use client";

import Image from "next/image";
import { Icon } from "@/components/icons";
import { useCardStore } from "@/lib/stores/card";
import { useViewStore } from "@/lib/stores/view";

import styles from "./styles.module.css";

export function ActivityCard() {
  const { card } = useCardStore();
  const { setView } = useViewStore();

  return (
    <div
      className={styles.card}
      style={{ background: `var(--${card.activity.color})` }}
    >
      <button
        tabIndex={0}
        type="button"
        className={styles.activity}
        onClick={() => setView("edit-activity")}
      >
        <h1 className={styles.title}>{card.activity.title}</h1>
        <p className={styles.description}>{card.activity.description}</p>
      </button>
      <div className={styles.items}>
        <button
          type="button"
          className={styles.item}
          onClick={() => setView("edit-spotify")}
        >
          <div className={styles.image}>
            <Image
              width={40}
              height={40}
              src={card.spotify.image}
              alt="Item Image"
            />
          </div>
          <div className={styles.details}>
            <div className={styles.title}>{card.spotify.title}</div>
            <div className={styles.subtitle}>{card.spotify.subtitle}</div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setView("edit-item-one")}
          className={styles.item}
        >
          <div className={styles.image}>
            <div className={styles.image}>
              <div
                className={styles.icon}
                style={{
                  background: `var(--${card.item_one.color})`,
                  width: 40,
                  height: 40,
                }}
              >
                <Icon name={card.item_one.icon} />
              </div>
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.title}>{card.item_one.title}</div>
            <div className={styles.subtitle}>{card.item_one.subtitle}</div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setView("edit-item-two")}
          className={styles.item}
        >
          <div className={styles.image}>
            <div
              className={styles.icon}
              style={{
                background: `var(--${card.item_two.color})`,
                width: 40,
                height: 40,
              }}
            >
              <Icon name={card.item_two.icon} />
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.title}>{card.item_two.title}</div>
            <div className={styles.subtitle}>{card.item_two.subtitle}</div>
          </div>
        </button>
      </div>
      <button
        type="button"
        onClick={() => setView("edit-quote")}
        className={styles.quote}
      >
        <p className={styles.text}>{card.quote.text}</p>
        <p className={styles.author}>— {card.quote.author}</p>
      </button>
    </div>
  );
}
