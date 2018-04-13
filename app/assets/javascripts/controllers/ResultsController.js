angular.module('ruben-radar')
    .controller('ResultsController', function ($scope, $window, _, radar, result, draw) {
        $scope.radar = radar;
        $scope.result = result;
        $scope.selectedRepresentation = draw || "circles";
        $scope.printPage = function(){
            return window.print();
        }


    });

