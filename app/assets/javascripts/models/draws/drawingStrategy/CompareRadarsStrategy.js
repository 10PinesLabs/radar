angular.module('ruben-radar')
    .factory('CompareRadarsStrategy', function CompareRadarsStrategy() {
        return function (beforeResult, afterResult) {
            var self = this;

            self.textFor = function (axis) {
                var valueDifference = afterResult.valueFor(axis) - beforeResult.valueFor(axis);
                return parseFloat(valueDifference).toFixed(2);
            };

            self.axes = function () {
                return _.map(afterResult.axes_results, function (axis_result) {
                    return axis_result.axis;
                });
            };

            self.results = function () {
                return [afterResult, beforeResult];
            };
        };
    });