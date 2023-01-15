import { messages, participants } from "../../db/mongo.js";
import chalk from "chalk";
import { deleteError } from "../../helpers/internal_errors.js";
import { ObjectId } from "mongodb";
const resource = "message";

export default async function deleteMessage(req, res) {
  const { id } = req.params;
  const { user } = req.headers;

  console.log(chalk.cyan(`DELETE /messages/${id}`));
  try {
    const message = await messages.findOne({ _id: ObjectId(id) });
    if (!message) {
      return res.sendStatus(404);
    }

    const participant = await participants.findOne({ name: user });
    if (!participant) {
      return res.status(422).send("User invalid");
    }
    if (user !== message.from) {
      return res.sendStatus(401);
    }

    await messages.deleteOne({ _id: ObjectId(id) });
    res.sendStatus(200);
  }
  catch (error) {
    deleteError(resource, error, res);
  }
}
