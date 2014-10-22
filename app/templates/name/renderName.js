'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var Name = mongoose.model('Name');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		firstName: 'Rosie',
		middleName: 'T',
		lastName: 'Poodle'
	});
	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (req, callback) {
	renderModel.renderUser( req, 'name/name.tex', Name, dummyObject, function ( renderStr ) {
		console.log('renderStr: ' + renderStr);
		callback(null, renderStr);
	});
};

/*
Submits the data into the database
*/
module.exports.submit = function(req, callback) {
	var name = new Name({
		firstName: req.body.firstName,
		middleName: req.body.middleName,
		lastName: req.body.lastName,
		user: req.user
	});

	name.save(function(err) {
		callback(null, name);
	});
};