var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var bcrypt = require('bcrypt');

var passwordValidator = [
	validate({
		validator: 'isLength',
		arguments: [8, 99]
	})
];

var emailValidator = [
	validate({
		validator: 'isEmail'
	})
];

var CustomerSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		validate: emailValidator
	},
	password: {
		type: String,
		required: true,
		validate: passwordValidator
	}
});

CustomerSchema.set('toJSON', {
	transform: function(doc, ret, options) {
		var returnJson = {
			id: ret._id,
			firstName: ret.firstName,
			lastName: ret.lastName,
			email: ret.email
		};
		return returnJson;
	}
});

CustomerSchema.methods.authenticated = function(password, callback) {
	bcrypt.compare(password, this.password, function(err, res) {
		if (err) {
			callback(err);
		} else {
			callback(null, res ? this : false);
		}
	});
}

CustomerSchema.pre('save', function(next) {
	if (!this.isModified('password')) {
		next();
	} else {
		this.password = bcrypt.hashSync(this.password, 10);
		next();
	}
});

module.exports = mongoose.model('Customer', CustomerSchema);