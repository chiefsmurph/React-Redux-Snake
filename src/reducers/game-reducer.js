const INITIAL_STATE = {
	lost: false,
	score: 0
}

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case 'LOSE_GAME':
			return {
				...state,
				lost: true
			}
		case 'NEW_GAME':
			return {
				...state,
				score: 0,
				lost: false
			}
		case 'INCREMENT_SCORE':
			return {
				...state,
				score: state.score + 1
			}
	}

	return state;
}