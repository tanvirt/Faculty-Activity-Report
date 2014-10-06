'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var Contribution = mongoose.model('Contribution');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		intro: 'This is a summary of my contributions',
		examples: [],
		conclusion: 'In conclusion, that is what I did',
		works: [],
		totalCitations: 1824,
		h_index: 14,
		i_index: 21,
		website: 'http://scholar.google.com/citations?user=smEOOBsAAAAJ'
	});
	obj.examples.push('First Title', 'body');
	obj.examples.push('Second Title', 'different body');
	obj.works.push('Gossip-based computation of aggregate information', 937);
	obj.works.push('Processing complex aggregate queries over data streams', 330);

	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function(callback) {
	renderModel.renderMultiple('contribution/Contribution.tex', Contribution, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};
