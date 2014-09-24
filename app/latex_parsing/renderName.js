'use strict';

var swig = require('swig');
var fs = require('fs');


fs.writeFile('resultName.tex', swig.renderFile('name.tex', {

	firstName: 'Full',
	lastName: 'Name',
	displayName: 'Full Name',
	email: 'test@test.com',
	username: 'username',
	password: 'password',
	provider: 'local'

}), function(err) {
		if (err) throw err;
		console.log('SAVED.');
});