angular.module('ruben-radar')
    .controller('ResultsController', function ($scope, _, radar, result) {
        var pointsAverage = function (points) {
            return parseFloat(_.sum(points) / points.length).toFixed(2);
        };

        $scope.radar = radar;
        $scope.result = result;
        $scope.axes = result.axes_results.map(function (axis_result) {
            return axis_result.axis;
        });
        $scope.result.axes_results = result.axes_results.map(function (axis_result) {
            return { axis_id: axis_result.axis.id, value: pointsAverage(axis_result.points)};
        });
    });

