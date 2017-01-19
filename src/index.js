import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Game from './containers/game'

const store = createStore(reducer);

const App = () => {
	return (
		<div>
			<Game />
		</div>
	);
};

render(<Provider store={store}><App /></Provider>, document.getElementById('app'));