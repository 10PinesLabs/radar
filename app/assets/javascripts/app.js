angular
    .module('ruben-radar', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate',
        'ngAria',
        'ngResource'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/radars/:radar_id/vote', {
                templateUrl: 'radars/vote.html',
                controller: 'VoteController',
                resolve: {
                    radar: function ($route, RadarService) {
                        return RadarService.getRadar($route.current.params.radar_id);
                    }
                }
            })
            .when('/successfulVote', {
                templateUrl: 'radars/successfulVote.html'
            })
            .otherwise({
                redirectTo: '/radars/1/vote'
            });
    });