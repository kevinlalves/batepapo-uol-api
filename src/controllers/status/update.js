import chalk from "chalk";
import { updateError } from "../../helpers/internal_errors.js";
import { participants } from "../../db/mongo.js";
const resource = "messages";

export default async function updateStatus(req, res) {
  const { user } = req.headers;

  console.log(chalk.cyan("POST /status"));
  try {
    const result = await participants.updateOne({ name: user }, { $set: { lastStatus: Date.now() } });
    if (!result.modifiedCount) {
      return res.status(404).send("Participant is not logged in")
    }

    res.send("OK");
  } catch (error) {
    updateError(resource, error, res);
  }
}
