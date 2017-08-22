// Execute a move
export function move(position) {
    return {
        type: 'MOVE',
        position
    }
}

export function computerMove(userFirst) {
    return {
        type: 'COMPUTER_MOVE',
        userFirst
    }
}

// Change Character
export function changeCharacter(character) {
    return {
        type: 'CHANGE_CHARACTER',
        character
    }
}

// Change who goes first
export function changeFirst() {
    return {
        type: 'CHANGE_FIRST',
    }
}

export function changeGameState(status) {
    return {
        type: 'CHANGE_GAME_STATE',
        status
    }
}
export function resetGame() {
    return {
        type: 'RESET_GAME'
    }
}

export function changeSettingVisibility(visible) {
    return {
        type: 'CHANGE_SETTING_VISIBILITY',
        visible
    }
}