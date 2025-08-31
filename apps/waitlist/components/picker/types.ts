import type { CSSProperties, ReactNode } from "react";
import type { IconName } from "@/components/icons/types";

export const COLOR_NAMES = [
  "grey",
  "dark-grey",
  "purple",
  "blue",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
] as const;

export type ColorName = (typeof COLOR_NAMES)[number];

export type Kind = "grid" | "list";

export type Variant = "icon" | "color";

type CSSCustomProperties = {
  [key: `--${string}`]: string | number;
};

export interface PickerRootProps {
  value?: string;
  onValueChange?: (value: string, event: Event) => void;
  kind?: Kind;
  variant?: Variant;
  name?: string;
  id?: string;
  children: ReactNode;
  cols?: number;
  className?: string;
  style?: CSSProperties & CSSCustomProperties;
}

export interface PickerItemProps {
  value: string;
  children?: ReactNode;
  variant?: Variant;
  title?: string;
  "aria-label"?: string;
  disabled?: boolean;
  style?: CSSProperties & CSSCustomProperties;
  className?: string;
}

export interface ColorPickerProps {
  value?: ColorName;
  onValueChange?: (value: string, event: Event) => void;
  kind?: Kind;
  name?: string;
  id?: string;
  cols?: number;
}

export interface IconPickerProps {
  value?: IconName;
  onValueChange?: (value: string, event: Event) => void;
  kind?: Kind;
  name?: string;
  id?: string;
  cols?: number;
}
