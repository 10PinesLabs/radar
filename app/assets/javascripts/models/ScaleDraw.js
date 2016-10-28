/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('ScaleDraw', function ScaleDraw(Vector2D) {
        return function (amountOfSteps, maxValue) {
            var self = this;
            self.amountOfSteps = amountOfSteps;
            self.maxValue = maxValue;

            self.valuePerStep = function () {
                return self.maxValue / self.amountOfSteps;
            };

            self.positionForValue = function (value) {
                return value / self.maxValue;
            };

            self.positionForStep = function (step) {
                return (step + 1) / self.amountOfSteps;
            };

            self.textOffset = function (radarDraw) {
                return new Vector2D(radarDraw.radius / 50, 0);
            };

            self.drawScaleText = function (mainCanvasSvg, radarDraw) {
                var steps = _.range(0, self.amountOfSteps);
                mainCanvasSvg.selectAll(".levels")
                    .data(steps).enter()
                    .append("svg:text")
                    .attr("x", 0)
                    .attr("y", function (step) {
                        return - radarDraw.distanceToCenter(step);
                    })
                    .attr("class", "legend")
                    .style("font-family", "sans-serif")
                    .style("font-size", "10px")
                    .attr("transform", "translate" +
                        radarDraw.center.plus(self.textOffset(radarDraw)).stringOrderedPair())
                    .attr("fill", "#737373")
                    .text(function (step) {
                        return (step + 1) * self.valuePerStep();
                    });
            };

            self.drawStepUnionPolygons = function (mainCanvasSvg, radarDraw) {
                var steps = _.range(0, self.amountOfSteps);
                var axes = _.range(0, radarDraw.amountOfAxis);
                steps.forEach(function (step) {
                    mainCanvasSvg.selectAll(".levels")
                        .data(axes).enter()
                        .append("svg:line")
                        .attr("x1", function (axisNumber) {
                            return radarDraw.pointFor(axisNumber, step).x;
                        })
                        .attr("y1", function (axisNumber) {
                            return radarDraw.pointFor(axisNumber, step).y;
                        })
                        .attr("x2", function (axisNumber) {
                            return radarDraw.pointFor(axisNumber + 1, step).x;
                        })
                        .attr("y2", function (axisNumber) {
                            return radarDraw.pointFor(axisNumber + 1, step).y;
                        })
                        .attr("class", "line")
                        .style("stroke", "grey")
                        .style("stroke-opacity", "0.75")
                        .style("stroke-width", "0.3px")
                        .attr("transform", "translate" + radarDraw.center.stringOrderedPair());

                });
            };

            self.draw = function (mainCanvasSvg, radarDraw) {
                self.drawStepUnionPolygons(mainCanvasSvg, radarDraw);
                self.drawScaleText(mainCanvasSvg, radarDraw);
            }
        };
    });