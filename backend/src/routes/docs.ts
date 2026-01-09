import { Router } from "express";
import {
  generatePRD,
  generateGTM,
  generateRoadmap,
  getDocuments,
  getDocumentById,
} from "../controllers/docsController";

export const docsRouter = Router();

docsRouter.post("/prd", generatePRD);
docsRouter.post("/gtm", generateGTM);
docsRouter.post("/roadmap", generateRoadmap);
docsRouter.get("/", getDocuments);
docsRouter.get("/:id", getDocumentById);
