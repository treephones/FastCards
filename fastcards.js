//requirements
const express = require('express');
const rateLimiter = require('express-rate-limit');
require('dotenv').config();
const scraper = require('./scraper.js');

//initialization
const PORT = process.env.PORT || 3000;

const rateLimit = rateLimiter({
    windowMs: 60000,
    max: 20,
    message: {err: 'Too many requests! To recieve unlimited key, message Treephones#4601 on discord.'}
});

let app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rateLimit);

//static files
app.get('/statics/:page/:file', (req, res) => {
    res.sendFile(__dirname + `/${req.params.page}` + `/${req.params.file}`);
});

//routes
app.get(['/', '/home'], (req, res) => {
    //homepage to come
    res.sendFile(`${__dirname}/statics/home/index.html`);
});

app.post('/api/flashcards', (req, res) => {
    let r = req.body;
    if(!r.query) {
        res.statusCode = 400;
        res.json({err: "'query' header is required in request."});
        return;
    }
    try {
        scraper.getFlashcardResponse(r.query.replace(" ", "+"), r.max ? r.max : 10).then((response) => {
            if(response.number_of_flashcards > 0) {
                res.statusCode = 200;
                res.json(response);
            }
            else {
                res.statusCode = 404;
                res.json({err: `Flashcards for '${r.query}' could not be found.`});
            }
        });
    }
    catch(e) {
        res.statusCode = 500;
        res.json({err: "Something went wrong while processing that request."});
    }
});

app.listen(PORT);
console.log(`FastCards has started and is listening on port ${PORT}.`);