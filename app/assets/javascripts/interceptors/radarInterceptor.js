angular.module('ruben-radar')
    .factory('radarInterceptor', function($q, $location, $window, $injector) {
        let unauthorizedStatus = 401;
        return {
            responseError: function(response) {
                if(response.status === unauthorizedStatus){
                    var $mdDialog = $injector.get('$mdDialog');
                    $mdDialog.show(
                      $mdDialog.alert()
                          .clickOutsideToClose(false)
                          .title('Sin permisos')
                          .textContent('No tenes permisos para ver esta vista.')
                          .ok('Salir')
                    );
                    $location.path('/');
                }
                return $q.reject(response);
            }
        }
    });