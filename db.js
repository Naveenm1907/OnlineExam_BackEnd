import Database from "better-sqlite3";

const db = new Database("quiz.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT,
  optionA TEXT,
  optionB TEXT,
  optionC TEXT,
  optionD TEXT,
  correctOption TEXT
)
`).run();

const count = db.prepare("SELECT COUNT(*) AS count FROM questions").get().count;
if (count === 0) {
  const insert = db.prepare(`INSERT INTO questions 
  (text, optionA, optionB, optionC, optionD, correctOption)
  VALUES (?, ?, ?, ?, ?, ?)`);
  const data = [
    ["What is the capital of France?", "Berlin", "Paris", "Rome", "Madrid", "B"],
    ["2 + 2 = ?", "3", "4", "5", "6", "B"],
    ["Which planet is known as the Red Planet?", "Mars", "Earth", "Jupiter", "Venus", "A"],
  ];
  for (const q of data) insert.run(...q);
}

export default db;
