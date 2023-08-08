import Cookies from "js-cookie";

const cookieName = "auth-token";

export const setAuthToken = (token: string) => {
  Cookies.set(cookieName, token, { expires: 1 });
};

export const getAuthToken = () => {
  return Cookies.get(cookieName);
};

export const removeAuthToken = () => {
  Cookies.remove(cookieName);
};
