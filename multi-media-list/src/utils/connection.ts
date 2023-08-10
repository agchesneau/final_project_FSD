const baseUrl = "http://localhost:4242";
import axios, { Axios, AxiosResponse } from "axios";
export const connection = async (
  method: string,
  endpoint: string,
  data?: {},
  token?: string
) => {
  try {
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
          "content-type": "application/x-www-form-urlencoded",
        }
      : {};
    const response = await axios({
      method: method,
      url: `${baseUrl}/api/${endpoint}`,
      headers: headers,
      data: data ? data : {},
    });
    return response;
  } catch (error) {
    return error;
  }
};
