angular.module('ruben-radar')
    .controller('HomeController', function ($scope, _, radars) {
        $scope.radars = radars;

    });
