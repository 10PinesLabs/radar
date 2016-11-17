angular.module('ruben-radar')
    .directive('drawRadar', function (d3, RadarChart, Vector2D, ShowRadarStrategy, ConcentrationPoints) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                result: '=',

                steps: '=',
                maxValue: '=',

                Representation: '='
            },
            link: function (scope, element) {
                var defaultConfig = {
                    steps: 5,
                    maxValue: 5,

                    Representation: ConcentrationPoints
                };

                var strategy = new ShowRadarStrategy(scope.result);
                var config = _.merge(defaultConfig, scope);
                var radarSize = new Vector2D(500, 500);
                new RadarChart(radarSize, config.steps, config.maxValue, config.Representation).draw(element[0], strategy);
            }
        };
    });
