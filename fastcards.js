//requirements
const express = require('express');
require('dotenv').config();
const scraper = require('./scraper.js');

//initialization
const PORT = process.env.PORT | 3000;
let app = express();

app.use(express.static("public"));
app.use(express.json());

//static files
app.get('/statics/:page/:file', (req, res) => {
    res.sendFile(__dirname + `/${req.params.page}` + `/${req.params.file}`);
});

//routes
app.get(['/', '/home'], (req, res) => {
    res.sendFile(`${__dirname}/statics/home/index.html`);
});

app.listen(PORT);
console.log(`FastCards has started and is listening on port ${PORT}.`);