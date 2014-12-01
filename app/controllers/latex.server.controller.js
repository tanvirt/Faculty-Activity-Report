'use strict';


/*


exports.generateLatex = function(req,res,next) {	
	//console.log('Req.report' + req.report._id);
	
	async.parallel([
		async.apply(renderName.render, req),
		async.apply(renderTenure.render, req),
		async.apply(renderCurrentRank.render, req),
		async.apply(renderAffiliateAppointments.render, req),
		async.apply(renderDateAppointed.render, req),
		async.apply(renderTeachingAdvising.render, req),
		async.apply(renderAssignedActivity.render, req),
		async.apply(renderTeachingEvaluation.render, req),
		async.apply(renderGraduateCommittee.render, req),
		async.apply(renderCreativeWorks.render, req),
		async.apply(renderPatents.render, req),
		async.apply(renderPublication.render, req),
		async.apply(renderContribution.render, req),
		async.apply(renderConferences.render, req),
		async.apply(renderContracts.render, req),
		async.apply(renderGovernance.render, req),
		async.apply(renderConsultationsOutsideUniversity.render, req),
		async.apply(renderEditorServiceReviewer.render, req),
		async.apply(renderMembership.render, req),
		async.apply(renderInternational.render, req),
		async.apply(renderServiceToSchools.render, req),
		async.apply(renderHonors.render, req),
		async.apply(renderFurtherInformationSection.render, req)	
	], function(err, results) {
		if (err) {
			return res.status(500).send({ error: 'Report Generation Failed' });
		}

		combine.render(results, function(err, output) {
			if (err) {
				return res.status(500).send({ error: 'Report Generation Failed' });
			}
			res.jsonp(output);
		});

		//Generate Report
		
		var writeable = fs.createWriteStream('./public/modules/reports/pdf/' + req.report._id + '.pdf');

		latex([
			'\\documentclass{article}',
			'\\begin{document}',
			'\\title{COLLEGE OF ENGINEERING \\newline Annual Activities Report}',
			'\\date{}',
			'\\maketitle',
			results.join(''), //results.toString() without the ','
			'\\vspace{2in}',
			'\\begin{center}',
			'Signature', '\\line(1,0){200}', '\\hspace{2em}', 'Date', '\\line(1,0){50}',
			'\\end{center}',
			'\\end{document}'
		]).pipe(writeable).on('error', function(e) {
			throw new Error('Cannot overwrite report.pdf when it is open on your system. Please close report.pdf.');
		});

		writeable.on('finish', function() {
			console.log('Report Generated!');
			next();
		});
		
	});
};
*/