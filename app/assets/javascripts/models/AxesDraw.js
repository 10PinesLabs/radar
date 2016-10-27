/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('AxesDraw', function AxesDraw(Vector2D) {
        return function (axesDescriptions) {
            var self = this;
            self.axesDescriptions = axesDescriptions;

            self.count = function() {
              return self.axesDescriptions.length;
            };

            self.textPosition = function (radarDraw, axisNumber) {
                return radarDraw.versorForAxis(axisNumber)
                    .scale(radarDraw.radius + 20).plus(new Vector2D(0, -11));
            };

            self.draw = function (mainCanvasSvg, radarDraw) {
                var axis = mainCanvasSvg.selectAll(".axis")
                    .data(self.axesDescriptions).enter()
                    .append("g").attr("class", "axis")
                    .attr("transform", "translate" + radarDraw.center.stringOrderedPair());

                axis.append("line")
                    .attr("x1", 0).attr("y1", 0)
                    .attr("x2", function (description, axisNumber) {
                        return radarDraw.lastPointFor(axisNumber).x;
                    })
                    .attr("y2", function (description, axisNumber) {
                        return radarDraw.lastPointFor(axisNumber).y;
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
                    .attr("x", function (description, axisNumber) {
                        return self.textPosition(radarDraw, axisNumber).x;
                    })
                    .attr("y", function (description, axisNumber) {
                        return self.textPosition(radarDraw, axisNumber).y;
                    });
            };
        };
    });