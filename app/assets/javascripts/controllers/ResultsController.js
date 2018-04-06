angular.module('ruben-radar')
    .controller('ResultsController', function ($scope, _, radar, result, draw) {
        $scope.radar = radar;
        $scope.result = result;
        $scope.selectedRepresentation = draw || "circles";
        $scope.downloadPDF = function () {
            var pdf = new jsPDF();
            pdf.text('Los resultados', 10, 10);

            pdf.save($scope.radar.description());
        };


    });

