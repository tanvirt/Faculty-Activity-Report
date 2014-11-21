'use strict';

angular.module('reports').factory('Section14', [

	function($resource) {
		return $resource('/reports/:reportId', {
			reportId: '@_id',
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
	/*
	function() {
		// Section 14 service logic
		// ...

		// Public API
		return {
			someMethod: function() {
				return true;
			}
		};
	}
	*/
]);