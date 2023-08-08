import { ResultSetHeader } from "mysql2";
import dbConnection from "../config/db_connection";

interface MediaFeatures {
  name: string;
  type: "book" | "movie" | "TV";
  link?: string | null;
  imgURI?: string | null;
}
interface Media extends MediaFeatures {
  id: number;
}

const insertMedia = async (media: MediaFeatures) => {
  const result = await (
    await dbConnection
  ).execute(
    `INSERT INTO all_my_lists.medias (name,type,link,imgURI,episodes,length,pages) VALUES ('${media.name}', '${media.type}', 
    '${media.link}', '${media.imgURI}' });`
  );

  return result[0] as ResultSetHeader[];
};

const updateMedia = async (media: Media) => {
  const result = await (
    await dbConnection
  ).execute(
    `UPDATE all_my_lists.medias SET name = '${media.name}', type = '${media.type}', link = '${media.link}', imgURI = '${media.imgURI}' WHERE mediaID = ${media.id};`
  );
  return result[0] as ResultSetHeader[];
};

const deleteMedia = async (id: number) => {
  const result = await (
    await dbConnection
  ).execute(`DELETE FROM all_my_lists.medias WHERE mediaID = ${id};`);
  return result[0] as ResultSetHeader[];
};

const findMediaByID = async (id: number) => {
  const result = await (
    await dbConnection
  ).execute(`SELECT * FROM all_my_lists.medias WHERE mediaID = ${id};`);
  return result[0][0] as Media;
};

const findMediaByName = async (name: string) => {
  const result = await (
    await dbConnection
  ).execute(`SELECT * FROM all_my_lists.medias WHERE name LIKE '${name}';`);
  return result[0] as Media[];
};

const findMediaByType = async (type: "book" | "TV" | "movie") => {
  const result = await (
    await dbConnection
  ).execute(`SELECT * FROM all_my_lists.medias WHERE type = '${type}';`);
  return result[0] as Media[];
};

const findAllMedia = async () => {
  const result = await (
    await dbConnection
  ).execute(`SELECT * FROM all_my_lists.medias;`);
  return result[0] as Media[];
};
export {
  insertMedia,
  updateMedia,
  deleteMedia,
  findMediaByID,
  findMediaByName,
  findMediaByType,
  findAllMedia,
};
