/**
 * Created by pino on 27/10/16.
 */
angular.module('ruben-radar')
    .factory('RadarChart', function RadarChart(ScaleDraw, RadarDraw, PolygonsDraw, AxesDraw) {
        return function (radarSize, canvasSize, offsetInParent, steps, maxValue) {

            var drawMainCanvas = function (parentElement, size, offset) {
                return d3.select(parentElement)
                    .append("svg").attr("class", "main-svg")
                    .attr("max-width", "75%");
            };

            var adjustSize = function () {
                var mainSvg = d3.select("svg.main-svg");
                var bbox = mainSvg[0][0].getBBox();
                mainSvg.attr("viewBox",(bbox.x - 10) + " " + (bbox.y - 10) +
                    " " + (bbox.width + 20) + " " + (bbox.height + 20));
            };

            this.draw = function (parentElement, results, axes_results) {
                var scaleDraw = new ScaleDraw(steps, maxValue);
                var axesDraw = new AxesDraw(axes_results);
                var polygonsDraw = new PolygonsDraw(results);
                var radarDraw = new RadarDraw(radarSize, scaleDraw, axesDraw, polygonsDraw);
                var mainCanvasSvg = drawMainCanvas(parentElement, canvasSize, offsetInParent);
                radarDraw.draw(mainCanvasSvg);
                adjustSize();
            };
        };
    });