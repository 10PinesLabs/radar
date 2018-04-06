function newRadar($scope) {
    return {
        description: $scope.radarDescription,
        axes: $scope.axes
    };
}

angular.module('ruben-radar')
    .controller('RadarCreatorController', function ($scope, _, RadarService, ngToast) {
        $scope.radarDescription = '';
        $scope.axesInput = '';
        $scope.axes = [];

        $scope.addAxes = function addAxis() {
            $scope.axes.push({description: $scope.axesInput});
        };

        $scope.createRadar = function createRadar() {
            if($scope.radarDescription.length === 0 || $scope.axes.length === 0){
                ngToast.create({
                    className: 'danger',
                    content: 'No se puede crear un radar sin descripción ni axes.'
                })
            }else{
                RadarService.createRadar(newRadar($scope)).then(function () {
                    ngToast.create({
                        className: 'success',
                        content: 'Se ha creado el radar con éxito'});
                })
            }
        };
    });