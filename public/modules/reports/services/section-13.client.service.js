'use strict';

angular.module('reports').factory('Section13', [

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
		// Section 13 service logic
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