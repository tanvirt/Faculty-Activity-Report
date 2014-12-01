'use strict';

var mongoose = require('mongoose');
var modelClass = require('../modelClass');

// Compile Schema into Model here
var Patents = mongoose.model('Patents');
var renderModel = new modelClass.RenderModel(Patents, 'patents/patents.tex', 'patents/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

renderModel.setDebugPopulate(false, {
	title: 'Patent',
	authors: ['Me', 'Myself', 'I'],
	patentNumber: '1234',
	date: '12/31/1999',
	description: 'I saved the world'
});

renderModel.isDebugNull = false;

/*
rearrange data, pass in additional fields

function passObj(objArray) {
	return {'works': objArray, 'len':objArray.length};
}

*/

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function(req, callback) {
	renderModel.renderMultiple(req, callback);
};

module.exports.submit = function(req, callback) {
/*	if (is.empty(req.body.patents)) return callback(null, null);

	var patent = new Patents({
		sub: [],
		user: req.user
	});

	for (var i=0; i<req.body.patents.length; i++) {
		var path = req.body.patents[i];
		var subdoc = {
			title: path.title,
			authors: path.authors,
			patentNumber: path.patentNumber,
			date: path.date,
			description: path.description
		};

		patent.sub.push(subdoc);
	}

	patent.save(function(err) {
		callback(err, patent);
	});
*/
};

module.exports.createDefaultData = function(report, user, cb) {
	var patents;

	for (var i=0; i<defaultData.patents.length; i++) {
		var save = _.extend(defaultData.patents[i], {
			report: report,
			user: user
		});

		patents = new Patents(save);
		patents.save();
	}	

	cb(null, patents);
};
