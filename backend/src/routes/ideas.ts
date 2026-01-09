import { Router } from "express";
import {
  generateIdeas,
  getIdeas,
  getIdeaById,
  scoreIdea,
} from "../controllers/ideasController";

export const ideasRouter = Router();

ideasRouter.post("/generate", generateIdeas);
ideasRouter.get("/", getIdeas);
ideasRouter.get("/:id", getIdeaById);
ideasRouter.post("/:id/score", scoreIdea);
