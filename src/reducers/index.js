import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import gameState from './gameState';
import settings from './settings';

const rootReducer = combineReducers({settings, gameState, routing: routerReducer});

export default rootReducer;