angular.module('ruben-radar')
    .controller('ResultsController', function ($scope, _, radar, result) {
        var pointsAverage = function (points) {
            return parseFloat(_.sum(points) / points.length).toFixed(2);
        };

        $scope.radar = radar;
        $scope.result = result;
        $scope.result.axes_results.forEach(function (axis_result) {
            axis_result.value = pointsAverage(axis_result.points);
        });
    });

