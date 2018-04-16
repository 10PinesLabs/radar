angular.module('ruben-radar')
    .controller('LandingController', function ($scope, $location) {
        $scope.imagepath = 'http://croinagaillimhe.ie/wp-content/uploads/2013/03/photodune-231882-autumn-pine-forest-m.jpg';

        $scope.getImageStyle = function getImageStyle(){
            return {
                'position': 'fixed',
                'background-image':'url('+ $scope.imagepath +')',
                'background-position': 'center center',
                'width': '100%',
                'height': '100%',
                'top': '0px',
                'left': '0px',
                'background-repeat': 'no-repeat',
                'margin': 'auto',
            }
        };

        $scope.getOverlayStyle = function getOverlayStyle(){
            return {
                'background-color': 'rgba(0, 0, 0, 0.5)',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'position': 'relative',
                'z-index': '1',
                'overflow-y': 'scroll'

            }
        };
    });