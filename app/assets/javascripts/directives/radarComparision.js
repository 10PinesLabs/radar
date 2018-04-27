angular.module('ruben-radar')
    .directive('radarComparision', function (d3, RadarChart, Vector2D, CompareRadarsStrategy, PolygonsDraw, _) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                beforeResult: '=',
                afterResult: '=',
                steps: '=',
                maxValue: '=',
                Representation: '=',
                chart: "="
            },
            link: function (scope, element) {

                this.scope.beforeResult = scope.beforeResult;
                this.scope.afterResult = scope.afterResult;


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
            getData: function (scope, axis) {
                return [{
                    label: scope.afterResult.radar.name,
                    data: this.getAxisAnswersFrom(scope.afterResult.axes_results, axis),
                    backgroundColor: "rgb(31, 119, 180)",
                    borderColor: "#3cba9f",
                }, {
                    label: scope.beforeResult.radar.name,
                    data: this.getAxisAnswersFrom(scope.beforeResult.axes_results, axis),
                    backgroundColor: "rgb(255, 127, 14)",
                    borderColor: "rgba(179,11,198,1)",

                }];

            },
            createBarChart: function (axis){
                if (this.scope.chart !== "="){
                    this.scope.chart.destroy();
                }
                var ctx = document.getElementById('myChart').getContext('2d');
                this.scope.chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['1', '2', '3', '4', '5'],
                        datasets: this.getData(this.scope, axis)
                    }
                });

            },
            getAxisAnswersFrom: function(axes_result, axis){
                var votedPointsOfAxis = _.find(axes_result, function(a) {
                    return a.axis.description === axis.description;
                }).points;
                return this.listForDataAcordingTo(votedPointsOfAxis);
            },
            listForDataAcordingTo: function(points) {
                var list = [];
                var countedPoints = _.countBy(points);
                for (var n = 1; n <= 5; n++) {
                    list.push(this.amountOfPeopleThatVoted(n, countedPoints))
                }
                return list;
            },
            amountOfPeopleThatVoted: function(n, countedPoints) {
                if (_.has(countedPoints, n)) {
                    return (_.get(countedPoints, n));
                }
                else {
                    return 0;
                }
            }

        };
    });