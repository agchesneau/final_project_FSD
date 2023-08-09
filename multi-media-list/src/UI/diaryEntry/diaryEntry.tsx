"use client";
import { useState } from "react";
import styles from "./diaryEntry.module.css";
import Image from "next/image";

export default function DiaryEntry({
  entry,
  setEntry,
  onClick,
}: {
  entry: Diary;
  setEntry: (entry: Diary) => void;
  onClick: () => void;
}) {
  const [newEntry, setnewEntry] = useState(entry);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnewEntry({ ...newEntry, notes: event.target.value });
    setEntry({ ...newEntry, notes: event.target.value });
  };
  return (
    <div className={styles.entry}>
      <h2 className={styles.title}>{entry.entryDate}</h2>
      <p>{entry.event}</p>
      <input
        type="text"
        className={styles.notes}
        value={entry.notes}
        onChange={handleChange}
        placeholder="notes"
      />

      <Image
        src="./trash.svg"
        alt="delete"
        width={50}
        height={50}
        className={styles.icon}
        onClick={onClick}
      />
    </div>
  );
}
