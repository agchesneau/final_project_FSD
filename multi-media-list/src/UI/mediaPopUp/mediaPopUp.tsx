"use client";
import ReactModal from "react-modal";
import styles from "./mediaPopUp.module.css";
import Image from "next/image";
import LaterButton from "../laterButton/laterButton";
import React, { use, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DiaryEntry from "../diaryEntry/diaryEntry";
import { postDiary, updateDiary } from "@/models/DiaryModel";
import dayjs from "dayjs";

export default function MediaPopup({
  mediaID,
  onClose,
  rowName,
  isOpen,
  title,
  diaryEntries,
  handleDelete,
  saveChanges,
}: {
  mediaID: number;
  onClose: () => void;
  rowName: string;
  isOpen: boolean;
  title: string;
  diaryEntries: Diary[];
  handleDelete: (id: number) => void;
  saveChanges: (entry: Diary) => void;
}) {
  const [newEntry, setNewEntry] = useState<Diary>({
    mediaID,
    event: "",
    entryDate: "",
    notes: "",
  });
  const updatedEntry: Diary = {
    logID: 0,
    mediaID,
    event: "",
    entryDate: "",
    notes: "",
  };

  const handleSave = async () => {
    try {
      const res = await postDiary(
        newEntry.mediaID,
        status,
        newEntry.notes,
        dayjs(newEntry.entryDate).format("YYYY-MM-DD")
      );
    } catch (err) {
      console.log(err);
    }
  };

  const [status, setStatus] = useState("started");

  return (
    <div className={styles.container}>
      <ReactModal isOpen={isOpen} className={styles.popup}>
        <div className={styles.modalHeader}>
          <Image
            src="closeIcon.svg"
            alt="close button"
            width={50}
            height={50}
            onClick={onClose}
            className={styles.closeIcon}
          />
        </div>
        <div className={styles.popupContent}>
          <div className={styles.title}>{title}</div>
          {/* <div className={styles.laterButton}>
            <LaterButton onClick={handleClickLater} isOn={inList} />
          </div> */}
          <div className={styles.lastDiaryEntry}>
            <div className={styles.logContainer}>
              <div className={styles.logLine}>
                <p>Log as</p>
                <div>
                  <div className={styles.statusContainer}>
                    <p
                      className={
                        status === "started"
                          ? styles.selectedStatus
                          : styles.status
                      }
                      onClick={() => setStatus("started")}
                    >
                      started
                    </p>

                    <p
                      className={
                        status === "completed"
                          ? styles.selectedStatus
                          : styles.status
                      }
                      onClick={() => setStatus("completed")}
                    >
                      completed
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.dateLine}>
                <p className={styles.on}>on</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    className={styles.completionDate}
                    value={newEntry.entryDate}
                    onChange={(newValue) =>
                      setNewEntry({ ...newEntry, entryDate: newValue || "" })
                    }
                  />
                </LocalizationProvider>
              </div>
              <button className={styles.saveButton} onClick={handleSave}>
                save
              </button>
            </div>
          </div>
          {diaryEntries.length > 0 && (
            <div className={styles.diaryEntries}>
              {diaryEntries.map((entry) => (
                <DiaryEntry
                  key={entry.logID}
                  entry={entry}
                  onClick={() => handleDelete(entry.logID)}
                  saveChanges={saveChanges}
                />
              ))}
            </div>
          )}
        </div>
      </ReactModal>
    </div>
  );
}
