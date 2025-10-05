import express from "express";
import cors from "cors";
import { getQuestions, submitAnswers } from "./controllers/quizController.js";

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://online-exam-front-end.vercel.app/quiz'] // Replace with your actual frontend domain
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Quiz API is running!", status: "healthy" });
});

app.get("/api/questions", getQuestions);
app.post("/api/submit", submitAnswers);

// Handle 404 for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

const PORT = process.env.PORT || 5000;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
}

export default app;
