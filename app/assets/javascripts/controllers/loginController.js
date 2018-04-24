angular.module('ruben-radar')
    .controller('loginController', function ($scope, $mdDialog) {

        $scope.email = '';
        $scope.password = '';

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function() {
            $mdDialog.hide({
                emal: $scope.email,
                password: $scope.password
            });
        };
    });