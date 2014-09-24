'use strict';

var swig = require('swig');
var fs = require('fs');

fs.writeFile('resultTenure.tex', swig.renderFile('tenure.tex', {
	tenure: 'Not Tenured'
}), function(err) {
		if(err) throw err;
		console.log('SAVED.');
});