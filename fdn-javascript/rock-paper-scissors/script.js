function getUserMove(){
    // Get the user's move via prompt window
    let move = Number(prompt("Please make a move: 1- rock, 2- paper, 3- scissors"));

    // Re-prompt if invalid input received
    while (move != 1 && move != 2 && move != 3){
        move = Number(prompt("Invalid input. Please make a move by entering the number only: 1- rock, 2- paper, 3- scissors"));
    }

    return move;
}

let userMove = getUserMove();