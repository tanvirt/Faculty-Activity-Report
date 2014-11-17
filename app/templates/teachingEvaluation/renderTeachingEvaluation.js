'use strict';

var mongoose = require('mongoose');
var modelClass = require('../modelClass');

// Compile Schema into Model here
var TeachingEvaluation = mongoose.model('TeachingEvaluation');
var renderModel = new modelClass.RenderModel(TeachingEvaluation, 'teachingEvaluation/teachingEvaluation.tex', 'teachingEvaluation/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
Populates the database with test data
*/
renderModel.setDebugPopulate(false, {
	//{
		course: 'testCourse1',
		year: 2003,
		semester: 'fall',
		enrolled: 100,
		responses: 30,
		teacherMean: [1,2,3,1,2,3,1,2,3],
		departmentMean: [2,3,4,2,3,4,2,3,4],
		collegeMean: [4,4,4,4,4,4,4,4,4]
	//}/*,
	/*
	{
		course: 'testCourse2',
		year: 2013,
		semester: 'spring',
		enrolled: 15,
		responses: 45,
		teacherMean: [1,2,3,1,2,3,1,3,4],
		departmentMean: [2,3,4,3,3,4,2,3,4],
		collegeMean: [4,1,4,1,4,3,4,4,2]
	}]*/
	// Methods Don't get called
	
});

renderModel.isDebugNull = false;

/*
function dummyObject(Model) {
	var obj = new Model({
		//teacher: 'testName',
		course: 'testCourse1',
		year: 2003,
		semester: 'fall',
		enrolled: 100,
		responses: 30,
		teacherMean: [1,2,3,1,2,3,1,2,3],
		departmentMean: [2,3,4,2,3,4,2,3,4],
		collegeMean: [4,4,4,4,4,4,4,4,4]
	});
	return obj;
}
*/


/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/

/*
module.exports.render = function (req, callback) {
	renderModel.findModelsByReport( req, 
	function(arrayOfObjs){
		return arrayOfObjs[0];
	},
	function(obj){
		renderModel.render({'evaluation': obj, 'sum': obj.findTotalMean()}, callback);
	});
};
*/


/*
module.exports.render = function(req, callback) {
	renderModel.render(req, callback);
};
*/
/*
module.exports.render = function(req, callback) {
	
	if(!renderModel.isDebugNull && !renderModel.isDebugPopulate) {
		renderModel.findOneModelByReport( req, function( obj ) {
			//renderModel.render({'evaluation': obj, 'sum': [11, 11, 11]}, callback);
			renderModel.render(obj, callback);
		});
		
	}
	else
		renderModel.render({}, callback);
};
*/

module.exports.render = function (req, callback) {
	renderModel.renderMultiple( req, function ( err, renderStr ) {
		callback(err, renderStr);
	});
};
/*
module.exports.submit = function(req, callback) {
	if (is.empty(req.body.teachingEvaluation)) return callback(null, null);

	var arr = [];

	for(var i=0; i<req.body.teachingEvaluation.length; i++) {
		var path = req.body.teachingEvaluation[i];
		var subdoc = {
			course: path.course,
			year: path.year,
			semester: path.semester,
			enrolled: path.enrolled,
			responses: path.responses,
			teacherMean: path.teacherMean,//[1,2,3,1,2,3,1,2,3],  //Figure out array.
			departmentMean: path.departmentMean,//[2,3,4,2,3,4,2,3,4],
			collegeMean: path.collegeMean//[4,4,4,4,4,4,4,4,4],
		};
		arr.push(subdoc);
	}

	var evaluation = new TeachingEvaluation({
		sub: arr,
		user: req.user
	});
		
	evaluation.save(function(err) {
		callback(err, evaluation);
	});	
};
*/

//Excel parser is on backburner for now
/*
module.exports.submit = function(req, res, callback) {
	var excel = req.body.excelAddress;
	parseXlsx(excel, function(err, data){
		teachingEvaluation.create({
			course: data[0][0],
			year: data[0][0],
			semester: data[0][0],
			enrolled: data[0][0],
			responses: data[0][0],
			teacherMean: data[1],
			departmentMean: data[1],
			collegeMean: data[1],
			user: req.user
		}, function(err) {
			callback(err);
		});
	});
};
*/

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.teachingEvaluation, {
		report: report,
		user: user
	});

	var teachingEvaluation = new TeachingEvaluation(save);

	teachingEvaluation.save(function(err) {
		cb(err, teachingEvaluation);
	});
};