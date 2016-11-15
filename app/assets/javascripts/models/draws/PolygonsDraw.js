/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('PolygonsDraw', function PolygonsDraw() {
        return function (drawingStrategy) {
            var self = this;
            self.results = drawingStrategy.results();
            self.axes = drawingStrategy.axes();
            self.colorSet = d3.scale.category10();

            self.polygonOpacity = function () {
                return 0.5;
            };

            self.circleRadius = function (radarDraw) {
                return radarDraw.radius / 50;
            };

            self.vertexesForAnswers = function (radarResult, radarDraw) {
                return self.axes.map(function (axis, index) {
                    return self.vertexForAnswer(radarResult, axis, index, radarDraw);
                });
            };

            self.vertexForAnswer = function (radarResult, axis, numberOfAxis, radarDraw) {
                return radarDraw.versorForAxis(numberOfAxis)
                    .scale(radarDraw.distanceForValue(radarResult.valueFor(axis)));
            };

            self.stringPointsForAnswers = function (radarResult, radarDraw) {
                var points = self.vertexesForAnswers(radarResult, radarDraw)
                    .map(function (vertex) {
                        return vertex.stringJoin();
                    });
                return _.join(points, ' ');
            };

            self.addHoverLogic = function (mainCanvasSvg, polygonsSvg) {
                polygonsSvg
                    .on('mouseover', function () {
                        mainCanvasSvg.selectAll("polygon").transition(200).style("fill-opacity", 0.1);
                        d3.select(this).transition(200).style("fill-opacity", .7);
                    })
                    .on('mouseout', function () {
                        mainCanvasSvg.selectAll("polygon").transition(200).style("fill-opacity", self.polygonOpacity());
                    });
            };

            self.addCirclesHoverLogic = function (mainCanvasSvg, vertexesSvg, tooltip) {
                vertexesSvg
                    .on('mouseover', function () {
                        var newX = parseFloat(d3.select(this).attr('cx')) - 10;
                        var newY = parseFloat(d3.select(this).attr('cy')) - 5;
                        tooltip.attr('x', newX).attr('y', newY)
                            .text(d3.select(this).attr('value'))
                            .transition(200).style('opacity', 1);

                        var seriesSelector = ".series-" + d3.select(this).attr("series");
                        console.log(seriesSelector);
                        mainCanvasSvg.selectAll(".radar-polygon").transition(200).style("fill-opacity", 0.1);
                        mainCanvasSvg.selectAll(seriesSelector).selectAll(".radar-polygon")
                            .transition(200).style("fill-opacity", .7);
                    })
                    .on('mouseout', function () {
                        tooltip.transition(200).style('opacity', 0);
                        mainCanvasSvg.selectAll("polygon").transition(200).style("fill-opacity", self.polygonOpacity());
                    });
            };

            self.createTooltip = function (gElement, radarDraw) {
                return gElement.append('text')
                    .attr("class", "vertex-tooltip")
                    .attr("transform", "translate" + radarDraw.center.stringOrderedPair());
            };

            self.drawPolygonsVertexes =
                function (mainCanvas, radarDraw, tooltip) {
                    self.results.forEach(function (result, series) {
                        var vertexesSvg =
                            mainCanvas.selectAll(".nodes")
                                .data(self.axes).enter()
                                .append("svg:circle")
                                .attr("transform", "translate" + radarDraw.center.stringOrderedPair())
                                .attr("class", "radar-vertex")
                                .attr("series", series)
                                .attr('r', self.circleRadius(radarDraw))
                                .attr("alt", function (axis) {
                                    return result.roundedValueFor(axis);
                                })
                                .attr("cx", function (axis, axisNumber) {
                                    return self.vertexForAnswer(result, axis, axisNumber, radarDraw).x;
                                })
                                .attr("cy", function (axis, axisNumber) {
                                    return self.vertexForAnswer(result, axis, axisNumber, radarDraw).y;
                                })
                                .attr("data-id", function (axis) {
                                    return axis.id;
                                })
                                .attr("value", function (axis) {
                                    return result.roundedValueFor(axis);
                                })
                                .style("fill", self.colorSet(series));
                        self.addCirclesHoverLogic(mainCanvas, vertexesSvg, tooltip);
                    });
                };

            self.draw = function (mainCanvasSvg, radarDraw) {
                var polygonsSvg =
                    mainCanvasSvg.selectAll(".nodes")
                        .data(self.results).enter()
                        .append("g").attr("class", function (_, series) {
                            return "series-" + series;
                        })
                        .append("polygon")
                        .attr("class", "radar-polygon")
                        .style("stroke", function (_, series) {
                            return self.colorSet(series);
                        })
                        .attr("points", function (radarResult) {
                            return self.stringPointsForAnswers(radarResult, radarDraw);
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