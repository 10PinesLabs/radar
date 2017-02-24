/**
 * Created by gustavo on 24/02/17.
 */
angular.module('ruben-radar')
    .filter('representationStrategy', function(ConcentrationPoints, PolygonsDraw) {
        return function(representationId) {
            switch (representationId) {
                case "polygon":
                    return PolygonsDraw;
                    break;
                case "circles":
                    return ConcentrationPoints;
                    break;
                default:
                    throw new Error("Unhandled type of representation strategy");
            }
        };
    });