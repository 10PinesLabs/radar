angular.module('ruben-radar')
    .directive('drawRadar', function (d3, RadarChart, Vector2D) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                results: '=results',
                radius: '=radius',
                steps: '=steps',
                maxValue: '=maxValue',
                offsetInParentX: '=offsetInParentX',
                offsetInParentY: '=offsetInParentY',
                widthOfCanvas: '=widthOfCanvas',
                heightOfCanvas: '=heightOfCanvas'
            },
            link: function (scope, element) {
                var defaultConfig = {
                    radius: 250,
                    steps: 5,

                    maxValue: 5,

                    offsetInParentX: 250,
                    offsetInParentY: 50,

                    widthOfCanvas: 1000,
                    heightOfCanvas: 600
                };

                var config = _.merge(defaultConfig, scope);
                var radarSize = new Vector2D(config.radius * 2, config.radius * 2);
                var canvasSize = new Vector2D(config.widthOfCanvas, config.heightOfCanvas);
                var offsetInParent = new Vector2D(config.offsetInParentX, config.offsetInParentY);
                new RadarChart(radarSize, canvasSize, offsetInParent, config.steps, config.maxValue)
                    .draw(element[0], scope.results, scope.results[0].axes_results);
            }
        };
    })
;
