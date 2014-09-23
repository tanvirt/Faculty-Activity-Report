var swig = require('swig');
var fs = require('fs');

fs.writeFile('resultAssignedActivity.tex', swig.renderFile('assignedActivity.tex', {
	semesters: {
		spring: {
			teaching: 45,
			research: 40,
			service: 15
		},
		summer: {
			teaching: 45,
			research: 40,
			service: 15
		},
		fall: {
			teaching: 45,
			research: 40,
			service: 15
		}
	}
}), function(err) {
	if (err) throw err;
	console.log('Saved!');
});