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

        $scope.copyLink = function copyLink(radar){
            var textArea = document.createElement("textarea");
            textArea.value = $scope.radarLink(radar);
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("Copy");
            ngToast.create("'" + textArea.value + "' se ha copiado con éxito.");
            document.body.removeChild(textArea);
        };

        $scope.radarLink = function radarLink(radar){
            return $window.location.host + '/radars/' + radar.id.toString() + '/vote';
        }
    });