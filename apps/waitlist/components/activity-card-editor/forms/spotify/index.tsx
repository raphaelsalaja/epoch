import { Input } from "@base-ui-components/react/input";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useTrackSearch } from "@/lib/hooks/use-spotify-search";
import { useSpotifyTrending } from "@/lib/hooks/use-spotify-trending";
import type { Track } from "@/lib/spotify/types";
// Removed per-view action button; submit is now handled by the parent action button.
import { Button } from "../../../button";
import { Dots, MagnifyingGlass, Trending } from "../../../icons";
import styles from "./styles.module.css";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 },
};

function SkeletonTrack() {
  return (
    <div className={styles.track} data-skeleton aria-hidden="true">
      <div className={styles.album} />
      <div className={styles.info}>
        <div className={styles.title} />
        <div className={styles.artist} />
      </div>
      <div className={styles.menu}>
        <Dots className={styles.icon} />
      </div>
    </div>
  );
}

function TrackItem({ track }: { track: Track }) {
  return (
    <div className={styles.track}>
      <Image
        src={track.image}
        alt={`${track.title} cover art`}
        width={48}
        height={48}
        className={styles.album}
        sizes="48px"
        placeholder="empty"
      />
      <div className={styles.info}>
        <div className={styles.title}>{track.title}</div>
        <div className={styles.artist}>{track.artist}</div>
      </div>
      <button
        type="button"
        className={styles.menu}
        aria-label="Open track menu"
      >
        <Dots className={styles.icon} />
      </button>
    </div>
  );
}

interface Props {
  onDone?: () => void;
}

export const EditCardSpotify = ({ onDone }: Props) => {
  const prefersReducedMotion = useReducedMotion();
  const [rawQuery, setRawQuery] = useState("");
  const [debouncedQuery] = useDebounce(rawQuery.trim(), 250);
  const deferredQuery = useDeferredValue(debouncedQuery);

  const {
    tracks: trendingTracks,
    isLoading: trendingLoading,
    error: trendingError,
  } = useSpotifyTrending();

  const {
    results: searchResults,
    isLoading: searchLoading,
    isFetching: searchFetching,
    error: searchError,
  } = useTrackSearch({ input: deferredQuery });

  const isSearching = deferredQuery.length >= 2;
  const isTransitioning = rawQuery.trim() !== debouncedQuery;

  const isLoading = isSearching
    ? searchLoading || searchFetching || isTransitioning
    : trendingLoading;

  const error = isSearching ? searchError : trendingError;

  const list = useMemo(() => {
    return (isSearching ? searchResults : trendingTracks) as Track[];
  }, [isSearching, searchResults, trendingTracks]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // TODO: Wire selected track to store update once selection is implemented.
      onDone?.();
    },
    [onDone]
  );

  const clear = useCallback(() => setRawQuery(""), []);

  return (
    <form
      id="edit-spotify-form"
      className={styles.container}
      onSubmit={onSubmit}
      aria-label="Spotify search"
    >
      <div className={styles.search}>
        <MagnifyingGlass className={styles.magnifier} />
        <Input
          autoComplete="off"
          placeholder="Search Spotify..."
          className={styles.input}
          value={rawQuery}
          onChange={(e) => setRawQuery(e.target.value)}
          inputMode="search"
          aria-label="Search tracks"
          onKeyDown={(e) => {
            if (e.key === "Escape") clear();
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
              (e.target as HTMLInputElement).focus();
              e.preventDefault();
            }
          }}
        />
      </div>

      <div
        className={styles.results}
        aria-live="polite"
        aria-busy={isLoading || undefined}
      >
        <AnimatePresence mode="wait" initial={!prefersReducedMotion}>
          {isLoading ? (
            <motion.output
              key="loading"
              {...(prefersReducedMotion ? {} : fade)}
              className={styles.list}
              aria-label="Loading tracks"
            >
              <SkeletonTrack />
            </motion.output>
          ) : error ? (
            <motion.div
              key="error"
              {...(prefersReducedMotion ? {} : fade)}
              className={styles.empty}
              role="alert"
            >
              <p>
                Could not load {isSearching ? "search results" : "trending"}.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className={styles.retry}
              >
                Try again
              </button>
            </motion.div>
          ) : list.length === 0 ? (
            <motion.div
              key="empty"
              {...(prefersReducedMotion ? {} : fade)}
              className={styles.empty}
            >
              <p>
                {isSearching
                  ? "No tracks match your search."
                  : "No trending tracks found."}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={isSearching ? "search" : "trending"}
              {...(prefersReducedMotion ? {} : fade)}
              className={styles.list}
            >
              {!isSearching && (
                <div className={styles.heading}>
                  <Trending className={styles.icon} />
                  <span className={styles.label}>Trending</span>
                </div>
              )}
              {list.map((track) => (
                <TrackItem key={track.id} track={track} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button.Root type="submit" layout>
        <Button.Label>Update</Button.Label>
      </Button.Root>
    </form>
  );
};
