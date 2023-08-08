import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

export default mysql.createConnection({
  host: "localhost",
  user: dbConfig.user,
  password: dbConfig.password,
  database: "all_my_lists",
});
