let playerWinCount = 0;
let computerWinCount = 0;
let roundCount = 10;

const resultDiv = document.querySelector('#result');
const resultMessage = document.querySelector('#result-message');
const playerWinCountDiv = document.querySelector('#player-win-count');
const computerWinCountDiv = document.querySelector('#computer-win-count');
const roundCountDisplay = document.querySelector('#round-count');
const resetButton = document.querySelector('#reset');

function computerPlay() {
    let choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
};

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return '무승부';
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        playerWinCount++;
        updateUI();
        return '플레이어 승리';
    } else {
        computerWinCount++;
        updateUI();
        return '컴퓨터 승리';
    }
}

function updateUI() {
    playerWinCountDiv.textContent = playerWinCount;
    computerWinCountDiv.textContent = computerWinCount;
    roundCountDisplay.textContent = roundCount;
}

function game(playerSelection) {
    if (roundCount === 0) {
        alert('게임이 끝났습니다. 게임을 다시 시작하려면 [다시 시작] 버튼을 누르세요.');
        return;
    }
    roundCount--;
    updateUI();

    let computerSelection = computerPlay();
    let playResult = playRound(playerSelection, computerSelection);
    console.log(playResult);
    resultDiv.style.display = 'block';
    resultMessage.textContent = playResult;

    if (roundCount === 0) endGame();
}

function endGame() {
    if (playerWinCount > computerWinCount) {
        console.log('게임에서 이겼습니다.');
        resultMessage.textContent = '게임에서 이겼습니다.';
    } 
    if (playerWinCount < computerWinCount) {
        console.log('게임에서 졌습니다.');
        resultMessage.textContent = '게임에서 졌습니다.';
    } 
    if (playerWinCount === computerWinCount) {
        console.log('무승부입니다.');
        resultMessage.textContent = '무승부입니다.';
    }
    resultDiv.style.display = 'none';
    resetButton.style.display = 'block';
}

function resetGame() {
    playerWinCount = 0;
    computerWinCount = 0;
    roundCount = 10;

    updateUI();
    resultMessage.textContent = '';
    resetButton.style.display = 'none';
}

document.querySelectorAll('.player-choice').forEach((button) => {
    button.addEventListener('click', function() {
        game(button.id);
    });
});

resetButton.addEventListener('click', function() {
    resetGame()
});