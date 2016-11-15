angular.module('ruben-radar')
    .factory('ShowRadarStrategy', function ShowRadarStrategy() {
        return function (radarResult) {
            var self = this;

            self.axes = function () {
                return _.map(radarResult.axes_results, function (axis_result) {
                    return axis_result.axis;
                })
            };

            self.results = function () {
                return [radarResult];
            };

            self.fillAxisLegend = function (legend) {
                legend.append("tspan")
                    .attr("class", "value")
                    .text(function (axis) {
                        return radarResult.roundedValueFor(axis);
                    });
            };
        };
    });