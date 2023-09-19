import { combineReducers } from 'redux';
import weatherReducer from './weather';
import alertReducer from './alert';

const rootReducer = combineReducers({
  weather: weatherReducer,
  alert: alertReducer,
});

export default rootReducer;