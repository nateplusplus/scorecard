import React, { Component } from 'react';
import './App.css';


class Counter extends Component {

	constructor(props) {
		super(props);
		this.state = {
			score: this.props.score
		}
	}

	increment() {
		console.log('TODO: Increment Score');
	}

	decrement() {
		console.log('TODO: Decrement Score');
	}

	propTypes = {
		score: React.PropTypes.number.isRequired,
	}

	render() {
		return (
			<div className="Player-buttons">
				<div className="button button-up" onClick={() => this.increment()}>
					<i className="fa fa-chevron-up fa-fw"></i>
				</div>
				<div className="button button-down" onClick={() => this.decrement()}>
					<i className="fa fa-chevron-down fa-fw"></i>
				</div>
			</div>
		);
	}
}


export default Counter;
