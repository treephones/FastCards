//requirements
const express = require('express');

let app = express();

app.use(express.static("public"));
app.use(express.json());

//static files
app.get('/statics/:page/:file', (req, res) => {
    res.sendFile(__dirname + `/${req.params.page}` + `/${req.params.file}`);
});
