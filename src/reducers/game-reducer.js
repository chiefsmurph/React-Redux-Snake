const INITIAL_STATE = {
	lost: false
}

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case 'LOSE_GAME':
			return {
				...state,
				lost: true
			}
	}

	return state;
}