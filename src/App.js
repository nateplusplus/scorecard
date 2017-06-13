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
				var http = require('http');

				// Storing this stuff in variables so we can change it on local vs production server
				var host = "localhost",
					port = 55414,
					postData = JSON.stringify([{"score" : player.score}]),
					options = {
						method	 : 'POST',
						hostname : host,
						port	 : port,
						path 	 : "/update/" + this.props.url + "/player/" + playerId + "/score",
						headers: {
							'Content-Type': 'application/json'
						}
					};

				var req = http.request( options );

				// Handle Errors
				req.on('error', (e) => {
					console.log(e);
					console.log(`problem with request: ${e.message}`);
				});

				// write data to request body
				req.write(postData);
				req.end();

				// Now set the state for our player score in local storage
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
