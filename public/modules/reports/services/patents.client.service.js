'use strict';

angular.module('reports').factory('Patents', ['$resource',
	function($resource) {
		return $resource('reports/:reportId', { reportId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);