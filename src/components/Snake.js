import React from 'react';
import { SQUARE_SIZE } from '../constants';

export default function(props) {
	return (
		<div>
			{
				props.coords.map((coords, index) => {
					let lostStyling = props.lost ? { background: 'red' } : {};
					let style = {
						left: coords[0] * SQUARE_SIZE + 'px',
						top: coords[1] * SQUARE_SIZE + 'px',
						...lostStyling
					}
					return <div className="snake" style={style} key={index} />
				})
			}
		</div>
	);
}