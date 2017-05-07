import React, { Component } from 'react';
import './App.css';
import Counter from './Counter';



class Player extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			score: this.props.score
		}
	}

	propTypes = {
		name: React.PropTypes.string.isRequired,
		score: React.PropTypes.number.isRequired,
	}

	render() {
		return (
			<div className="Player">
				<div className="Player-name Player-text">
					{this.props.name}
				</div>
				<div className="Player-score Player-text">
					{this.state.score}
				</div>
				<Counter score={this.state.score}/>
			</div>
		);
	}
}


export default Player;
