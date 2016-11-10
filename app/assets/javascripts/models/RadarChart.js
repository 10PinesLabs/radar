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
                var getDifferenceBetweenRadars = function (axis) {
                    var eachRadarAverage =
                        _.map(
                            _.map(
                                _.map(results, function (result) {
                                    return _.find(result.axes_results, ['axis.description', axis.description])
                                }),
                                'points'
                            ), function (points) {
                                return _.sum(points) / points.length;
                            }
                        );

                    var differenceBetweenRadars = (eachRadarAverage[0] - eachRadarAverage[1]) / eachRadarAverage[1];

                    return (differenceBetweenRadars * 100).toFixed(1) + "%";
                };


                var scaleDraw = new ScaleDraw(steps, maxValue);
                var axesDraw = new AxesDraw(
                    _.map(axes_results, function (axis) {
                        return axis.description + ": " + getDifferenceBetweenRadars(axis);
                    })
                );
                var polygonsDraw = new PolygonsDraw(results);
                var radarDraw = new RadarDraw(radarSize, scaleDraw, axesDraw, polygonsDraw);
                var mainCanvasSvg = drawMainCanvas(parentElement, canvasSize, offsetInParent);
                radarDraw.draw(mainCanvasSvg);
            };
        };
    });
