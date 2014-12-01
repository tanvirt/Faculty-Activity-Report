'use strict';

angular.module('reports').controller('NavigationController', ['$scope', '$stateParams', '$location', 'Authentication', 'IDs',
	function($scope, $stateParams, $location, Authentication, IDs) {
		$scope.authentication = Authentication;

		IDs.get().then(function(data){
			$scope.IDdata = data;

			$scope.reportName = data.reportName;

		});

		$scope.tinymceOptions = {
			    theme: 'modern',
			    plugins: [
			        'autoresize',
			        'advlist autolink lists charmap preview hr',
			        'searchreplace wordcount',
			        'insertdatetime save table contextmenu directionality',
			        'paste textcolor colorpicker textpattern',
			        'legacyoutput'
			    ],
			    toolbar1: 'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist'
		};

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

