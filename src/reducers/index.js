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
	food: [Math.floor(Math.random()*BOARD_WIDTH), Math.floor(Math.random()*BOARD_HEIGHT)]
};

export default function(state = initialState, action) {
	return state;
}