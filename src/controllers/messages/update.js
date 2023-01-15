import { messages, participants } from "../../db/mongo.js";
import validate from "../../helpers/validation.js";
import schema from "../../schemas/message.js";
import chalk from "chalk";
import { updateError } from "../../helpers/internal_errors.js";
import { ObjectId } from "mongodb";
const resource = "message";

export default async function updateMessage(req, res) {
  const { id } = req.params;
  const { to, text, type } = req.body;
  const { user } = req.headers;

  console.log(chalk.cyan(`PUT /messages/${id}`));
  try {
    const message = await messages.findOne({ _id: ObjectId(id) });
    if (!message) {
      return res.sendStatus(404);
    }

    const participant = await participants.findOne({ name: user });
    if (!participant) {
      return res.status(422).send("Sender does not exist");
    }
    if (user !== message.from) {
      return res.sendStatus(401);
    }

    const validation = validate({ to, from: user, text, type }, schema, res);
    if (!validation) {
      return;
    }

    await messages.updateOne({ _id: ObjectId(id) }, {
      $set: { to, text, type, updatedAt: Date.now() }
    });

    res.send("OK");
  }
  catch (error) {
    updateError(resource, error, res);
  }
}
