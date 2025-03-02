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
    } 
    if (playerWinCount < computerWinCount) {
        console.log('게임에서 졌습니다.');
        document.querySelector('#result').style.display = 'none';
        document.querySelector('#result-message').textContent = '게임에서 졌습니다.';
    } 
    if (playerWinCount === computerWinCount) {
        console.log('무승부입니다.');
        document.querySelector('#result').style.display = 'none';
        document.querySelector('#result-message').textContent = '무승부입니다.';
    }

    document.querySelector('#reset').style.display = 'block';
}

document.querySelectorAll('.player-choice').forEach((button) => {
    button.addEventListener('click', function() {
        if (roundCount === 0) {
            alert('게임이 끝났습니다. 게임을 다시 시작하려면 [다시 시작] 버튼을 누르세요.');
            return;
        }
        roundCount--;
        document.querySelector('#round-count').textContent = roundCount;
        game(button.id);
    });
});

document.querySelector('#reset').addEventListener('click', function() {
    playerWinCount = 0;
    computerWinCount = 0;
    roundCount = 10;
    document.querySelector('#player-win-count').textContent = playerWinCount;
    document.querySelector('#computer-win-count').textContent = computerWinCount;
    document.querySelector('#round-count').textContent = roundCount;
    document.querySelector('#result-message').textContent = '';
    document.querySelector('#reset').style.display = 'none';
});