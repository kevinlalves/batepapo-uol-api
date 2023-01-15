import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import { router as participansRouter } from "./routes/participants.js";
import { router as messagesRouter } from "./routes/messages.js";
import { router as statusRouter } from "./routes/status.js";
import kickInactive from "./helpers/kick_inactive.js";

const inactivityTime = 10000;
const inactivityCheck = 15000;
const PORT = 5000;
const app = express();

setInterval(kickInactive, inactivityCheck, inactivityTime);

app.disable("x-powered-by");
app.use(cors());
app.use(json());
app.use("/participants", participansRouter);
app.use("/messages", messagesRouter);
app.use("/status", statusRouter);

app.listen(PORT, () => {
  console.log(chalk.green(`Server listening on port ${PORT}`));
});
