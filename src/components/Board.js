import React from 'react';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

export default function Board() {
	let board = [];
	for(let x = 0; x < BOARD_WIDTH; x++) {
		board[x] = [];
		for(let y = 0; y < BOARD_HEIGHT; y++) {
			board[x][y] = '';
		}
	}

	return (
		<div className="board">
			{
				board.map(row => {
					return (
						<div className="row">
							{
								row.map(cell => <div className="cell" />)
							}
						</div>
					)
				})
			}
		</div>
	);
}