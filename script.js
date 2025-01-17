const playerCard = document.querySelector(".player.flex-col");
const playerButtonsArr = Array.from(document.querySelectorAll(".player > .move-btn"));
const roundCounter = document.querySelector("#round-counter");

// initialize scores
let playerScore = opponentScore = 0;

// register a click as a player move
let playerMove, opponentMove;

function showResult(playerMove, opponentMove){
    if (playerMove === opponentMove){
        roundCounter.innerText = (`${playerMove} meets ${opponentMove}: Draw! Score is ${"you: " + playerScore + " - opponent: " + opponentScore}`);
    } else if (
        (playerMove === 'Paper' && opponentMove === 'Rock') ||
        (playerMove === 'Rock'  && opponentMove === 'Scissors') || 
        (playerMove === 'Scissors' && opponentMove === 'Paper')){
        playerScore++;
        roundCounter.innerText = (`${playerMove} beats ${opponentMove}: Win! Score is ${"you: " + playerScore + " - opponent: " + opponentScore}`);
    }
    else {
        opponentScore++;
        roundCounter.innerText = (`${playerMove} loses to ${opponentMove}: Loss! Score is ${"you: " + playerScore + " - opponent: " + opponentScore}`);
    }
}

// use event delegation to reduce number of event listeners
playerCard.addEventListener('click', function registerMove(event){
    if (playerButtonsArr.includes(event.target)){
        playerMove = event.target.innerText;
        playerCard.removeEventListener('click', registerMove);
        
        opponentMove = getOpponentMove();
        showResult(playerMove, opponentMove);
    }
})

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