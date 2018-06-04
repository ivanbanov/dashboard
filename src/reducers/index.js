import { combineReducers } from 'redux';
import devicesReducer from './devices';
import filtersReducer from './filters';

const rootReducer = combineReducers({
  devicesReducer,
  filtersReducer,
});

export default rootReducer;
