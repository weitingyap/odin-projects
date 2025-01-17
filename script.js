const playerCard = document.querySelector(".player.flex-col");
const playerButtonsArr = Array.from(document.querySelectorAll(".player > .move-btn"));
const roundCounter = document.querySelector("#round-counter");
const [playerScoreElem, opponentScoreElem] = [document.querySelector(".player.score"), document.querySelector(".opponent.score")];

const numRounds = 5;

// initialize values
let playerScore = opponentScore = 0;
let roundCnt = 1;
let playerMove, opponentMove;

// register a click as a player move
// use event delegation to reduce number of event listeners
playerCard.addEventListener('click', playMove);

function playMove(event){
    if (playerButtonsArr.includes(event.target)){
        playerMove = event.target.innerText;

        // disable moves after move selection
        playerCard.removeEventListener('click', playMove);
        
        opponentMove = getOpponentMove();

        [roundCnt, playerScore, opponentScore] = showResult(roundCnt, numRounds, playerMove, opponentMove, playerScore, opponentScore);
        updateScores(playerScore, opponentScore);

        if (roundCnt <= numRounds){
            // reactivate moves if the game is still ongoing
            playerCard.addEventListener('click', playMove);
        } else {
            endGame();
        }
    }
}

// determine and show result
function showResult(roundCnt, numRounds, playerMove, opponentMove, playerScore, opponentScore){
    if (playerMove === opponentMove){
        roundCounter.innerText = (`Round ${roundCnt} of ${numRounds}: ${playerMove} meets ${opponentMove}
            Draw! Score is ${"you: " + playerScore + " - opponent: " + opponentScore}`);
    } else if (
        (playerMove === 'Paper' && opponentMove === 'Rock') ||
        (playerMove === 'Rock'  && opponentMove === 'Scissors') || 
        (playerMove === 'Scissors' && opponentMove === 'Paper')){
        playerScore++;
        roundCounter.innerText = (`Round ${roundCnt} of ${numRounds}: ${playerMove} beats ${opponentMove}
            Win! Score is ${"you: " + playerScore + " - opponent: " + opponentScore}`);
    }
    else {
        opponentScore++;
        roundCounter.innerText = (`Round ${roundCnt} of ${numRounds}: ${playerMove} loses to ${opponentMove}
            Loss! Score is ${"you: " + playerScore + " - opponent: " + opponentScore}`);
    }
    roundCnt++;
    return [roundCnt, playerScore, opponentScore]
}

function updateScores(playerScore, opponentScore){
    playerScoreElem.innerText = playerScore;
    opponentScoreElem.innerText = opponentScore;
}

function getOpponentMove(){
    // Randomly generate opponent's move by returning a number from {1,2,3}

    let move = Math.ceil(Math.random()*3);

    // 1- Rock, 2- Paper, 3- Scissors
    switch (move) {
        case 1:
            return 'Rock';
        case 2: 
            return 'Paper';
        case 3:
            return 'Scissors';
    }
}

function endGame(){
    roundCounter.innerText = "Game over!";
}