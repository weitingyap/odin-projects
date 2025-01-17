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

function initButtons(buttonArr){
    for (const btn of buttonArr){
        btn.classList.remove('no-hover');
        btn.classList.remove('selected-move');
    }
}

function playMove(event){

    if (playerButtonsArr.includes(event.target)){
        playerMove = event.target.innerText;
        event.target.classList.add('selected-move');

        // disable moves after move selection
        playerCard.removeEventListener('click', playMove);
        for (const btn of playerButtonsArr){
            btn.classList.add('no-hover');
        }
        
        opponentMove = getOpponentMove();

        [roundCnt, playerScore, opponentScore] = showResult(roundCnt, numRounds, playerMove, opponentMove, playerScore, opponentScore);
        updateScores(playerScore, opponentScore);

        if (roundCnt <= numRounds){
            // reactivate moves if the game is still ongoing
            initButtons(playerButtonsArr);
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

const opponentButtonsArr = Array.from(document.querySelectorAll('.opponent > .move-btn'));

function showSelectedMove(buttonArr, move){
    for (const btn of buttonArr){
        if (btn.innerText === move){
            btn.classList.add('selected-move');
        }
    }
}

function getOpponentMove(){
    // Randomly generate opponent's move by returning a number from {1,2,3}

    let move = Math.ceil(Math.random()*3);

    // 1- Rock, 2- Paper, 3- Scissors
    switch (move) {
        case 1:
            move = 'Rock';
        case 2: 
            move = 'Paper';
        case 3:
            move = 'Scissors';
    }

    showSelectedMove(opponentButtonsArr, move);
    return move;
}

function endGame(){
    if (playerScore === opponentScore) {
        let endGameText = "It's a draw! Better luck next time.";
    } else if (playerscore < opponentScore){
        let endGameText = "You lost! Better luck next time.";
    } else {
        let endGameText = "You won! Thanks for playing."
    }
}