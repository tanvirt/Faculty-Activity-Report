'use strict';

var swig = require('swig');
var fs = require('fs');


fs.writeFile('resultTeachingAdvising.tex', swig.renderFile('teachingAdvising.tex', {

	philosophy: "My main strength as a teacher, and a real asset as a researcher, is an broad understanding of Computer Science as a whole rather than just a few subjects, as it is often the case. This breadth of knowledge allows me to easily teach a variety of subjects well outside my research area.",
	supervising: "I supervised 3 Ph. D students during the last 1 year. The active students are Supriya Nirkhiwale and Andrei Todor. Andrei is co-advised with Tamer Kahveci. Louis Cheung, my 3rd student decided to abandon the Ph-D program."

}), function(err) {
		if (err) throw err;
		console.log('SAVED.');
});
