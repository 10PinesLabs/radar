angular
    .module('ruben-radar', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate',
        'ngAria',
        'ngSanitize',
        'ngToast',
        'ngResource'
    ])
    .config(function ($routeProvider) {
        var getRadar = function ($route, RadarService) {
            return RadarService.getRadar($route.current.params.radar_id);
        };

        $routeProvider
            .when('/radars/:radar_id/vote', {
                templateUrl: 'radars/vote.html',
                controller: 'VoteController',
                resolve: {
                    radar: getRadar
                }
            })
            .when('/radars/:radar_id/manage', {
                templateUrl: 'radars/manage.html',
                controller: 'CloseRadarController',
                resolve: {
                    radar: getRadar
                }
            })
            .when('/successfulVote', {
                templateUrl: 'radars/successfulVote.html'
            })
            .otherwise({
                redirectTo: '/radars/1/vote'
            });
    }).config(function (ngToastProvider) {
        ngToastProvider.configure({
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            maxNumber: 3
        });
    });