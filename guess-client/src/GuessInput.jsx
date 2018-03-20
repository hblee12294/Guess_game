import React, {Component} from 'react';
import './GuessInput.css';

// Components
import Button from './Button';

class GuessInput extends Component {
	constructor(props) {
		super(props);

		this.enterPress = this.enterPress.bind(this);
		this.getInputValue = this.getInputValue.bind(this);
	}

	enterPress(event) {
		if (event.key === "Enter") {
			this.props.onGuess();
		}
	}

	getInputValue(event) {
		this.props.onUpdateGuess(event.target.value);
	}

	render() {
		return (
			<div className="guess-input">
				<input type="text" 
					value={this.props.guessWord}
					placeholder="Enter a 5-character word" 
					maxLength="5"
					disabled={this.props.winStatus}
					onKeyPress={this.enterPress}
					onChange={this.getInputValue}
				/>
				<Button text={this.props.winStatus ? 'Reset' : 'Guess'} 
					onClick={this.props.winStatus ? this.props.onReset : this.props.onGuess} />
			</div>
		);
	}
}

export default GuessInput;