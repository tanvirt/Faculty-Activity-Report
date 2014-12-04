'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var Publication = mongoose.model('Publication');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( Publication, 'publication/publication.tex', 'publication/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	info: 'I published stuff'
});

/*
will explicitly print the N/A latex
to the screen for debugging purposes
*/
renderModel.isDebugNull = false;

/*
render function that finds the obj in the database
and converts it into latex.
*/
module.exports.render = function(req, callback) {
	renderModel.renderHTML(req, callback);
};

module.exports.submit = function(req, callback) {
	if (is.empty(req.body.publication)) return callback(null, null);

	var publication = new Publication({
		info: req.body.publication.info,
		user: req.user		
	});

	publication.save(function(err) {
		callback(err, publication);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.publications, {
		report: report,
		user: user
	});

	var publications = new Publication(save);

	publications.save(function(err) {
		cb(err, publications);
	});
};

module.exports.createPrevious = function(report, user, prevId, cb) {
	renderModel.createPrevious(Publication, {publication: undefined}, report, user, prevId, cb);
};
