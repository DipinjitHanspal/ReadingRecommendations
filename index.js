const express = require('express');
const bodyParser = require('body-parser');
const Papa = require('papaparse');
const fetch = require("node-fetch");
const fs = require('fs');
const file = fs.readFileSync('data/books.csv', 'utf-8');

const config = {
	delimiter: ",",	// auto-detect
	newline: "\n",	// auto-detect
	quoteChar: '"',
	escapeChar: '"',
	header: false,
	transformHeader: undefined,
	dynamicTyping: false,
	preview: 0,
	encoding: "",
	worker: false,
	comments: false,
	step: undefined,
	complete: undefined,
	error: undefined,
	download: false,
	downloadRequestHeaders: undefined,
	skipEmptyLines: false,
	chunk: undefined,
	fastMode: undefined,
	beforeFirstChunk: undefined,
	withCredentials: undefined,
	transform: undefined,
	delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile('public/index.html');
});

app.get('/books', (req, res) => {
	const d = Papa.parse(file, {
		worker: true,
		delimeter: ",",
		newline: "\n",
		header: true,
		complete : function(result) {
			// console.log(result.data)
			res.json(result.data[20])
		}
	})
});

app.listen(3000, () => console.log('server started'));
