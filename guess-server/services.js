// --- Data ---
const wordlist = require('./wordlist.js');

// Notice: 'encryptedWords' is an object
const encryptedWords = (() => {
	let idlist = [];
	for (let i = 0; i < wordlist.length; ++i) {
		idlist.push(i);
	}

	let tempWordlist = {};
	for (let word of wordlist) {
		let index = Math.floor(Math.random() * idlist.length);
		let id = idlist[index];
		tempWordlist[id] = word;
		idlist.splice(index,1);
	}

	return tempWordlist;
})();


// --- Auxiliary functions for guessCheck() ---
const compareMatchings = (guess, word) => {
		let arrChars = guess.split('');
		let i = 0;

		for (let char of word) {
			i = arrChars.indexOf(char);
			if (i >= 0) {
				arrChars.splice(i, 1);
			}
		}

		return guess.length - arrChars.length;
};

const compareLetters = (guess, word) => {
	let result = {};

	if (guess === word) {
		result.win = true;
		result.similar = guess.length;
	}
	else {
		result.win = false;
		result.similar = compareMatchings(guess, word);
	}
	result.guess = guess;

	return result;
};


// --- Services interfaces ---
const services = {
	pickWord: () => {
		const wordId = Math.floor(Math.random() * wordlist.length);
		console.log(`Secret word: ${encryptedWords[wordId]} (${wordId})`);
		return wordId;
	},
	guessCheck: ({guess, wordId}) => {
		const result = compareLetters(guess, encryptedWords[wordId]);
		return result;
	},
	getWordlist: () => {
		return wordlist;
	}
};

module.exports = services;