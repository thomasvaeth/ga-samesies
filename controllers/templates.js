var express = require('express');
var Template = require('../models/template');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Template.find(function(err, templates) {
      if (err) return res.status(500).send(err);
      res.send(templates);
    });
  })
  .post(function(req, res) {
    Template.create(req.body, function(err, template) {
      if (err) return res.status(500).send(err);
      res.send(template);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Template.findById(req.params.id, function(err, template) {
      if (err) return res.status(500).send(err);
      res.send(template);
    });
  })
  .put(function(req, res) {
    Template.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;