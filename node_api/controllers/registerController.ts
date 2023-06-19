import { Request, Response, NextFunction } from "express";

const RegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(302).json({ msg: "register" });
};

export default RegisterController;
