/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('Vector2D', function _Vector2D() {
        var selfClass = function (x, y) {
            var self = this;
            self.x = x;
            self.y = y;

            self.rotateByRightAngle = function () {
                return new selfClass(-self.y, self.x);
            };

            self.scale = function (scalar) {
                return new selfClass(self.x * scalar, self.y * scalar);
            };

            self.plus = function (anotherVector) {
                return new selfClass(self.x + anotherVector.x, self.y + anotherVector.y);
            };

            self.minus = function (anotherVector) {
                return new selfClass(self.x - anotherVector.x, self.y - anotherVector.y);
            };

            self.stringJoin = function () {
                return "" + self.x + "," + self.y + "";
            };

            self.stringOrderedPair = function () {
                return "(" + self.stringJoin() + ")";
            };
        };
        return selfClass;
    });

