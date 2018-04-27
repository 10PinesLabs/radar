angular.module('ruben-radar')
    .controller('landingController', function ($scope, $window, $mdDialog, ngToast) {

        $scope.showLogin = function showLogin(event){
            $mdDialog.show({
                controller: 'loginController',
                templateUrl: 'templates/radars/login.html',
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            })
        };
    });