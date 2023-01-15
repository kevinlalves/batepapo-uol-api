import { messages, participants } from "../../db/mongo.js";
import { createError } from "../../helpers/internal_errors.js";
import validate from "../../helpers/validation.js";
import schema from "../../schemas/message.js";
import chalk from "chalk";
import formatedTime from "../../helpers/format_time.js";
import { ObjectId } from "mongodb";
const resource = "message";

export default async function createMessage(req, res) {
  const { to, text, type } = req.body;
  const { user } = req.headers;

  console.log(chalk.cyan("POST /messages"));
  try {
    const participant = await participants.findOne({ name: user });
    if (!participant) {
      return res.status(422).send("Sender does not exist");
    }

    const validation = validate({ from: user, to, text, type }, schema, res);
    if (!validation) {
      return;
    }

    const { insertedId } = await messages.insertOne({
      from: user, to, text, type, time: formatedTime(new Date()),
      updatedAt: Date.now()
    });
    const createdMessage = await messages.findOne({ _id: ObjectId(insertedId) });
    res.status(201).json(createdMessage);
  }
  catch (error) {
    createError(resource, error, res);
  }
}
