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
                createNgToast('danger', 'No se puede crear un radar sin descripción ni axes.');
            } else {
                RadarService.createRadar(newRadar($scope)).then(function () {
                    createNgToast('success', 'Se ha creado el radar con éxito');
                })
            }
        };

        var newRadar = function ($scope) {
            return {
                description: $scope.radarDescription,
                axes: $scope.axes
            };
        };

        var createNgToast = function (className, content) {
            ngToast.create({
                className: className,
                content: content
            });
        };
    });