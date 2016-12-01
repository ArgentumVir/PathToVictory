const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('AHHHHHHHHHHHHHHHHHH');
});

app.get('/api/test', (req, res) => {
	res.send('WWWWWWWWWWWW');
});

app.listen(3000, () => {
	console.log('Active on port: 3000');
});
