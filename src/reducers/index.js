import { combineReducers } from 'redux';
import snakeReducer from './snake-reducer';
import foodReducer from './food-reducer';
import gameReducer from './game-reducer';

const rootReducer = combineReducers({
	snake: snakeReducer,
	food: foodReducer,
	game: gameReducer
});

export default rootReducer;