angular.module('ruben-radar')
    .directive('radarComparision', function (d3, RadarChart, Vector2D, CompareRadarsStrategy) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                beforeResult: '=',
                afterResult: '=',
                steps: '=',
                maxValue: '='
            },
            link: function (scope, element) {
                var defaultConfig = {
                    steps: 5,
                    maxValue: 5
                };

                var strategy = new CompareRadarsStrategy(scope.beforeResult, scope.afterResult);
                var config = _.merge(defaultConfig, scope);
                var radarSize = new Vector2D(500, 500);
                new RadarChart(radarSize, config.steps, config.maxValue).draw(element[0], strategy);
            }
        };
    });