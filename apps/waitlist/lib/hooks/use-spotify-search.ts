"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type {
  SpotifyTrackSearchResponse,
  UseTrackSearchProps,
  UseTrackSearchResult,
} from "@/lib/spotify/types";

export function useTrackSearch({
  input,
  options,
}: UseTrackSearchProps): UseTrackSearchResult {
  const { limit = 3, market, minChars = 2, delay = 250 } = options ?? {};

  const [query, setQuery] = useState("");

  const debouncedSetQuery = useDebouncedCallback(setQuery, delay);

  useEffect(() => {
    debouncedSetQuery(input?.trim() || "");
  }, [input, debouncedSetQuery]);

  const queryResult = useQuery({
    queryKey: ["spotify-search", { query, limit, market }],
    enabled: query.length >= minChars,
    queryFn: async ({ signal }) => {
      const url = new URL("/api/spotify/search", window.location.origin);
      url.searchParams.set("q", query);
      url.searchParams.set("limit", String(limit));
      if (market) url.searchParams.set("market", market);

      const res = await fetch(url, { signal });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Search failed ${res.status}`);
      }
      const json: SpotifyTrackSearchResponse = await res.json();
      return json.items;
    },
    placeholderData: (prev) => prev ?? [],
    retry: 0,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    query,
    results: queryResult.data ?? [],
    isLoading: queryResult.isLoading,
    isFetching: queryResult.isFetching,
    error: (queryResult.error as Error) ?? null,
    flush: debouncedSetQuery.flush,
    refetch: queryResult.refetch,
  };
}
