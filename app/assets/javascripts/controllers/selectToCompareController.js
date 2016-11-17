angular.module('ruben-radar')
    .controller('SelectToCompareController', function ($scope, $location, $filter, _, radars) {
        var closedRadars = _.filter(radars, function (radar) {
            return !radar.active;
        });
        closedRadars = _.sortBy(closedRadars, 'created_at');

        $scope.beforeRadar = undefined;
        $scope.afterRadar = _.last(closedRadars);

        $scope.compareChosenRadars = function () {
            $location.path('/radars/compare').search({
                'beforeResult': $scope.beforeRadar.id,
                'afterResult': $scope.afterRadar.id
            });
        };

        var radarBeginsWith = function (searchText) {
            var lowercaseText = angular.lowercase(searchText);
            return function (radar) {
                var lowercaseDescription = angular.lowercase($scope.formatRadar(radar));
                return lowercaseDescription.indexOf(lowercaseText) === 0;
            };
        };

        $scope.baseRadarOptions = function (searchText) {
            return searchText ? _.filter(closedRadars, radarBeginsWith(searchText)) : closedRadars;
        };

        $scope.referenceRadarOptions = function (searchText) {
            return _.filter($scope.baseRadarOptions(searchText), function (radar) {
                return radar !== $scope.afterRadar;
            });
        };

        $scope.removeReferenceIfEqualTo = function (radar) {
            if(radar === $scope.beforeRadar) {
                $scope.beforeRadar = undefined;
            }
        };

        $scope.bothRadarsSelected = function () {
            return _.includes(closedRadars, $scope.afterRadar) && _.includes(closedRadars, $scope.beforeRadar);
        };

        $scope.cannotCompareRadars = function () {
            return !$scope.bothRadarsSelected();
        };

        $scope.formatRadar = function (radar) {
            return radar.description + " (" + $filter('date')(radar.created_at) + ")";
        }
    });
