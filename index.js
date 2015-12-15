var express = require('express');
var app = express();
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var port = process.env.PORT || 3000;

var secret = process.env.SECRET;

var Customer = require('./models/customer');
// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/customers');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/customers', expressJWT({secret: secret})
.unless({path: ['/api/customers'], method: 'post'}));


app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
});

app.use('/api/customers', require('./controllers/users'));

app.post('/api/auth', function(req, res) {
	Customer.findOne({email: req.body.email}, function(err, user) {
		if (err || !user) return res.send({message: 'User not found'});
		user.authenticated(req.body.password, function(err, result) {
			if (err || !result) return res.send({message: 'User not authenticated'});

      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
		});
	});
});

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, function() {
	console.log('I charge $' + port + ' a template.');
});