angular.module('ruben-radar')
    .controller('CompareRadarsController', function ($scope, _, results) {
        var pointsAverage = function (points) {
            return parseFloat(_.sum(points) / points.length).toFixed(2);
        };

        $scope.results = results;
        $scope.results.forEach(function (result) {
            result.axes_results.forEach(function (axis_result) {
                axis_result.value = pointsAverage(axis_result.points);
            });
        });
    })
;
