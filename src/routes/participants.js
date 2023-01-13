import { Router } from "express";
import { db } from "../app.js";
import chalk from "chalk";

export const router = Router("/participants");

router.get("/", async (req, res) => {
  console.log(chalk.cyan("GET /participants"));
  try {
    const participants = await db.collection("participants").find().toArray();
    res.send(participants);
  } catch (error) {
    console.log(chalk.red("Error getting data from participans collection"));
    console.log(error);
  }
});

router.post("/", async (req, res) => {
});
