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
		/*intro: 'This is a summary of my contributions',
		examples: [{
			title: 'First Title',
			body: 'body'
		},
		{
			title: 'Second Title',
			body: 'different body'
		}],
		conclusion: 'In conclusion, that is what I did',
		works: [{
			title: 'Gossip-based computation of aggregate information',
			citations: 937
		},
		{
			title: 'Processing complex aggregate queries over data streams',
			citations: 330
		}],
		totalCitations: 1824,
		h_index: 14,
		i_index: 21,
		website: 'http://scholar.google.com/citations?user=smEOOBsAAAAJ'*/
		info: 'I made the following contributions....'
	});

	return obj;
}

/*
rearrange data, pass in additional fields

function passObj(objArray) {
	return {'contributions': objArray};
}*/

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.render( 'contribution/contribution.tex', Contribution, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};
