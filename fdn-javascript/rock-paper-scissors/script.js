function startGameInstance(){
    // Initiates a Scissors Paper Stone game
    let userScore = computerScore = 0; // Initialize scores
    const numRounds = 5;               // Set number of rounds per game

    let play = 1;

    while (play){
        for (let n = 0; n < numRounds; n++){
            result = getResult(getUserMove(), getComputerMove());
            if (result > 0){
                userScore++;
                alert(`Win! Points are ${"You: " + userScore + "- Computer: " + computerScore}`);
            } else if (result === 0) {
                alert(`Draw! Points are ${"You: " + userScore + "- Computer: " + computerScore}`);
            } else {
                computerScore++;
                alert(`Loss! Points are ${"You: " + userScore + "- Computer: " + computerScore}`);
            }
        }
        play = prompt(`The game is finished! Points are ${"You: " + userScore + " - Computer: " + computerScore}. 
            Do you want to play again? Enter 1 if yes, 0 if no.`);
    }

    
}

function getUserMove(){
    // Get the user's move via prompt window
    let move = Number(prompt("Please make a move: 1- rock, 2- paper, 3- scissors"));

    // Re-prompt if invalid input received
    while (move != 1 && move != 2 && move != 3){
        move = Number(prompt("Invalid input. Please make a move by entering the number only: 1- rock, 2- paper, 3- scissors"));
    }

    return move;
}

function getComputerMove(){
    // Randomly generate computer's move by returning a number from {1,2,3}
    // 1- rock, 2- paper, 3- scissors

    return Math.ceil(Math.random()*3);
}

function getResult(userMove, computerMove){
    // 1- rock, 2- paper, 3- scissors
    // userMove and computerMove input in Number type
    // return 1 if it's a win, return -1 if it's a loss, return 0 if it's a draw

    if (userMove === computerMove) {              // Draw
        return 0;
    } else if ( 
        (userMove == 1 && computerMove == 3)      // Win: User's rock beats scissors
        || userMove == computerMove + 1)          // Win: User's scissors beats paper; or paper beats rock
        {
        return 1;
    } else {
        return -1;                                 // Loss
    }
}

startGameInstance();