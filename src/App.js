import React, { Component } from 'react';
import './App.css';
import Player from './Player';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: this.props.initialPlayers
		}
	}

	propTypes = {
		title: React.PropTypes.string,
		players: React.PropTypes.arrayOf(React.PropTypes.shape({
			id: React.PropTypes.number.isRequired,
			name: React.PropTypes.string.isRequired,
			score: React.PropTypes.number.isRequired,
		})).isRequired,
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
							{this.state.players.map(function(player) {
								return <Player name={player.name} score={player.score} key={player.id} />
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default App;
