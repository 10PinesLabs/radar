angular.module('ruben-radar')
    .factory('RadarReferenceLegend', function RadarReferenceLegend($filter) {
        return function (drawingStrategy) {
            var self = this;
            self.radars = drawingStrategy.radars();

            var adjustSize = function (referenceSvg) {
                var bbox = referenceSvg[0][0].getBBox();
                var boxMeasures = (bbox.x - 10) + " " + (bbox.y - 10) + " " + 155 + " " + (bbox.height + 20);
                referenceSvg.attr("viewBox", boxMeasures);
            };

            var drawColorSquares = function (referenceSvg) {
                var colorSet = d3.scale.category10();
                referenceSvg.selectAll('rect')
                    .data(self.radars)
                    .enter()
                    .append("rect")
                    .attr("x", 0)
                    .attr("y", function (radar, index) {
                        return index * 20;
                    })
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("fill", function (radar, index) {
                        return colorSet(index);
                    });
            };

            var drawTextLegend = function (referenceSvg) {
                var text = referenceSvg.selectAll('text')
                    .data(self.radars)
                    .enter()
                    .append("text")
                    .classed("reference-legend", true)
                    .attr("x", 13)
                    .attr("y", function (radar, index) {
                        return index * 20 + 9;
                    });

                text.append("tspan")
                    .classed("radar-reference-text", true)
                    .text(drawingStrategy.radarReferenceText);

                text.append("tspan")
                    .classed("radar-reference-description", true)
                    .text(function (radar) {
                        return radar.name;
                    });
            };

            self.draw = function (parentElement) {
                var referenceSvg = d3.select(parentElement)
                    .append("svg")
                    .classed("radar-reference", true);

                drawColorSquares(referenceSvg);
                drawTextLegend(referenceSvg);

                adjustSize(referenceSvg)
            };
        };
    });