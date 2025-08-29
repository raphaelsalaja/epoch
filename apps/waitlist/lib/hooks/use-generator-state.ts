"use client";

import { useCallback, useState } from "react";
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

export interface Acitivty {
  title: string;
  description: string;
  color: Color;
}

export interface Quote {
  text?: string;
  author?: string;
}

export interface ActivityCardState {
  activity: Acitivty;
  items: Item[];
  quote: Quote;
}

export function useGeneratorState() {
  const [state, setState] = useState<ActivityCardState>({
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
  });

  const updateActivity = useCallback((updates: Partial<Acitivty>) => {
    setState((prevState) => ({
      ...prevState,
      activity: { ...prevState.activity, ...updates },
    }));
  }, []);

  const updateSummary = useCallback((summary: string) => {
    setState((prevState) => ({
      ...prevState,
      activity: { ...prevState.activity, description: summary },
    }));
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<Item>) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    }));
  }, []);
  const updateQuote = useCallback((updates: Partial<Quote>) => {
    setState((prevState) => ({
      ...prevState,
      quote: { ...prevState.quote, ...updates },
    }));
  }, []);

  return {
    state,
    updateSummary,
    updateItem,
    updateActivity,
    updateQuote,
  };
}
