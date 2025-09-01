"use client";

import { AnimatePresence, motion } from "motion/react";
import NextImage from "next/image";
import React from "react";
import { Button } from "@/components/button";
import { Icon } from "@/components/icons";
import { type Image as ImageType, useCardStore } from "@/lib/stores/card";
import {
  EditCardActivity,
  EditCardItemOne,
  EditCardItemTwo,
  EditCardQuote,
} from "../edit-card";
import { EditCardSpotify } from "../edit-card/spotify";
import styles from "./styles.module.css";

type View =
  | "card"
  | "edit-activity"
  | "edit-spotify"
  | "edit-item-one"
  | "edit-item-two"
  | "edit-quote";

const Image = ({ image }: { image: ImageType }) => {
  if (typeof image === "string") {
    return <NextImage width={40} height={40} src={image} alt="Item Image" />;
  }

  return (
    <div
      className={styles.icon}
      style={{ background: "", width: 40, height: 40 }}
    >
      <Icon name={image.icon} />
    </div>
  );
};

export function ActivityCard() {
  const [view, setView] = React.useState<View>("card");

  const { card } = useCardStore();

  return (
    <motion.div className={styles.container}>
      <AnimatePresence>
        {view === "card" && (
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
                  <Image image={card.spotify.image} />
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
                  <Image image={card.item_one.image} />
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>{card.item_one.title}</div>
                  <div className={styles.subtitle}>
                    {card.item_one.subtitle}
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setView("edit-item-two")}
                className={styles.item}
              >
                <div className={styles.image}>
                  <Image image={card.item_two.image} />
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>{card.item_two.title}</div>
                  <div className={styles.subtitle}>
                    {card.item_two.subtitle}
                  </div>
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
        )}
      </AnimatePresence>

      <AnimatePresence>
        {view === "edit-activity" && (
          <motion.div>
            <EditCardActivity />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {view === "edit-spotify" && (
          <motion.div>
            <EditCardSpotify />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {view === "edit-item-one" && (
          <motion.div>
            <EditCardItemOne />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {view === "edit-item-two" && (
          <motion.div>
            <EditCardItemTwo />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {view === "edit-quote" && (
          <motion.div>
            <EditCardQuote />
          </motion.div>
        )}
      </AnimatePresence>

      <Button.Root type="submit">
        <Button.Label>Download</Button.Label>
      </Button.Root>
    </motion.div>
  );
}
