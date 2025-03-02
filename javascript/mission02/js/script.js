let playerWinCount = 0;
let computerWinCount = 0;
let roundCount = 10;

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
        document.querySelector('#player-win-count').textContent = playerWinCount;
        return '플레이어 승리';
    } else {
        computerWinCount++;
        document.querySelector('#computer-win-count').textContent = computerWinCount;
        return '컴퓨터 승리';
    }
}

function game(playerSelection) {
    let computerSelection = computerPlay();
    let playResult = playRound(playerSelection, computerSelection);
    console.log(playResult);
    document.querySelector('#result').style.display = 'block';
    document.querySelector('#result-message').textContent = playResult;

    if (roundCount === 0) {
        endGame();
    }
}

function endGame() {
    if (playerWinCount > computerWinCount) {
        console.log('게임에서 이겼습니다.');
        document.querySelector('#result').style.display = 'none';
        document.querySelector('#result-message').textContent = '게임에서 이겼습니다.';
    } else if (playerWinCount < computerWinCount) {
        console.log('게임에서 졌습니다.');
        document.querySelector('#result').style.display = 'none';
        document.querySelector('#result-message').textContent = '게임에서 졌습니다.';
    } else {
        console.log('무승부입니다.');
        document.querySelector('#result').style.display = 'none';
        document.querySelector('#result-message').textContent = '무승부입니다.';
    }
}

document.querySelectorAll('.player-choice').forEach((button) => {
    button.addEventListener('click', function() {
        roundCount--;
        document.querySelector('#round-count').textContent = roundCount;
        game(button.id);
    });
});