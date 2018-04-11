/**
 * Created by pino on 24/10/16.
 */
angular.module('ruben-radar')
    .factory('Radar', function Radar(backendUrl, $resource) {
        return $resource(backendUrl + '/radars/:id', {id: '@id'}, {
            'result': {method: 'GET', url: backendUrl + '/radars/:id/result'},
            'close': {method: 'POST', url: backendUrl + '/radars/:id/close'},
            'create': {method: 'POST', url: backendUrl + '/radars'}
        });
    });
