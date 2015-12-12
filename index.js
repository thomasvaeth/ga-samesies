var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
	res.send('Samesies.');
});

app.listen(port, function() {
	console.log('I charge $' + port + ' a template.');
});