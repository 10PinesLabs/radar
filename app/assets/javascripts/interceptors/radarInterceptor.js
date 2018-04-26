angular.module('ruben-radar')
    .factory('radarInterceptor', function($q, $location, $window, $injector) {
        let unauthorizedStatus = 401;
        return {

            response: function(response) {
              //debugger;
                return response;
            },

            responseError: function(response) {
                if(response.status === unauthorizedStatus){
                    var $mdDialog = $injector.get('$mdDialog');
                    $mdDialog.show(
                      $mdDialog.alert()
                          .clickOutsideToClose(false)
                          .title('Uh oh!')
                          .textContent('No tenes permisos para acceder a este sitio.')
                          .ok('Salir')
                    );
                    $location.path('/');
                }
                return $q.reject(response);
            }
        }
    });