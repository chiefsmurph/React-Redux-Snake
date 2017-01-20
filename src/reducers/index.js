import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

const initialState = {
	snake: {
		direction: 'DOWN',
		coords: [
			[Math.floor(BOARD_WIDTH/2), 3],
			[Math.floor(BOARD_WIDTH/2), 4],
			[Math.floor(BOARD_WIDTH/2), 5]
		]
	},
	food: []
};

export default function(state = initialState, action) {
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
	}

	return state;
}