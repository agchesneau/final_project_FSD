import { ResultSetHeader } from "mysql2";
import dbConnection from "../config/db_connection";

interface ListFeatures {
  mediaID: number;
  userID: number;
  archived: boolean;
}
interface List extends ListFeatures {
  entryID: number;
}

const insertListEntry = async (entry: ListFeatures) => {
  const result = await (
    await dbConnection
  ).execute(
    `INSERT INTO all_my_lists.nextlist (mediaID, userID, archived) VALUES (${entry.mediaID}, ${entry.userID}, ${entry.archived});`
  );
  return result[0] as ResultSetHeader[];
};

const updateListEntry = async (entryID: number) => {
  const result = await (
    await dbConnection
  ).execute(
    `UPDATE all_my_lists.nextlist SET archived = true WHERE entryID = ${entryID};`
  );
  return result[0] as ResultSetHeader[];
};

const getListEntry = async (userID: number) => {
  const result = await (
    await dbConnection
  ).execute(
    `SELECT * FROM all_my_lists.nextlist WHERE userID = ${userID} AND archived = false;`
  );
  return result[0] as List[];
};
export { insertListEntry, updateListEntry, getListEntry };
