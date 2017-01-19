import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BOARD_WIDTH, BOARD_HEIGHT, SQUARE_SIZE } from '../constants';
import Board from '../components/Board';

class Game extends Component {
	buildSnake() {
		return this.props.snake.coords.map(coords => {
			let style = {
				left: coords[0] * SQUARE_SIZE + 'px',
				top: coords[1] * SQUARE_SIZE + 'px'
			}
			return <div className="snake" style={style} />
		});
	}

	render() {
		return (
			<div>
				<div className="board-wrapper">
					<Board />
					{ this.buildSnake() }
				</div>
			</div>
		);
	}
}

function mapStateToProps(props) {
	return props;
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({

	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);