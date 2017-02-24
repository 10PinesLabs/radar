angular.module('ruben-radar')
    .controller('ResultsController', function ($scope, _, radar, result, draw) {
        $scope.radar = radar;
        $scope.result = result;
        $scope.selectedRepresentation = draw || "circles";
    });

