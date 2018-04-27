angular.module('ruben-radar')
    .factory('radarInterceptor', function($q, $location, $window, $injector) {
        let unauthorizedStatus = 401;
        return {
            responseError: function(response) {
                if(response.status === unauthorizedStatus){
                    var $mdDialog = $injector.get('$mdDialog');
                    $mdDialog.show(
                      $mdDialog.alert()
                          .clickOutsideToClose(true)
                          .title('Uh oh!')
                          .textContent('No tenes permisos para acceder a este sitio.')
                          .ok('Ok')
                    );
                    $location.path('/');
                }
                return $q.reject(response);
            }
        }
    });