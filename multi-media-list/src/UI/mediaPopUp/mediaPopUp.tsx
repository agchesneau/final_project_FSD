"use client";
import ReactModal from "react-modal";
import styles from "./mediaPopUp.module.css";
import Image from "next/image";
import LaterButton from "../laterButton/laterButton";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DiaryEntry from "../diaryEntry/diaryEntry";

export default function MediaPopup({
  mediaID,
  onClose,
  rowName,
  isOpen,
}: {
  mediaID: number;
  onClose: () => void;
  rowName: string;
  isOpen: boolean;
}) {
  //   const media = useMedia(mediaID);
  const media = {
    id: 1,
    name: "Drive",
    type: "movie",
  };
  const [newEntry, setNewEntry] = useState<Diary>({
    mediaID,
    event: "",
    entryDate: "",
    notes: "",
  });

  const handleSave = () => {
    console.log(newEntry);
  };
  const [inList, setInList] = useState(false);
  const diaryEntry = [
    {
      id: 1,
      mediaID: 1,
      event: "started",
      entryDate: new Date().toDateString(),
      notes: "great movie",
    },
    {
      id: 2,
      mediaID: 2,
      event: "completed",
      entryDate: new Date().toDateString(),
      notes: "great!!",
    },
  ];
  const lastDiaryEntry = { event: "started", date: new Date(), notes: "" };
  const date = lastDiaryEntry.date.toDateString();
  const dateLog = new Date().toLocaleDateString();
  const handleClickLater = () => setInList(!inList);
  const [status, setStatus] = useState(lastDiaryEntry.event);

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
          <div className={styles.title}>{media.name}</div>
          <div className={styles.laterButton}>
            <LaterButton onClick={handleClickLater} isOn={inList} />
          </div>
          <div className={styles.lastDiaryEntry}>
            {lastDiaryEntry.event === "started" && (
              <div>
                <p className={styles.completionText}>
                  You started this on {date}
                </p>
              </div>
            )}
            <div className={styles.logContainer}>
              <div className={styles.logLine}>
                <p>Log as</p>
                <div>
                  {lastDiaryEntry.event === "started" ? (
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
                  ) : (
                    <div>
                      <p className={styles.selectedStatus}>completed</p>
                    </div>
                  )}
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
          {diaryEntry.length > 0 && (
            <div className={styles.diaryEntries}>
              {diaryEntry.map((entry) => (
                <DiaryEntry
                  key={entry.id}
                  entry={entry}
                  setEntry={setNewEntry}
                  onClick={() => console.log("delete")}
                />
              ))}
            </div>
          )}
        </div>
      </ReactModal>
    </div>
  );
}
