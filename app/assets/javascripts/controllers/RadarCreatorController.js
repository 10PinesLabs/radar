

angular.module('ruben-radar')
    .controller('RadarCreatorController', function ($scope, _, RadarService, ngToast) {
        $scope.radarDescription = '';
        $scope.axesInput = '';
        $scope.axes = [];

        $scope.addAxes = function addAxis() {
            $scope.axes.push({description: $scope.axesInput});
        };

        $scope.createRadar = function createRadar() {
            RadarService.createRadar(newRadar($scope)).then(function () {
                ngToast.create('Se ha creado el radar con éxito');
            });
        };

        newRadar = function ($scope) {
            return {
                description: $scope.radarDescription,
                axes: $scope.axes
            };
        }
    });