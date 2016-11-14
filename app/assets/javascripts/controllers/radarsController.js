angular.module('ruben-radar')
    .controller('RadarsController', function ($scope, $location, _, radars) {
        $scope.closedRadars = _.filter(radars, function (radar) {
            return !radar.active;
        });

        $scope.compareChosenRadars = function () {
            var selectedIds = _($scope.closedRadars)
                .filter('selected')
                .map('id');

            $location.path('/radars/compare').search({'radars': selectedIds.join(',')});
        };
    })
;
