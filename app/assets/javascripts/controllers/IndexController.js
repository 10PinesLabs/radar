angular.module('ruben-radar')
    .controller('IndexController', function ($scope, $window, RadarService, $mdDialog, _, radars, ngToast) {
        $scope.radars = _.reverse(radars);

        $scope.closeRadar = function closeRadar(radar){
            RadarService.closeRadar(radar).then(function () {
                ngToast.create('Se ha cerrado el radar con éxito');
            });
        };

        $scope.logout = function logout() {
            RadarService.signOut();
        };

        $scope.radarLink = function radarLink(radar){
            return $window.location.host + '/radars/' + radar.id.toString() + '/vote';
        };

        $scope.copyRadar = function copyRadar(radar){
            RadarService.setRadarToCopy(radar);
        }
    });