import React, { Component } from 'react';
import './App.css';


class Counter extends Component {


	static propTypes = {
		score: React.PropTypes.number.isRequired,
		onChange: React.PropTypes.func,
	}

	render() {
		return (
			<div className="Player-buttons">
				<div className="button button-down" onClick={function(){this.props.onChange(-1);}.bind(this)}>
					<i className="fa fa-minus fa-fw"></i>
				</div>
				<div className="Player-score Player-text">
					{this.props.score}
				</div>
				<div className="button button-up" onClick={function(){this.props.onChange(1);}.bind(this)}>
					<i className="fa fa-plus fa-fw"></i>
				</div>
			</div>
		);
	}
}


export default Counter;
