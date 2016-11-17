/**
 * Created by pino on 26/10/16.
 */
angular.module('ruben-radar')
    .factory('RadarDraw', function RadarDraw(Angle) {
        return function (size, scale, axes, representation) {
            var self = this;
            self.size = size;
            self.amountOfAxis = axes.count();
            self.scale = scale;
            self.components = [scale, axes, representation];

            self.center = size.scale(1 / 2);
            self.radius = Math.min(self.center.x, self.center.y);

            self.lastPointFor = function (axisNumber) {
                return self.versorForAxis(axisNumber, self.amountOfAxis).scale(self.radius);
            };

            self.distanceToCenter = function (stepInAxis) {
                return self.radius * self.scale.positionForStep(stepInAxis);
            };

            self.angleForAxis = function (axisNumber) {
                return axisNumber / self.amountOfAxis * Angle.oneSpin() + Angle.right();
            };

            self.distanceForValue = function (value) {
                return self.scale.positionForValue(value) * self.radius;
            };

            self.versorForAxis = function (axisNumber) {
                return Angle.versor(self.angleForAxis(axisNumber));
            };

            self.pointFor = function (axisNumber, stepInAxis) {
                var module = self.distanceToCenter(stepInAxis);
                return self.versorForAxis(axisNumber, self.amountOfAxis).scale(module);
            };

            self.draw = function (mainCanvasSvg) {
                self.components.forEach(function (component) {
                    component.draw(mainCanvasSvg, self);
                });
            };
        };
    });
