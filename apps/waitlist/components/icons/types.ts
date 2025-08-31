import type * as React from "react";

export const ICON_NAMES = [
  "crown",
  "cutlery",
  "tablet",
  "diamond",
  "headphones",
  "cookies",
  "growth",
  "drink",
  "explosion",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
