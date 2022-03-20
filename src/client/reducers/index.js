import { combineReducers } from 'redux';

import boardReducer from './board.js';

const rootReducer = combineReducers({
  boards: boardReducer,
});

export default rootReducer;
