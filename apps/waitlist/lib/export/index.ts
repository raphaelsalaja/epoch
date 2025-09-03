"use client";

import * as htmlToImage from "html-to-image";

type DownloadFormat = "png" | "jpeg";

export type DownloadOptions = {
  filename?: string;
  format?: DownloadFormat;
  jpegQuality?: number;
  maxPixelRatio?: number;
  multiplier?: number;
  background?: "auto" | string;
  filter?: (n: Element) => boolean;
};

async function ensureImagesLoaded(root: HTMLElement) {
  const imgs = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
  await Promise.allSettled(
    imgs.map((img) => img.decode?.() ?? Promise.resolve()),
  );
}

async function ensureFontsReady() {
  if (document?.fonts?.ready) {
    await document.fonts.ready;
  }
}

export async function downloadElementAsImage(
  node: HTMLElement,
  {
    filename = "image.png",
    format = "png",
    jpegQuality = 0.92,
    maxPixelRatio = 3,
    multiplier = 2,
    background = "auto",
    filter,
  }: DownloadOptions = {},
) {
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const pixelRatio = Math.min(maxPixelRatio, dpr * multiplier);

  await Promise.all([ensureImagesLoaded(node), ensureFontsReady()]);

  const bg =
    background === "auto"
      ? getComputedStyle(node).backgroundColor || undefined
      : background;

  const baseOptions = {
    pixelRatio,
    cacheBust: true,
    backgroundColor: bg,
    filter: filter ?? (() => true),
  } as const;

  const dataUrl =
    format === "jpeg"
      ? await htmlToImage.toJpeg(node, { ...baseOptions, quality: jpegQuality })
      : await htmlToImage.toPng(node, baseOptions);

  const a = document.createElement("a");
  a.href = dataUrl;
  const finalName = filename.endsWith(`.${format}`)
    ? filename
    : `${filename}.${format}`;
  a.download = finalName;
  document.body.appendChild(a);
  a.click();
  a.remove();

  return { dataUrl, filename: finalName };
}
