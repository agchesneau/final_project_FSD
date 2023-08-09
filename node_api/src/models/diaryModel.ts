import { ResultSetHeader } from "mysql2";
import dbConnection from "../config/db_connection";

interface DiaryEntryFeatures {
  userID: number;
  mediaID: number;
  event: "started" | "completed" | "restarted";
  entryDate?: Date;
  notes?: string;
}
interface DiaryEntry extends DiaryEntryFeatures {
  logID: number;
}

const insertDiaryEntry = async (entry: DiaryEntryFeatures) => {
  const result = await (
    await dbConnection
  ).execute(
    `INSERT INTO all_my_lists.history (userID, mediaID, entry_date, event, notes) VALUES (${entry.userID}, ${entry.mediaID}, '${entry.entryDate}', '${entry.event}', '${entry.notes}');`
  );

  return result[0] as ResultSetHeader[];
};

const updateDiaryEntry = async (entry: DiaryEntryFeatures) => {
  const result = await (
    await dbConnection
  ).execute(
    `UPDATE all_my_lists.history SET userID = ${entry.userID}, mediaID = ${entry.mediaID}, entry_date ='${entry.entryDate}', event = '${entry.event}', notes = '${entry.notes}' WHERE diaryID = ${entry.userID};`
  );
  return result[0] as ResultSetHeader[];
};

const deleteDiaryEntry = async (id: number) => {
  const result = await (
    await dbConnection
  ).execute(`DELETE FROM all_my_lists.history WHERE logID = ${id};`);
  return result[0] as ResultSetHeader[];
};

const findDiaryEntryByEvent = async (
  event: "started" | "completed" | "restarted",
  userID: number
) => {
  const result = await (
    await dbConnection
  ).execute(
    `SELECT * FROM all_my_lists.history WHERE event = '${event}' AND userID = ${userID};`
  );
  return result[0] as DiaryEntry[];
};

export {
  insertDiaryEntry,
  updateDiaryEntry,
  deleteDiaryEntry,
  findDiaryEntryByEvent,
};
