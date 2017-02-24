angular.module('ruben-radar')
    .directive('drawRadar', function (d3, RadarChart, Vector2D, ShowRadarStrategy, PolygonsDraw) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                result: '=',

                steps: '=',
                maxValue: '=',

                representation: '='
            },
            link: function (scope, element) {
                var defaultConfig = {
                    steps: 5,
                    maxValue: 5,

                    representation: PolygonsDraw
                };

                var strategy = new ShowRadarStrategy(scope.result);
                var config = _.merge(defaultConfig, scope);
                var radarSize = new Vector2D(500, 500);
                new RadarChart(radarSize, config.steps, config.maxValue, config.representation).draw(element[0], strategy);
            }
        };
    });
