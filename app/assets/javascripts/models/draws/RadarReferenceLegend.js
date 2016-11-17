angular.module('ruben-radar')
    .factory('RadarReferenceLegend', function RadarReferenceLegend() {
        return function (drawingStrategy) {
            var self = this;
            self.radars = drawingStrategy.radars();

            var adjustSize = function (referenceSvg) {
                var bbox = referenceSvg[0][0].getBBox();
                var boxMeasures = (bbox.x - 10) + " " + (bbox.y - 10) + " " + (bbox.width + 220) + " " + (bbox.height + 20);
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
                referenceSvg.selectAll('text')
                    .data(self.radars)
                    .enter()
                    .append("text")
                    .attr("x", 13)
                    .attr("y", function (radar, index) {
                        return index * 20 + 9;
                    })
                    .attr("font-size", "11px")
                    .attr("fill", "#737373")
                    .text(_.identity)
                ;
            };

            self.draw = function (parentElement) {
                var referenceSvg = d3.select(parentElement)
                    .append("svg")
                    .classed("radar-reference-svg", true);

                drawColorSquares(referenceSvg);
                drawTextLegend(referenceSvg);

                adjustSize(referenceSvg)
            };
        };
    });