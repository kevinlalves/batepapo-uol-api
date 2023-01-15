import { Router } from "express";
import indexParticipants from "../controllers/participants/index.js";
import createParticipant from "../controllers/participants/create.js";

export const router = Router("/participants");

router.get("/", indexParticipants);
router.post("/", createParticipant);
