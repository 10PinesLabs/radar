angular.module('ruben-radar')
    .controller('RadarCreatorController', function ($scope, $cookies, $document, $window, $location, isLoggedIn, _, radarFactory, RadarService, ngToast) {
        $scope.radar = radarFactory.newRadar();
        $scope.axisInput = '';

        console.log($cookies.getAll());

        $scope.isAxisEmpty = function isAxisEmpty() {
            return _.isEmpty($scope.axisInput);
        };

        $scope.addAxis = function addAxis() {
            $scope.radar.addAxis($scope.axisInput);
            $scope.axisInput = '';
            this.setFocusOfAxisInput();
        };

        $scope.removeAxis =  function removeAxis(axis){
            $scope.radar.removeAxis(axis);
        };

        $scope.radarIsInvalid = function radarIsInvalid() {
            return  this.radarNameIsEmpty()        ||
                    this.radarDescriptionIsEmpty() ||
                    this.radarAxisIsEmpty();
        };

        $scope.radarAxisIsEmpty = function radarAxisIsEmpty() {
            return _.isEmpty($scope.radar.axes);
        };

        $scope.radarDescriptionIsEmpty = function radarDescriptionIsEmpty() {
            return _.isEmpty($scope.radar.description);
        };

        $scope.radarNameIsEmpty = function radarNameIsEmpty() {
            return _.isEmpty($scope.radar.name);
        };

        $scope.createRadar = function createRadar() {
            RadarService.createRadar($scope.radar).then(function(result) {
                //$document.cookie
                console.log($document.cookie);
                ngToast.success('Se ha creado el fradar con éxito.');
                $scope.radar = radarFactory.newRadar();
            });
            $window.location.href = '/radars';
            $scope.radar = radarFactory.newRadar();
            $scope.createRadarForm.$setUntouched();
        };

        $scope.logout = function logout() {
            RadarService.signOut();
            $window.location.href = '/';
        }

    });