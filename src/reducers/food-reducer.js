const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case 'SET_FOOD':
			return action.food;

		case 'NEW_GAME':
			return INITIAL_STATE;
	}

	return state;
}