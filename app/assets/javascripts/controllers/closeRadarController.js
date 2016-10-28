angular.module('ruben-radar')
    .controller('CloseRadarController', function ($location, $scope, _, RadarService, radar, ngToast) {
        $scope.radar = radar;
        $scope.close = function close() {
            RadarService.closeRadar($scope.radar).then(function () {
                ngToast.create('Se ha cerrado el radar con éxito');
            });
        };
    })
;