/**
 * Domain Types
 *
 * These types represent the core business entities in the application.
 * They are derived from Zod schemas to ensure runtime validation matches type definitions.
 */

import type { z } from "zod";
import type { Schemas } from "@/lib/schemas";

// Core domain types derived from schemas
export type Color = z.infer<typeof Schemas.Color>;
export type Image = z.infer<typeof Schemas.Image>;
export type Item = z.infer<typeof Schemas.Item>;
export type Activity = z.infer<typeof Schemas.Activity>;
export type Quote = z.infer<typeof Schemas.Quote>;
export type Spotify = z.infer<typeof Schemas.Spotify>;
export type Card = z.infer<typeof Schemas.Card>;

// Extended domain types with computed properties
export interface CardWithMeta extends Card {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly isValid: boolean;
}

// Partial update types for mutations
export type ActivityUpdate = Partial<Activity>;
export type QuoteUpdate = Partial<Quote>;
export type ItemUpdate = Partial<Item>;
export type SpotifyUpdate = Partial<Spotify>;

// Union types for better type safety
export type CardSection =
  | "activity"
  | "quote"
  | "item_one"
  | "item_two"
  | "spotify";
export type CardFieldPath =
  | `activity.${keyof Activity}`
  | `quote.${keyof Quote}`
  | `item_one.${keyof Item}`
  | `item_two.${keyof Item}`
  | `spotify.${keyof Spotify}`;

// Validation result types
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: CardFieldPath;
  message: string;
  code: string;
}
