const questionDiv = document.querySelector("#question");
const answerDivs = document.querySelectorAll(".answer");
const resetButton = document.querySelector(".reset-button");
const nextButton = document.querySelector(".next-button");

let gameCount = 3;
let correctAnswer = 0;
let incorrectAnswer = 0;
let hasCorrectAnswer = true;

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
  incorrectAnswer = getRandomNumber();

  hasCorrectAnswer = Math.random() > 0.5;

  let answers = hasCorrectAnswer
    ? [correctAnswer, incorrectAnswer]
    : [getRandomNumber(), getRandomNumber()];

  answers.push("정답이 없습니다.");
  updateAnswerUI(answers);

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
  const selectedAnswer = event.target.textContent;

  if (!hasCorrectAnswer && selectedAnswer === "정답이 없습니다.") {
    document.body.style.backgroundColor = "green";
  } else if (parseInt(selectedAnswer) === correctAnswer) {
    document.body.style.backgroundColor = "green";
  } else {
    document.body.style.backgroundColor = "red";
  }

  answerDivs.forEach((div) => {
    if (!hasCorrectAnswer && div.textContent === "정답이 없습니다.") {
      div.style.backgroundColor = "green";
    } else if (parseInt(div.textContent) === correctAnswer) {
      div.style.backgroundColor = "green";
    } else {
      div.style.backgroundColor = "red";
    }
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
  const shuffledAnswers = shuffleAndMoveNoneToEnd([...answers]);
  answerDivs.forEach((answerDiv, index) => {
    answerDiv.textContent = shuffledAnswers[index] || "";
  });
}

function shuffleAndMoveNoneToEnd(array) {
  const noneIndex = array.indexOf("정답이 없습니다.");

  if (noneIndex !== -1) {
    array.splice(noneIndex, 1);
  }

  shuffleArray(array);

  if (noneIndex !== -1) {
    array.push("정답이 없습니다.");
  }

  return array;
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
