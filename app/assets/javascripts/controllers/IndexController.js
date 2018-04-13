angular.module('ruben-radar')
    .controller('IndexController', function ($scope, $mdDialog, _, radars) {
        $scope.radars = _.reverse(radars);
        $scope.radarsDate = function (radar) {
            var date = radar.created_at
            return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
        }
        $scope.date = function (radar) {
            return ;
        }

    })
;