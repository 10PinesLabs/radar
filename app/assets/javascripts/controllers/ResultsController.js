angular.module('ruben-radar')
    .controller('ResultsController', function ($scope, $window, _, radar, result, draw) {
        $scope.radar = radar;
        $scope.result = result;
        $scope.selectedRepresentation = draw || "circles";
        var blobPDF = new Blob([$scope.selectedRepresentation], { type: 'ruben-radar/pdf' }),
            url = $window.URL;
        $scope.filePDFUrl = url.createObjectURL(blobPDF);


    });

