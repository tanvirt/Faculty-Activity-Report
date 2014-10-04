'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var Name = mongoose.model('NameSchema');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		firstName: 'Rosie',
		midInit: 'T',
		lastName: 'Poodle'
	});
	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.render( 'name/name.tex', Name, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};