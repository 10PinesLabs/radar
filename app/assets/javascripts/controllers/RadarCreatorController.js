angular.module('ruben-radar')
    .controller('RadarCreatorController', function ($scope, $cookies, $window, isLoggedIn, _, radarFactory, RadarService, ngToast) {
        $scope.radar = radarFactory.newRadar();
        $scope.axisInput = '';

        if(!isLoggedIn.is_logged_in){
            $window.location.href = '/422.html'
        }

        $scope.isAxisEmpty = function isAxisEmpty() {
            return _.isEmpty($scope.axisInput);
        };

        $scope.addAxis = function addAxis() {
            $scope.radar.addAxis($scope.axisInput);
            $scope.axisInput = '';
            this.setFocusOfAxisInput();
        };

        $scope.setFocusOfAxisInput = function () {
            document.getElementById('axisInputId').focus();
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
            RadarService.createRadar($scope.radar).then(function () {
                ngToast.success('Se ha creado el radar con éxito.');
                $scope.radar = radarFactory.newRadar();
                });
            $scope.radar = radarFactory.newRadar();
            $scope.createRadarForm.$setUntouched();
        };

        $scope.logout = function logout() {
            RadarService.signOut();
            $window.location.href = '/422.html';
        }

    });