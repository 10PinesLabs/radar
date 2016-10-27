/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('RadarChart', function RadarChart(ScaleDraw, RadarDraw, PolygonsDraw, AxesDraw) {
           return function (radarSize, canvasSize, offsetInParent, steps) {

                var drawMainCanvas = function (parentElement, size, offset) {
                    return d3.select(parentElement)
                        .append("svg").attr("width", size.x).attr("height", size.y)
                        .append("g").attr("transform", "translate" + offset.stringOrderedPair());
                };

                this.draw = function (parentElement, radars) {
                    var maxValueFromData = d3.max(radars, function (i) {
                        return d3.max(_.map(i, 'value'));
                    });
                    var axisDescription = _.map(radars[0], 'axis');

                    var scale = new ScaleDraw(steps, maxValueFromData);
                    var axes = new AxesDraw(axisDescription);
                    var polygons = new PolygonsDraw(radars);
                    var radarDraw = new RadarDraw(radarSize, scale, axes, polygons);
                    var mainCanvasSvg = drawMainCanvas(parentElement, canvasSize, offsetInParent);
                    radarDraw.draw(mainCanvasSvg);
                };
            };
    });