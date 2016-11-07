angular.module('ruben-radar')
    .controller('RadarsController', function ($scope, $location, _, radars) {
        $scope.radars = radars;

        $scope.compareChosenRadars = function () {
            var ids = _.map(_.filter(
                _.filter(radars, function(radar) {
                    return radar.active;
                }), function(radar) {
                    return radar.selected;
                }
            ), 'id');

            $location.path('/radars/compare').search({'radars': ids.join(',')});
        };
    })
;
