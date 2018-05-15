angular.module('ruben-radar')
    .controller('IndexController', function ($scope, RadarService, _, radars) {
        $scope.radars = radars.sort(function(a, b) {
            a = new Date(a.created_at);
            b = new Date(b.created_at);
            return a>b ? -1 : a<b ? 1 : 0;
        });

        $scope.logout = function logout() {
            RadarService.signOut();
        };
    });