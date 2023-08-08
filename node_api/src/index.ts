import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import dbConnection from "./config/db_connection";
import router from "./routes/routes";

dotenv.config();

const PORT = process.env.PORT || 4242;
const app = express();

app.use(morgan("dev"));
app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", router);

app.all("*", (req: Request, res: Response) => {
  return res
    .status(404)
    .json({ status: "fail", message: `Route: ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Check database connection
const connection = async () => {
  try {
    (await dbConnection).connect();
  } catch (err) {
    console.log("db connection err: ", err);
  }
};
connection();
