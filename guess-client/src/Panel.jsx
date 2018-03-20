import React, {Component} from 'react';
import './Panel.css';

// Components
import ErrorPopup from './ErrorPopup'
import Billboard from './Billboard';
import GuessInput from './GuessInput';
import History from './History';

// Auxiliary functions
import  {scrollBottom} from './script/auxFunc.js';

// Services functions
import {callGetRequest, callPostRequest} from './script/services.js';

class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			records: [],
			wordId: null,
			guess: '',
			win: false,
			errorMsg: ''
		};

		this.updateGuess = this.updateGuess.bind(this);
		this.guessHandle = this.guessHandle.bind(this);
		this.gameReset = this.gameReset.bind(this);
		this.clearError = this.clearError.bind(this);
	}

	componentWillMount() {
		callGetRequest('/pickWord')
		.then( word => {
			if (word.wordId >= 0) {
				this.setState({
					wordId: word.wordId
				});
			}
			else {
				this.setState({
					wordId: -1,
					errorMsg: 'Oops! it seems that the secret word lost.'
				});
			}
		})
		.catch( error => console.log(error) );
	}

	// Guess process
	guessHandle() {
		if (this.state.guess.length !== 5) {
			return;
		}

		callPostRequest('/guessCheck', {
			guess: this.state.guess,
			wordId: this.state.wordId
		})
		.then( result => {
			if (result) {
				this.setState({
					records: [...this.state.records, result],
					win: result.win,
					guess: ''
				});
				scrollBottom();
			}
			else {
				this.setState({
					errorMsg: 'Oops! Server might take a short nap.'
				});
			}
		})
		.catch( error => console.log(error) );
	}

	gameReset() {
		this.setState({
			records: [],
			word: '',
			guess: '',
			win: false,
			errorMsg: ''
		})
	}

	updateGuess(guess) {
		this.setState({
			guess: guess.toUpperCase()
		});
	}

	clearError() {
		this.setState({
			errorMsg: '',
			guess: ''
		});
	}

	render() {
		let errorPopup = null;
		if (this.state.errorMsg !== '') {
			errorPopup = (
				<ErrorPopup message={this.state.errorMsg} onClearError={this.clearError} />
			)
		}

		return (
			<div className="panel">
				{errorPopup}
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