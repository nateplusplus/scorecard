import React, { Component } from 'react';
import './App.css';


class Counter extends Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		score: this.props.score
	// 	}
	// }

	propTypes = {
		score: React.PropTypes.number.isRequired,
		onChange: React.PropTypes.func.isRequired,
	}

	render() {
		return (
			<div className="Player-buttons">
				<div className="button button-up" onClick={function(){this.props.onChange(1);}.bind(this)}>
					<i className="fa fa-chevron-up fa-fw"></i>
				</div>
				<div className="button button-down" onClick={function(){this.props.onChange(-1);}.bind(this)}>
					<i className="fa fa-chevron-down fa-fw"></i>
				</div>
			</div>
		);
	}
}


export default Counter;
