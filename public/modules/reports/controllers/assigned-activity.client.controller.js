'use strict';

angular.module('reports').controller('AssignedActivityController', ['$scope',
	function($scope) {
        $scope.springUpdate = function(springTeaching, springResearch, springService)
        {
            springTeaching = ( $scope.springTeaching > 0 && $scope.springTeaching < 100) ?
                                $scope.springTeaching : 0;
            springResearch = ( $scope.springResearch > 0 && $scope.springResearch < 100) ?
                                $scope.springResearch : 0;
            springService = ( $scope.springService > 0 && $scope.springService < 100) ?
                                $scope.springService : 0;



            $scope.springTotal = $scope.springTeaching + $scope.springResearch + $scope.springService;
        };

        $scope.summerUpdate = function()
        {
            $scope.summerTotal = $scope.summerTeaching + $scope.summerResearch + $scope.summerService;
        };

        $scope.fallUpdate = function()
        {
            $scope.fallTotal = $scope.fallTeaching + $scope.fallResearch + $scope.fallService;
        };
        /*$scope.initTable = function(){
            //Spring values
            $scope.springTeaching = 0;
            $scope.springResearch = 0;
            $scope.springService = 0;
            //Summer values

            $scope.summerTeaching = 0;
            $scope.summerResearch = 0;
            $scope.summerService = 0;
            //Fall Values
            $scope.fallTeaching = 0;
            $scope.fallResearch = 0;
            $scope.fallService = 0;
            //table totals
            $scope.springTotal = 0;
            $scope.summerTotal = 0;
            $scope.fallTotal = 0;
        };*/
	}
]);
