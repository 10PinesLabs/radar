angular.module('ruben-radar')
    .factory('RadarChart', function RadarChart(ScaleDraw, RadarDraw, AxesDraw, RadarReferenceLegend) {
        return function (radarSize, steps, maxValue, Representation) {
            var drawMainCanvas = function (parentElement) {
                return d3.select(parentElement)
                    .append("svg").attr("class", "main-svg");
            };

            var adjustSize = function (mainCanvasSvg) {
                var bbox = mainCanvasSvg[0][0].getBBox();
                var boxMeasures = (bbox.x - 10) + " " + (bbox.y - 10) + " " + (bbox.width + 20) + " " + (bbox.height + 20);
                mainCanvasSvg.attr("viewBox", boxMeasures);
            };

            this.draw = function (parentElement, strategy, comparisonDirective) {
                var scaleDraw = new ScaleDraw(steps, maxValue);
                var axesDraw = new AxesDraw(strategy, comparisonDirective);
                var representation = new Representation(strategy);
                var radarReferenceLegend = new RadarReferenceLegend(strategy);
                var radarDraw = new RadarDraw(radarSize, scaleDraw, axesDraw, representation);
                var mainCanvasSvg = drawMainCanvas(parentElement);
                radarDraw.draw(mainCanvasSvg);
                adjustSize(mainCanvasSvg);
                radarReferenceLegend.draw(parentElement);
            };
        };
    });
