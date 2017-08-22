// a reducer takes in two things:

// 1. the action (information about what happened)
// 2. copy of current state
import brain from '../data/brain';

// Create function that compares arrays
Array.prototype.contains = function(array) {
    return array.every(function(item) {
        return this.indexOf(item) !== -1;
    }, this);
};

// Create function that gets the difference between two arrays
Array.prototype.diff = function(arr) {
    let diffArray = [];
    this.forEach(function (space) {
        if (!arr.contains([space])) {
            diffArray.push(space);
        }
    });
    return diffArray;
};

// Function to evaluate if the game is over
function checkGameOver(boardState, occupied, availableMoves, userFirst) {
    let checkWin = [];
    brain.winConditions.forEach(function (winCondition) {
        checkWin.push(boardState.computer.contains(winCondition));
    });
    let remainingMoves = userFirst === false ? 2 : 1;
    if (checkWin.contains([true])) {
        return 'COMPUTER_WINS';
    } else if (availableMoves.length < remainingMoves) {
        return 'CATS_GAME';
    } else {
        return 'GAME_IN_PROGRESS';
    }
}

// Function to get Winning Moves
function getWinningMoves(boardState, player, availableMoves) {
    // Check if opponent is about to win
    let opponent = boardState[player];
    let opponentWinningMoves = [];
    // Grab the winConditions from the brain
    brain.winConditions.forEach(function (winCondition) {
        let remainingToWin = winCondition.diff(opponent);
        // If opponent is one move away from winning block it
        if (remainingToWin.length === 1) {
            opponentWinningMoves.push(remainingToWin[0]);
            opponentWinningMoves.forEach(function (opponentWinningMove) {
                if (!availableMoves.contains([opponentWinningMove])) {
                    opponentWinningMoves.pop(opponentWinningMove);
                }
            });
        }
    });
    return opponentWinningMoves;
}

// Function for optimal turn moves
function position(boardState, occupied) {
    // Computer must secure adjacent corners or the center space to ensure CAT
    // If center space is available, secure it, otherwise take the nearest corner
    if (!occupied.contains(['bb'])) {
        // computer should always go into the center when possible
        return 'bb';
    } else {
        // Are any of the corners occupied?
        // let availableCorners = getOptions(corners, occupied);
        let availableCorners = brain.corners.diff(occupied);
        if (availableCorners.length > 0) {
            // Randomly select a corner from the unoccupied corners
            // Additionally, anticipate the corner trap strategy and counter it, remove the losing move from the array of possibilities
            let usableCorners = availableCorners;
            brain.cornerTraps.forEach(function (cornerTrap) {
                cornerTrap.traps.forEach(function (trap) {
                    if (boardState.user.length === 2 && trap.contains(boardState.user)) {
                        usableCorners.splice(usableCorners.indexOf(cornerTrap.danger), 1);
                        console.log('Trap countered!');
                        return false;
                    }
                });
            });
            let r = Math.floor(Math.random() * usableCorners.length);
            return usableCorners[r];
        } else {
            // Get the available space and put it there randomly
            let availableSpaces = brain.grid.diff(occupied);
            let i = Math.floor(Math.random() * availableSpaces.length);
            return availableSpaces[i];
        }
    }
}

function gameState(state = {}, action) {
    // Copy State
    let newState = Object.assign({}, state);

    switch(action.type) {
        case 'CHANGE_GAME_STATE':
            // change the state
            newState.active = !state.active;

            // Reset the board
            newState.boardState.user = [];
            newState.boardState.computer = [];

            return newState;
        case 'RESET_GAME':
            // Reset the board
            newState.boardState.user = [];
            newState.boardState.computer = [];
            newState.result = 'GAME_IN_PROGRESS';
            return newState;
        case 'MOVE':
            const move = action.position;
            let userMoves = state.boardState.user.slice();
            // prevent users from updating state when they click on an occupied space.
            if (!newState.boardState.user.concat(newState.boardState.computer).contains([move])) {
                userMoves.push(move);
                newState.boardState.user = userMoves;
                return newState;
            } else {
                return state;
            }
        case 'COMPUTER_MOVE':
            let computerMove;
            // Get all the occupied spaces
            let occupied = state.boardState.user.concat(state.boardState.computer);
            // Get Available Moves
            let availableMoves = brain.grid.diff(occupied);
            let opponent = state.boardState.user;

            const userWinningMoves = getWinningMoves(state.boardState, 'user', availableMoves);
            const computerWinningMoves = getWinningMoves(state.boardState, 'computer', availableMoves);

            if (opponent.length === 1) {
                console.log('Strategy: Positioning');
                computerMove = position(state.boardState, occupied);
            } else if (state.boardState.computer.contains(['bb']) &&
                state.boardState.computer.length === 1 &&
                state.boardState.user.length === 2 &&
                brain.corners.contains(state.boardState.user) &&
                brain.corners.diff(state.boardState.user).length === 2 &&
                state.boardState.user[0].substring(1) !== state.boardState.user[1].substring(1) &&
                state.boardState.user[0].substring(0, 1) !== state.boardState.user[1].substring(0, 1)
            ) {
                console.log('Strategy: Diagonal Counter');
                let availableEdges = brain.edges.diff(occupied);
                let i = Math.floor(Math.random() * availableEdges.length);
                computerMove = availableEdges[i];
            } else if (computerWinningMoves.length > 0) {
                console.log('Strategy: Offense');
                computerMove = computerWinningMoves[0];
            } else if (userWinningMoves.length > 0) {
                console.log('Strategy: Defense');
                computerMove =  userWinningMoves[0];
            } else {
                console.log('Strategy: Positioning');
                computerMove = position(state.boardState, occupied);
            }
            newState.boardState.computer.push(computerMove);

            // Check if the game is over
            newState.result = checkGameOver(newState.boardState, occupied, availableMoves, action.userFirst);

            return newState;
        default:
            return state;
    }
}

export default gameState;