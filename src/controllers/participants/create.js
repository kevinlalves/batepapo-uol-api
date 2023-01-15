import { messages, participants } from "../../db/mongo.js";
import chalk from "chalk";
import { createError } from "../../helpers/internal_errors.js";
import formatedTime from "../../helpers/format_time.js";
import { ObjectId } from "mongodb";
const resource = "participant";

export default async function createParticipant(req, res) {
  const { name } = req.body;

  console.log(chalk.cyan("POST /participants"));
  try {
    const participant = await participants.findOne({ name });
    if (participant) {
      return res.status(409).send("Participant already exists");
    }

    const { insertedId } = await participants.insertOne({ name, lastStatus: Date.now() });
    const createdParticipant = await participants.findOne({ _id: ObjectId(insertedId) });
    await messages.insertOne({
      from: name,
      to: "Todos",
      text: "entra na sala...",
      type: "status",
      time: formatedTime(new Date()),
      updatedAt: Date.now()
    });

    res.status(201).json(createdParticipant);
  }
  catch (error) {
    createError(resource, error, res);
  }
}
