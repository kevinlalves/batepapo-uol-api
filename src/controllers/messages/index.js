import { messages, participants } from "../../db/mongo.js";
import validate from "../../helpers/validation.js";
import { paramsSchema } from "../../schemas/message.js";
import chalk from "chalk";
import { showError } from "../../helpers/internal_errors.js";
const resource = "messages";

export default async function indexMessages(req, res) {
  const { limit } = req.query;
  const { user } = req.headers;

  const validation = validate({ limit, user }, paramsSchema, res);
  if (!validation) {
    return;
  }

  console.log(chalk.cyan("GET /messages"));
  try {
    const participant = await participants.findOne({ name: user });
    if (!participant) {
      return res.status(404).send("User not found");
    }

    let cursor = filterPrivateMessages(user);
    if (limit) {
      cursor = cursor.limit(Number(limit));
    }

    const messageList = await cursor.toArray();
    res.send(messageList);
  }
  catch (error) {
    showError(resource, error, res);
  }
}

function filterPrivateMessages(user) {
  return messages.find({ $or: [{ type: { $ne: "private_message" } }, { from: user }, { to: user }] })
    .sort({ updatedAt: -1 });
}
