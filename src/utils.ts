// Function to determine the index to make a move in the tic-tac-toe game
export const getIndex = (data: any) => {
    // Check for a winning move for "O"
    let winningIndex = getIndexBasedOnPlayer(data, "O");
    // If there is a winning move, return the index
    if (winningIndex !== 9 && winningIndex !== undefined && data[winningIndex] === "") {
        return winningIndex;
    } else {
        // If there is no winning move, check for a blocking move for "X"
        let blockingIndex = getIndexBasedOnPlayer(data, "X");
        // If there is a blocking move, return the index
        if (blockingIndex !== 9 && blockingIndex !== undefined && data[blockingIndex] === "") {
            return blockingIndex;
        } else {
            // If there are no winning or blocking moves, make a random move
            return getRandomIndex(data);
        }
    }
}

// Function to generate a random index for a move in the tic-tac-toe game
export const getRandomIndex = (data: any) => {
    let randomIndex = Math.floor(Math.random() * 9);
    // Keep generating a random index until an empty cell is found
    while (data[randomIndex] !== "") {
        randomIndex = Math.floor(Math.random() * 9);
    }
    return randomIndex;
}

// Function to determine the winning or blocking index based on the player's moves
const getIndexBasedOnPlayer = (data: any, player: string) => {
    // Check all possible winning combinations and blocking moves
    // Return the index if a winning or blocking move is found
    // Return 9 if there are no winning or blocking moves
    if (data[1] === player && data[2] === player && data[0] === ""
            || data[4] === player && data[8] === player && data[0] === ""
            || data[3] === player && data[6] === player && data[0] === "") {
            return 0;
        } else if (data[0] === player && data[2] === player && data[1] === ""
            || data[4] === player && data[7] === player && data[1] === "") {
            return 1;
        } else if (data[0] === player && data[1] === player && data[2] === ""
            || data[4] === player && data[6] === player && data[2] === ""
            || data[5] === player && data[8] === player && data[2] === "") {
            return 2;
        } else if (data[0] === player && data[6] === player && data[3] === ""
            || data[4] === player && data[5] === player && data[3] === "") {
            return 3;
        } else if (data[0] === player && data[8] === player && data[4] === ""
            || data[1] === player && data[7] === player && data[4] === ""
            || data[2] === player && data[6] === player && data[4] === ""
            || data[3] === player && data[5] === player && data[4] === "") {
            return 4;
        } else if (data[2] === player && data[8] === player && data[5] === ""
            || data[3] === player && data[4] === player && data[5] === "") {
            return 5;
        } else if (data[0] === player && data[3] === player && data[6] === ""
            || data[2] === player && data[4] === player && data[6] === ""
            || data[7] === player && data[8] === player && data[6] === "") {
            return 6;
        } else if (data[1] === player && data[4] === player && data[7] === ""
            || data[6] === player && data[8] === player && data[7] === "") {
            return 7;
        } else if (data[0] === player && data[4] === player && data[8] === ""
            || data[2] === player && data[5] === player && data[8] === ""
            || data[6] === player && data[7] === player && data[8] === "") {
            return 8;
        }else{
            return 9;
        }
}