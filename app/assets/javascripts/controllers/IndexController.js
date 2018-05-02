angular.module('ruben-radar')
    .controller('IndexController', function ($scope, $window, RadarService, $mdDialog, _, radars, ngToast) {
        $scope.isOpen = false;
        $scope.radars = _.reverse(radars);

        $scope.closeConfirmation = function closeConfirmation(event, radar){
            var confirm = $mdDialog.confirm()
                .title('Desea cerrar el radar:')
                .textContent(radar.name)
                .ariaLabel('CloseRadar')
                .targetEvent(event)
                .ok('Cerrar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                $scope.closeRadar(radar);
            }, function() {
                ngToast.warning('El radar no se ha cerrado');
            });
        };

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
        };

        $scope.openMenu = function openMenu($mdOpenMenu, event){
            $mdOpenMenu(event);
        };

    });