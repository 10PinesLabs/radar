/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('PolygonsDraw', function PolygonsDraw() {
        return function (results) {
            var self = this;
            self.results = results;
            self.colorSet = d3.scale.category10();

            self.polygonOpacity = function () {
                return 0.5;
            };

            self.circleRadius = function (radarDraw) {
                return radarDraw.radius / 50;
            };

            self.vertexesForAnswers = function (axes_results, radarDraw) {
                return axes_results.map(function (axis_result, index) {
                    return self.vertexForAnswer(axis_result, index, radarDraw);
                });
            };

            self.vertexForAnswer = function (axis_result, numberOfAxis, radarDraw) {
                return radarDraw.versorForAxis(numberOfAxis)
                    .scale(radarDraw.distanceForValue(axis_result.value));
            };

            self.stringPointsForAnswers = function (axes_results, radarDraw) {
                var points = self.vertexesForAnswers(axes_results, radarDraw)
                    .map(function (vertex) {
                        return vertex.stringJoin();
                    });
                return _.join(points, ' ');
            };

            self.addHoverLogic = function (mainCanvasSvg, polygonsSvg) {
                polygonsSvg
                    .on('mouseover', function () {
                        var selectedPolygon = "polygon." + d3.select(this).attr("class");
                        mainCanvasSvg.selectAll("polygon").transition(200).style("fill-opacity", 0.1);
                        mainCanvasSvg.selectAll(selectedPolygon).transition(200).style("fill-opacity", .7);
                    })
                    .on('mouseout', function () {
                        mainCanvasSvg.selectAll("polygon").transition(200).style("fill-opacity", self.polygonOpacity());
                    });
            };

            self.addCirclesHoverLogic = function (mainCanvasSvg, vertexesSvg, tooltip) {
                vertexesSvg
                    .on('mouseover', function (axis_result) {
                        var newX = parseFloat(d3.select(this).attr('cx')) - 10;
                        var newY = parseFloat(d3.select(this).attr('cy')) - 5;
                        tooltip.attr('x', newX).attr('y', newY).text(axis_result.value).transition(200).style('opacity', 1);

                        var selectedPolygon = "polygon." + d3.select(this).attr("class");
                        mainCanvasSvg.selectAll("polygon").transition(200).style("fill-opacity", 0.1);
                        mainCanvasSvg.selectAll(selectedPolygon).transition(200).style("fill-opacity", .7);
                    })
                    .on('mouseout', function () {
                        tooltip.transition(200).style('opacity', 0);
                        mainCanvasSvg.selectAll("polygon").transition(200).style("fill-opacity", self.polygonOpacity());
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
                    self.results.forEach(function (result, series) {
                        var vertexesSvg =
                            mainCanvas.selectAll(".nodes")
                                .data(result.axes_results).enter()
                                .append("svg:circle")
                                .attr("transform", "translate" + radarDraw.center.stringOrderedPair())
                                .attr("class", "radar-chart-serie" + series)
                                .attr('r', self.circleRadius(radarDraw))
                                .attr("alt", function (axis_result) {
                                    return axis_result.value;
                                })
                                .attr("cx", function (axis_result, axisNumber) {
                                    return self.vertexForAnswer(axis_result, axisNumber, radarDraw).x;
                                })
                                .attr("cy", function (axis_result, axisNumber) {
                                    return self.vertexForAnswer(axis_result, axisNumber, radarDraw).y;
                                })
                                .attr("data-id", function (axis_result) {
                                    return axis_result.axis.id;
                                })
                                .style("fill", self.colorSet(series)).style("fill-opacity", .9);
                        self.addCirclesHoverLogic(mainCanvas, vertexesSvg, tooltip);
                    });
                };

            self.draw = function (mainCanvasSvg, radarDraw) {
                var polygonsSvg =
                    mainCanvasSvg.selectAll(".nodes")
                        .data(self.results).enter()
                        .append("polygon")
                        .attr("class", function (_, series) {
                            return "radar-chart-serie" + series;
                        })
                        .style("stroke-width", "2px")
                        .style("stroke", function (_, series) {
                            return self.colorSet(series);
                        })
                        .attr("points", function (result) {
                            return self.stringPointsForAnswers(result.axes_results, radarDraw);
                        })
                        .style("fill", function (_, series) {
                            return self.colorSet(series);
                        })
                        .style("fill-opacity", self.polygonOpacity())
                        .attr("transform", "translate" + radarDraw.center.stringOrderedPair());
                self.addHoverLogic(mainCanvasSvg, polygonsSvg);
                var tooltip = self.createTooltip(mainCanvasSvg, radarDraw);
                self.drawPolygonsVertexes(mainCanvasSvg, radarDraw, tooltip);
            };
        };
    });