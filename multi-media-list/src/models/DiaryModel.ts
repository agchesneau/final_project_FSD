import { connection } from "@/utils/connection";
import { AxiosResponse } from "axios";
import { getAuthToken } from "@/utils/cookies";

const token = getAuthToken();

export const postDiary = async (
  mediaID: number,
  event: string,
  notes: string,
  entryDate?: string
) => {
  !entryDate ? (entryDate = new Date().toISOString().slice(0, 10)) : entryDate;
  const response = (await connection(
    "post",
    "diary/add",
    {
      mediaID,
      event,
      notes,
      entryDate,
    },
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return "success";
  } else {
    console.log(response);
    throw new Error("Error");
  }
};

export const updateDiary = async (
  logID: number,
  mediaID: number,
  event: string,
  notes: string,
  entryDate?: string
) => {
  const response = (await connection(
    "put",
    `diary/update/${logID}`,
    {
      logID,
      mediaID,
      event,
      notes,
      entryDate,
    },
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return "success";
  } else {
    throw new Error("Error");
  }
};

export const deleteDiary = async (logID: number) => {
  const response = (await connection(
    "delete",
    `diary/delete/${logID}`,
    {
      logID,
    },
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return "success";
  } else {
    throw new Error("Error");
  }
};

export const getStarted = async () => {
  const response = (await connection(
    "get",
    "diary/started",
    {},
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Error");
  }
};

export const getCompleted = async () => {
  const response = (await connection(
    "get",
    "diary/completed",
    {},
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Error");
  }
};
