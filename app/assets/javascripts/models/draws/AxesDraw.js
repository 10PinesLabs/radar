/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('AxesDraw', function AxesDraw(Vector2D) {
        return function (drawingStrategy, comparisonDirective) {
            var self = this;
            self.axes = drawingStrategy.axes();

            self.count = function () {
                return self.axes.length;
            };

            self.textPosition = function (radarDraw, axisNumber) {
                return radarDraw.versorForAxis(axisNumber)
                    .scale(radarDraw.radius + 40).plus(new Vector2D(0, -11));
            };

            self.textFor = function (axis) {
                return axis.description + ": ";
            };

            self.draw = function (mainCanvasSvg, radarDraw) {
                var axis = mainCanvasSvg.selectAll(".axis")
                    .data(self.axes).enter()
                    .append("g").attr("class", "axis")
                    .attr("transform", "translate" + radarDraw.center.stringOrderedPair());

                axis.append("line")
                    .attr("x1", 0).attr("y1", 0)
                    .attr("x2", function (axis, axisNumber) {
                        return radarDraw.lastPointFor(axisNumber).x;
                    })
                    .attr("y2", function (axis, axisNumber) {
                        return radarDraw.lastPointFor(axisNumber).y;
                    })
                    .attr("class", "line");

                var legend = axis.append("text")
                    .attr("class", "legend")
                    .attr("dy", "1.5em")
                    .attr("x", function (axis, axisNumber) {
                        return self.textPosition(radarDraw, axisNumber).x;
                    })
                    .attr("y", function (axis, axisNumber) {
                        return self.textPosition(radarDraw, axisNumber).y;
                    })
                    .on('mouseover', function () {
                        mainCanvasSvg.selectAll("axis").transition(200).style("fill-opacity", 0.1);
                        d3.select(this).transition(200).style("fill-opacity", .7);
                    })
                    .on('mouseout', function () {
                        mainCanvasSvg.selectAll("axis").transition(200).style("fill-opacity", 0.35);
                    })
                    .on("click", function (axis) {
                        comparisonDirective.createBarChart(axis);
                    });

                legend.append("tspan")
                    .attr("class", "description")
                    .text(self.textFor);

                drawingStrategy.fillAxisLegend(legend);
            };
        };
    });
