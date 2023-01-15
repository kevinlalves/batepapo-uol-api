import { Router } from "express";
import updateStatus from "../controllers/status/update.js";

export const router = Router("/status");

router.post("/", updateStatus);
