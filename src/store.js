import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import the root reducer
import rootReducer from './reducers/index';
import gameState from './data/gameState';
import settings from './data/settings';

// create an object for the default data
// ES6 the key is the same name as the value so just put the variable in.
const defaultState = {
    gameState,
    settings
};

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

export default store;