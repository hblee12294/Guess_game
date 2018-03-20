import React, {Component} from 'react';
import './Panel.css';

// Components
import Billboard from './Billboard';
import GuessInput from './GuessInput';
import History from './History';

// Functions
import {compareLetters, pickWord, scrollBottom} from './auxFunc';

class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			records: [],
			word: pickWord(),
			guess: '',
			win: false,
		};

		this.updateGuess = this.updateGuess.bind(this);
		this.guessHandle = this.guessHandle.bind(this);
		this.gameReset = this.gameReset.bind(this);
	}

	updateGuess(guess) {
		this.setState({
			guess: guess.toUpperCase()
		});
	}

	// Guess process
	guessHandle() {
		if (this.state.guess.length !== 5) {
			return;
		}

		const record = compareLetters(this.state.guess, this.state.word);
		this.setState({
			records: [...this.state.records, record],
			win: record.win,
			guess: ''
		});
		scrollBottom();
	}

	gameReset() {
		this.setState({
			records: [],
			word: pickWord(),
			guess: '',
			win: false
		})
	}

	render() {
		return (
			<div className="panel">
				<Billboard count={this.state.records.length} winStatus={this.state.win}/>
				<GuessInput
					guessWord={this.state.guess}
					winStatus={this.state.win} 
					onGuess={this.guessHandle}
					onUpdateGuess={this.updateGuess}
					onReset={this.gameReset}
				/>
				<History records={this.state.records} winStatus={this.state.win} />
			</div>
		)
	}
}

export default Panel;