/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('RadarChart', function RadarChart(ScaleDraw, RadarDraw, PolygonsDraw, AxesDraw) {
           return function (radarSize, canvasSize, offsetInParent, steps, maxValue) {

                var drawMainCanvas = function (parentElement, size, offset) {
                    return d3.select(parentElement)
                        .append("svg").attr("width", size.x).attr("height", size.y)
                        .append("g").attr("transform", "translate" + offset.stringOrderedPair());
                };

                this.draw = function (parentElement, results, axes) {
                    var scaleDraw = new ScaleDraw(steps, maxValue);
                    var axesDraw = new AxesDraw(axes);
                    var polygonsDraw = new PolygonsDraw(results);
                    var radarDraw = new RadarDraw(radarSize, scaleDraw, axesDraw, polygonsDraw);
                    var mainCanvasSvg = drawMainCanvas(parentElement, canvasSize, offsetInParent);
                    radarDraw.draw(mainCanvasSvg);
                };
            };
    });