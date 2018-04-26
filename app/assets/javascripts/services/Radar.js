/**
 * Created by pino on 24/10/16.
 */
angular.module('ruben-radar')
    .factory('Radar', function Radar(backendUrl, $resource) {
        return $resource(backendUrl + 'radars/:id', {id: '@id'}, {
            'result': {method: 'GET', url: backendUrl + 'radars/:id/result'},
            'close': {method: 'POST', url: backendUrl + 'radars/:id/close'},
            'create': {method: 'POST', url: backendUrl + 'radars'},
            'isLoggedIn': {method: 'GET', url: backendUrl + 'isLoggedIn'},
            'isNotLoggedIn': {method: 'GET', url: backendUrl + 'isNotLoggedIn'},
            'login': {method: 'POST', url: backendUrl + '/admins/sign_in'},
            'signOut': {method: 'GET', url: backendUrl + 'signOut'}
        });
    });
