"use client";

import Image from "next/image";
import { useState } from "react";
import { useTrackSearch } from "@/lib/hooks/use-spotify-search";
import type { Track } from "@/lib/spotify/types";
import styles from "./styles.module.css";

interface SpotifySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (track: Track) => void;
}

export function SpotifySearchModal({
  isOpen,
  onClose,
  onSelect,
}: SpotifySearchModalProps) {
  const [searchInput, setSearchInput] = useState("");
  const { results, isLoading, error } = useTrackSearch({ input: searchInput });

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleTrackSelect = (track: Track) => {
    onSelect(track);
    onClose();
    setSearchInput("");
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="spotify-search-title"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 id="spotify-search-title">Search Spotify</h2>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for songs, artists..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.results}>
          {error && <div className={styles.error}>Error: {error.message}</div>}

          {isLoading && searchInput && (
            <div className={styles.loading}>Searching...</div>
          )}

          {!isLoading && !error && searchInput && results.length === 0 && (
            <div className={styles.noResults}>
              No results found for "{searchInput}"
            </div>
          )}

          {results.map((track) => (
            <button
              key={track.id}
              type="button"
              className={styles.trackItem}
              onClick={() => handleTrackSelect(track)}
            >
              <div className={styles.trackImage}>
                {track.image && (
                  <Image
                    src={track.image}
                    alt={track.title}
                    width={48}
                    height={48}
                    className={styles.image}
                  />
                )}
              </div>
              <div className={styles.trackInfo}>
                <h3 className={styles.trackTitle}>{track.title}</h3>
                <p className={styles.trackArtist}>{track.artist}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
