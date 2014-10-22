'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var TeachingAdvising = mongoose.model('TeachingAdvising');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		info: 'My teaching philosophy is...and I taught the following courses: '
		//philosophy: 'I have a dream',
		//supervising: 'about cake'
	});
	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.render( 'teachingAdvising/teachingAdvising.tex', TeachingAdvising, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};