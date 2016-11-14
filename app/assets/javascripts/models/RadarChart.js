angular.module('ruben-radar')
    .factory('RadarChart', function RadarChart(ScaleDraw, RadarDraw, PolygonsDraw, AxesDraw) {
        return function (radarSize, steps, maxValue) {
            var drawMainCanvas = function (parentElement) {
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

            this.draw = function (parentElement, strategy) {
                var scaleDraw = new ScaleDraw(steps, maxValue);
                var axesDraw = new AxesDraw(strategy);
                var polygonsDraw = new PolygonsDraw(strategy);
                var radarDraw = new RadarDraw(radarSize, scaleDraw, axesDraw, polygonsDraw);
                var mainCanvasSvg = drawMainCanvas(parentElement);
                radarDraw.draw(mainCanvasSvg);
                adjustSize();
            };
        };
    });
