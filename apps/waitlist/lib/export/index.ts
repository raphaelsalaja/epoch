"use client";

import * as htmlToImage from "html-to-image";

type DownloadFormat = "png" | "jpeg";

export type DownloadOptions = {
  /** File name without extension or with one that matches format */
  filename?: string; // default: "image.png"
  /** Output format */
  format?: DownloadFormat; // default: "png"
  /** JPEG quality (0..1) when format is "jpeg" */
  jpegQuality?: number; // default: 0.92
  /** Cap the effective pixel ratio to avoid huge files */
  maxPixelRatio?: number; // default: 3
  /** Multiplier applied to DPR for crisper exports */
  multiplier?: number; // default: 2
  /** "auto" reads from computed style, or pass any CSS color */
  background?: "auto" | string; // default: "auto"
  /** Filter any DOM nodes you don’t want rasterized */
  filter?: (n: Element) => boolean;
};

/** Make sure <img> tags are decoded to avoid blank boxes */
async function ensureImagesLoaded(root: HTMLElement) {
  const imgs = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
  await Promise.allSettled(
    imgs.map((img) => img.decode?.() ?? Promise.resolve()),
  );
}

/** Make sure web fonts are ready to avoid FOUT/FOIT */
async function ensureFontsReady() {
  // Safari still lacks full support, so gate it
  if (document?.fonts?.ready) {
    await document.fonts.ready;
  }
}

/** One-shot download using html-to-image */
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
