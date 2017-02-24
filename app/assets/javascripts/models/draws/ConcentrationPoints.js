angular.module('ruben-radar')
    .factory('ConcentrationPoints', function ConcentrationPoints() {
        return function (drawingStrategy) {
            var self = this;
            self.colorSet = d3.scale.category10();

            self.drawPoints = function (centeredCanvas, radarDraw) {
                drawingStrategy.results().forEach( function (result, radarIndex) {
                    result.concentrationPointsPerAxis().forEach(function (concentrationPoints, axisIndex) {
                        centeredCanvas.selectAll(".nodes")
                            .data(concentrationPoints).enter()
                            .append("svg:circle")
                            .classed("concentration-point", true)
                            .attr("radarId", result.radar_id)
                            .attr('r', function (point) {
                                return  5 + (10 / result.maxConcentratedQuantity()) * point.quantity;
                            })
                            .attr("alt", function (point) {
                                return point.quantity;
                            })
                            .attr("cx", function (point) {
                                return radarDraw.pointFor(axisIndex, point.value - 1).x;
                            })
                            .attr("cy", function (point) {
                                return radarDraw.pointFor(axisIndex, point.value - 1).y;
                            })
                            .style("fill", self.colorSet(radarIndex));
                    });
                });
            };



            self.createTooltip = function (centeredCanvas) {
                return centeredCanvas.append('text')
                    .attr("class", "vertex-tooltip");
            };

            self.addCirclesHoverLogic = function (centeredCanvas, tooltip) {
                centeredCanvas.selectAll("circle")
                    .on('mouseover', function () {
                        var newX = parseFloat(d3.select(this).attr('cx')) - 15;
                        var newY = parseFloat(d3.select(this).attr('cy')) - 10;
                        tooltip.attr('x', newX).attr('y', newY)
                            .text(d3.select(this).attr('alt'))
                            .transition(200).style('opacity', 1);
                    })
                    .on('mouseout', function () {
                        tooltip.transition(200).style('opacity', 0);
                    });
            };

            self.draw = function (mainCanvasSvg, radarDraw) {
                var centeredCanvas = mainCanvasSvg.append("g")
                    .classed("radar-distribution-container", true)
                    .attr("transform", "translate" + radarDraw.center.stringOrderedPair());

                self.drawPoints(centeredCanvas, radarDraw);
                var tooltip = self.createTooltip(centeredCanvas);
                self.addCirclesHoverLogic(centeredCanvas, tooltip);
            };

        };
    });