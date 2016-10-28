angular.module('ruben-radar')
    .directive('drawRadar', function (d3, RadarChart, Vector2D) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                answers: '=answers',
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


                //TODO validate non negative data
                //TODO validate 1 or more axis

                // The radars -> [[{axis: description, value: points}]]
                // This data should appear as a double array of each graph
                // TODO this is evil
                var answersByDescription = _.groupBy(scope.answers, 'axis.description');
                var pointsByDescription = _.mapValues(answersByDescription, function (answers) {
                    return _.sumBy(answers, 'points') / answers.length;
                });
                var radars = [_.map(_.toPairs(pointsByDescription), function (o) {
                    return {axis: o[0], value: o[1]};
                })];
                // FIXME SOLO PARA TESTEAR
                radars.push(_.map(radars[0], function (answer) {
                        return {axis: answer.axis, value: 4};
                    })
                );
                new RadarChart(radarSize, canvasSize, offsetInParent, config.steps).draw(element[0], radars);
            }
        };
    })
;
