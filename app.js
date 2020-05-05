const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const books = [];


app.post('/book', (req, res, next) => {
    books.push({title: req.body.title, summary: req.body.summary});    
    res.render('output', {title: 'output', book: books });    
});

app.get('/', (req, res, next) => { 
    res.render('home'); 
});

app.listen(3000);