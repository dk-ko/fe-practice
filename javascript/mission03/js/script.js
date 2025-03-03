const questionDiv = document.querySelector("#question");
const answerDivs = document.querySelectorAll(".answer");
const resetButton = document.querySelector(".reset-button");
const nextButton = document.querySelector(".next-button");

let gameCount = 3;
let correctAnswer = 0;
let incorrectAnswers = 0;

document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  quiz();
});

function getRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function generateQuestion() {
  const firstNumber = getRandomNumber();
  const secondNumber = getRandomNumber();

  updateQuestionUI(`${firstNumber} + ${secondNumber} = ?`);
  return firstNumber + secondNumber;
}

function quiz() {
  console.log(`게임 진행중 (남은 라운드: ${gameCount})`);
  correctAnswer = generateQuestion();
  incorrectAnswers = getRandomNumber();
  updateAnswerUI([correctAnswer, incorrectAnswers]);

  nextButton.style.display = "none";
}

function initEventListeners() {
  answerDivs.forEach((answerDiv) => {
    answerDiv.addEventListener("click", handleAnswerClick);
  });

  nextButton.addEventListener("click", () => {
    gameCount--;
    next();
  });

  resetButton.addEventListener("click", () => {
    reset();
  });
}

function handleAnswerClick(event) {
  const selectedAnswer = parseInt(event.target.textContent);
  document.body.style.backgroundColor =
    selectedAnswer === correctAnswer ? "green" : "red";

  answerDivs.forEach((div) => {
    div.style.backgroundColor =
      parseInt(div.textContent) === correctAnswer ? "green" : "red";
  });

  if (gameCount > 1) {
    nextButton.style.display = "block";
  } else {
    nextButton.style.display = "none";
    resetButton.style.display = "block";
  }
}

function updateQuestionUI(questionText) {
  questionDiv.textContent = questionText;
}

function updateAnswerUI(answers) {
  const shuffledAnswers = shuffleArray([...answers]);
  answerDivs.forEach((answerDiv, index) => {
    answerDiv.textContent = shuffledAnswers[index];
  });
  document.querySelector(".none").textContent = "정답이 없습니다.";
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function next() {
  resetUI();
  if (gameCount > 0) {
    quiz();
  } else {
    resetButton.style.display = "block";
  }
}

function reset() {
  gameCount = 3;
  resetUI();
  resetButton.style.display = "none";
  quiz();
}

function resetUI() {
  document.body.style.backgroundColor = "gainsboro";
  answerDivs.forEach((div) => (div.style.backgroundColor = "gray"));
  nextButton.style.display = "none";
  resetButton.style.display = "none";
}
