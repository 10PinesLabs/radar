angular.module('ruben-radar')
    .controller('IndexController', function ($scope, $mdDialog, _, radars) {
        $scope.radars = radars;
        $scope.radarsDate = function (radar) {
            var date = radar.created_at
            return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
        }

    })
;