const questionDiv = document.querySelector("#question");
const answerDivs = document.querySelectorAll(".answer");
const resetButton = document.querySelector(".reset-button");
const nextButton = document.querySelector(".next-button");

document.addEventListener("DOMContentLoaded", () => {
  quiz();
});

function getRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function generateQuestion() {
  const firstNumber = getRandomNumber();
  const secondNumber = getRandomNumber();

  const expression = `${firstNumber} + ${secondNumber} = ?`;
  updateQuestionUI(expression);
  return firstNumber + secondNumber;
}

function quiz() {
  const correctAnswer = generateQuestion();
  const incorrectAnswers = getRandomNumber();
  const answers = [correctAnswer, incorrectAnswers];
  updateAnswerUI(answers);
}

function updateQuestionUI(questionText) {
  questionDiv.textContent = questionText;
}

function updateAnswerUI(answers) {
  const shffledAnswers = shuffleArray([...answers]);
  answerDivs.forEach((answerDiv, index) => {
    answerDiv.textContent = shffledAnswers[index];
  });
  document.querySelector(".none").textContent = "정답이 없습니다.";
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
