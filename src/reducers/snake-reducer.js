import { BOARD_WIDTH, BOARD_HEIGHT, INITIAL_DIRECTION } from '../constants';

const INITIAL_STATE = {
	direction: INITIAL_DIRECTION,
	coords: [
		[Math.floor(BOARD_WIDTH/2), 0],
		[Math.floor(BOARD_WIDTH/2), 1],
		[Math.floor(BOARD_WIDTH/2), 2]
	]
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case 'MOVE_SNAKE':
			return {
				...state,
				coords: action.coords
			}

		case 'SET_DIRECTION':
			return {
				...state,
				direction: action.direction
			}

		case 'PREPEND_SNAKE':
			return {
				...state,
				coords: [[action.coords], ...state.coords]
			}

		case 'NEW_GAME':
			return INITIAL_STATE;
	}

	return state;
}