import React from 'react';
import { SQUARE_SIZE } from '../constants';

export default function(props) {
	let style = {
		left: props.coords[0] * SQUARE_SIZE + 'px',
		top: props.coords[1] * SQUARE_SIZE + 'px'
	}

	return (
		<div className="food" style={style}></div>
	);
}