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

var defaultTitle = "Simple Scoreboard";

var http = require('http');
var req = http.get('http://localhost:55414', (res) => {
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
