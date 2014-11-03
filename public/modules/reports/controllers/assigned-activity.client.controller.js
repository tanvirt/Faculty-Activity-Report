'use strict';

angular.module('reports').controller('AssignedActivityController', ['$scope',
	function($scope) {
        $scope.springUpdate = function()
        {
            var springTeaching, springResearch, springService;

            springTeaching = ( $scope.springTeaching > 0 && $scope.springTeaching < 100) ?
                                $scope.springTeaching : 0;
            springResearch = ( $scope.springResearch > 0 && $scope.springResearch < 100) ?
                                $scope.springResearch : 0;
            springService = ( $scope.springService > 0 && $scope.springService < 100) ?
                                $scope.springService : 0;


            $scope.springTotal = (springTeaching + springResearch + springService <= 100) ?
                                springTeaching + springResearch + springService : 'e';
        };

        $scope.summerUpdate = function()
        {

            var summerTeaching = ( $scope.summerTeaching > 0 && $scope.summerTeaching < 100 ) ?
                                $scope.summerTeaching : 0;
            var summerResearch = ( $scope.summerResearch > 0 && $scope.summerResearch  < 100 ) ?
                                $scope.summerResearch : 0;
            var summerService = ( $scope.summerService > 0 && $scope.summerService < 100 ) ?
                                $scope.summerService : 0;

            $scope.summerTotal = (summerTeaching + summerResearch + summerService <= 100) ?
                                summerTeaching + summerResearch + summerService : 'e';
        };

        $scope.fallUpdate = function()
        {
            var fallTeaching = ( $scope.fallTeaching > 0 && $scope.fallTeaching < 100 ) ?
                $scope.fallTeaching : 0;
            var fallResearch = ( $scope.fallResearch > 0 && $scope.fallResearch  < 100 ) ?
                $scope.fallResearch : 0;
            var fallService = ( $scope.fallService > 0 && $scope.fallService < 100 ) ?
                $scope.fallService : 0;

            $scope.fallTotal = (fallTeaching + fallResearch + fallService <= 100) ?
                            fallTeaching + fallResearch + fallService : 'e';
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
