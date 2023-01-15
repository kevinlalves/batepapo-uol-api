import { showError } from "../../helpers/internal_errors.js";
import chalk from "chalk";
import { participants } from "../../db/mongo.js";
const resource = "participants";

export default async function indexParticipants(req, res) {
  console.log(chalk.cyan("GET /participants"));
  try {
    const participantList = await participants.find().toArray();
    res.send(participantList);
  } catch (error) {
    showError(resource, error, res);
  }
}
