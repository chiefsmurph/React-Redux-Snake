import { combineReducers } from 'redux';
import snakeReducer from './snake-reducer';
import foodReducer from './food-reducer';

const rootReducer = combineReducers({
	snake: snakeReducer,
	food: foodReducer
});

export default rootReducer;