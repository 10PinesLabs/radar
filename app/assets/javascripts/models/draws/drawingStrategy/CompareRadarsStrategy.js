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

            self.hasPositiveDelta = function (axis) {
                return (self.deltaValueFor(axis) >= 0);
            };

            self.hasNegativeDelta = function (axis) {
                return !self.hasPositiveDelta(axis);
            };

            self.iconCodeForDeltaValue = function (axis) {
                return self.hasPositiveDelta(axis) ? "&#xE5C7;" : "&#xE5C5;";
            };

            self.fillAxisLegend = function (legend) {
                legend.append("tspan")
                    .classed("value", true)
                    .classed("positive-delta", self.hasPositiveDelta)
                    .classed("negative-delta", self.hasNegativeDelta)
                    .text(self.differenceFor);

                legend.append("tspan")
                    .classed("material-icons", true)
                    .classed("positive-delta", self.hasPositiveDelta)
                    .classed("negative-delta", self.hasNegativeDelta)
                    .html(self.iconCodeForDeltaValue);
            };
        };
    });