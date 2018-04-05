angular.module('ruben-radar')
    .controller('RadarCreatorController', function ($scope, _, RadarService, ngToast) {
        $scope.radarDescription = '';
        $scope.axesInput = '';
        $scope.axes = [];

        $scope.addAxes = function addAxis() {
            $scope.axes.push($scope.axesInput);
        };

        $scope.createRadar = function createRadar() {
            axes = [];
            for (i = 0; i < $scope.axes.length; i++) {
                axes.push({description: $scope.axes[i]});
            }

            newRadar = {
                description: $scope.radarDescription,
                axes: axes
            };

            RadarService.createRadar(newRadar).then(function () {
                ngToast.create('Se ha creado el radar con éxito');
            });
        };
    });