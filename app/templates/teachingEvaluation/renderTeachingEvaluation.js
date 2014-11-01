'use strict';

var mongoose = require('mongoose');
var modelClass = require('../modelClass');

// Compile Schema into Model here
var teachingEvaluation = mongoose.model('TeachingEvaluation');
var renderModel = new modelClass.RenderModel(teachingEvaluation, 'teachingEvaluation/teachingEvaluation.tex', 'teachingEvaluation/na.tex');

/*
Populates the database with test data
*/

renderModel.setDebugPopulate(false, {
	evaluations: [{
		//teacher: 'testName',
		course: 'testCourse1',
		year: 2003,
		semester: 'fall',
		enrolled: 100,
		responses: 30,
		teacherMean: [1,2,3,1,2,3,1,2,3],
		departmentMean: [2,3,4,2,3,4,2,3,4],
		collegeMean: [4,4,4,4,4,4,4,4,4],
	}],
	sum: ['Debug','Debug','Debug']
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



module.exports.render = function(req, callback) {
	renderModel.render(req, callback);
};

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


/*
function passObj(objArray)
{
	return {'evaluation': objArray, 'sum': objArray.findTotalMean()};
}

module.exports.render = function (req, callback) {
	renderModel.renderMultiple( 'teachingEvaluation/teachingEvaluation.tex', teachingEvaluation, { }, passObj,dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};
*/


module.exports.submit = function(req, callback) {
	if (!req.body.teachingEvaluation)
		return;

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

	var evaluation = new teachingEvaluation({
		sub: arr,
		user: req.user
	});
		
	evaluation.save(function(err) {
		callback(err, evaluation);
	});	
};


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
