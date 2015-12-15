var express = require('express');
var Customer = require('../models/customer');
var router = express.Router();

router.route('/')
.get(function(req, res) {
	Customer.find(function(err, customers) {
		if (err) return res.status(500).send(err);
		res.send(customers);
	});
})
.post(function(req, res) {
	Customer.find({email: req.body.email}, function(err, customer) {
		if (customer.length > 0) {
			return res.send({message: 'That email address is already registered.'});
		} else {
			Customer.create(req.body, function(err, customer) {
				if (err) return res.status(500).send(err);
				res.send(customer);
			});
		}
	})
});

router.get('/:id', function(req, res) {
	Customer.findById(req.params.id, function(err, customer) {
		if (err) return res.status(500).send(err);
		res.send(customer);
	});
});

module.exports = router;