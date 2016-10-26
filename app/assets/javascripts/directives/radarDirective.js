angular.module('ruben-radar')
    .directive('drawRadar', function (d3) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                answers: '=answers'
            },
            link: function (scope, element) {
                var RadarChart = function (options) {
                    var oneSpinAngle = function () {
                        return 2 * Math.PI;
                    };
                    var rightAngle = function () {
                        return oneSpinAngle() / 4;
                    };

                    var versor = function (angle) {
                        return {
                            x: Math.cos(angle),
                            y: - Math.sin(angle)
                        };
                    };

                    var distanceToCenter = function (radarRadius, stepInAxis, amountOfSteps) {
                        return radarRadius * (stepInAxis + 1) / amountOfSteps;
                    };

                    var angleForAxis = function (axisNumber, amountOfAxis) {
                        return axisNumber / amountOfAxis * oneSpinAngle() + rightAngle();
                    };

                    var valuePerStep = function (maxValue, amountOfSteps) {
                        return maxValue / amountOfSteps;
                    };

                    var versorForAxis = function (axisNumber, amountOfAxis) {
                        return versor(angleForAxis(axisNumber, amountOfAxis));
                    };

                    var pointFor = function (radarRadius, axisNumber, amountOfAxis, stepInAxis, amountOfSteps) {
                        var module = distanceToCenter(radarRadius, stepInAxis, amountOfSteps);
                        return {
                            x: module * versorForAxis(axisNumber, amountOfAxis).x,
                            y: module * versorForAxis(axisNumber, amountOfAxis).y
                        };
                    };

                    var drawMainCanvas = function (parentElement, size, offset) {
                        return d3.select(parentElement)
                            .append("svg")
                            .attr("width", size.x)
                            .attr("height", size.y)
                            .append("g")
                            .attr("transform", "translate(" + offset.x + "," + offset.y + ")");
                    };

                    var drawScaleText = function (gElement, center, maxValue, amountOfSteps, radius, size, scaleTextOffset) {
                        var steps = _.range(0, amountOfSteps);
                        gElement.selectAll(".levels")
                            .data(steps)
                            .enter()
                            .append("svg:text")
                            .attr("x", 0)
                            .attr("y", function (step) {
                                return -distanceToCenter(radius, step, amountOfSteps);
                            })
                            .attr("class", "legend")
                            .style("font-family", "sans-serif")
                            .style("font-size", "10px")
                            .attr("transform", "translate(" +
                                (center.x + scaleTextOffset.x) +
                                ", " + (center.y + scaleTextOffset.y) + ")"
                            )
                            .attr("fill", "#737373")
                            .text(function (step) {
                                return (step + 1) * valuePerStep(maxValue, amountOfSteps);
                            });
                    };

                    var drawStepUnionPolygons = function (gElement, radius, center, axesDescriptions, amountOfAxis, amountOfSteps) {
                        for (var step = 0; step < amountOfSteps - 1; step++) {
                            gElement.selectAll(".levels")
                                .data(axesDescriptions)
                                .enter()
                                .append("svg:line")
                                .attr("x1", function (data, axisNumber) {
                                    return pointFor(radius, axisNumber, amountOfAxis, step, amountOfSteps).x;
                                })
                                .attr("y1", function (data, axisNumber) {
                                    return pointFor(radius, axisNumber, amountOfAxis, step, amountOfSteps).y;
                                })
                                .attr("x2", function (data, axisNumber) {
                                    return pointFor(radius, axisNumber + 1, amountOfAxis, step, amountOfSteps).x;
                                })
                                .attr("y2", function (data, axisNumber) {
                                    return pointFor(radius, axisNumber + 1, amountOfAxis, step, amountOfSteps).y;
                                })
                                .attr("class", "line")
                                .style("stroke", "grey")
                                .style("stroke-opacity", "0.75")
                                .style("stroke-width", "0.3px")
                                .attr("transform", "translate(" + center.x + ", " + center.y + ")");
                        }
                    };

                    var drawAxis = function (gElement, allAxis, radius, center, amountOfAxis) {
                        var axis = gElement.selectAll(".axis")
                            .data(allAxis)
                            .enter()
                            .append("g")
                            .attr("class", "axis")
                            .attr("transform", "translate(" + center.x + ", " + center.y + ")");

                        axis.append("line")
                            .attr("x1", 0)
                            .attr("y1", 0)
                            .attr("x2", function (data, i) {
                                return radius * versorForAxis(i, amountOfAxis).x;
                            })
                            .attr("y2", function (data, i) {
                                return radius * versorForAxis(i, amountOfAxis).y;
                            })
                            .attr("class", "line")
                            .style("stroke", "grey")
                            .style("stroke-width", "1px");

                        axis.append("text")
                            .attr("class", "legend")
                            .text(_.identity)
                            .style("font-family", "sans-serif")
                            .style("font-size", "11px")
                            .attr("text-anchor", "middle")
                            .attr("dy", "1.5em")
                            .attr("x", function (data, i) {
                                return (radius + 20) * versorForAxis(i, amountOfAxis).x;
                            })
                            .attr("y", function (data, i) {
                                return (radius + 20) * versorForAxis(i, amountOfAxis).y - 11;
                            });
                    };

                    var distanceForValue = function (value, maxValue, radius) {
                        return value / maxValue * radius;
                    };

                    var drawRadarsPolygons = function (gElement, radars, colorSet, amountOfAxis, maxValue, radius, polygonOpacity, center) {
                        gElement.selectAll(".nodes")
                            .data(radars)
                            .enter()
                            .append("polygon")
                            .attr("class", function (_, series) {
                                return "radar-chart-serie" + series;
                            })
                            .style("stroke-width", "2px")
                            .style("stroke", function (_, series) {
                                return colorSet(series);
                            })
                            .attr("points", function (answers) {
                                var points = answers.map(function (answer, index) {
                                    var module = distanceForValue(answer.value, maxValue, radius);
                                    var pointX = versorForAxis(index, amountOfAxis).x * module;
                                    var pointY = versorForAxis(index, amountOfAxis).y * module;
                                    return _.join([pointX, pointY], ',');
                                });
                                return _.join(points, ' ');
                            })
                            .style("fill", function (_, series) {
                                return colorSet(series);
                            })
                            .style("fill-opacity", polygonOpacity)
                            .on('mouseover', function () {
                                var selectedPolygon = "polygon." + d3.select(this).attr("class");
                                gElement.selectAll("polygon").transition(200).style("fill-opacity", 0.1);
                                gElement.selectAll(selectedPolygon).transition(200).style("fill-opacity", .7);
                            })
                            .on('mouseout', function () {
                                gElement.selectAll("polygon").transition(200).style("fill-opacity", polygonOpacity);
                            })
                            .attr("transform", "translate(" + center.x + "," + center.y + ")");

                    };

                    var createTooltip = function (gElement, center) {
                        return gElement.append('text')
                            .style('opacity', 0)
                            .style('font-family', 'sans-serif')
                            .style('font-size', '13px')
                            .attr("transform", "translate(" + center.x + "," + center.y + ")");
                    };

                    var drawPolygonsVertexes =
                        function (radars, gElement, center, circleRadius, maxValue, radius,
                                  amountOfAxis, colorSet, polygonOpacity, tooltip) {

                        radars.forEach(function (answers, series) {
                            gElement.selectAll(".nodes")
                                .data(answers)
                                .enter()
                                .append("svg:circle")
                                .attr("transform", "translate(" + center.x + "," + center.y + ")")
                                .attr("class", "radar-chart-serie" + series)
                                .attr('r', circleRadius)
                                .attr("alt", function (answer) {
                                    return answer.value;
                                })
                                .attr("cx", function (answer, axisNumber) {
                                    var module = distanceForValue(answer.value, maxValue, radius);
                                    return versorForAxis(axisNumber, amountOfAxis).x * module;
                                })
                                .attr("cy", function (answer, axisNumber) {
                                    var module = distanceForValue(answer.value, maxValue, radius);
                                    return versorForAxis(axisNumber, amountOfAxis).y * module;
                                })
                                .attr("data-id", function (answer) {
                                    return answer.axis;
                                })
                                .style("fill", colorSet(series)).style("fill-opacity", .9)
                                .on('mouseover', function (answer) {
                                    var newX = parseFloat(d3.select(this).attr('cx')) - 10;
                                    var newY = parseFloat(d3.select(this).attr('cy')) - 5;

                                    tooltip.attr('x', newX)
                                        .attr('y', newY)
                                        .text(answer.value)
                                        .transition(200)
                                        .style('opacity', 1);

                                    var selectedPolygon = "polygon." + d3.select(this).attr("class");
                                    gElement.selectAll("polygon").transition(200).style("fill-opacity", 0.1);
                                    gElement.selectAll(selectedPolygon).transition(200).style("fill-opacity", .7);
                                })
                                .on('mouseout', function () {
                                    tooltip.transition(200).style('opacity', 0);
                                    gElement.selectAll("polygon").transition(200).style("fill-opacity", polygonOpacity);
                                });

                        });
                    };

                    //deprecated
                    var radians = 2 * Math.PI;

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
                        color: d3.scale.category10()
                    };


                    var cfg = _.assign(defaultConfig, options);
                    var center = {x: cfg.w / 2, y: cfg.h / 2};

                    this.draw = function (id, data) {
                        //TODO validate non negative data
                        //TODO validate 3 or more axis

                        // Get the maximum value from the data
                        var maxValueFromData = d3.max(data, function (i) {
                            return d3.max(_.map(i, 'value'));
                        });
                        // that data cannot be smaller than 0
                        cfg.maxValue = Math.max(0, maxValueFromData);

                        var allAxis = _.map(data[0], 'axis');
                        var total = allAxis.length;
                        var radius = Math.min(cfg.w / 2, cfg.h / 2);

                        var g = drawMainCanvas(id,
                            {x: cfg.w + cfg.ExtraWidthX, y: cfg.h + cfg.ExtraWidthY},
                            {x: cfg.TranslateX, y: cfg.TranslateY}
                        );

                        drawStepUnionPolygons(g, radius,
                            center,
                            allAxis, total, cfg.levels
                        );

                        drawScaleText(g, center,
                            cfg.maxValue, cfg.levels, radius,
                            {x: cfg.w, y: cfg.h}, { x:cfg.ToRight, y:0}
                        );

                        drawAxis(g, allAxis, radius, center, total);

                        drawRadarsPolygons(g, data, cfg.color, total, cfg.maxValue, radius,
                            cfg.opacityArea, center);


                        var tooltip = createTooltip(g, center);

                        drawPolygonsVertexes(data, g, center, cfg.radius, cfg.maxValue,
                            radius, total, cfg.color, cfg.opacityArea, tooltip);
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
