import { connection } from "@/utils/connection";
import { AxiosResponse } from "axios";
import { getAuthToken } from "@/utils/cookies";

const token = getAuthToken();

export const postDiary = async (id: number, event: string) => {
  const response = (await connection(
    "post",
    "diary",
    {
      id,
      event,
    },
    token
  )) as AxiosResponse;
  if (response.status === 200) {
    return "success";
  } else {
    throw new Error("Error");
  }
};
