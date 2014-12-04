'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error('\x1b[31m', 'Could not connect to MongoDB!');
		console.log(err);
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);

// Add Root User on StartUp
var User = mongoose.model('User');

User.find({username:'admin'}, function(err, results) {
	if (err) {
		console.log('Finding Root Admin Failed.');
		console.log(err);
		return;
	}

	if (results.length > 1) {
		console.log('More than one Root Admin is Defined!');
		return;
	}

	if (results.length === 0) {
		var user = new User({
			firstName: 'FirstName',
			lastName: 'LastName',
			email: 'admin@admin.com',
			username: 'admin',
			password: 'password',
			roles: ['user', 'admin'],
			provider: 'local'
		});

		user.save(function(err) {
			if (err) {
				console.log('Error Saving Root Admin');
				console.log(err);
			}
		});
	}
});
