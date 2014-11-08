'use strict';

angular.module('reports').controller('NavigationController', ['$scope', '$stateParams', '$location', 'Authentication',
	function($scope, $stateParams, $location, Authentication, Reports ) {
		$scope.authentication = Authentication;
		var tabClasses;

		function initTabs() {
			tabClasses = ['','','','','','','','',''];
		}

		$scope.getTabClass = function (tabNum) {
			return tabClasses[tabNum];
		};

		$scope.getTabPaneClass = function (tabNum) {
		return 'tab-pane ' + tabClasses[tabNum];
		};

		$scope.setActiveTab = function (tabNum) {
			initTabs();
			tabClasses[tabNum] = 'active';
		};

		//Initialize 
 		initTabs();
  		$scope.setActiveTab(1);
	}
]);

