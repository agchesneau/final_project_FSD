import { ResultSetHeader } from "mysql2";
import dbConnection from "../config/db_connection";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const insertUser = async (username: string, password: string) => {
  const result = await (
    await dbConnection
  ).execute(
    `INSERT INTO all_my_lists.users (username, password) VALUES ('${username}', '${password}');`
  );
  return result;
};

const generateToken = (id: number) => {
  return jwt.sign(
    { id },
    process.env.SECRET_KEY,
    { expiresIn: 86400 } // expires in 24 hours
  );
};

const getID = async (pseudo: string) => {
  const result = await (
    await dbConnection
  ).execute(`SELECT id FROM all_my_lists.users WHERE username = ?;`, [pseudo]);
  return result[0] as { id: number }[];
};

const UserRegister = async (username: string, password: string) => {
  // check if username is already in use
  const checkUsername = await getID(username);
  if (checkUsername.length > 0) {
    return "Username already in use";
  } else {
    // insert user
    const id = (await insertUser(username, password)) as ResultSetHeader[];

    if (!id[0].insertId) {
      return "";
    } else {
      // generate token
      const token = generateToken(id[0].insertId);
      return token;
    }
  }
};

const UserLogin = async (username: string, password: string) => {
  // check if password is correct
  try {
    const result = await (
      await dbConnection
    ).execute(
      `SELECT password, id FROM all_my_lists.users WHERE username='${username}';`
    );

    const checkPassword = bcrypt.compareSync(password, result[0][0].password);

    if (result[0][0].length === 0 || !checkPassword) {
      return "";
    } else {
      // generate token
      const token = generateToken(result[0][0].id);
      return token;
    }
  } catch (err) {
    console.log("err", err);
    return "";
  }
};

export { UserRegister, UserLogin };
