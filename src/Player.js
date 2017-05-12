import React, { Component } from 'react';
import './App.css';
import Counter from './Counter';



class Player extends Component {


	static propTypes = {
		name: React.PropTypes.string.isRequired,
		score: React.PropTypes.number.isRequired,
		onScoreChage: React.PropTypes.func,
	}

	render() {
		return (
			<div className="Player">
				<div className="Player-name Player-text">
					{this.props.name}
				</div>
				<div className="Player-score Player-text">
					{this.props.score}
				</div>
				<Counter score={this.props.score} onChange={this.props.onScoreChange}/>
			</div>
		);
	}
}


export default Player;
