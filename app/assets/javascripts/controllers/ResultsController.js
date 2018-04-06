angular.module('ruben-radar')
    .controller('ResultsController', function ($location, $scope, _, radar, result, draw) {
        $scope.radar = radar;
        $scope.result = result;
        $scope.selectedRepresentation = draw || "circles";

        $scope.goBack = function goBack(path) {
            $location.path(path)
        }

    });

