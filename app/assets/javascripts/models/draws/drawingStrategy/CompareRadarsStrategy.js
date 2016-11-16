angular.module('ruben-radar')
    .factory('CompareRadarsStrategy', function CompareRadarsStrategy() {
        return function (beforeResult, afterResult) {
            var self = this;

            self.deltaValueFor = function (axis) {
                return afterResult.valueFor(axis) - beforeResult.valueFor(axis);
            };

            self.differenceFor = function (axis) {
                return parseFloat(self.deltaValueFor(axis)).toFixed(2);
            };

            self.axes = function () {
                return _.map(afterResult.axes_results, function (axis_result) {
                    return axis_result.axis;
                });
            };

            self.results = function () {
                return [afterResult, beforeResult];
            };

            self.classForDeltaValue = function (axis) {
                return (self.deltaValueFor(axis) >= 0) ? "positive-delta" : "negative-delta";
            };

            self.iconCodeForDeltaValue = function (axis) {
                return (self.deltaValueFor(axis) >= 0) ? "&#xE5C7;" : "&#xE5C5;";
            };

            self.fillAxisLegend = function (legend) {
                legend.append("tspan")
                    .attr("class", function (axis) {
                        return "value " + self.classForDeltaValue(axis);
                    })
                    .text(function (axis) {
                        return self.differenceFor(axis);
                    });

                legend.append("tspan")
                    .attr("class", function (axis) {
                        return "material-icons " + self.classForDeltaValue(axis);
                    })
                    .html(self.iconCodeForDeltaValue);
            };
        };
    });