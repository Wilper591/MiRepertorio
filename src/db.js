import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();

const config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  ssl: process.env.SSL,
};
export const pool = new Pool(config);
