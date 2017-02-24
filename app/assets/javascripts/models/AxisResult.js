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

            self.concentrationPoints = function () {
                var concentrationPoints = _.mapValues(_.groupBy(self.points, _.identity), _.size);
                return _.map(_.toPairs(concentrationPoints), function (pair) {
                    return { value: _.first(pair), quantity: _.last(pair) };
                });
            };
        };
    });
