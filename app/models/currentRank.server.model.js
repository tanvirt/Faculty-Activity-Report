/* As a programmer, I should be able to store the user's current rank ' +
'(professor, associate professor, etc.) and their respective department ' +
'(ex Computer and Informational Science and Engineering). ' +
'This way, I can grab this information from the database and display it back to the user.  */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var currentRank = new Schema({

    rank: { //more ranks need to be added, not sure where to find a list
        type: String,
        enum: ['Professor', 'Associate Professor', 'Assistant professor', 'Faculty', 'Department Head',
            'Chairperson', 'Research Professor'],
        required: true
    },

    department: { //more departments need to be added, most can be found at http://www.ufl.edu/academics/colleges/
        //engineering depts and business depts listed so far
        type: String,
        enum: ['Agricultural and Biological Engineering', 'Biomedical Engineering', 'Chemical Engineering',
            'Computer and Informational Science and Engineering', 'Electrical and Computer Engineering',
            'Industrial and Systems Engineering', 'Mechanical and Aerospace Engineering', 'Materials Science and Engineering',
        'Finance Insurance and Real Estate', 'Information Systems and Operations Management', 'Management', 'Marketing'],
        required: true
    },
	
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}

}, {collection: 'CurrentRank'});

mongoose.model('CurrentRank', currentRank);
