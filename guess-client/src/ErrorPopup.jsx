import React, {Component} from 'react';
import './ErrorPopup.css';

// Component
import Button from './Button';

// Auxiliary functions
import {reloadPage} from './script/auxFunc.js';

class ErrorPopup extends Component {
	constructor(props) {
		super(props);

		this.rebootGame = this.rebootGame.bind(this);
		this.resetGuess = this.resetGuess.bind(this);
	}

	rebootGame() {
		reloadPage();
	}

	resetGuess() {
		this.props.onClearError();
	}

	render() {
		const msgType = (this.props.message).startsWith('Init') ? true : false;

		return (
			<div className="error-popup popup-change">
				<div className="mask"></div>
				<div className="popup">
					<span>{this.props.message}</span>
					<Button text={msgType ? 'Reload' : 'Guess Again'}
						onClick={msgType ? this.rebootGame : this.resetGuess} />
				</div>
			</div>
		)
	}
}

export default ErrorPopup;