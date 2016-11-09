/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('RadarChart', function RadarChart(ScaleDraw, RadarDraw, PolygonsDraw, AxesDraw) {
           return function (radarSize, canvasSize, offsetInParent, steps, maxValue) {

                var drawMainCanvas = function (parentElement, size, offset) {
                    return d3.select(parentElement)
                        .append("svg").attr("class", "main-svg").attr("width", size.x).attr("height", size.y)
                        .append("g").attr("class", "radar-chart")
                        .attr("transform", "translate" + offset.stringOrderedPair());
                };

                this.draw = function (parentElement, results, axes_results) {
                    var scaleDraw = new ScaleDraw(steps, maxValue);
                    var axesDraw = new AxesDraw(
                        _.map(axes_results, function (axis_result) {
                            return axis_result.axis.description + ": " + axis_result.value;
                        })
                    );
                    var polygonsDraw = new PolygonsDraw(results);
                    var radarDraw = new RadarDraw(radarSize, scaleDraw, axesDraw, polygonsDraw);
                    var mainCanvasSvg = drawMainCanvas(parentElement, canvasSize, offsetInParent);
                    radarDraw.draw(mainCanvasSvg);
                };
            };
    });
