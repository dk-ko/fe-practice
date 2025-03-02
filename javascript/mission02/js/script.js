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
        return '플레이어 승리';
    } else {
        computerWinCount++;
        return '컴퓨터 승리';
    }
}

function playerPlay() {
    document.querySelectorAll('.player-choice').forEach((button) => {
        button.addEventListener('click', function() {
            return button.id;
        });
    });
}

function game() {
    for (let i = 0; i < roundCount; i++) {
        let playerSelection = playerPlay();
        let computerSelection = computerPlay();
        console.log(playRound(playerSelection, computerSelection));
    }
    if (playerWinCount > computerWinCount) {
        console.log('플레이어 승리');
    } else if (playerWinCount < computerWinCount) {
        console.log('컴퓨터 승리');
    } else {
        console.log('무승부');
    }
}
