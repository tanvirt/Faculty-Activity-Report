'use strict';

angular.module('reports').controller('Section7Controller', ['$scope', '$stateParams', '$location', 'Authentication',
	function($scope, $stateParams, $location, Authentication, Reports ) {
		$scope.authentication = Authentication;
		//custom tinymce textarea
		$scope.tinymceOptions = {
			    theme: 'modern',
			    plugins: [
			        'autoresize',
			        'advlist autolink lists charmap preview hr',
			        'searchreplace wordcount',
			        'insertdatetime save table contextmenu directionality',
			        'paste textcolor colorpicker textpattern',
			    ],
			    toolbar1: 'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist',
		};

		
	}
]);