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
    console.log(playRound(playerSelection, computerSelection));

    if (roundCount === 0) {
        endGame();
    }
}

function endGame() {
    if (playerWinCount > computerWinCount) {
        console.log('플레이어 승리');
        document.querySelector('#result').textContent = '플레이어 승리';
    } else if (playerWinCount < computerWinCount) {
        console.log('컴퓨터 승리');
        document.querySelector('#result').textContent = '컴퓨터 승리';
    } else {
        console.log('무승부');
        document.querySelector('#result').textContent = '무승부';
    }
}

document.querySelectorAll('.player-choice').forEach((button) => {
    button.addEventListener('click', function() {
        roundCount--;
        document.querySelector('#round-count').textContent = roundCount;
        game(button.id);
    });
});