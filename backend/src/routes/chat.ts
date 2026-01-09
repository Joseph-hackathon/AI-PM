import { Router } from "express";
import { chatWithAssistant } from "../controllers/chatController";

export const chatRouter = Router();

chatRouter.post("/", chatWithAssistant);
