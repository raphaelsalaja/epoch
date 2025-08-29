export type Track = {
  id: string;
  title: string;
  artist: string;
  image: string;
  url: string;
};

export type SpotifyTrendingTracksResponse = {
  items: Track[];
  source?: unknown;
  error?: string;
};

export type SpotifyTrackSearchResponse = {
  items: Track[];
};

export type UseTrackSearchOptions = {
  limit?: number;
  market?: string;
  minChars?: number;
  delay?: number;
};

export type UseTrackSearchResult = {
  query: string;
  results: Track[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  flush: () => void;
};

export type UseTrackSearchProps = {
  input: string | undefined;
  options?: UseTrackSearchOptions;
};
