"use client";

import Image from "next/image";
import { useState } from "react";
import type { GeneratorItem } from "../../../../lib/hooks/use-generator-state";
import type { TrackItem } from "../../../../lib/hooks/use-spotify-search";
import { SpotifySearchModal } from "../spotify-search-modal";
import styles from "./styles.module.css";

interface ItemsProps {
  items: GeneratorItem[];
  onUpdateItem: (id: string, updates: Partial<GeneratorItem>) => void;
  onAddItem: (item: Omit<GeneratorItem, "id">) => void;
  onRemoveItem: (id: string) => void;
}

interface EditableItemProps {
  item: GeneratorItem;
  onUpdate: (updates: Partial<GeneratorItem>) => void;
  onRemove: () => void;
  isFirstItem?: boolean;
}

function EditableItem({
  item,
  onUpdate,
  onRemove,
  isFirstItem,
}: EditableItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  const [editValues, setEditValues] = useState(item);

  const handleSave = () => {
    onUpdate(editValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues(item);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.metaKey) {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleClick = () => {
    if (isFirstItem) {
      setShowSpotifyModal(true);
    } else {
      setIsEditing(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      if (isFirstItem) {
        setShowSpotifyModal(true);
      } else {
        setIsEditing(true);
      }
    }
  };

  const handleSpotifyTrackSelect = (track: TrackItem) => {
    onUpdate({
      title: track.title,
      subtitle: track.subtitle,
      image: track.image,
      spotifyUri: track.uri,
      previewUrl: track.previewUrl,
    });
    setShowSpotifyModal(false);
  };

  if (isEditing) {
    return (
      <div className={styles.item}>
        <div className={styles.icon}>
          {editValues.image && (
            <Image
              className={styles.image}
              src={editValues.image}
              alt="Item"
              width={40}
              height={40}
            />
          )}
        </div>
        <div className={styles.details}>
          <input
            type="text"
            value={editValues.title}
            onChange={(e) =>
              setEditValues((prev) => ({ ...prev, title: e.target.value }))
            }
            onKeyDown={handleKeyDown}
            className={styles.titleInput}
            placeholder="Title"
          />
          <input
            type="text"
            value={editValues.subtitle}
            onChange={(e) =>
              setEditValues((prev) => ({ ...prev, subtitle: e.target.value }))
            }
            onKeyDown={handleKeyDown}
            className={styles.subtitleInput}
            placeholder="Subtitle"
          />
          <input
            type="url"
            value={editValues.image || ""}
            onChange={(e) =>
              setEditValues((prev) => ({ ...prev, image: e.target.value }))
            }
            onKeyDown={handleKeyDown}
            className={styles.imageInput}
            placeholder="Image URL (optional)"
          />
          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleSave}
              className={styles.saveButton}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onRemove}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className={`${styles.item} ${isFirstItem ? styles.musicItem : ""}`}
        onClick={handleClick}
        onKeyUp={handleKeyUp}
      >
        <div className={styles.icon}>
          {item.image && (
            <Image
              className={styles.image}
              src={item.image}
              alt="Item"
              width={40}
              height={40}
            />
          )}
        </div>
        <div className={styles.details}>
          <h1>{item.title}</h1>
          <h2>{item.subtitle}</h2>
        </div>
      </button>

      <SpotifySearchModal
        isOpen={showSpotifyModal}
        onClose={() => setShowSpotifyModal(false)}
        onSelect={handleSpotifyTrackSelect}
      />
    </>
  );
}

export function Items({
  items,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
}: ItemsProps) {
  const handleAddItem = () => {
    onAddItem({
      title: "New Item",
      subtitle: "New Subtitle",
    });
  };

  return (
    <div className={styles.items}>
      {items.map((item, index) => (
        <EditableItem
          key={item.id}
          item={item}
          onUpdate={(updates) => onUpdateItem(item.id, updates)}
          onRemove={() => onRemoveItem(item.id)}
          isFirstItem={index === 0}
        />
      ))}
      <button
        type="button"
        onClick={handleAddItem}
        className={styles.addButton}
      >
        + Add Item
      </button>
    </div>
  );
}
