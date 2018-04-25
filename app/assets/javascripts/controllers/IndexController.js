angular.module('ruben-radar')
    .controller('IndexController', function ($scope, RadarService, $mdDialog, _, radars, ngToast) {
        $scope.radars = _.reverse(radars);

        $scope.closeRadar = function closeRadar(radar){
            RadarService.closeRadar(radar).then(function () {
                ngToast.create('Se ha cerrado el radar con éxito');
            });
        }
    });