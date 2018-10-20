const express = require('express');
const bodyParser = require('body-parser');
const contactRout = require('./routes/contact.route'); // Imports routes for the products
const app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', contactRout);
app.listen(3000, function(err, res) {
    if(err) return console.error(err);
    console.log('Application started...')
});