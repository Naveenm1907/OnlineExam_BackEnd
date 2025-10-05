// In-memory database for serverless compatibility
const questions = [
  {
    id: 1,
    text: "What is the capital of France?",
    optionA: "Berlin",
    optionB: "Paris", 
    optionC: "Rome",
    optionD: "Madrid",
    correctOption: "B"
  },
  {
    id: 2,
    text: "2 + 2 = ?",
    optionA: "3",
    optionB: "4",
    optionC: "5", 
    optionD: "6",
    correctOption: "B"
  },
  {
    id: 3,
    text: "Which planet is known as the Red Planet?",
    optionA: "Mars",
    optionB: "Earth",
    optionC: "Jupiter",
    optionD: "Venus", 
    correctOption: "A"
  }
];

// Mock database interface for compatibility
const db = {
  prepare: (query) => {
    console.log('Database query:', query);
    if (query.includes("SELECT * FROM questions")) {
      return {
        all: () => {
          console.log('Returning questions:', questions.length);
          return questions;
        }
      };
    }
    if (query.includes("SELECT COUNT(*) AS count FROM questions")) {
      return {
        get: () => {
          console.log('Question count:', questions.length);
          return { count: questions.length };
        }
      };
    }
    return {
      run: () => {},
      all: () => []
    };
  }
};

export default db;
