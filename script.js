// function startGameInstance(){
//     // Initiates a Scissors Paper Stone game

//     const numRounds = 5;               // Set number of rounds per game

//     let play = 1;

//     while (play){
//         let userScore = computerScore = 0; // Initialize scores

//         for (let n = 0; n < numRounds; n++){

//             userMove = getUserMove();
//             computerMove = getComputerMove();

//             if (userMove === computerMove){
//                 alert(`${userMove} meets ${computerMove}: Draw! Points are ${"You: " + userScore + " - Computer: " + computerScore}`);
//             } else if (
//                 (userMove === 'paper' && computerMove === 'rock') ||
//                 (userMove === 'rock'  && computerMove === 'scissors') || 
//                 (userMove === 'scissors' && computerMove === 'paper')){
//                 userScore++;
//                 alert(`${userMove} beats ${computerMove}: Win! Points are ${"You: " + userScore + " - Computer: " + computerScore}`);
//             }
//             else {
//                 computerScore++;
//                 alert(`${userMove} loses to ${computerMove}:Loss! Points are ${"You: " + userScore + " - Computer: " + computerScore}`);
//             }
//         }
//         play = prompt(`The game is finished! Points are ${"You: " + userScore + " - Computer: " + computerScore}. 
//             Do you want to play again? Enter 1 if yes, 0 if no.`);
//         while ( play != 0 && play != 1){
//             prompt ("Invalid input. Do you want to play again? Enter 1 if yes, 0 if no.")
//         }
//     }

    
// }

const playerCard = document.querySelector(".player.flex-col");
const playerButtonsArr = Array.from(document.querySelectorAll(".player > .move-btn"));

// register a click as a player move
let playerMove;

// use event delegation to reduce number of event listeners
playerCard.addEventListener('click', function registerMove(event){
    if (playerButtonsArr.includes(event.target)){
        playerMove = event.target.innerText;
        console.log(playerMove);
        playerCard.removeEventListener('click', registerMove);
    }
})

function getComputerMove(){
    // Randomly generate computer's move by returning a number from {1,2,3}

    let move = Math.ceil(Math.random()*3);

    // 1- rock, 2- paper, 3- scissors
    switch (move) {
        case 1:
            return 'Rock';
        case 2: 
            return 'Paper';
        case 3:
            return 'scissors';
    }
}

// startGameInstance();