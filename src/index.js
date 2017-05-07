import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './css/font-awesome.min.css';

var PLAYERS = [
	{
		id: 1,
		name: "Nathan Blair",
		score: 31,
	},
	{
		id: 2,
		name: "Melyssa Vazquez",
		score: 35,
	},
	{
		id: 3,
		name: "Smokey Blair",
		score: 42,
	},
];

ReactDOM.render(
	<App initialPlayers={PLAYERS} title='Simple Scoreboard' />,
	document.getElementById('root')
);
