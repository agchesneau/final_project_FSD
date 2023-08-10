import { connection } from "@/utils/connection";
import { AxiosResponse } from "axios";
import { getAuthToken } from "@/utils/cookies";

const token = getAuthToken();

export const getMediaByID = async (mediaID: number) => {
  const response = (await connection(
    "get",
    `media/id/${mediaID}`,
    {
      mediaID,
    },
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Error");
  }
};

export const getMediaByName = async (name: string) => {
  const response = (await connection(
    "get",
    `media/name/${name}`,
    {
      name,
    },
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Error");
  }
};

export const getMediaByType = async (type: string) => {
  const response = (await connection(
    "get",
    `media/type/${type}`,
    {
      type,
    },
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Error");
  }
};

export const postMedia = async (
  title: string,
  type: string,
  imgURL?: string,
  limkURL?: string
) => {
  const response = (await connection(
    "post",
    "media/add",
    {
      title,
      type,
      imgURL,
      limkURL,
    },
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return "success";
  } else {
    throw new Error("Error");
  }
};
