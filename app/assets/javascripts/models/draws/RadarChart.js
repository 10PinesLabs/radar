angular.module('ruben-radar')
    .factory('RadarChart', function RadarChart(ScaleDraw, RadarDraw, PolygonsDraw, AxesDraw, RadarReferenceLegend) {
        return function (radarSize, steps, maxValue) {
            var drawMainCanvas = function (parentElement) {
                return d3.select(parentElement)
                    .append("svg").attr("class", "main-svg")
                    .attr("max-width", "75%");
            };

            var adjustSize = function (mainCanvasSvg) {
                var bbox = mainCanvasSvg[0][0].getBBox();
                var boxMeasures = (bbox.x - 10) + " " + (bbox.y - 10) + " " + (bbox.width + 20) + " " + (bbox.height + 20);
                mainCanvasSvg.attr("viewBox", boxMeasures);
            };

            this.draw = function (parentElement, strategy) {
                var scaleDraw = new ScaleDraw(steps, maxValue);
                var axesDraw = new AxesDraw(strategy);
                var polygonsDraw = new PolygonsDraw(strategy);
                var radarReferenceLegend = new RadarReferenceLegend(strategy);
                var radarDraw = new RadarDraw(radarSize, scaleDraw, axesDraw, polygonsDraw);
                radarReferenceLegend.draw(parentElement);
                var mainCanvasSvg = drawMainCanvas(parentElement);
                radarDraw.draw(mainCanvasSvg);
                adjustSize(mainCanvasSvg);
            };
        };
    });
