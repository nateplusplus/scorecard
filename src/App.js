import React, { Component } from 'react';
import './App.css';
import Player from './Player';


class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			players: this.props.initialPlayers,
			title: this.props.title
		}

		this.onScoreChange = this.onScoreChange.bind(this)
		this.handleTitleChange = this.handleTitleChange.bind(this)
		this.handleTitleBlur = this.handleTitleBlur.bind(this)
		this.handleNameChange = this.handleNameChange.bind(this)
		this.handleNameBlur = this.handleNameBlur.bind(this)
		this.addPlayerRow = this.addPlayerRow.bind(this)

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

	static saveValue = false;

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

	handleTitleChange = function(event) {
		this.setState({ "title" : event.target.value });
		// Take note of this change so we no to send to backend
		this.saveValue = true;
	}

	handleTitleBlur = function(event) {

		// First check if there's anything to save
		if (this.saveValue) {
			// Send data to our api to save
			var http = require('http');

			// Storing this stuff in variables so we can change it on local vs production server
			var host = "localhost",
				port = 55414,
				postData = JSON.stringify([{"title" : this.state.title}]),
				options = {
					method	 : 'POST',
					hostname : host,
					port	 : port,
					path 	 : "/update/" + this.props.url,
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

			this.saveValue = false;
		}
	}


	handleNameChange = function(playerId, value) {
		const players = this.state.players;
		players.map(function(player, index){
			if (player.id === playerId) {
				player.name = value;
				this.setState({ players });
				this.saveValue = true;
			}
		}.bind(this));
	}

	handleNameBlur = function(playerId, event) {

		// First check if there's anything to save
		if (this.saveValue) {
			// Send data to our api to save
			var http = require('http');

			// Storing this stuff in variables so we can change it on local vs production server
			var host = "localhost",
				port = 55414,
				postData = JSON.stringify( [{ "player_id" : playerId, "player" : this.state.players[playerId] }] ),
				options = {
					method	 : 'POST',
					hostname : host,
					port	 : port,
					path 	 : "/update/" + this.props.url,
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

			this.saveValue = false;
		}
	}


	addPlayerRow = function() {
		// Add an empty player to the players array
		var players = this.state.players,
			maxId = 0;
		
		// Find the highest id for this scorecard (some players could have been removed)
		players.map(function(player, index){
			if (maxId < player.id) {
				maxId = player.id;
			}
			return true;
		});
		
		players.push({
			"id"   : maxId+1,
			"name" : "New Player",
			"score": 0,
		});
		this.setState({ players });
		console.log(this.state.players);
	}


	render() {
		return (
			<div className="App-container">
				<div className="App-wrapper">
					<div className="Scoreboard">
						<div className="Scoreboard-header">
							<input
								type="text"
								className="Scoreboard-title"
								value={this.state.title}
								onChange={this.handleTitleChange}
								onBlur={this.handleTitleBlur}
							/>
						</div>
						<div className="Scoreboard-list">
							{this.state.players.map(function(player, index) {
								return <Player
											onScoreChange={
												function(delta) {
													this.onScoreChange(player.id, delta);
												}.bind(this)
											}
											onNameChange={
												function (value) {
													this.handleNameChange(player.id, value);
												}.bind(this)
											}
											onNameBlur={
												function (event) {
													this.handleNameBlur(player.id, event);
												}.bind(this)
											}
											name={player.name}
											score={player.score}
											key={player.id}
										/>
							}.bind(this))}
							<div className="Player Player-add">
								<button className="Player-name Player-text" onClick={this.addPlayerRow}>
									Add Player +
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default App;
