import { Input } from "@base-ui-components/react/input";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useTrackSearch } from "@/lib/hooks/use-spotify-search";
import { useSpotifyTrending } from "@/lib/hooks/use-spotify-trending";
import { viewTransition } from "@/lib/motion";
import type { Track } from "@/lib/spotify/types";
import { useViewStore } from "@/lib/stores/view";
import { Button } from "../../../button";
import { Dots, MagnifyingGlass, Trending } from "../../../icons";
import { useSpotifyForm } from "./form";
import styles from "./styles.module.css";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
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

function TrackItem({
  track,
  onSelect,
}: {
  track: Track;
  onSelect: (t: Track) => void;
}) {
  return (
    <button
      type="button"
      className={styles.track}
      onClick={() => onSelect(track)}
      aria-label={`Select ${track.title} by ${track.artist}`}
    >
      <Image
        src={track.image}
        alt={`${track.title} cover art`}
        width={48}
        height={48}
        className={styles.album}
        quality={100}
        placeholder="empty"
      />
      <div className={styles.info}>
        <div className={styles.title}>{track.title}</div>
        <div className={styles.artist}>{track.artist}</div>
      </div>
      <div className={styles.menu} aria-hidden>
        <Dots className={styles.icon} />
      </div>
    </button>
  );
}

export const EditCardSpotify = () => {
  const { setView } = useViewStore();
  const prefersReducedMotion = useReducedMotion();
  const [rawQuery, setRawQuery] = useState("");
  const [debouncedQuery] = useDebounce(rawQuery.trim(), 250);
  const deferredQuery = useDeferredValue(debouncedQuery);
  const { selectTrack } = useSpotifyForm();

  const {
    tracks: trendingTracks,
    isLoading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useSpotifyTrending();

  const {
    results: searchResults,
    isLoading: searchLoading,
    isFetching: searchFetching,
    error: searchError,
    refetch: refetchSearch,
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

  const showSkeletons =
    !error && (isLoading || (Array.isArray(list) && list.length === 0));
  const skeletonKeys = useMemo(
    () => Array.from({ length: 5 }, (_, i) => `skeleton-${i}`),
    []
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setView("card");
    },
    [setView]
  );

  const clear = useCallback(() => setRawQuery(""), []);

  return (
    <motion.form
      {...viewTransition}
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
          {showSkeletons ? (
            <motion.output
              key="skeletons"
              {...(prefersReducedMotion ? {} : fade)}
              className={styles.list}
              aria-label={isLoading ? "Loading tracks" : "Fetching tracks"}
            >
              {skeletonKeys.map((k) => (
                <SkeletonTrack key={k} />
              ))}
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
                onClick={() => {
                  if (isSearching) refetchSearch();
                  else refetchTrending();
                }}
                className={styles.retry}
              >
                Try again
              </button>
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
                <TrackItem
                  key={track.id}
                  track={track}
                  onSelect={(t) => {
                    selectTrack(t);
                    setView("card");
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button.Root type="submit">
        <Button.Label>Update</Button.Label>
      </Button.Root>
    </motion.form>
  );
};
