import { combineReducers } from 'redux';

import boardReducer from './board.js';
import locationReducer from './location.js';
import staffMemberReducer from './staff.js';

const rootReducer = combineReducers({
  boards: boardReducer,
  locations: locationReducer,
  staff: staffMemberReducer,
});

export default rootReducer;
