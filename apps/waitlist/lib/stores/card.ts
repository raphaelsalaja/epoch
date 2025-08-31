import type { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Schemas } from "@/lib/schemas";

export type Color = z.infer<typeof Schemas.Color>;
export type Image = z.infer<typeof Schemas.Image>;
export type Item = z.infer<typeof Schemas.Item>;
export type Activity = z.infer<typeof Schemas.Activity>;
export type Quote = z.infer<typeof Schemas.Quote>;
export type Spotify = z.infer<typeof Schemas.Spotify>;
export type Summary = z.infer<typeof Schemas.Summary>;
export type Card = z.infer<typeof Schemas.Card>;

type CardState = {
  card: Card;
  updateActivity: (updates: Partial<Activity>) => void;
  updateSummary: (updates: Partial<Summary>) => void;
  updateItemOne: (updates: Partial<Item>) => void;
  updateItemTwo: (updates: Partial<Item>) => void;
  updateSpotify: (updates: Partial<Spotify>) => void;
  updateQuote: (updates: Partial<Quote>) => void;
  validateCard: () => boolean;
  reset: () => void;
};

const initialCard: Card = {
  activity: {
    title: "John Doe's Sunday",
    description:
      "A focused workout built around power cleans, split squats, and heavy leg work, finished with dips and pull-ups.",
    color: "orange",
  },
  spotify: {
    title: "Let It Happen",
    subtitle: "Tame Impala",
    image: "",
  },
  item_one: {
    title: "Chicken Nuggets",
    subtitle: "8 pieces",
    image: { color: "yellow", icon: "cookies" },
  },
  item_two: {
    title: "Airpods Max",
    subtitle: "Apple",
    image: { color: "grey", icon: "headphones" },
  },
  quote: {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  summary: {
    text: "This is a brief summary of my day, highlighting key activities and moments.",
  },
};

export const useCardStore = create<CardState>()(
  persist(
    (set, get) => ({
      card: initialCard,
      updateActivity: (updates) => {
        const parsedUpdates = Schemas.Activity.partial().parse(updates);
        set((state) => ({
          card: {
            ...state.card,
            activity: { ...state.card.activity, ...parsedUpdates },
          },
        }));
      },
      updateSummary: (updates) => {
        const parsedUpdates = Schemas.Summary.partial().parse(updates);
        set((state) => ({
          card: {
            ...state.card,
            summary: { ...state.card.summary, ...parsedUpdates },
          },
        }));
      },
      updateItemOne: (updates) => {
        const parsedUpdates = Schemas.Item.partial().parse(updates);
        set((state) => ({
          card: {
            ...state.card,
            item_one: { ...state.card.item_one, ...parsedUpdates },
          },
        }));
      },
      updateItemTwo: (updates) => {
        const parsedUpdates = Schemas.Item.partial().parse(updates);
        set((state) => ({
          card: {
            ...state.card,
            item_two: { ...state.card.item_two, ...parsedUpdates },
          },
        }));
      },
      updateSpotify: (updates) => {
        const parsedUpdates = Schemas.Spotify.partial().parse(updates);
        set((state) => ({
          card: {
            ...state.card,
            spotify: { ...state.card.spotify, ...parsedUpdates },
          },
        }));
      },
      updateQuote: (updates) => {
        const parsedUpdates = Schemas.Quote.partial().parse(updates);
        set((state) => ({
          card: {
            ...state.card,
            quote: { ...state.card.quote, ...parsedUpdates },
          },
        }));
      },
      validateCard: () => {
        try {
          Schemas.Card.parse(get().card);
          return true;
        } catch {
          return false;
        }
      },
      reset: () => set({ card: initialCard }),
    }),
    {
      name: "card-store",
    },
  ),
);
