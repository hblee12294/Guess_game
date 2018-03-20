// Data
import wordlist from './wordlist';

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

export const compareLetters = (guess, word) => {
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

export const pickWord = () => {
	const word = wordlist[Math.floor(Math.random() * wordlist.length)];
	console.log(word);
	return word;
}

export const scrollBottom = () => {
	const scroll = document.querySelector('.records');
	scroll.scrollTop = scroll.scrollHeight;
}