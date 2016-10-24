/**
 * Created by pino on 24/10/16.
 */
angular.module('ruben-radar')
    .factory('Vote', function Vote(backendUrl, $resource) {
        return $resource(backendUrl + '/radars/:id_radar/votes/:id', {id: '@id'});
    });