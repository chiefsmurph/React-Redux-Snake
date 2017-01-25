import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BOARD_WIDTH, BOARD_HEIGHT, SQUARE_SIZE, INITIAL_DIRECTION, GAME_SPEED } from '../constants';
import Board from '../components/Board';
import Snake from '../components/Snake';
import Food from '../components/Food';
import { moveSnake, setFood, setDirection, prependSnake, newGame, loseGame, incrementScore } from '../actions';
import { checkCollision } from '../utils';

class Game extends Component {
	constructor() {
		super();

		this.snakeInterval;
		this.directionOnNextTick = INITIAL_DIRECTION;
		this.resetGame = this.resetGame.bind(this);
		this.checkGameLoss = this.checkGameLoss.bind(this);
	}

	componentWillMount() {
		this.setControls();
		this.generateNewFood();
	}

	componentDidUpdate() {
		this.checkFoodCollision();
		this.checkGameLoss();
	}

	checkGameLoss() {
		const snakeCoords = this.props.snake.coords;
		const snakeHeadCoords = snakeCoords[snakeCoords.length-1];

		// if you collide w a wall or yourself
		if(!this.props.game.lost && (
				snakeHeadCoords[0] === -1 || 
				snakeHeadCoords[0] === BOARD_WIDTH || 
				snakeHeadCoords[1] === -1 || 
				snakeHeadCoords[1] === BOARD_HEIGHT ||
				checkCollision(snakeHeadCoords, snakeCoords.slice(0, -1)))) {
			clearInterval(this.snakeInterval);
			this.props.loseGame();
		}
	}

	checkFoodCollision() {
		const snakeCoords = this.props.snake.coords;
		const snakeHeadCoords = snakeCoords[snakeCoords.length-1];
		const foodCoords = this.props.food;

		// if it ate a piece of food
		if(snakeHeadCoords[0] === foodCoords[0] && snakeHeadCoords[1] === foodCoords[1]) {
			this.generateNewFood();
			this.props.incrementScore();
			this.props.prependSnake(snakeCoords[snakeCoords.length-1].slice());
		}
	}

	resetGame() {
		this.props.newGame();
		this.generateNewFood();
		clearInterval(this.snakeInterval);
		this.directionOnNextTick = 'DOWN';
	}

	generateNewFood() {
		const x = Math.floor(Math.random() * BOARD_WIDTH);
		const y = Math.floor(Math.random() * BOARD_HEIGHT);
		if(checkCollision([x, y], this.props.snake.coords)) this.generateNewFood();
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
					if(this.props.snake.direction !== 'RIGHT' && x !== 0) this.directionOnNextTick = 'LEFT';
					break;
				case 39: // right arrow
					if(this.props.snake.direction !== 'LEFT' && x !== BOARD_WIDTH - 1) this.directionOnNextTick = 'RIGHT';
					break;
				case 40: // down arrow
					if(this.props.snake.direction !== 'UP' && y !== BOARD_HEIGHT - 1) this.directionOnNextTick = 'DOWN';
					break;
				case 38: // up arrow
					if(this.props.snake.direction !== 'DOWN' && y !== 0) this.directionOnNextTick = 'UP';
					break;
				case 32: // space
					if(this.props.game.lost) return false;
					clearInterval(this.snakeInterval);
					this.snakeInterval = setInterval(() => {
						this.props.setDirection(this.directionOnNextTick);
						this.props.moveSnake(this.props.snake);
					}, GAME_SPEED);
					break;
			}
		});
	}

	render() {
		return (
			<div>
				<h1 className="score">Score: { this.props.game.score }</h1>
				<div className="board-wrapper">
					<Board />
					<Snake coords={this.props.snake.coords} lost={this.props.game.lost} />
					<Food coords={this.props.food} />
					{ this.props.game.lost && <button onClick={this.resetGame} className="reset">RESET</button> }
				</div>
				<p className="help">Press spacebar to begin!</p>
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
		newGame,
		loseGame,
		incrementScore
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);