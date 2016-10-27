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

                ////////////////////////////////////////////
                /////////// Initiate legend ////////////////
                ////////////////////////////////////////////
                //Legend titles
                var LegendOptions = ['Smartphone', 'Tablet'];

                var w = config.radius * 2;
                var h = config.radius * 2;

                var svg = d3.select(element[0])
                    .selectAll('svg')
                    .append('svg')
                    .attr("width", w + 300)
                    .attr("height", h);

                //Create the title for the legend
                var text = svg.append("text")
                    .attr("class", "title")
                    .attr('transform', 'translate(90,0)')
                    .attr("x", w - 70)
                    .attr("y", 10)
                    .attr("font-size", "12px")
                    .attr("fill", "#404040")
                    .text("What % of owners use a specific service in a week");

                //Initiate Legend
                var legend = svg.append("g")
                        .attr("class", "legend")
                        .attr("height", 100)
                        .attr("width", 200)
                        .attr('transform', 'translate(90,20)')
                    ;
                //Create colour squares
                var colorSet = d3.scale.category10();
                legend.selectAll('rect')
                    .data(LegendOptions)
                    .enter()
                    .append("rect")
                    .attr("x", w - 65)
                    .attr("y", function (data, i) {
                        return i * 20;
                    })
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("fill", function (data, i) {
                        return colorSet(i);
                    })
                ;
                //Create text next to squares
                legend.selectAll('text')
                    .data(LegendOptions)
                    .enter()
                    .append("text")
                    .attr("x", w - 52)
                    .attr("y", function (data, i) {
                        return i * 20 + 9;
                    })
                    .attr("font-size", "11px")
                    .attr("fill", "#737373")
                    .text(_.identity)
                ;
            }
        };
    })
;
