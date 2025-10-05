import express from "express";
import cors from "cors";

const app = express();

// Simple CORS for all origins
app.use(cors());
app.use(express.json());

// Sample questions data
const questions = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: { A: "Berlin", B: "Paris", C: "Rome", D: "Madrid" }
  },
  {
    id: 2,
    text: "2 + 2 = ?",
    options: { A: "3", B: "4", C: "5", D: "6" }
  },
  {
    id: 3,
    text: "Which planet is known as the Red Planet?",
    options: { A: "Mars", B: "Earth", C: "Jupiter", D: "Venus" }
  }
];

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Quiz API is running!", status: "healthy" });
});

// Get questions endpoint
app.get("/api/questions", (req, res) => {
  try {
    console.log("Getting questions...");
    res.json(questions);
  } catch (error) {
    console.error("Error getting questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Submit answers endpoint
app.post("/api/submit", (req, res) => {
  try {
    console.log("Submitting answers...");
    const { answers } = req.body;
    console.log("Received answers:", answers);
    
    // Simple scoring
    const correctAnswers = { 1: "B", 2: "B", 3: "A" };
    let score = 0;
    const results = [];
    
    for (const [questionId, userAnswer] of Object.entries(answers)) {
      const correct = correctAnswers[questionId] === userAnswer;
      if (correct) score++;
      results.push({
        id: parseInt(questionId),
        question: questions.find(q => q.id === parseInt(questionId))?.text || "",
        correctOption: correctAnswers[questionId],
        userAnswer: userAnswer,
        isCorrect: correct
      });
    }
    
    console.log("Score calculated:", score);
    res.json({ score, total: questions.length, results });
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({ error: "Failed to submit answers" });
  }
});

// Handle 404
app.use("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

export default app;