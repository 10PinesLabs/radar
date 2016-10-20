angular
    .module('ruben-radar', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate',
        'ngAria'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/radars/:radar_id/vote', {
                templateUrl: 'radars/vote.html',
                controller: 'VoteController',
                controllerAs: 'vote',
                resolve: {
                    radar: function () {
                        return {
                            date: 'Miercoles 19 de Octubre, 2016',
                            axes: [
                                {id: 1, description: 'Sueldo'},
                                {id: 2, description: 'Ambiete laboral'}
                            ]
                        }
                    }
                }
            }).otherwise({
            redirectTo: '/radars/1/vote'
        });
    });