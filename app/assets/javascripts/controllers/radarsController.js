angular.module('ruben-radar')
    .controller('RadarsController', function ($scope, $location, _, radars) {
        $scope.closedRadars = _.filter(radars, function (radar) {
            return !radar.active;
        });

        $scope.compareChosenRadars = function () {
            var selectedRadars = _.filter($scope.closedRadars, 'selected');
            var selectedRadarIds = _.map(selectedRadars, 'id');
            $location.path('/radars/compare').search({'radars': selectedRadarIds.join(',')});
        };
    });
