'use strict';

var mongoose = require('mongoose');
var TeachingEvaluation = mongoose.model('TeachingEvaluation');

var errorHandler = require('../errors');

var is = require('is-js');

var path = require('path');
var join = path.join;

var _ = require('lodash');

var xlsxj = require('xlsx-to-json');

var u = require('underscore');

var excel = require('excel');

exports.viewCtrl = function(req, res) {
	res.render('report/upload', {
		title: 'excel'
	});
};

/*
exports.getExcel = function(req, res, next) {
	if (req.files.excel) {

		cv2json.xlsx(req.files.excel.path, {}, function(err, result) {
			if (err) {
				res.jsonp({
					title: 'error',
					message: err
				});
			} else {
				req.excel = result;
				next();
			}
		});

	} else {
		res.jsonp('No file uploaded');
	}
};
*/
/*
exports.getExcel = function(req, res, next) {
	if (req.files.excel) {
		console.log(req.files.excel);
		var p = req.files.excel.name;
		xlsxj({
			input: "./app/controllers/teachingEvaluation/"+p,
			output: null
		}, function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.jsonp(result);
			}
		});
	} else {
		res.jsonp('Nope');
	}
	
};
*/

function parseArrayAndSave( data, res ) {
	var arr = Array();

	for (var i=1; i<data.length; i++) {
		var te = new TeachingEvaluation();

		te.course = data[i][3];
		te.enrolled = data[i][7];
		te.responses = data[i][8];

		var tmpArray = [];
		for (var j=0; j<10; j++) {
			console.log(j + ' : ' + data[i][(j*2)+37]);
			tmpArray[j] = data[i][(j*2)+37];
		}
		te.teacherMean = tmpArray;
		
		te.save(function(err) {
			if (err) {
				return res.jsonp({
					title: 'Mongoose Save Error',
					message: err
				});
			}
		});

		arr[i-1] = te.toObject();
	}

	res.jsonp(arr);
}


exports.getExcel = function(req, res) {
	if (req.files.excel) {
		excel(req.files.excel.path, function(err, data) {
		 	if(err) throw err;

		 	parseArrayAndSave(data, res);
		 	
		});
	} else {
		res.jsonp('Failure! File Not Uploaded/Found');
	}
};

function getDictionary(key) {
	return {
		course: 'D' + key,
		enrolled: 'H' + key,
		responses: 'I' + key,
		tm1: 'AL' + key,
		tm2: 'AN' + key,
		tm3: 'AP' + key,
		tm4: 'AR' + key,
		tm5: 'AT' + key,
		tm6: 'AV' + key,
		tm7: 'AX' + key,
		tm8: 'AZ' + key,
		tm9: 'BB' + key,
		tm10: 'BD' + key
	};
}

function parseAndSave(obj, key) {
	var d = getDictionary(key);

	return {
		course: obj[d.course].v,
		enrolled: obj[d.enrolled].v,
		responses: obj[d.responses].v,
		teacherMean: [
			obj[d.tm1].v,
			obj[d.tm2].v,
			obj[d.tm3].v,
			obj[d.tm4].v,
			obj[d.tm5].v,
			obj[d.tm6].v,
			obj[d.tm7].v,
			obj[d.tm8].v,
			obj[d.tm9].v,
			obj[d.tm10].v
		]
	};
}

exports.saveExcel = function(req, res) {
	//return res.jsonp(req.excel.Sheets);
	if (req.excel.Sheets.sheet1) {
		var obj = req.excel.Sheets.sheet1;

		var i = 2;

		do {
			var key = 'A' + i;

			if (obj.hasOwnProperty(key)) {
				var json = parseAndSave(obj, i);

				var teachingEvaluation = new TeachingEvaluation(u.extend(json, {
					user: req.user,
					report: req.report
				}));

				teachingEvaluation.save();

				console.log(teachingEvaluation);

				i++;
			} else {
				break;
			}

		} while(true);

		res.jsonp('Saved');
	} else {
		res.jsonp('No excel to save');
	}
};



exports.create = function(req, res) {
	//For now, this will work like other sections until excel parser is done
	if (is.empty(req.body.teachingEvaluation)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.teachingEvaluation did not get send to backend',
			changes: 'No TeachingEvaluation Created'
		});
	}
		
	var teachingEvaluation = new TeachingEvaluation({
		course: req.body.teachingEvaluation.course,
		year: req.body.teachingEvaluation.year,
		semester: req.body.teachingEvaluation.semester,
		enrolled: req.body.teachingEvaluation.enrolled,
		responses: req.body.teachingEvaluation.responses,
		teacherMean: req.body.teachingEvaluation.teacherMean,
		departmentMean: req.body.teachingEvaluation.departmentMean,
		collegeMean: req.body.teachingEvaluation.collegeMean,

		user: req.user,
		report: req.report
	});

	teachingEvaluation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teachingEvaluation);
		}
	});
};

exports.update = function(req, res) {
	console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.teachingEvaluation)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.teachingEvaluation did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var teachingEvaluation = req.teachingEvaluation;

	//I have my doubts about this correctly parsing through the teachingEvaluation array
	teachingEvaluation = _.extend(teachingEvaluation, req.body.teachingEvaluation); 

	teachingEvaluation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teachingEvaluation);
		}
	});
};

exports.readFromReport = function(req, res) {
	TeachingEvaluation.findOne({report: req.report}, function(err, result) { //One Teaching Evaluation holds all individual evaluations for the report
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.teachingEvaluation);
};

exports.teachingEvaluationById = function(req, res, next, id) {
	TeachingEvaluation.findById(id)
	.exec(function(err, teachingEvaluation) {
		if (err) return next(err);
		if (!teachingEvaluation) return next(new Error('Failed to load TeachingEvaluation ' + id));
		req.teachingEvaluation = teachingEvaluation;
		next();
	});
};