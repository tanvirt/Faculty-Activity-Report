'use strict';

var swig = require('swig');
var fs = require('fs');

//Arrays are defined with letters to avoid any weird LaTeX issues with numbers
fs.writeFile('resultTeachingEvaluation.tex', swig.renderFile('teachingEvaluation.tex', {
	course: 'Coding 101',
	teacher: 'Dr. Doctor',
	required: 'No',
	year: 2014,
	semester: 'Summer',
	enrolled: 123,
	highscore: 5,
	lowscore: 1,
	responses: 23,
	teacherMean: {
		a: 4.0,
		b: 4.0,
		c: 4.0,
		d: 4.0,
		e: 4.0,
		f: 4.0,
		g: 4.0,
		h: 4.0,
		i: 4.0,
		z: 4.0
	},
	departmentMean: {
		a: 4.0,
		b: 4.0,
		c: 4.0,
		d: 4.0,
		e: 4.0,
		f: 4.0,
		g: 4.0,
		h: 4.0,
		i: 4.0,
		z: 4.0
	},
	collegeMean: {
		a: 4.0,
		b: 4.0,
		c: 4.0,
		d: 4.0,
		e: 4.0,
		f: 4.0,
		g: 4.0,
		h: 4.0,
		i: 4.0,
		z: 4.0
	}
}), function(err) {
	if (err) throw err;
	console.log('Saved!');
});