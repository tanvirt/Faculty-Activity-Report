'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var CurrentRank = mongoose.model('currentRank');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		rank: 'chairperson',
		department:'Computer and Informational Science and Engineering'
	});
	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.render( 'currentRank/currentRank.tex', CurrentRank, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};
