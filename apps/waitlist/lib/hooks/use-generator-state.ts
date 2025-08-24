"use client";

import { useCallback, useState } from "react";

export interface GeneratorItem {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  // Spotify specific fields
  spotifyUri?: string;
  previewUrl?: string | null;
}

export interface GeneratorSummary {
  title: string;
  description: string;
}

export interface GeneratorState {
  summary: GeneratorSummary;
  items: GeneratorItem[];
}

const defaultState: GeneratorState = {
  summary: {
    title: "Raphael's Sunday",
    description:
      "A focused workout built around power cleans, split squats, and heavy leg work, finished with dips and pull-ups.",
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
      title: "Let It Happen",
      subtitle: "Tame Impala",
    },
    {
      id: "3",
      title: "Let It Happen",
      subtitle: "Tame Impala",
    },
  ],
};

export function useGeneratorState() {
  const [state, setState] = useState<GeneratorState>(defaultState);

  const updateSummary = useCallback((summary: Partial<GeneratorSummary>) => {
    setState((prev) => ({
      ...prev,
      summary: { ...prev.summary, ...summary },
    }));
  }, []);

  const updateItem = useCallback(
    (id: string, updates: Partial<GeneratorItem>) => {
      setState((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? { ...item, ...updates } : item,
        ),
      }));
    },
    [],
  );

  const addItem = useCallback((item: Omit<GeneratorItem, "id">) => {
    const newItem: GeneratorItem = {
      ...item,
      id: Date.now().toString(),
    };
    setState((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  }, []);

  const resetState = useCallback(() => {
    setState(defaultState);
  }, []);

  return {
    state,
    updateSummary,
    updateItem,
    addItem,
    removeItem,
    resetState,
  };
}
