/**
 * Created by pino on 21/10/16.
 */
angular.module('ruben-radar')
    .service('RadarService', function (Radar) {
        this.getRadar = function getRadar(radar_id) {
            return Radar.get({id: radar_id}).$promise;
        };

        this.getResult = function getResults (radar_id) {
            return Radar.result({id: radar_id}).$promise;
        };
    });