const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('AHHHHHHHHHHHHHHHHHH');
});

app.listen(3000, () => {
	console.log('Active on port: 3000');
});
