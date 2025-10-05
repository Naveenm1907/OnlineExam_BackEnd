import db from "../db.js";
import Question from "../models/Questions.js";

export const getQuestions = (req, res) => {
  const rows = db.prepare("SELECT * FROM questions").all();
  const questions = rows.map(r => {
    const q = new Question(r);
    delete q.correctOption;
    return q;
  });
  res.json(questions);
};

export const submitAnswers = (req, res) => {
  const { answers } = req.body;
  const rows = db.prepare("SELECT * FROM questions").all();
  let score = 0;

  const results = rows.map(q => {
    const correct = answers[q.id] === q.correctOption;
    if (correct) score++;
    return { id: q.id, question: q.text, correctOption: q.correctOption, userAnswer: answers[q.id], isCorrect: correct };
  });

  res.json({ score, total: rows.length, results });
};
