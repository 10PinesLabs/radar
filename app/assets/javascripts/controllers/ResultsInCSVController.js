angular.module('ruben-radar')
    .controller('ResultsInCSVController', function ($scope, _, radar) {
        $scope.radar = radar;
        $scope.axes = radar.axes;
        

    });
