angular.module('ruben-radar')

    .controller('ResultsController', function ($scope, $window, CSVService, radar, result, draw) {
        $scope.radar = radar;
        $scope.axes = radar.axes;
        $scope.result = result;
        $scope.selectedRepresentation = draw || "circles";

        var blob = new Blob([resultToCSV()], {type: 'text/plain'});
        var url = $window.URL;
        $scope.fileCSVUrl = url.createObjectURL(blob);

        function resultToCSV() {
            return CSVService.createCSVWithResultsOf($scope.radar)

        }

        $scope.printPage = function () {
            return window.print();
        }

    });

