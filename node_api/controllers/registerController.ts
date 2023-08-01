import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { UserRegister } from "../models/userModel";

const RegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  UserRegister(req.body.username, hashedPassword);

  try {
    let token = await authenticateUser(req.body);
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(err.status).json({
      error: err.message,
    });
  }
};

export default RegisterController;
