angular.module('ruben-radar')
    .service('RadarService', function (Radar) {
        var self = this;
        self.getRadar = function getRadar(radar_id) {
            return Radar.get({id: radar_id}).$promise;
        };

        self.getResult = function getResults (radar_id) {
            return Radar.result({id: radar_id}).$promise;
        };

        self.closeRadar = function closeRadar(radar) {
            return radar.$close();
        };

        self.getAll = function getAll() {
            return Radar.all();
        };

        self.getResultsForMany = function getResultsForMany(radarIds) {
            return Promise.all(
                _.map(radarIds, self.getResult)
            );
        };
    });
