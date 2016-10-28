angular.module('ruben-radar')
    .directive('drawRadar', function (d3, RadarChart, Vector2D) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                axes: '=axes',
                results: '=results',
                radius: '=radius',
                steps: '=steps',
                offsetInParentX: '=offsetInParentX',
                offsetInParentY: '=offsetInParentY',
                widthOfCanvas: '=widthOfCanvas',
                heightOfCanvas: '=heightOfCanvas'
            },
            link: function (scope, element) {
                var defaultConfig = {
                    radius: 250,
                    steps: 5,

                    offsetInParentX: 80,
                    offsetInParentY: 30,

                    widthOfCanvas: 1000,
                    heightOfCanvas: 600
                };

                var config = _.merge(defaultConfig, scope);
                var radarSize = new Vector2D(config.radius * 2, config.radius * 2);
                var canvasSize = new Vector2D(config.widthOfCanvas, config.heightOfCanvas);
                var offsetInParent = new Vector2D(config.offsetInParentX, config.offsetInParentY);
                new RadarChart(radarSize, canvasSize, offsetInParent, config.steps).draw(element[0], scope.results, scope.axes);
            }
        };
    })
;
