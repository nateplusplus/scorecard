import React, { Component } from 'react';
import './App.css';
import Counter from './Counter';



class Player extends Component {


	static propTypes = {
		name: React.PropTypes.string.isRequired,
		score: React.PropTypes.number.isRequired,
		onScoreChange: React.PropTypes.func,
		onNameChange: React.PropTypes.func,
		onNameBlur: React.PropTypes.func,
	}

	render() {
		return (
			<div className="Player">
				<input
					className="Player-name Player-text"
					value={this.props.name}
					onChange={function(event) { this.props.onNameChange(event.target.value); }.bind(this)}
					onBlur={function(event) { this.props.onNameBlur(event); }.bind(this)}
				/>
				<Counter score={this.props.score} onScoreChange={this.props.onScoreChange}/>
			</div>
		);
	}
}


export default Player;
