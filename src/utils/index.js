export function checkCollision(matchCoords, arrCoords) {
	let collided = false;
	arrCoords.map(coords => {
		if(coords[0] === matchCoords[0] && coords[1] === matchCoords[1]) collided = true;
	});
	return collided;
}