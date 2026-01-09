import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { trendsRouter } from "./routes/trends";
import { ideasRouter } from "./routes/ideas";
import { docsRouter } from "./routes/docs";
import { chatRouter } from "./routes/chat";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/trends", trendsRouter);
app.use("/api/ideas", ideasRouter);
app.use("/api/docs", docsRouter);
app.use("/api/chat", chatRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
