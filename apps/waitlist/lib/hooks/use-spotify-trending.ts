"use client";

import { useQuery } from "@tanstack/react-query";
import type { TrackItem } from "./use-spotify-search";

type ApiResponse = { items: TrackItem[]; source?: unknown; error?: string };

export function useSpotifyTrending() {
  const query = useQuery({
    queryKey: ["spotify-trending"],
    queryFn: async ({ signal }) => {
      const url = new URL("/api/spotify/trending", window.location.origin);
      const res = await fetch(url, { signal });

      const text = await res.text();
      let data: ApiResponse | null = null;
      try {
        data = JSON.parse(text);
      } catch {}

      if (!res.ok) {
        const msg =
          data?.error ??
          (text || `Failed to fetch trending tracks ${res.status}`);
        throw new Error(msg);
      }

      return (data as ApiResponse).items;
    },
    retry: 1,
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
    refetchInterval: 5 * 60_000,
  });

  return {
    tracks: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: (query.error as Error) ?? null,
    refetch: query.refetch,
  };
}
