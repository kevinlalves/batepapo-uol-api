import { Router } from "express";
import { db } from "../app.js";
import chalk from "chalk";

export const router = Router("/messages");

router.get("/", async (req, res) => {
  console.log(chalk.cyan("GET /messages"));
  try {
    const participants = await db.collection("messages").find().toArray();
    res.send(participants);
  } catch (error) {
    console.log(chalk.red("Error getting data from messages collection"));
    console.log(error);
  }
});

router.post("/", () => {
});
