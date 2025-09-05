"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import BlurImage from "@/components/blur-image";
import { Button } from "@/components/button";
import { Icon } from "@/components/icons";
import { Spinner } from "@/components/icons/spinner";
import { useEffectDownload } from "@/lib/hooks/use-effect-download";
import { button, viewTransition } from "@/lib/motion";

import { useCardStore } from "@/lib/stores/card";
import { useViewSwitcher } from "@/lib/stores/view";
import styles from "./styles.module.css";

export function ActivityCard() {
  const { card } = useCardStore();
  const { setView } = useViewSwitcher();

  const cardRef = useRef<HTMLDivElement | null>(null);

  const { start, state } = useEffectDownload(cardRef, {
    filter: (n) => {
      if (!(n instanceof HTMLElement)) return true;
      if (n.dataset?.slot === "button") return false;
      if (n.classList.contains("download")) return false;
      return true;
    },
  });

  return (
    <motion.div {...viewTransition} className={styles.container}>
      <div
        ref={cardRef}
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
              <BlurImage
                src={card.spotify.image}
                alt={card.spotify.title || "Item Image"}
                priority={false}
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

      <Button.Root
        type="button"
        onClick={() => start()}
        aria-label="Download activity card"
        aria-busy={state === "working"}
        disabled={state === "working"}
        className="download"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {state === "working" && (
            <Button.Label {...button.spinner}>
              <Spinner />
            </Button.Label>
          )}
        </AnimatePresence>
        <AnimatePresence mode="popLayout" initial={false}>
          {state !== "working" && (
            <Button.Label {...button.text}>Download</Button.Label>
          )}
        </AnimatePresence>
      </Button.Root>

      <p className={styles.intro}>
        Here's a little something while we get the release ready. Customize the
        card, and download when it feels complete.
      </p>
    </motion.div>
  );
}
