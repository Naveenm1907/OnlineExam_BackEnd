import db from "../db.js";
import Question from "../models/Questions.js";
import { scoreAnswers } from "../utils/score.js";

export const getQuestions = (req, res) => {
  try {
    console.log('Getting questions...');
    const rows = db.prepare("SELECT * FROM questions").all();
    console.log('Found questions:', rows.length);
    const questions = rows.map(r => {
      const q = new Question(r);
      delete q.correctOption;
      return q;
    });
    res.json(questions);
  } catch (error) {
    console.error('Error in getQuestions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

export const submitAnswers = (req, res) => {
  try {
    console.log('Submitting answers...');
    const { answers } = req.body;
    console.log('Received answers:', answers);
    const rows = db.prepare("SELECT * FROM questions").all();
    const { score, total, results } = scoreAnswers(rows, answers);
    console.log('Score calculated:', score);
    res.json({ score, total, results });
  } catch (error) {
    console.error('Error in submitAnswers:', error);
    res.status(500).json({ error: 'Failed to submit answers' });
  }
};
