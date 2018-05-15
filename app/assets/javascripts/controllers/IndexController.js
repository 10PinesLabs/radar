angular.module('ruben-radar')
    .controller('IndexController', function ($scope, RadarService, _, radars) {
        $scope.isOpen = false;
        $scope.radars = _.reverse(radars);

        $scope.logout = function logout() {
            RadarService.signOut();
        };
    });