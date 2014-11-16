'use strict';

//Reports service used to communicate Reports REST endpoints
angular.module('reports').factory('Reports', ['$resource',
	function($resource) {
		return $resource('reports/:reportId', { 
			reportId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('reports').factory('IDs', ['$q', '$http', '$stateParams',
	function($q, $http, $stateParams) {
		return {
			get: function() {
				if ($stateParams.reportId) {
					var defer = $q.defer();
					$http.get('/reports/' + $stateParams.reportId).
						success(function(data, status, headers, config) {
							defer.resolve(data);
						}).
						error(function(data, status, headers, config) {
							console.log('There was an error in getting report');
						});

						return defer.promise;
				} else {
					console.log('No reportId specified in stateParams');
				}
			}
		};
	}
]);