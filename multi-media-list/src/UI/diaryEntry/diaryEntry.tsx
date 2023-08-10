"use client";
import { useState } from "react";
import styles from "./diaryEntry.module.css";
import Image from "next/image";
import dayjs from "dayjs";

export default function DiaryEntry({
  entry,
  saveChanges,
  onClick,
}: {
  entry: Diary;
  saveChanges: (entry: Diary) => void;
  onClick: () => void;
}) {
  const [newEntry, setnewEntry] = useState(entry);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnewEntry({
      ...newEntry,
      entryDate: newEntry.entryDate,
      notes: event.target.value,
    });
  };
  const handleSavedChange = () => {
    saveChanges(newEntry);
  };

  return (
    <div className={styles.entry}>
      <h2 className={styles.title}>
        {dayjs(entry.entryDate).format("DD/MM/YYYY")}
      </h2>
      <p>{entry.event}</p>
      <input
        type="text"
        className={styles.notes}
        value={newEntry.notes}
        onChange={handleChange}
        placeholder="notes"
      />
      <button className={styles.button} onClick={handleSavedChange}>
        Save changes
      </button>

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
