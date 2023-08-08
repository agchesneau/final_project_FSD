import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { UserRegister } from "../models/userModel";

const RegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authToken = "";
  const { username, hashedPassword } = res.locals;

  if (hashedPassword && username) {
    // register user
    authToken = await UserRegister(username, hashedPassword);
  }

  try {
    switch (authToken) {
      case "Username already in use":
        res.status(400).json({ error: "Username already in use" });
        break;
      case "":
        res.status(500).json({ error: "User registration failed" });
        break;
      default:
        res.status(200).json({ token: authToken });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export default RegisterController;
