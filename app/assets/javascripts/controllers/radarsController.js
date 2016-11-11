angular.module('ruben-radar')
    .controller('RadarsController', function ($scope, $location, _, radars) {
        $scope.radars = radars;

        $scope.compareChosenRadars = function () {
            var selectedIds = _(radars)
                .filter('active')
                .filter('selected')
                .map('id');

            $location.path('/radars/compare').search({'radars': selectedIds.join(',')});
        };
    })
;
