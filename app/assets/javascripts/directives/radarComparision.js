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
                dataForBarChart: '=',
                Representation: '='
            },
            link: function (scope, element) {

                var defaultConfig = {
                    steps: 5,
                    maxValue: 5,

                    Representation: PolygonsDraw
                };

                var strategy = new CompareRadarsStrategy(scope.beforeResult, scope.afterResult);
                var config = _.merge(defaultConfig, scope);
                var radarSize = new Vector2D(500, 500);
                new RadarChart(radarSize, config.steps, config.maxValue, config.Representation).draw(element[0], strategy, this);

            },
            getData: function (axis) {
                return [{
                    label: 'scope',
                    data: [12, 19, 3, 17, 6, 3, 7],
                    backgroundColor: "rgba(26,129,102,0.2)",
                    borderColor: "#3cba9f",
                    //fill:false
                }, {
                    label: 'oranges',
                    data: [2, 29, 5, 5, 2, 3, 10],
                    backgroundColor: "rgba(255,153,0,0.2)",
                    borderColor: "rgba(179,11,198,1)",
                    //fill:false
                }];

            },
            createBarChart: function (scope, axis){
                axis = axis || axis;
                var ctx = document.getElementById('myChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['1', '2', '3', '4', '5'],
                        datasets: this.getData(axis)
                    }
                });

            }

        };
    });