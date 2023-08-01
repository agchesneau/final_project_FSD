import { dbConnection } from "../config/db_connection";
import jwt from "jsonwebtoken";

const insertUser = async (username: string, password: string) => {
  await dbConnection.execute(
    "CREATE TABLE IF NOT EXISTS all_my_lists.users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );"
  );
  const result = await dbConnection.execute(
    `INSERT INTO all_my_lists.users (username, password) VALUES ('${username}', ${password});`
  );
  return result;
};

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

const getID = async (pseudo: string) => {
  const result = await dbConnection.execute(
    `SELECT id FROM all_my_lists.users WHERE username = '?';`,
    [pseudo]
  );
  return result;
};

const UserRegister = async (username: string, password: string) => {
  // check if username is already in use
  const checkUsername = await getID(username);
  if (checkUsername.length > 0) {
    return "Username already in use";
  } else {
    // insert user
    await insertUser(username, password);
    const id = await getID(username)[0].id;
    const token = generateToken(id);
    return token;
  }
};

export { UserRegister };
