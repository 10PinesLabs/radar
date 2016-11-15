angular.module('ruben-radar')
    .factory('AxisResult', function AxisResult() {
        return function (axisResultJson) {
            var self = this;
            self.axis = axisResultJson.axis;
            self.points = axisResultJson.points;

            self.pointsAverage = function () {
                return _.sum(self.points) / self.points.length;
            };

            self.isFor = function (axis) {
                return self.axis.description === axis.description;
            };
        };
    });
