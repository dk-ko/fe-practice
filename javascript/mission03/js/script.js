const questionDiv = document.querySelector("#question");
const answerDivs = document.querySelectorAll(".answer");
const resetButton = document.querySelector(".reset-button");
const nextButton = document.querySelector(".next-button");
let gameCount = 3;
let correctAnswer = 0;
let incorrectAnswers = 0;

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
  correctAnswer = generateQuestion();
  incorrectAnswers = getRandomNumber();
  const answers = [correctAnswer, incorrectAnswers];
  updateAnswerUI(answers);

  nextButton.style.display = "none";

  if (gameCount > 0) {
    console.log("게임 진행중");
  } else {
    console.log("게임이 끝났습니다.");
    resetButton.style.display = "block";
    return;
  }
}

answerDivs.forEach((answerDiv) => {
  answerDiv.addEventListener("click", () => {
    if (parseInt(answerDiv.textContent) === correctAnswer) {
      document.body.style.backgroundColor = "green";
    } else {
      document.body.style.backgroundColor = "red";
    }

    answerDivs.forEach((div) => {
      if (parseInt(div.textContent) === correctAnswer) {
        div.style.backgroundColor = "green";
      } else {
        div.style.backgroundColor = "red";
      }
    });

    if (gameCount > 1) {
      console.log(gameCount);
      console.log("게임중");
      nextButton.style.display = "block";
    } else {
      console.log(gameCount);
      console.log("게임종료");
      nextButton.style.display = "none";
      resetButton.style.display = "block";
    }
  });
});

nextButton.addEventListener("click", () => {
  gameCount--;
  next();
});

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
  document.body.style.backgroundColor = "gainsboro";
  answerDivs.forEach((div) => {
    div.style.backgroundColor = "gray";
  });

  nextButton.style.display = "none";

  if (gameCount > 0) {
    quiz();
  } else {
    resetButton.style.display = "block";
  }
}

function reset() {
  document.body.style.backgroundColor = "gainsboro";
  answerDivs.forEach((div) => {
    div.style.backgroundColor = "gray";
  });

  nextButton.style.display = "none";
  resetButton.style.display = "none";

  gameCount = 3;
  quiz();
}

resetButton.addEventListener("click", () => {
  resetButton.style.display = "none";
  reset();
});
