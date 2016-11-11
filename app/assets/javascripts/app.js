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
            .when('/radars/:radar_id/results', {
                templateUrl: 'radars/results.html',
                controller: 'ResultsController',
                resolve: {
                    radar: getRadar,
                    result: function ($route, RadarService) {
                        return RadarService.getResult($route.current.params.radar_id);
                    }
                }
            })
            .when('/radars/compare', {
                templateUrl: 'radars/compare.html',
                controller: 'CompareRadarsController',
                resolve: {
                    results: function ($route, RadarService) {
                        return RadarService.getResultsForMany($route.current.params.radars.split(','));
                    }
                }
            })
            .when('/radars', {
                templateUrl: 'radars/allRadars.html',
                controller: 'RadarsController',
                resolve: {
                    radars: function ($route, RadarService) {
                        return RadarService.getAll();
                    }
                }
            });
    })
    .config(function (ngToastProvider) {
        ngToastProvider.configure({
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            maxNumber: 3
        });
    }).config(function($mdThemingProvider) {
        $mdThemingProvider.theme('pine-green')
            .primaryPalette('green')
            .accentPalette('deep-orange');
    });
