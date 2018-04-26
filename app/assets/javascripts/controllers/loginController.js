angular.module('ruben-radar')
    .controller('loginController', function ($scope, $mdDialog, RadarService, $location) {

        $scope.jsonToLogin = {
            admin: {
                email: '',
                password: '',
                remember_me: 0
            }
        };

        $scope.hide = function hide() {
            $mdDialog.hide();
        };

        $scope.login = function login() {
            $scope.hide();
            RadarService.login($scope.jsonToLogin).then(function(){
                $location.path( "/radars" );
            });
        };
    });