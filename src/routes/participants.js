import { Router, ObjectId } from "express";
import { db } from "../app.js";
import chalk from "chalk";

const resource = "participants";
export const router = Router(`/${resource}`);

router.get("/", async (req, res) => {
  console.log(chalk.cyan(`GET /${resource}`));
  try {
    const participants = await db.collection(resource).find().toArray();
    res.send(participants);
  } catch (error) {
    console.log(chalk.red(`Error getting data from ${resource} collection`));
    console.log(error);
    res.status(500).send(`Could not get ${resource}`);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  console.log(chalk.cyan(`POST /${resource}`));
  try {
    const existingParticipant = db.collection(resource).findOne({ name });
    if (existingParticipant) {
      return res.status(409).send("Participant already exists");
    }
    await db.collection(resource).insertOne({ name, lastStatus: Date.now() });
    await db.collection("messages").insertOne({
      from: name,
      to: "Todos",
      text: "Entra na sala...",
      type: "status",
      time:
     })
    res.sendStatus(201);
  } catch (error) {
    console.log(chalk.red(`Error writing data to ${resource} collection`));
    console.log(error);
    res.status(500).send(`Could not create ${resource}`);
  }
});
