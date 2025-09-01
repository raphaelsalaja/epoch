"use client";

import { AnimatePresence, type MotionProps, motion } from "motion/react";
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
} from "../activity-card-editor";
import { EditCardSpotify } from "../activity-card-editor/forms/spotify";
import styles from "./styles.module.css";

const viewTransitions: MotionProps = {
  initial: {
    scale: 0.98,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0.98,
    opacity: 0,
  },
  transition: {
    ease: [0.19, 1, 0.22, 1],
    duration: 0.3,
  },
};

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
    <div className={styles.container}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div key={view} {...viewTransitions}>
          {view === "card" ? (
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
                <p className={styles.description}>
                  {card.activity.description}
                </p>
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
                    <div className={styles.subtitle}>
                      {card.spotify.subtitle}
                    </div>
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
          ) : view === "edit-activity" ? (
            <EditCardActivity onDone={() => setView("card")} />
          ) : view === "edit-spotify" ? (
            <EditCardSpotify onDone={() => setView("card")} />
          ) : view === "edit-item-one" ? (
            <EditCardItemOne onDone={() => setView("card")} />
          ) : view === "edit-item-two" ? (
            <EditCardItemTwo onDone={() => setView("card")} />
          ) : view === "edit-quote" ? (
            <EditCardQuote onDone={() => setView("card")} />
          ) : null}
        </motion.div>
      </AnimatePresence>

      <Button.Root
        type="submit"
        form={
          view === "edit-activity"
            ? "edit-activity-form"
            : view === "edit-spotify"
              ? "edit-spotify-form"
              : view === "edit-item-one"
                ? "edit-item-one-form"
                : view === "edit-item-two"
                  ? "edit-item-two-form"
                  : view === "edit-quote"
                    ? "edit-quote-form"
                    : undefined
        }
      >
        <Button.Label>
          {view === "edit-activity"
            ? "Update Activity"
            : view === "edit-spotify"
              ? "Update"
              : view === "edit-item-one" || view === "edit-item-two"
                ? "Update Item"
                : view === "edit-quote"
                  ? "Update Quote"
                  : "Submit"}
        </Button.Label>
      </Button.Root>
    </div>
  );
}
