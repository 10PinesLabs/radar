/**
 * Created by pino on 24/10/16.
 */
angular.module('ruben-radar')
    .factory('Vote', function Vote(backendUrl, $resource) {
        return $resource(backendUrl + '/radars/:radar_id/votes/:id', {id: '@id', radar_id: '@radar_id'});
    });