var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

// var Customer = require('./models/customer');
// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/customers');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, function() {
	console.log('I charge $' + port + ' a template.');
});