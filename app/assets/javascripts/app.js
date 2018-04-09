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

.config(function ($routeProvider, $compileProvider) {
        var getRadar = function ($route, RadarService) {
            return RadarService.getRadar($route.current.params.radar_id);
        };

        var getResultFromParam = function (paramName) {
            return function ($route, RadarService) {
                return RadarService.getResult($route.current.params[paramName]);
            }
        };

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);

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
            .when('/radars/:radar_id/results', {
                templateUrl: 'radars/results.html',
                controller: 'ResultsController',
                resolve: {
                    radar: getRadar,
                    result: getResultFromParam('radar_id'),
                    draw: function ($route) {
                        return $route.current.params['draw'];
                    }
                }
            })
            .when('/radars/:radar_id/results/csv', {
                templateUrl: 'radars/resultsInCSV.html',
                controller: 'ResultsInCSVController',
                resolve: {
                    radar: getRadar
                }
            })
            .when('/radars/compare', {
                templateUrl: 'radars/comparision.html',
                controller: 'CompareRadarsController',
                resolve: {
                    afterResult: getResultFromParam('afterResult'),
                    beforeResult: getResultFromParam('beforeResult')
                }
            })
            .when('/radars/selectToCompare', {
                templateUrl: 'radars/selectToCompare.html',
                controller: 'SelectToCompareController',
                resolve: {
                    radars: function ($route, RadarService) {
                        return RadarService.getAll();
                    }
                }
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
    });
