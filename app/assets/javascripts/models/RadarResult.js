angular.module('ruben-radar')
    .factory('RadarResult', function RadarResult(AxisResult) {
        return function (radarResultJson) {
            var self = this;
            self.radar = radarResultJson.radar;
            self.axes_results = _.map(radarResultJson.axes_results, function (axis_result) {
                return new AxisResult(axis_result);
            });

            self.valueFor = function (axis) {
                var axis_result = _.find(self.axes_results, function (axis_result) {
                        return axis_result.isFor(axis);
                    });
                return axis_result ? axis_result.pointsAverage() : 0;
            };

            self.concentrationPointsPerAxis = function () {
                return _.map(self.axes_results, function (axis_result) {
                    return axis_result.concentrationPoints();
                });
            };

            self.roundedValueFor = function (axis) {
                return parseFloat(self.valueFor(axis)).toFixed(2);
            };

            self.maxConcentratedQuantity = function () {
                return _(self.concentrationPointsPerAxis()).flatten().map('quantity').max();
            };
        };
    });