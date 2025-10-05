export function scoreAnswers(questions, answers) {
  let score = 0;
  const results = questions.map((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctOption;
    if (isCorrect) score++;
    return {
      id: q.id,
      question: q.text,
      correctOption: q.correctOption,
      userAnswer,
      isCorrect,
    };
  });

  return { score, total: questions.length, results };
}

export default scoreAnswers;
