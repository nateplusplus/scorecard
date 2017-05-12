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
		initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
			id: React.PropTypes.number.isRequired,
			name: React.PropTypes.string.isRequired,
			score: React.PropTypes.number.isRequired,
		})).isRequired,
	}

	onScoreChange = function(index, delta) {
		const players = this.state.players;
		players[index].score += delta;

		this.setState({ players });
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
													this.onScoreChange(index, delta);
												}.bind(this)
											}
											name={player.name}
											score={player.score}
											key={player.id}
										/>
							}.bind(this))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default App;
