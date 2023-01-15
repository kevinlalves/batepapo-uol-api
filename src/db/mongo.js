import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

export const dbClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
  await dbClient.connect();
  db = dbClient.db();
  console.log("Connected to database");
} catch (error) {
  console.log(chalk.red("Error connecting to database server"));
  console.log(error);
}

export const participants = db.collection("participants");
export const messages = db.collection("messages");
