import express from "express";
import cors from "cors";
import { getQuestions, submitAnswers } from "./controllers/quizController.js";

const app = express();

// Simplified CORS configuration for serverless
app.use(cors({
  origin: [
    'https://online-exam-front-end.vercel.app',
    'http://localhost:3000', 
    'http://localhost:5173'
  ],
  credentials: true
}));

app.use(express.json());

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

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
