const questionDiv = document.querySelector("#question");
const answerDivs = document.querySelectorAll(".answer");
const resetButton = document.querySelector(".reset-button");
const nextButton = document.querySelector(".next-button");
let gameCount = 3;

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

      nextButton.style.display = "block";
      gameCount--;
    });
  });

  nextButton.addEventListener("click", () => {
    reset();
  });

  if (gameCount === 0) {
    nextButton.style.display = "none";
    resetButton.style.display = "block";
    gameCount = 3;
    return;
  }
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

function reset() {
  document.body.style.backgroundColor = "gainsboro";
  answerDivs.forEach((div) => {
    div.style.backgroundColor = "gray";
  });
  nextButton.style.display = "none";
  quiz();
}

resetButton.addEventListener("click", () => {
  resetButton.style.display = "none";
  reset();
});
