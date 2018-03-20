// --- Global ---
let results = [];
let wordId = '';
let guess = ''; 

// --- Elements ---
const elements = {
	input: document.querySelector('input'),
	guess: document.querySelector('button'),
	history: document.querySelector('.history')
}

// --- Event listener ---
function setEventListener() {
	elements.guess.addEventListener('click', guessHandle);
}

// --- Handler --
function guessHandle() {
	guess = elements.input.value.toUpperCase();

	let data = {
		guess,
		wordId
	};

	callPostRequest('/guessCheck', data)
	.then(json => {
		results.push(json);
		render();
	})
	.catch(error => {
		console.log(error);
	})
}

// --- Request caller --- 
function callGetRequest(url) {
	return fetch(url)
	.then( res => {
		if(res.ok) {
			return res.json();
		}
		return Promise.reject('error-response-not-ok');
	})
	.catch( error => {
		if (erro.toString().startsWith('error-')) {
			return Promise.reject(error);
		}
		return Promise.reject('error-response-json-bad');
	});
}

function callPostRequest(url, data) {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers({'Content-Type': 'application/json'})
	})
	.then( res => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(res.status);
	})
	.catch( error => {
		return Promise.reject('error-response-json-bad');
	});
}

// --- Page render ---
function render() {
	records = '';
	for (let result of results) {
		records += `<li>${result.guess} - ${result.similar} - ${result.win}</li>`;
	}

	elements.history.innerHTML = records;
}

// --- Init ---
function init() {
	callGetRequest('/pickword')
	.then(json => {
		wordId = json.wordId;
	})
	.catch(error => {
		console.log(error);
	})
}

init();
setEventListener();