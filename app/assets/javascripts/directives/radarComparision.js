angular.module('ruben-radar')
    .directive('radarComparision', function (d3, RadarChart, Vector2D, CompareRadarsStrategy, PolygonsDraw) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                beforeResult: '=',
                afterResult: '=',
                steps: '=',
                maxValue: '=',

                Representation: '='
            },
            link: function (scope, element) {
                scope.getData = function(axis) {
                    console.log("Click!")
                }
                var defaultConfig = {
                    steps: 5,
                    maxValue: 5,

                    Representation: PolygonsDraw
                };

                var strategy = new CompareRadarsStrategy(scope.beforeResult, scope.afterResult);
                var config = _.merge(defaultConfig, scope);
                var radarSize = new Vector2D(500, 500);
                new RadarChart(radarSize, config.steps, config.maxValue, config.Representation).draw(element[0], strategy, this);
                console.log(this)
            }
        };
    });