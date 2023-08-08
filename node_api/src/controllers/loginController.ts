import { Request, Response, NextFunction } from "express";
import { UserLogin } from "../models/userModel";

const LoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authToken = "";
  const { username, password } = res.locals;
  if (password && username) {
    authToken = await UserLogin(username, password);
  }

  try {
    authToken !== ""
      ? res.status(200).json({ token: authToken })
      : res.status(400).json({ error: "User login failed" });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export default LoginController;
