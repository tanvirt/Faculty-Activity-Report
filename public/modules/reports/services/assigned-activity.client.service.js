'use strict';

angular.module('reports').factory('AssignedActivity', ['$resource',
	function($resource) {
		return $resource('/reports/:reportId/assignedActivity/:assignedActivityId', {
			reportId: '@_id',
			assignedActivityId: '@_activityId'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
	/*function() {
		// Assigned activity service logic
		// ...

		// Public API
		return {
			someMethod: function() {
				return true;
			}
		};
	}*/
]);
