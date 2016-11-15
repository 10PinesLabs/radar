angular.module('ruben-radar')
    .factory('ShowRadarStrategy', function ShowRadarStrategy() {
        return function (radarResult) {
            var self = this;

            self.textFor = function (axis) {
                return "" + radarResult.roundedValueFor(axis);
            };

            self.axes = function () {
                return _.map(radarResult.axes_results, function (axis_result) {
                    return axis_result.axis;
                })
            };

            self.results = function () {
                return [radarResult];
            };
        };
    });