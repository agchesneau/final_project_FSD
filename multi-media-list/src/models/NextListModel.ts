import { connection } from "@/utils/connection";
import { AxiosResponse } from "axios";
import { getAuthToken } from "@/utils/cookies";

const token = getAuthToken();

export const getNextList = async () => {
  const response = (await connection(
    "get",
    `list/all`,
    {},
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Error");
  }
};

export const postNextList = async (mediaID: number) => {
  const response = (await connection(
    "post",
    "list/add",
    {
      mediaID,
    },
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return "success";
  } else {
    throw new Error("Error");
  }
};

export const updateNextList = async (listID: number, mediaID: number) => {
  const response = (await connection(
    "put",
    `list/update/${listID}`,
    {
      listID,
      mediaID,
    },
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return "success";
  } else {
    throw new Error("Error");
  }
};
