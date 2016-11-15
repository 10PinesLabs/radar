angular.module('ruben-radar')
    .controller('RadarsController', function ($scope, $location, _, radars, ngToast) {
        $scope.closedRadars = _.filter(radars, function (radar) {
            return !radar.active;
        });
        $scope.closedRadars = _.sortBy($scope.closedRadars, 'created_at');

        $scope.beforeRadar = undefined;
        $scope.afterRadar = undefined;

        $scope.compareChosenRadars = function () {
            if($scope.sameRadarSelected()) {
                ngToast.danger('No se puede comparar contra el mismo radar');
            } else {
                $location.path('/radars/compare').search({
                    'beforeResult': $scope.beforeRadar.id,
                    'afterResult': $scope.afterRadar.id
                });
            }
        };

        $scope.bothRadarsSelected = function () {
            return $scope.afterRadar !== undefined && $scope.beforeRadar !== undefined;
        };

        $scope.sameRadarSelected = function () {
            return $scope.afterRadar === $scope.beforeRadar;
        };

        $scope.cannotCompareRadars = function () {
            return !$scope.bothRadarsSelected();
        };
    });
