export default class Question {
  constructor({ id, text, optionA, optionB, optionC, optionD, correctOption }) {
    this.id = id;
    this.text = text;
    this.options = { A: optionA, B: optionB, C: optionC, D: optionD };
    this.correctOption = correctOption;
  }
}
