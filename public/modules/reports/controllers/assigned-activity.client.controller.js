'use strict';

angular.module('reports').controller('AssignedActivityController', ['$http', '$scope', '$location', 'Authentication', 'IDs',
    function($http, $scope, $location, Authentication, IDs) {
        $scope.authentication = Authentication;

        IDs.get().then(function(data)
        {
            $scope.IDdata = data;
            $scope.year = data.assignedActivity.year;
            $scope.springTeaching = data.assignedActivity.springTeaching;
            $scope.springResearch = data.assignedActivity.springResearch;
            $scope.springService = data.assignedActivity.springService;

            $scope.fallTeaching = data.assignedActivity.fallTeaching;
            $scope.fallResearch = data.assignedActivity.fallResearch;
            $scope.fallService = data.assignedActivity.fallService;

            $scope.summerTeaching = data.assignedActivity.summerTeaching;
            $scope.summerResearch = data.assignedActivity.summerResearch;
            $scope.summerService = data.assignedActivity.summerService;
            $scope.springUpdate();
            $scope.summerUpdate();
            $scope.fallUpdate();

        });

        $scope.update = function()
        {
            $scope.springUpdate();
            $scope.summerUpdate();
            $scope.fallUpdate();

            $http.put('/assignedActivity/' + $scope.IDdata.assignedActivity._id, {

                assignedActivity:{
                    year:1993,
                    springTeaching: $scope.springTeaching,
                    springResearch: $scope.springResearch,
                    springService: $scope.springService,

                    fallTeaching: $scope.fallTeaching,
                    fallResearch: $scope.fallResearch,
                    fallService: $scope.fallService,

                    summerTeaching: $scope.summerTeaching,
                    summerResearch: $scope.summerResearch,
                    summerService: $scope.summerService

                }}).
                success(function(data, status, headers, config) {
                    alert('Saved!');
                }).
                error(function(data, status, headers, config) {
                    alert('There was an error Saving!');
                }
            );
        };




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
	}
]);
