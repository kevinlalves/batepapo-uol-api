import { Router } from "express";
import createMessage from "../controllers/messages/create.js";
import deleteMessage from "../controllers/messages/delete.js";
import indexMessages from "../controllers/messages/index.js";
import updateMessage from "../controllers/messages/update.js";

export const router = Router("/messages");

router.get("/", indexMessages);
router.post("/", createMessage);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);
