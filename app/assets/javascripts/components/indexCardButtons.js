angular.module('ruben-radar').component('indexCardButtons', {
    templateUrl: 'templates/radars/indexCardButtons.html',
    binding: {
    },
    controller: function ($scope, $window, ngToast, $mdDialog, RadarService) {
        $scope.getRadar = function getRadar(){
            $scope.radar = $scope.$parent.radar;
        };

        $scope.isActive = function isActive(){
            return $scope.radar.active;
        };

        $scope.openMenu = function openMenu($mdOpenMenu, event){
            $mdOpenMenu(event);
        };

        $scope.copyLink = function copyLink(){
            var textArea = document.createElement("textarea");
            textArea.value = $scope.radarLink();
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("Copy");
            ngToast.create("'" + textArea.value + "' se ha copiado con éxito.");
            document.body.removeChild(textArea);
        };

        $scope.radarLink = function radarLink(){
            return $window.location.host + '/radars/' + $scope.radar.id.toString() + '/vote';
        };

        $scope.closeConfirmation = function closeConfirmation(event, ){
            var confirm = $mdDialog.confirm()
                .title('Desea cerrar el radar:')
                .textContent($scope.radar.name)
                .ariaLabel('CloseRadar')
                .targetEvent(event)
                .ok('Cerrar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                $scope.closeRadar();
            }, function() {
                ngToast.warning('El radar no se ha cerrado');
            });
        };

        $scope.closeRadar = function closeRadar(){
            RadarService.closeRadar($scope.radar).then(function () {
                ngToast.create('Se ha cerrado el radar con éxito');
            });
        };
    }
});