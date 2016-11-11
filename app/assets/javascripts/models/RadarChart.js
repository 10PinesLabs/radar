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

            this.draw = function (parentElement, results, axes) {
                var getDifferenceBetweenRadars = function (axis) {
                    if (results.length === 1) {
                        var result = _.find(
                            results[0].axes_results, ['axis.description', axis.description]);

                        return Number(_.sum(result.points) / result.points.length).toFixed(2);
                    } else if (results.length === 2) {
                        // TODO refactor in need
                        // Some objects are in need here
                        var eachRadarAverage =
                            _.map(
                                _.map(
                                    _.map(results, function (result) {
                                        return _.find(result.axes_results, ['axis.description', axis.description]);
                                    }),
                                    'points'
                                ), function (points) {
                                    return _.sum(points) / points.length;
                                }
                            );

                        return Number((eachRadarAverage[0] - eachRadarAverage[1]) * 100 / eachRadarAverage[1]).toFixed(2);
                    } else {
                        return '';
                    }
                };

                var scaleDraw = new ScaleDraw(steps, maxValue);
                var axesDraw = new AxesDraw(
                    _.map(axes, function (axis) {
                        return axis.description + ": " + getDifferenceBetweenRadars(axis);
                    })
                );
                var polygonsDraw = new PolygonsDraw(results);
                var radarDraw = new RadarDraw(radarSize, scaleDraw, axesDraw, polygonsDraw);
                var mainCanvasSvg = drawMainCanvas(parentElement, canvasSize, offsetInParent);
                radarDraw.draw(mainCanvasSvg);
                adjustSize();
            };
        };
    });
