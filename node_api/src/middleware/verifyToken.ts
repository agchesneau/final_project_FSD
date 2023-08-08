import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["Authorization"] as string;
  token = token.replace(/^Bearer\s+/, "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  } else {
    // verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        res.locals.decoded = decoded;
      }
    });
  }
  next();
};
export default verifyToken;
