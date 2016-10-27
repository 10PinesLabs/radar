/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('PolygonsDraw', function PolygonsDraw() {
        return function (radars, polygonOpacity, circleRadius) {
            var self = this;
            //[[{axis: 0, value: 5}]]
            self.radars = radars;
            self.polygonOpacity = polygonOpacity;
            self.circleRadius = circleRadius;
            self.colorSet = d3.scale.category10();

            self.vertexesForAnswers = function (answers, radarDraw) {
                return answers.map(function (answer, index) {
                    return self.vertexForAnswer(answer, index, radarDraw);
                });
            };

            self.vertexForAnswer = function (answer, numberOfAxis, radarDraw) {
                return radarDraw.versorForAxis(numberOfAxis)
                    .scale(radarDraw.distanceForValue(answer.value));
            };

            self.stringPointsForAnswers = function (answers, radarDraw) {
                var points = self.vertexesForAnswers(answers, radarDraw)
                    .map(function (vertex) { return vertex.stringJoin(); });
                return _.join(points, ' ');
            };

            self.addHoverLogic = function(mainCanvasSvg, polygonsSvg) {
                polygonsSvg
                    .on('mouseover', function () {
                        var selectedPolygon = "polygon." + d3.select(this).attr("class");
                        mainCanvasSvg.selectAll("polygon").transition(200).style("fill-opacity", 0.1);
                        mainCanvasSvg.selectAll(selectedPolygon).transition(200).style("fill-opacity", .7);
                    })
                    .on('mouseout', function () {
                        mainCanvasSvg.selectAll("polygon").transition(200).style("fill-opacity", self.polygonOpacity);
                    });
            };

            self.addCirclesHoverLogic = function(mainCanvasSvg, vertexesSvg, tooltip) {
                vertexesSvg
                    .on('mouseover', function (answer) {
                        var newX = parseFloat(d3.select(this).attr('cx')) - 10;
                        var newY = parseFloat(d3.select(this).attr('cy')) - 5;
                        tooltip.attr('x', newX).attr('y', newY).text(answer.value).transition(200).style('opacity', 1);

                        var selectedPolygon = "polygon." + d3.select(this).attr("class");
                        mainCanvasSvg.selectAll("polygon").transition(200).style("fill-opacity", 0.1);
                        mainCanvasSvg.selectAll(selectedPolygon).transition(200).style("fill-opacity", .7);
                    })
                    .on('mouseout', function () {
                        tooltip.transition(200).style('opacity', 0);
                        mainCanvasSvg.selectAll("polygon").transition(200).style("fill-opacity", self.polygonOpacity);
                    });
            };

            self.createTooltip = function (gElement, radarDraw) {
                return gElement.append('text')
                    .style('opacity', 0)
                    .style('font-family', 'sans-serif')
                    .style('font-size', '13px')
                    .attr("transform", "translate" + radarDraw.center.stringOrderedPair());
            };

            self.drawPolygonsVertexes =
                function (mainCanvas, radarDraw, tooltip) {
                    self.radars.forEach(function (answers, series) {
                        var vertexesSvg =
                            mainCanvas.selectAll(".nodes")
                            .data(answers).enter()
                            .append("svg:circle")
                            .attr("transform", "translate" + radarDraw.center.stringOrderedPair())
                            .attr("class", "radar-chart-serie" + series)
                            .attr('r', self.circleRadius)
                            .attr("alt", function (answer) {
                                return answer.value;
                            })
                            .attr("cx", function (answer, axisNumber) {
                                return self.vertexForAnswer(answer, axisNumber, radarDraw).x;
                            })
                            .attr("cy", function (answer, axisNumber) {
                                return self.vertexForAnswer(answer, axisNumber, radarDraw).y;
                            })
                            .attr("data-id", function (answer) {
                                return answer.axis;
                            })
                            .style("fill", self.colorSet(series)).style("fill-opacity", .9);
                        self.addCirclesHoverLogic(mainCanvas, vertexesSvg, tooltip);
                    });
                };

            self.draw = function (mainCanvasSvg, radarDraw) {
                var polygonsSvg =
                    mainCanvasSvg.selectAll(".nodes")
                        .data(self.radars).enter()
                        .append("polygon")
                        .attr("class", function (_, series) {
                            return "radar-chart-serie" + series;
                        })
                        .style("stroke-width", "2px")
                        .style("stroke", function (_, series) {
                            return self.colorSet(series);
                        })
                        .attr("points", function (answers) {
                            return self.stringPointsForAnswers(answers, radarDraw);
                        })
                        .style("fill", function (_, series) {
                            return self.colorSet(series);
                        })
                        .style("fill-opacity", self.polygonOpacity)
                        .attr("transform", "translate" + radarDraw.center.stringOrderedPair());
                self.addHoverLogic(mainCanvasSvg, polygonsSvg);
                var tooltip = self.createTooltip(mainCanvasSvg, radarDraw);
                self.drawPolygonsVertexes(mainCanvasSvg, radarDraw, tooltip);
            };
        };
    });