"use client";
import Image from "next/image";
import mediaStyles from "../mediaCard/mediaCard.module.css";
import styles from "./addMedia.module.css";
import { use, useEffect, useState } from "react";
import { getMediaByName } from "@/models/MediaModel";
import { postDiary } from "@/models/DiaryModel";
import { postNextList } from "@/models/NextListModel";
import { th } from "date-fns/locale";

export default function AddMedia({
  rowName,
}: {
  rowName: "Up Next" | "Started" | "Finished";
}) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [result, setResult] = useState<Media[] | null>(null);
  const [selectedID, setSelectedID] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleSearch = async () => {
    const res = await getMediaByName(title);
    setResult(res);
    console.log(res);
  };

  useEffect(() => {
    try {
      if (selectedID) {
        switch (rowName) {
          case "Up Next":
            // add to next list
            postNextList(selectedID);
            break;
          case "Started":
            // add to diary as started
            postDiary(selectedID, "started", "");
            break;
          case "Finished":
            // add to diary as finished
            postDiary(selectedID, "completed", "");
            break;
        }
        setAdded(true);
      }
    } catch (error) {
      throw error;
    }
  }, [rowName, selectedID]);

  return (
    <div className={styles.container}>
      <div className={mediaStyles.imageContainer}>
        <Image
          src="/addMedia.svg"
          alt="add media"
          className={mediaStyles.image}
          width={400}
          height={600}
          onClick={() => setVisible(true)}
        />
      </div>
      <div className={styles.searchContainer}>
        {visible && (
          <div className={styles.addMedia}>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={handleChange}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        )}
        {result && (
          <div className={styles.searchResult}>
            {result.map((media) => (
              <div
                key={media.mediaID}
                onClick={() => setSelectedID(media.mediaID || null)}
                className={styles.result}
              >
                <p className={styles.title}>{media.name}</p>
                <p className={styles.type}>{media.type}</p>
                {added && <p>Added to {rowName}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
