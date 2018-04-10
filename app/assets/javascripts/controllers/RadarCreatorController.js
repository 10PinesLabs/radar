angular.module('ruben-radar')
    .controller('RadarCreatorController', function ($scope, _, RadarService, ngToast) {
        $scope.description = '';
        $scope.axisInput = '';
        $scope.axes = [];

        $scope.addAxis = function addAxis() {
            if($scope.axisInput.length === 0){
                createNgToast('danger', 'No se puede agregar un axis vacío.');
            } else {
                $scope.axes.push({description: $scope.axisInput});
            }
        };

        $scope.createRadar = function createRadar() {
            if($scope.description.length === 0 || $scope.axes.length === 0){
                createNgToast('danger', 'No se puede crear un radar sin descripción ni axes.');
            } else {
                RadarService.createRadar(newRadar()).then(function () {
                    createNgToast('success', 'Se ha creado el radar con éxito');
                })
            }
        };

        var newRadar = function () {
            return {
                description: $scope.description,
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