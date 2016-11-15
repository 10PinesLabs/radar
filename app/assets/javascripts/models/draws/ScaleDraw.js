/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('ScaleDraw', function ScaleDraw() {
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

            self.textOffset = function (radarDraw, axis) {
                return new radarDraw.versorForAxis(axis).rotateByRightAngle().scale(radarDraw.radius / 25);
            };

            self.drawScaleText = function (scaleSvg, radarDraw) {
                var steps = _.range(0, self.amountOfSteps);
                var axes = _.range(0, radarDraw.amountOfAxis);
                axes.forEach(function (axis) {
                    scaleSvg.selectAll(".levels")
                        .data(steps).enter()
                        .append("svg:text")
                        .attr("class", "legend")
                        .attr("x", function (step){
                            return radarDraw.pointFor(axis, step).x;
                        })
                        .attr("y", function (step) {
                            return radarDraw.pointFor(axis, step).y;
                        })
                        .text(function (step) {
                            return (step + 1) * self.valuePerStep();
                        })
                        .attr("transform", "translate" +
                            radarDraw.center.plus(self.textOffset(radarDraw, axis)).stringOrderedPair());
                });


            };

            self.drawStepUnionPolygons = function (scaleSvg, radarDraw) {
                var steps = _.range(0, self.amountOfSteps);
                var axes = _.range(0, radarDraw.amountOfAxis);
                steps.forEach(function (step) {
                    scaleSvg.selectAll(".levels")
                        .data(axes).enter()
                        .append("svg:line")
                        .attr("class", "step-union-polygon")
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
                        .attr("transform", "translate" + radarDraw.center.stringOrderedPair());
                });
            };

            self.draw = function (mainCanvasSvg, radarDraw) {
                var scaleSvg = mainCanvasSvg.append("g").attr("class", "scale");
                self.drawStepUnionPolygons(scaleSvg, radarDraw);
                self.drawScaleText(scaleSvg, radarDraw);
            }
        };
    });