angular.module('ruben-radar')
    .controller('landingController', function ($scope, $window, $mdDialog, ngToast) {

        $scope.showLogin = function showLogin(event){
            /*$mdDialog.show({
                controller: 'loginController',
                templateUrl: 'templates/radars/login.html',
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            }).then(function(emailAndPassword) {
                ngToast.success();

            }, function(emailAndPassword) {
                ngToast.danger('Email o password invalido.');
            });*/
            $window.location.href = '/api/admins/sign_in';
        };
    });