angular.module('ruben-radar')
    .factory('RadarResult', function RadarResult(AxisResult) {
        return function (radarResultJson) {
            var self = this;
            self.radar_id = radarResultJson.radar_id;
            self.axes_results = _.map(radarResultJson.axes_results, function (axis_result) {
                return new AxisResult(axis_result);
            });

            self.valueFor = function (axis) {
                var axis_result = _.find(self.axes_results, function (axis_result) {
                        return axis_result.isFor(axis);
                    });
                return axis_result ? axis_result.pointsAverage() : 0;
            };

            self.roundedValueFor = function (axis) {
                return parseFloat(self.valueFor(axis)).toFixed(2);
            }
        };
    });