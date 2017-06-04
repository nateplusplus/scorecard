import React, { Component } from 'react';
import './App.css';
import Player from './Player';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: this.props.initialPlayers,
			title: this.props.title
		};
	}

	static propTypes = {
		title: React.PropTypes.string,
		url: React.PropTypes.string.isRequired,
		initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
			id: React.PropTypes.number.isRequired,
			name: React.PropTypes.string.isRequired,
			score: React.PropTypes.number.isRequired,
		})).isRequired,
	}

	onScoreChange = function(playerId, delta) {
		const players = this.state.players;
		players.map(function(player, index){
			if (player.id === playerId) {
				player.score += delta;

				// Send data to our api to save
				var url = "http://localhost:55414/update/" + this.props.url + "/player/" + playerId;

				// var http = require('http');
				// var req = http.post(url, (res) => {
				// 	const statusCode = res.statusCode;
				// 	const contentType = res.headers['content-type'];
				// 
				// 	let error;
				// 	if (statusCode !== 200) {
				// 		error = new Error(`Request Failed.\n` +
				// 											`Status Code: ${statusCode}`);
				// 	} else if (!/^application\/json/.test(contentType)) {
				// 		error = new Error(`Invalid content-type.\n` +
				// 						`Expected application/json but received ${contentType}`);
				// 	}
				// 	if (error) {
				// 		console.log(error.message);
				// 		// consume response data to free up memory
				// 		res.resume();
				// 		return;
				// 	}
				// 
				// 	res.setEncoding('utf8');
				// 	let rawData = '';
				// 	res.on('data', (chunk) => rawData += chunk);
				// 	res.on('end', () => {
				// 		try {
				// 			let parsedData = JSON.parse(rawData);
				// 			console.log(parsedData);
				// 		} catch (e) {
				// 			console.log(e.message);
				// 		}
				// 	});
				// });

				this.setState({ players });
			
			}
		}.bind(this));
	}

	render() {
		return (
			<div className="App-container">
				<div className="App-wrapper">
					<div className="Scoreboard">
						<div className="Scoreboard-header">
							<h3 className="Scoreboard-title">
								{this.props.title}
							</h3>
						</div>
						<div className="Scoreboard-list">
							{this.state.players.map(function(player, index) {
								return <Player
											onScoreChange={
												function(delta) {
													this.onScoreChange(player.id, delta);
												}.bind(this)
											}
											name={player.name}
											score={player.score}
											key={player.id}
										/>
							}.bind(this))}
							<div className="Player Player-add">
								<div className="Player-name Player-text">
									Add Player +
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default App;
