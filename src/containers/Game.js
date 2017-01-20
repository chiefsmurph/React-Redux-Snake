import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BOARD_WIDTH, BOARD_HEIGHT, SQUARE_SIZE } from '../constants';
import Board from '../components/Board';
import Snake from '../components/Snake';
import Food from '../components/Food';
import { moveSnake, setFood, setDirection, prependSnake } from '../actions';

class Game extends Component {
	componentWillMount() {
		const timer = setInterval(() => {
			this.props.moveSnake(this.props.snake);
		}, 250);
		this.setControls();
		this.newFood();
	}

	componentWillReceiveProps(nextProps) {
		const snakeCoords = nextProps.snake.coords;
		const foodCoords = nextProps.food;
		if(snakeCoords[snakeCoords.length-1][0] === foodCoords[0] && snakeCoords[snakeCoords.length-1][1] === foodCoords[1]) {
			this.newFood();
			this.props.prependSnake(snakeCoords[snakeCoords.length-1]);
		}
	}

	checkFoodCollision(x, y) {
		let badMatch = false;
		this.props.snake.coords.map(coords => {
			if(coords[0] === x && coords[1] === y) badMatch = true;
		});
		return badMatch;
	}

	newFood() {
		const x = Math.floor(Math.random() * BOARD_WIDTH);
		const y = Math.floor(Math.random() * BOARD_HEIGHT);
		let badMatch = false;
		if(this.checkFoodCollision(x, y)) this.newFood();
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
					this.props.snake.direction !== 'RIGHT'
						&& x !== 0
						&& this.props.setDirection('LEFT');
					break;
				case 39: // right arrow
					this.props.snake.direction !== 'LEFT' 
						&& x !== BOARD_WIDTH - 1
						&& this.props.setDirection('RIGHT');
					break;
				case 40: // down arrow
					this.props.snake.direction !== 'UP' 
						&& y !== BOARD_HEIGHT - 1
						&& this.props.setDirection('DOWN');
					break;
				case 38: // up arrow
					this.props.snake.direction !== 'DOWN' 
						&& y !== 0
						&& this.props.setDirection('UP');
					break;
				case 32: // space
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
		prependSnake
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);