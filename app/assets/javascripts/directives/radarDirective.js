angular.module('ruben-radar')
    .directive('drawRadar', function (d3, ScaleDraw, RadarDraw, PolygonsDraw, AxesDraw, Vector2D) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                answers: '=answers'
            },
            link: function (scope, element) {
                var RadarChart = function (options) {

                    var drawMainCanvas = function (parentElement, size, offset) {
                        return d3.select(parentElement)
                            .append("svg").attr("width", size.x).attr("height", size.y)
                            .append("g").attr("transform", "translate" + offset.stringOrderedPair());
                    };


                    var defaultConfig = {
                        //radio de los puntos sobre los ejes
                        radius: 5,

                        //tamaño del radar default
                        w: 500,
                        h: 500,

                        factorLegend: .85,

                        //cantidad de grados sobre la recta
                        levels: 3,

                        opacityArea: 0.5,
                        //corrimiento en x al texto de los steps
                        ToRight: 5,

                        //lo que esta adentro del main canvas se traslada
                        TranslateX: 80,
                        TranslateY: 30,
                        ExtraWidthX: 500,
                        ExtraWidthY: 100,
                        colorSet: d3.scale.category10()
                    };


                    var cfg = _.assign(defaultConfig, options);
                    var size = new Vector2D(cfg.w, cfg.h);
                    var canvasOverSize = new Vector2D(cfg.ExtraWidthX, cfg.ExtraWidthY);
                    var canvasSize = size.plus(canvasOverSize);
                    var offsetInParent = new Vector2D(cfg.TranslateX, cfg.TranslateY);
                    var scaleTextOffset = new Vector2D(cfg.ToRight, 0);


                    this.draw = function (id, data) {
                        //TODO validate non negative data
                        //TODO validate 1 or more axis

                        // Get the maximum value from the data
                        var maxValueFromData = d3.max(data, function (i) {
                            return d3.max(_.map(i, 'value'));
                        });

                        var allAxis = _.map(data[0], 'axis');

                        var scale = new ScaleDraw(scaleTextOffset, cfg.levels, maxValueFromData);
                        var axes = new AxesDraw(allAxis);
                        var polygons = new PolygonsDraw(data, cfg.opacityArea, cfg.radius);
                        var radarDraw = new RadarDraw(size, scale, axes, polygons);

                        var MainCanvasSvg = drawMainCanvas(id, canvasSize, offsetInParent);
                        radarDraw.draw(MainCanvasSvg);
                    };
                };

                var w = 500,
                    h = 500;

                var colorscale = d3.scale.category10();

                //Legend titles
                var LegendOptions = ['Smartphone', 'Tablet'];

                // Data
                // This data should appear as a double array of each graph
                // TODO this is evil
                var data = [];
                data = _.groupBy(scope.answers, 'axis.description');
                data = _.mapValues(data, function (answers) {
                    return _.sumBy(answers, 'points') / answers.length;
                });
                data = [_.map(_.toPairs(data), function (o) {
                    return {axis: o[0], value: o[1]};
                })];
                data.push(_.map(data[0], function (answer) {
                    return {
                        axis: answer.axis,
                        value: 4
                    };
                    })
                );

                //Options for the Radar chart, other than default
                var mycfg = {
                    w: w,
                    h: h,
                    maxValue: 0.6,
                    levels: 5,
                    ExtraWidthX: 300
                };

                //Call function to draw the Radar chart
                //Will expect that data is in %'s
                new RadarChart(mycfg).draw(element[0], data);

                ////////////////////////////////////////////
                /////////// Initiate legend ////////////////
                ////////////////////////////////////////////

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
                        return colorscale(i);
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
