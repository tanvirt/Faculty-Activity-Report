'use strict';

var mongoose = require('mongoose');
var modelClass = require('../modelClass');

// Compile Schema into Model here
var CreativeWorks = mongoose.model('CreativeWorks');
var renderModel = new modelClass.RenderModel(CreativeWorks, 'creativeWorks/creativeWorks.tex', 'creativeWorks/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

renderModel.setDebugPopulate(false, {
	//sub: [{
		name: 'LaTeX',
		description: 'a high-quality typesetting system',
		website: 'http://www.latex-project.org',
		date: '10/20/1984',
		jointEfforts: ['George', 'Gandalf', 'Rebecca']
	/*},
	{
		name: 'Amazon',
		description: 'an American international electronic commerce company',
		website: 'http://www.amazon.com',
		date: '7/5/1994',
		jointEfforts: ['George', 'Balrog', 'Aeowen']
	},
	{
		name: 'Microsoft',
		description: 'an American multinational corporation ',
		website: 'http://www.microsoft.com/',
		date: '4/04/1975',
		jointEfforts: ['George', 'Gandalf', 'Rebecca', 'Aragorn']
	}]*/
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
	renderModel.render(req, callback);
};

module.exports.submit = function(req, callback) {
	/*if (is.empty(req.body.creativeWorks)) return callback(null, null);

	var creative = new CreativeWorks({
		sub: [],
		user: req.user
	});

	for (var i=0; i<req.body.creativeWorks.length; i++) {
		var path = req.body.creativeWorks[i];
		var subdoc = {
			name: path.name,
			description: path.description,
			website: path.website,
			jointEfforts: path.jointEfforts,
			date: path.date
		};

		creative.sub.push(subdoc);
	}

	creative.save(function(err) {
		callback(err, creative);
	});
*/
	callback(null, null);
};

module.exports.createDefaultData = function(report, user, cb) {

	var creativeWorks;

	for (var i=0; i<defaultData.creativeWorks.length; i++) {
		var save = _.extend(defaultData.creativeWorks[i], {
			report: report,
			user: user
		});

		creativeWorks = new CreativeWorks(save);
		creativeWorks.save();
	}	

	cb(null, creativeWorks);
};
