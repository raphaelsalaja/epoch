import type * as React from "react";

/**
 * Centralized type definitions for icons and colors used throughout the application.
 *
 * This file serves as the single source of truth for:
 * - Icon names and types
 * - Color names and types
 * - Theme color variants
 * - Common component props
 *
 * These types are derived from the actual implementations to ensure consistency
 * across components, schemas, and other parts of the application.
 */

// Icon Types
export const ICON_NAMES = [
  "crown",
  "forkKnife",
  "medicineTablett",
  "diamond",
  "headphones",
  "cookies",
  "growth",
  "drink",
  "explosion",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

// Color Types
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

// Theme Types - includes semantic colors and brand colors
export type ThemeColor =
  | "border-primary"
  | "border-secondary"
  | "border-tertiary"
  | "foreground-primary"
  | "foreground-secondary"
  | "foreground-tertiary"
  | "foreground-quaternary"
  | "background-primary"
  | "background-secondary"
  | "background-tertiary"
  | "background-quaternary"
  | "black"
  | "white"
  | ColorName;

// Icon Props (matching React SVG attributes with specific constraints)
export interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

// Common types for picker components (icons, colors, etc.)
export interface PickerProps<T> {
  value?: T;
  onValueChange?: (value: unknown, event: Event) => void;
  kind?: "grid" | "list";
  name?: string;
  id?: string;
}
