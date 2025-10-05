import express from "express";
import cors from "cors";
import { getQuestions, submitAnswers } from "./controllers/quizController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/questions", getQuestions);
app.post("/api/submit", submitAnswers);

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
