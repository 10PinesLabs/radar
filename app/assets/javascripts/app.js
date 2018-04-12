throw new Error();
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

        var getResultFromParam = function (paramName) {
            return function ($route, RadarService) {
                return RadarService.getResult($route.current.params[paramName]);
            }
        };

        $routeProvider
            .when('/radars/:radar_id/vote', {
                templateUrl: 'templates/radars/vote.html',
                controller: 'VoteController',
                resolve: {
                    radar: getRadar
                }
            })
            .when('/radars/:radar_id/manage', {
                templateUrl: 'templates/radars/manage.html',
                controller: 'CloseRadarController',
                resolve: {
                    radar: getRadar
                }
            })
            .when('/radars/:radar_id/results', {
                templateUrl: 'templates/radars/results.html',
                controller: 'ResultsController',
                resolve: {
                    radar: getRadar,
                    result: getResultFromParam('radar_id'),
                    draw: function ($route) {
                        return $route.current.params['draw'];
                    }
                }
            })
            .when('/radars/compare', {
                templateUrl: 'templates/radars/comparision.html',
                controller: 'CompareRadarsController',
                resolve: {
                    afterResult: getResultFromParam('afterResult'),
                    beforeResult: getResultFromParam('beforeResult')
                }
            })
            .when('/radars/selectToCompare', {
                templateUrl: 'templates/radars/selectToCompare.html',
                controller: 'SelectToCompareController',
                resolve: {
                    radars: function ($route, RadarService) {
                        return RadarService.getAll();
                    }
                }
            })
            .when('/createRadar', {
                templateUrl: 'templates/radars/radarCreator.html',
                controller: 'RadarCreatorController'
            })
            .when('/404', {
                templateUrl: '404.html'
            })
            .otherwise('/404');
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
    }).config(function($locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });
    });
