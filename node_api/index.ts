import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import router from "./routes/route";

const PORT = process.env.API_PORT || 4242;
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
