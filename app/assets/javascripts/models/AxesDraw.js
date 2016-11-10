/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('AxesDraw', function AxesDraw(Vector2D) {
        return function (axes_results) {
            var self = this;
            self.axes_results = axes_results;

            self.count = function() {
              return self.axes_results.length;
            };

            self.textPosition = function (radarDraw, axisNumber) {
                return radarDraw.versorForAxis(axisNumber)
                    .scale(radarDraw.radius + 40).plus(new Vector2D(0, -11));
            };

            self.draw = function (mainCanvasSvg, radarDraw) {
                var axis = mainCanvasSvg.selectAll(".axis")
                    .data(self.axes_results).enter()
                    .append("g").attr("class", "axis")
                    .attr("transform", "translate" + radarDraw.center.stringOrderedPair());

                axis.append("line")
                    .attr("x1", 0).attr("y1", 0)
                    .attr("x2", function (axis_result, axisNumber) {
                        return radarDraw.lastPointFor(axisNumber).x;
                    })
                    .attr("y2", function (axis_result, axisNumber) {
                        return radarDraw.lastPointFor(axisNumber).y;
                    })
                    .attr("class", "line")
                    .style("stroke", "grey")
                    .style("stroke-width", "1px");

                axis.append("text")
                    .attr("class", "legend")
                    .text(function (axis_result) {
                        return axis_result.axis.description + ": " + axis_result.value;
                    })
                    .style("font-family", "sans-serif")
                    .attr("text-anchor", "middle")
                    .attr("dy", "1.5em")
                    .attr("x", function (axis_result, axisNumber) {
                        return self.textPosition(radarDraw, axisNumber).x;
                    })
                    .attr("y", function (axis_result, axisNumber) {
                        return self.textPosition(radarDraw, axisNumber).y;
                    });
            };
        };
    });
