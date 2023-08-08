"use client";
import { useState } from "react";
import MediaCard from "../mediaCard/mediaCard";
import styles from "./mediaRow.module.css";
import MediaPopup from "../mediaPopUp/mediaPopUp";
import AddMedia from "../addMedia/addMedia";

export default function MediaRow({
  list,
  rowName,
}: {
  list: Media[];
  rowName: string;
}) {
  const [showDescription, setShowDescription] = useState(false);
  const [mediaID, setMediaID] = useState<number | null>(null);
  const handleClickMedia = (id: number) => {
    setMediaID(id);
    setShowDescription(true);
  };
  return (
    <div className={styles.rowContainer}>
      <h2 className={styles.rowName}>{rowName}</h2>
      {showDescription && typeof mediaID === "number" && (
        <MediaPopup
          mediaID={mediaID}
          onClose={() => setShowDescription(false)}
          rowName={rowName}
          isOpen={showDescription}
        />
      )}

      <div className={styles.row}>
        {list.map((media) => (
          <MediaCard
            media={media}
            key={media.id}
            onClickMedia={handleClickMedia}
          />
        ))}
        <AddMedia onClick={() => {}} />
      </div>
    </div>
  );
}
