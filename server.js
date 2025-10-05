import express from "express";
import cors from "cors";
import { getQuestions, submitAnswers } from "./controllers/quizController.js";

const app = express();

// Simple CORS for all origins
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Quiz API is running!", status: "healthy" });
});

// API routes
app.get("/api/questions", getQuestions);
app.post("/api/submit", submitAnswers);

// Handle 404
app.use("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

export default app;