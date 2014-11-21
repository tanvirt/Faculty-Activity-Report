'use strict';

angular.module('reports').factory('Section19', [

	function($resource) {
		return $resource('/reports/:reportId', {
			reportId: '@_id',
		}, {
			update: {
				method: 'PUT'
			}
		});
	}

	/*function() {
		// Section 16 service logic
		// ...

		// Public API
		return {
			someMethod: function() {
				return true;
			}
		};
	}*/
]);