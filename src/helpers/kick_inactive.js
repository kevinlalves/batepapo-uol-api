import chalk from "chalk";
import { ObjectId } from "mongodb";
import { messages, participants } from "../db/mongo.js";
import formatedTime from "./format_time.js";

export default async function kickInactive(miliseconds) {
  try {
    const inactiveParticipantsCursor = participants.find({ lastStatus: { $lt: Date.now()-miliseconds } });
    for await (const participant of inactiveParticipantsCursor) {
      await participants.deleteOne({ ...participant });
      await createLeavingMessage(participant.name);
      console.log(chalk.yellow(`${participant.name} is being logged out by inactivity...`));
    }
  }
  catch (error) {
    console.log(chalk.red("Error with function to kick inactive participants"));
    console.log(error);
  }
}

async function createLeavingMessage(user) {
  try {
    await messages.insertOne({
      from: user,
      to: "Todos",
      type: "status",
      texto: "sai da sala...",
      time: formatedTime(new Date()),
      updatedAt: Date.now()
    });
  } catch (error) {
    console.log(chalk.red("Error creating leaving message"));
    console.log(error);
  }
}
