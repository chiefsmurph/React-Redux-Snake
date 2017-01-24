export function moveSnake(snake) {
	let direction = snake.direction;
	let coords = snake.coords.slice();
	let headCoords = coords[coords.length-1];
	let newHead = () => {
		if(direction === 'DOWN') return [headCoords[0], headCoords[1]+1];
		if(direction === 'UP') return [headCoords[0], headCoords[1]-1];
		if(direction === 'LEFT') return [headCoords[0]-1, headCoords[1]];
		if(direction === 'RIGHT') return [headCoords[0]+1, headCoords[1]];
	};
	coords.push(newHead());
	coords.shift();

	return {
		type: 'MOVE_SNAKE',
		coords
	}
}

export function setFood(coords) {
	return {
		type: 'SET_FOOD',
		food: coords
	}
}

export function setDirection(direction) {
	return {
		type: 'SET_DIRECTION',
		direction
	}
}

export function prependSnake(coords) {
	return {
		type: 'PREPEND_SNAKE',
		coords: coords
	}
}

export function newGame() {
	return {
		type: 'NEW_GAME'
	}
}

export function loseGame() {
	return {
		type: 'LOSE_GAME'
	}
}