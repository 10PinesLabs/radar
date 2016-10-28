/**
 * Created by pino on 26/10/16.
 */
angular.module('ruben-radar')
    .service('Angle', function Angle(Vector2D) {
        var self = this;

        self.oneSpin = function () {
            return 2 * Math.PI;
        };

        self.right = function () {
            return self.oneSpin() / 4;
        };

        self.versor = function (angle) {
            return new Vector2D(Math.cos(angle), - Math.sin(angle));
        };
    });