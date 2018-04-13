angular.module('ruben-radar')
    .controller('LandingController', function ($scope, _, RadarService) {
        $scope.imagepath = 'images/landing-image.jpg';

        $scope.getStyle = function getBackgroundStyle(){
            return {
                'position': 'fixed',
                'background-image':'url('+ $scope.imagepath +')',
                'background-position': 'center center',
                'width': '100%',
                'height': '100%',
                'top': '0px',
                'left': '0px',
                'margin': 'auto',
                'background-repeat': 'no-repeat',
                'background-size': '100%, 100%'
            }
        }
       /* $scope.radar = radarFactory.newRadar();
        $scope.axisInput = '';

        $scope.isAxisEmpty = function isAxisEmpty() {
            return _.isEmpty($scope.axisInput);
        };

        $scope.addAxis = function addAxis() {
            $scope.radar.addAxis($scope.axisInput);
            $scope.axisInput = '';
        };

        $scope.radarIsInvalid = function radarIsInvalid() {
            return this.radarDescriptionIsEmpty() || this.radarAxisIsEmpty();
        };

        $scope.radarAxisIsEmpty = function radarAxisIsEmpty() {
            return _.isEmpty($scope.radar.axes);
        };

        $scope.radarDescriptionIsEmpty = function radarDescriptionIsEmpty() {
            return _.isEmpty($scope.radar.description);
        };

        $scope.createRadar = function createRadar() {
            RadarService.createRadar($scope.radar).then(function () {
                ngToast.create({
                    className: 'success',
                    content:'Se ha creado el radar con éxito.'
                });
            });
            $scope.radar = radarFactory.newRadar();
        };*/
    });