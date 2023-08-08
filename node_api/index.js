"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
// import { dbConnection } from "./src/config/db_connection";
// import router from "./src/routes/route";
dotenv_1.default.config();
const PORT = process.env.PORT || 4242;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static("build"));
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json({ limit: "5000mb" }));
app.use(express_1.default.json());
// app.use("/api", router);
app.all("*", (req, res) => {
    return res
        .status(404)
        .json({ status: "fail", message: `Route: ${req.originalUrl} not found` });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Check database connection
// const connection = await dbConnection.connect();
// connection.query(
//   "CREATE DATABASE IF NOT EXISTS all_my_lists;",
//   (err: any, result: any) => {
//     console.log("err: ", err);
//     console.log("result: ", result);
//   }
// );
//# sourceMappingURL=index.js.map