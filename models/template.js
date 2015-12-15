var mongoose = require('mongoose');

var TemplateSchema = new mongoose.Schema({
  name: String,
  description: String,
  mobile: String,
  desktop: String,
  freeLink: Number,
  paidLink: String
});

module.exports = mongoose.model('Template', TemplateSchema);