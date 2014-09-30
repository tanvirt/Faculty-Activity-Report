'use strict';

var swig = require('swig');
var fs = require('fs');


fs.writeFile('resultTeachingAdvisingCourses.tex', swig.renderFile('teachingAdvisingCourses.tex', {

	courseName: "CEN 3031 Introduction to Software Engineering",
	courseDescription: "This is an undergraduate course for concepts of software engineering",
	evaluationNumber: 4.84
	
}), function(err) {
		if (err) throw err;
		console.log('SAVED.');
});
