angular.module('ruben-radar')
    .factory('ShowRadarStrategy', function ShowRadarStrategy() {
        return function (radarResult) {
            var self = this;

            self.textFor = function (axis) {
                return "" + radarResult.roundedValueFor(axis);
            };

            self.radars = function () {
                return [radarResult.radar];
            };

            self.axes = function () {
                return _.map(radarResult.axes_results, 'axis');
            };

            self.results = function () {
                return [radarResult];
            };

            self.fillAxisLegend = function (legend) {
                legend.append("tspan")
                    .classed("value", true)
                    .text(radarResult.roundedValueFor);
            };

            self.radarReferenceText = function (radar) {
                return "";
            };
        };
    });
