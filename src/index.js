import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './css/font-awesome.min.css';

var defaultTitle = "Simple Scoreboard";

var http = require('http');
var req = http.get('http://localhost:55414/game/hello', (res) => {
	const statusCode = res.statusCode;
	const contentType = res.headers['content-type'];

	let error;
	if (statusCode !== 200) {
		error = new Error(`Request Failed.\n` +
											`Status Code: ${statusCode}`);
	} else if (!/^application\/json/.test(contentType)) {
		error = new Error(`Invalid content-type.\n` +
						`Expected application/json but received ${contentType}`);
	}
	if (error) {
		console.log(error.message);
		// consume response data to free up memory
		res.resume();
		return;
	}

	res.setEncoding('utf8');
	let rawData = '';
	res.on('data', (chunk) => rawData += chunk);
	res.on('end', () => {
		try {
			let parsedData = JSON.parse(rawData);
			defaultTitle = parsedData[0].title;

			if (parsedData[0].hasOwnProperty('players')) {
				var PLAYERS = parsedData[0].players;
			}

			ReactDOM.render(
				<App initialPlayers={PLAYERS} title={defaultTitle} />,
				document.getElementById('root')
			);
		} catch (e) {
			console.log(e.message);
		}
	});
});

req.on('error', (e) => {
	console.log(`problem with request: ${e}`);
});
