import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BOARD_WIDTH, BOARD_HEIGHT, SQUARE_SIZE, INITIAL_DIRECTION, GAME_SPEED } from '../constants';
import Board from '../components/Board';
import Snake from '../components/Snake';
import Food from '../components/Food';
import { moveSnake, setFood, setDirection, prependSnake, newGame } from '../actions';

let snakeInterval;
let directionOnNextTick = INITIAL_DIRECTION;

class Game extends Component {
	constructor() {
		super();

		this.resetGame = this.resetGame.bind(this);
	}
	componentWillMount() {
		this.setControls();
		this.newFood();
	}

	componentWillReceiveProps(nextProps) {
		const snakeCoords = nextProps.snake.coords;
		const snakeHeadCoords = snakeCoords[snakeCoords.length-1];
		const foodCoords = nextProps.food;
		const checkSelfCollision = () => {
			let collided = false;
			snakeCoords.map((coords, index) => {
				// we have to skip the head coords or else we get problems
				if(index !== snakeCoords.length-1 && coords[0] === snakeHeadCoords[0] && coords[1] === snakeHeadCoords[1]) {
					collided = true;
				}
			});
			return collided;
		};

		// if it ate a piece of food
		if(snakeHeadCoords[0] === foodCoords[0] && snakeHeadCoords[1] === foodCoords[1]) {
			this.newFood();
			this.props.prependSnake(snakeCoords[snakeCoords.length-1].slice());
		}

		// if it hit a wall or itself
		if(
			snakeHeadCoords[0] === -1 || 
			snakeHeadCoords[0] === BOARD_WIDTH || 
			snakeHeadCoords[1] === -1 || 
			snakeHeadCoords[1] === BOARD_HEIGHT ||
			checkSelfCollision()
		) {
			clearInterval(snakeInterval);
		}
	}

	resetGame() {
		this.props.newGame();
		this.newFood();
		clearInterval(snakeInterval);
	}

	checkSnakeCollision(matchCoords) {
		const snakeCoords = this.props.snake.coords
		const snakeHeadCoords = snakeCoords[snakeCoords.length-1];
		return snakeHeadCoords[0] === matchCoords[0] && snakeHeadCoords[1] === matchCoords[1];
	}

	newFood() {
		const x = Math.floor(Math.random() * BOARD_WIDTH);
		const y = Math.floor(Math.random() * BOARD_HEIGHT);
		let badMatch = false;
		if(this.checkSnakeCollision([x, y])) this.newFood();
		else this.props.setFood([x, y]);
	}

	setControls() {
		document.addEventListener('keydown', e => {
			const coords = this.props.snake.coords;
			const x = coords[coords.length-1][0];
			const y = coords[coords.length-1][1];

			switch(e.keyCode) {
				case 37: // left arrow
					// make sure we're not trying to move into the snake's body
					// or move outside the boundaries
					if(this.props.snake.direction !== 'RIGHT' && x !== 0) directionOnNextTick = 'LEFT';
					break;
				case 39: // right arrow
					if(this.props.snake.direction !== 'LEFT' && x !== BOARD_WIDTH - 1) directionOnNextTick = 'RIGHT';
					break;
				case 40: // down arrow
					if(this.props.snake.direction !== 'UP' && y !== BOARD_HEIGHT - 1) directionOnNextTick = 'DOWN';
					break;
				case 38: // up arrow
					if(this.props.snake.direction !== 'DOWN' && y !== 0) directionOnNextTick = 'UP';
					break;
				case 32: // space
					clearInterval(snakeInterval);
					snakeInterval = setInterval(() => {
						this.props.setDirection(directionOnNextTick);
						this.props.moveSnake(this.props.snake);
					}, GAME_SPEED);
					break;
			}
		});
	}

	render() {
		return (
			<div className="board-wrapper">
				<Board />
				<Snake coords={this.props.snake.coords} />
				<Food coords={this.props.food} />
				<button onClick={this.resetGame}>reset</button>
			</div>
		);
	}
}

function mapStateToProps(props) {
	return props;
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		moveSnake,
		setFood,
		setDirection,
		prependSnake,
		newGame
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);