import assert from 'node:assert/strict';
import { scoreAnswers } from '../utils/score.js';

function test(description, fn) {
  try {
    fn();
    console.log(`✓ ${description}`);
  } catch (err) {
    console.error(`✗ ${description}`);
    console.error(err);
    process.exitCode = 1;
  }
}

const sampleQuestions = [
  { id: 1, text: 'Q1', correctOption: 'A' },
  { id: 2, text: 'Q2', correctOption: 'B' },
  { id: 3, text: 'Q3', correctOption: 'C' },
];

test('scores all correct answers', () => {
  const answers = { 1: 'A', 2: 'B', 3: 'C' };
  const result = scoreAnswers(sampleQuestions, answers);
  assert.equal(result.score, 3);
  assert.equal(result.total, 3);
  assert.equal(result.results.filter(r => r.isCorrect).length, 3);
});

test('scores some incorrect answers and preserves details', () => {
  const answers = { 1: 'B', 2: 'B', 3: 'D' };
  const result = scoreAnswers(sampleQuestions, answers);
  assert.equal(result.score, 1);
  assert.equal(result.total, 3);
  const r1 = result.results.find(r => r.id === 1);
  assert.equal(r1.isCorrect, false);
  assert.equal(r1.correctOption, 'A');
  assert.equal(r1.userAnswer, 'B');
});

test('handles unanswered questions as incorrect', () => {
  const answers = { 2: 'B' };
  const result = scoreAnswers(sampleQuestions, answers);
  assert.equal(result.score, 1);
  const r3 = result.results.find(r => r.id === 3);
  assert.equal(r3.userAnswer, undefined);
  assert.equal(r3.isCorrect, false);
});

// Summary
process.on('exit', (code) => {
  if (code === 0) {
    console.log('\nAll tests passed.');
  } else {
    console.log('\nSome tests failed.');
  }
});

