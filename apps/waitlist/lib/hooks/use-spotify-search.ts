"use client";

import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

export type TrackItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  previewUrl: string | null;
  uri: string;
};

type ApiResponse = { items: TrackItem[] };

export function useTrackSearch(
  input: string,
  opts?: { limit?: number; market?: string; minChars?: number; delay?: number },
) {
  const limit = opts?.limit ?? 8;
  const market = opts?.market;
  const minChars = opts?.minChars ?? 2;
  const delay = opts?.delay ?? 250;

  const [q, setQ] = useState("");
  const debouncedSetQ = useMemo(() => debounce(setQ, delay), [delay]);

  useEffect(() => {
    debouncedSetQ(input.trim());
    return () => {
      debouncedSetQ.cancel();
    };
  }, [input, debouncedSetQ]);

  const query = useQuery({
    queryKey: ["spotify-search", { q, limit, market }],
    enabled: q.length >= minChars,
    queryFn: async ({ signal }) => {
      const url = new URL("/api/spotify/search", window.location.origin);
      url.searchParams.set("q", q);
      url.searchParams.set("limit", String(limit));
      if (market) url.searchParams.set("market", market);

      const res = await fetch(url, { signal });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Search failed ${res.status}`);
      }
      const json: ApiResponse = await res.json();
      return json.items;
    },
    placeholderData: (prev) => prev ?? [],
    retry: 0,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    q,
    results: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error as Error | null,
    flush: debouncedSetQ.flush,
  };
}
