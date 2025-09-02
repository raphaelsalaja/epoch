"use client";

import * as htmlToImage from "html-to-image";
import { motion } from "motion/react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/button";
import { Icon } from "@/components/icons";
import { Spinner } from "@/components/icons/spinner";
import { viewTransition } from "@/lib/motion";
import { useCardStore } from "@/lib/stores/card";
import { useViewStore } from "@/lib/stores/view";
import styles from "./styles.module.css";

export function ActivityCard() {
  const { card } = useCardStore();
  const { setView } = useViewStore();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState(false);

  const ensureImagesLoaded = useCallback(async (root: HTMLElement) => {
    const images = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
    await Promise.all(
      images.map((img) =>
        img.decode ? img.decode().catch(() => {}) : Promise.resolve(),
      ),
    );
  }, []);

  const onDownload = useCallback(async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      const node = cardRef.current;
      await ensureImagesLoaded(node);

      const dataUrl = await htmlToImage.toPng(node, {
        pixelRatio: Math.min(
          3,
          (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1) *
            2,
        ),
        cacheBust: true,
        backgroundColor: getComputedStyle(node).backgroundColor || undefined,
        filter: (n) => {
          if (n instanceof HTMLElement && n.dataset?.slot === "button")
            return false;
          if (n instanceof HTMLElement && n.classList.contains("download"))
            return false;
          return true;
        },
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "activity-card.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to export image", err);
    } finally {
      setDownloading(false);
    }
  }, [downloading, ensureImagesLoaded]);

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

      <Button.Root
        type="button"
        onClick={onDownload}
        aria-label="Download activity card"
        disabled={downloading}
        className="download"
      >
        {downloading ? (
          <Button.Label>
            <Spinner />
          </Button.Label>
        ) : (
          <Button.Label>Download</Button.Label>
        )}
      </Button.Root>
    </motion.div>
  );
}
