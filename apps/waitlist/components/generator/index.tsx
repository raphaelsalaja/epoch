"use client";

import NextImage from "next/image";
import { Button } from "@/components/button";
import {
  Cookies,
  Crown,
  Diamond,
  Drink,
  Explosion,
  ForkKnife,
  Growth,
  Headphones,
  MedicineTablet,
} from "@/components/icons";
import type { IconName } from "@/components/icons/types";
import { type Image as ImageType, useCardStore } from "@/lib/stores/card";
import styles from "./styles.module.css";

const getIconComponent = (iconName: IconName) => {
  const iconMap = {
    crown: Crown,
    forkKnife: ForkKnife,
    MedicineTablet: MedicineTablet,
    diamond: Diamond,
    headphones: Headphones,
    cookies: Cookies,
    growth: Growth,
    drink: Drink,
    explosion: Explosion,
  } as const;

  const IconComponent = iconMap[iconName];
  return <IconComponent />;
};

const Image = ({ image }: { image: ImageType }) => {
  if (typeof image === "string") {
    return <NextImage width={40} height={40} src={image} alt="Item Image" />;
  }

  return (
    <div
      className={styles.icon}
      style={{ background: "", width: 40, height: 40 }}
    >
      {getIconComponent(image.icon)}
    </div>
  );
};

export function Generator() {
  const { card } = useCardStore();

  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        style={{ background: `var(--${card.activity.color})` }}
      >
        <div className={styles.activity}>
          <h1 className={styles.title}>{card.activity.title}</h1>
          <p className={styles.description}>{card.activity.description}</p>
        </div>
        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.image}>
              <Image image={card.item_one.image} />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>{card.item_one.title}</div>
              <div className={styles.subtitle}>{card.item_one.subtitle}</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.image}>
              <Image image={card.item_two.image} />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>{card.item_two.title}</div>
              <div className={styles.subtitle}>{card.item_two.subtitle}</div>
            </div>
          </div>
        </div>
        <div className={styles.quote}>
          <p className={styles.text}>{card.quote.text}</p>
          <p className={styles.author}>— {card.quote.author}</p>
        </div>
      </div>

      <Button.Root type="submit">
        <Button.Label>Download</Button.Label>
      </Button.Root>
    </div>
  );
}
