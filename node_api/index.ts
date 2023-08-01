import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { dbConnection } from "./config/db_connection";
import router from "./routes/route";

dotenv.config();

const PORT = process.env.PORT || 4242;
const app = express();

app.use(morgan("dev"));
app.use(express.static("build"));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "5000mb" }));

app.use(express.json());
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
dbConnection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});
dbConnection.query(
  "CREATE DATABASE IF NOT EXISTS all_my_lists;",
  (err: any, result: any) => {
    console.log("err: ", err);
    console.log("result: ", result);
  }
);
