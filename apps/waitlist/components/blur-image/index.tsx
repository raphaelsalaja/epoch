"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
} & Omit<ImageProps, "src" | "alt" | "fill" | "width" | "height">;

export function BlurImage({
  src,
  alt,
  className,
  priority = true,
  sizes = "40px",
  ...imgProps
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <div
        className={[styles.placeholder, loaded ? styles.hide : ""].join(" ")}
        aria-hidden="true"
      />

      <Image
        fill
        sizes={sizes}
        src={src}
        alt={alt}
        priority={priority}
        className={[styles.img, loaded ? styles.show : ""].join(" ")}
        onLoadingComplete={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        {...imgProps}
      />
    </div>
  );
}

export default BlurImage;
