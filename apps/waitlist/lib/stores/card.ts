import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IconName } from "@/components/icons";

type Color =
  | "grey"
  | "dark-grey"
  | "purple"
  | "blue"
  | "green"
  | "yellow"
  | "orange"
  | "pink"
  | "red";

export type Image = string | { color: Color; icon: IconName };

export interface Item {
  id: string;
  title: string;
  subtitle: string;
  image: Image;
}

export interface Activity {
  title: string;
  description: string;
  color: Color;
}

export interface Quote {
  text?: string;
  author?: string;
}

export interface ActivityCardState {
  activity: Activity;
  items: Item[];
  quote: Quote;
}

const ColorSchema = z.enum([
  "grey",
  "dark-grey",
  "purple",
  "blue",
  "green",
  "yellow",
  "orange",
  "pink",
  "red",
]);

const ImageSchema = z.union([
  z.string().url(),
  z.object({
    color: ColorSchema,
    icon: z.enum([
      "crown",
      "forkKnife",
      "medicineTablett",
      "diamond",
      "headphones",
      "cookies",
      "growth",
      "drink",
      "explosion",
    ]),
  }),
]);

const ItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(100),
  subtitle: z.string().min(1).max(100),
  image: ImageSchema,
});

const ActivitySchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  color: ColorSchema,
});

const QuoteSchema = z.object({
  text: z.string().min(2).max(500).optional(),
  author: z.string().min(2).max(100).optional(),
});

const ActivityCardStateSchema = z.object({
  activity: ActivitySchema,
  items: z.array(ItemSchema).min(1).max(10),
  quote: QuoteSchema,
});

export {
  ColorSchema,
  ImageSchema,
  ItemSchema,
  ActivitySchema,
  QuoteSchema,
  ActivityCardStateSchema,
};

type CardState = {
  card: ActivityCardState;
  updateActivity: (updates: Partial<Activity>) => void;
  updateSummary: (summary: string) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  updateQuote: (updates: Partial<Quote>) => void;
  validateCard: () => boolean;
  reset: () => void;
};

const initialCard: ActivityCardState = {
  activity: {
    title: "John Doe's Sunday",
    description:
      "A focused workout built around power cleans, split squats, and heavy leg work, finished with dips and pull-ups.",
    color: "orange",
  },
  items: [
    {
      id: "1",
      title: "Let It Happen",
      subtitle: "Tame Impala",
      image:
        "https://cdn-images.dzcdn.net/images/cover/de5b9b704cd4ec36f8bf49beb3e17ba2/1900x1900-000000-80-0-0.jpg",
    },
    {
      id: "2",
      title: "Chicken Nuggets",
      subtitle: "8 pieces",
      image: { color: "yellow", icon: "cookies" },
    },
    {
      id: "3",
      title: "Airpods Max",
      subtitle: "Apple",
      image: { color: "grey", icon: "headphones" },
    },
  ],
  quote: {
    text: "The most important thing is to try and inspire people so that they can be great in whatever they want to do.",
    author: "Steve Jobs",
  },
};

export const useCardStore = create<CardState>()(
  persist(
    (set, get) => ({
      card: initialCard,
      updateActivity: (updates) => {
        const parsedUpdates = ActivitySchema.partial().parse(updates);
        set((state) => ({
          card: {
            ...state.card,
            activity: { ...state.card.activity, ...parsedUpdates },
          },
        }));
      },
      updateSummary: (summary) => {
        const parsedSummary = z.string().min(1).max(500).parse(summary);
        set((state) => ({
          card: {
            ...state.card,
            activity: { ...state.card.activity, description: parsedSummary },
          },
        }));
      },
      updateItem: (id, updates) => {
        const parsedUpdates = ItemSchema.partial().parse(updates);
        set((state) => ({
          card: {
            ...state.card,
            items: state.card.items.map((item) =>
              item.id === id ? { ...item, ...parsedUpdates } : item,
            ),
          },
        }));
      },
      updateQuote: (updates) => {
        const parsedUpdates = QuoteSchema.partial().parse(updates);
        set((state) => ({
          card: {
            ...state.card,
            quote: { ...state.card.quote, ...parsedUpdates },
          },
        }));
      },
      validateCard: () => {
        try {
          ActivityCardStateSchema.parse(get().card);
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
