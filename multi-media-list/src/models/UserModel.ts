import { connection } from "@/utils/connection";
import { setAuthToken, getAuthToken, removeAuthToken } from "../utils/cookies";
import { AxiosResponse } from "axios";

export const login = async (username: string, password: string) => {
  const response = (await connection("post", "login", {
    username,
    password,
  })) as AxiosResponse;

  if (response.status === 200) {
    setAuthToken(response.data.token);
    return "success";
  } else {
    return response.data.error;
  }
};

export const logout = () => {
  removeAuthToken();
};

export const register = async (username: string, password: string) => {
  const response = (await await connection("post", "register", {
    username,
    password,
  })) as AxiosResponse;
  if (response.status === 200) {
    return "success";
  } else {
    return response.data.error;
  }
};

export const getUser = async () => {
  const user = getAuthToken();
  if (user) {
    return "user logged in";
  } else {
    return "user not logged in";
  }
};
