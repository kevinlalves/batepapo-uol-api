import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import { MongoClient } from "mongodb";
import { router as participansRouter } from "./routes/participants.js";
import { router as messagesRouter } from "./routes/messages.js";
dotenv.config();

const dbClient = new MongoClient(process.env.DATABASE_URL);
const PORT = 5000;
export let db;

try {
  await dbClient.connect();
  db = dbClient.db();
  console.log("Connected to database");
} catch (error) {
  console.log(chalk.red("Error connecting to database server"));
  console.log(error);
}

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(json());
app.use("/participants", participansRouter);
app.use("/messages", messagesRouter);

app.post("/status", (req, res) => {
  const { user } = req.headers;

  console.log(chalk.cyan("POST /status"));
  try {
    const result = db.collection("participants").updateOne({ name: user }, { $set: { lastStatus: Date.now() } });
  } catch (error) {

  }
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server listening on port ${PORT}`));
});
