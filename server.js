const express = require('express');
const bodyParser = require('body-parser');

const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const WordPOS = require ('wordpos');
const wordpos = new WordPOS();
// const classifier = new natural.BayesClassifier();
// const spellCheck = new natural.Spellcheck();

const app = express();

app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('AHHHHHHHHHHHHHHHHHH');
});

app.get('/api/parseInput/:input', (req, res) => {
	const input = req.params.input;
	const tokens = tokenizer.tokenize(input);

	wordpos.getNouns(tokens, (nouns) => {
		wordpos.lookupNoun(nouns[0], (noun) => {
			console.log(`${JSON.stringify(noun[0].synonyms)}`);
			res.send(`${JSON.stringify(noun[0].synonyms)}`);
		});
	});

});

app.listen(3000, () => {
	console.log('Active on port: 3000');
});
