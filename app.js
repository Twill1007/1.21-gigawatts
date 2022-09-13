const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewURLParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connect;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Databse connected');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log('serving on port 3000');
});

