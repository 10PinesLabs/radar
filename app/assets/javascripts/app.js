angular
    .module('ruben-radar', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate',
        'ngAria'
    ])
    .config(function ($routeProvider, VoteService) {
        $routeProvider
            .when('/radars/:radar_id/vote', {
                templateUrl: 'radars/vote.html',
                controller: 'VoteController',
                controllerAs: 'vote',
                resolve: {
                    radar: function ($routeParams) {
                        return VoteService.getRadar($routeParams.radar_id);
                    }
                }
            }).otherwise({
            redirectTo: '/radars/1/vote'
        });
    });