import { Router } from "express";
import { getTrends, searchTrends, getTrendById } from "../controllers/trendsController";

export const trendsRouter = Router();

trendsRouter.get("/", getTrends);
trendsRouter.get("/search", searchTrends);
trendsRouter.get("/:id", getTrendById);
