function settings (state = {}, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'CHANGE_SETTING_VISIBILITY':
            newState.visible = !state.visible;
            return newState;
        case 'CHANGE_CHARACTER':
            if (state.players.user === 'o') {
                newState.players.user = 'x';
                newState.players.computer = 'o';
            } else {
                newState.players.user = 'o';
                newState.players.computer = 'x';
            }
            return newState;
        case 'CHANGE_FIRST':
            newState.goFirst = !state.goFirst;
            return newState;
        default:
            return state;
    }

}

export default settings;