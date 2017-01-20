import { BOARD_WIDTH, BOARD_HEIGHT, INITIAL_DIRECTION } from '../constants';

const initialState = {
	snake: {
		direction: INITIAL_DIRECTION,
		coords: [
			[Math.floor(BOARD_WIDTH/2), 0],
			[Math.floor(BOARD_WIDTH/2), 1],
			[Math.floor(BOARD_WIDTH/2), 2]
		]
	},
	food: []
};

export default function(state = initialState, action) {
	console.log(initialState.snake.coords[2]);
	switch(action.type) {
		case 'MOVE_SNAKE':
			return {
				...state,
				snake: {
					...state.snake,
					coords: action.coords
				}
			}

		case 'SET_FOOD':
			return {
				...state,
				food: action.food
			}

		case 'SET_DIRECTION':
			return {
				...state,
				snake: {
					...state.snake,
					direction: action.direction
				}
			}

		case 'PREPEND_SNAKE':
			return {
				...state,
				snake: {
					...state.snake,
					coords: [[action.coords], ...state.snake.coords]
				}
			}

		case 'NEW_GAME':
			return initialState;
	}

	return state;
}