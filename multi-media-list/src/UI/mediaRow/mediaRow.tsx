import { use, useEffect, useState } from "react";
import MediaCard from "../mediaCard/mediaCard";
import styles from "./mediaRow.module.css";
import MediaPopup from "../mediaPopUp/mediaPopUp";
import AddMedia from "../addMedia/addMedia";
import { getMediaByID } from "@/models/MediaModel";
import {
  getCompleted,
  getStarted,
  deleteDiary,
  updateDiary,
} from "@/models/DiaryModel";
import dayjs from "dayjs";

export default function MediaRow({
  list,
  rowName,
}: {
  list: Media[];
  rowName: "Up Next" | "Started" | "Finished";
}) {
  const [openModal, setOpenModal] = useState(false);
  const [mediaID, setMediaID] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [diaryEntries, setDiaryEntries] = useState<Diary[]>([]);

  const handleClickMedia = (id: number, name: string) => {
    setMediaID(id);
    setTitle(name);
    setOpenModal(true);
  };
  const [mediaList, setMediaList] = useState<Media[]>([]);

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteDiary(id);
    } catch (err) {
      console.log(err);
    }
  };

  const saveChanges = async (entry: Diary) => {
    try {
      const res = await updateDiary(
        entry.logID,
        entry.mediaID,
        entry.event,
        entry.notes,
        dayjs(entry.entryDate).format("YYYY-MM-DD")
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getting the infromation for the medias in the list
    const getMediaList = async () => {
      const res = await Promise.all(
        list.map(async (media) => {
          return await getMediaByID(media.mediaID);
        })
      );

      setMediaList(res);
    };
    getMediaList();

    // getting the diary entries for the media selected
    const getDiaryEntries = async () => {
      const started = await getStarted();
      const completed = await getCompleted();
      const filterStarted = started.filter((entry: Diary) => {
        return entry.mediaID === mediaID;
      });
      const filterCompleted = completed.filter((entry: Diary) => {
        return entry.mediaID === mediaID;
      });
      setDiaryEntries([...filterStarted, ...filterCompleted]);
    };
    getDiaryEntries();
  }, [list, mediaID]);
  return (
    <div className={styles.rowContainer}>
      <h2 className={styles.rowName}>{rowName}</h2>
      {openModal && typeof mediaID === "number" && (
        <MediaPopup
          mediaID={mediaID}
          onClose={() => setOpenModal(false)}
          rowName={rowName}
          isOpen={openModal}
          title={title}
          diaryEntries={diaryEntries}
          handleDelete={handleDelete}
          saveChanges={saveChanges}
        />
      )}

      <div className={styles.row}>
        {mediaList.map((media) => {
          return (
            <MediaCard
              media={media}
              key={media.mediaID}
              onClickMedia={handleClickMedia}
            />
          );
        })}
      </div>
      <AddMedia rowName={rowName} />
    </div>
  );
}
