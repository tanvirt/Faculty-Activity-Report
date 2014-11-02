'use strict';

var mongoose = require('mongoose');
var Conferences = mongoose.model('Conferences');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( Conferences, 'conferences/conferences.tex', 'conferences/na.tex');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	sub: [{
		area: 'State',
		presentation: 'Poster',
		title: 'Test Conference Data',
		date: 'October 12, 2001',
		where: 'Somewhere. Earth.'
	},
	{
		area: 'International',
		presentation: 'Speech',
		title: 'Test Conference Data 2',
		date: '9/01/2000',
		where: 'Mars'
	}]
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
	renderModel.render(req, callback);
};

/*
Gets the data from the frontend and
saves it in the database.
*/
module.exports.submit = function(req, callback) {
	if (!req.body.conferences)
		return;

	var arr = [];

	for(var i=0; i<req.body.conferences.length; i++) {
		var path = req.body.conferences[i];
		var subdoc = {
			area: path.area,
			presentation: path.presentation,
			title: path.title,
			date: path.date,
			where: path.where
		};
		arr.push(subdoc);
	}

	var c = new Conferences({
		sub: arr,
		user: req.user
	});
		
	c.save(function(err) {
		callback(err, c);
	});	
};

