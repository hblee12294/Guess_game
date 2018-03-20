// --- Init ---
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(bodyParser.json({extended: true, type: '*/*'}));

// Services functions
const services = require('./services');


// --- Route handles ---
app.get('/pickWord', (req, res) => {
	res.send({wordId: services.pickWord()});
});

app.post('/guessCheck', (req, res) => {
	if (!req.body) {
		res.send(400, 'No-guess-data');
	}
	else {
		res.send(services.guessCheck(req.body));
	}
});

app.get('/getWordlist', (req, res) => {
	res.send(services.getWordlist());
});


// --- Test ---
app.get('/test', (req, res) => {
	res.send('Hello from express');
});


// --- Start ---
app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});