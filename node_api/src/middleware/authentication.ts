import e, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  res.locals.username = username;
  res.locals.password = password;

  if (!username || !password || username.length < 5 || password.length < 5) {
    return res.status(400).json({
      error:
        "Username and password are required and must be at least 5 characters long",
    });
  } else {
    // hash password
    const salt = bcrypt.genSaltSync(10);
    res.locals.hashedPassword = bcrypt.hashSync(password, salt);
  }

  next();
};
export default authentication;
