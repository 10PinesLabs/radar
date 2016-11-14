angular.module('ruben-radar')
    .controller('RadarsController', function ($scope, $location, _, radars) {
        $scope.closedRadars = _.filter(radars, function (radar) {
            return !radar.active;
        });

        $scope.beforeRadar = undefined;
        $scope.afterRadar = undefined;

        $scope.compareChosenRadars = function () {
            $location.path('/radars/compare').search({
                'beforeResult': $scope.beforeRadar.id,
                'afterResult': $scope.afterRadar.id
            });
        };
    });
