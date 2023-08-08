"use client";
import ReactModal from "react-modal";
import styles from "./mediaPopUp.module.css";
import Image from "next/image";
import LaterButton from "../laterButton/laterButton";
import { useState } from "react";

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
  const [inList, setInList] = useState(false);
  const diaryEntrie = [
    { id: 1, event: "started", date: new Date(), notes: "" },
    { id: 2, event: "completed", date: new Date(), notes: "great!!" },
  ];
  const lastDiaryEntry = { event: "started", date: new Date(), notes: "" };
  const date = lastDiaryEntry.date.toDateString();
  const dateLog = new Date().toLocaleDateString();
  const handleClickLater = () => setInList(!inList);
  const [status, setStatus] = useState(lastDiaryEntry.event);

  return (
    <div className={styles.container}>
      <ReactModal isOpen={isOpen} className={styles.popup} preventScroll>
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

                <p className={styles.completionDate}>{dateLog}</p>
              </div>
              <button className={styles.saveButton}>save</button>
            </div>
          </div>
          {diaryEntrie.length > 0 && (
            <div className={styles.diaryEntries}>
              {diaryEntrie.map((entry) => (
                <div className={styles.diaryEntry} key={entry.id}>
                  <p>{entry.event}</p>
                  <p>{entry.date.toLocaleDateString()}</p>
                  <p>{entry.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </ReactModal>
    </div>
  );
}
