angular.module('ruben-radar')
    .controller('ResultsController', function ($scope, _, radar, result) {
        $scope.radar = radar;
        $scope.axes = radar.axes;
        $scope.result = result;
    });

