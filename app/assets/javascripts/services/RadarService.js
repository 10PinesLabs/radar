angular.module('ruben-radar')
    .service('RadarService', function (Radar, RadarResult) {
        var self = this;
        self.getRadar = function getRadar(radar_id) {
            return Radar.get({id: radar_id}).$promise;
        };

        self.getResult = function getResults (radar_id) {
            return Radar.result({id: radar_id}).$promise.then(function (result) {
                return new RadarResult(result);
            });
        };

        self.closeRadar = function closeRadar(radar) {
            return radar.$close();
        };

        self.getAll = function getAll() {
            return Radar.query().$promise;
        };

        self.getResultsForMany = function getResultsForMany(radarIds) {
            return Promise.all(
                _.map(radarIds, self.getResult)
            );
        };
    });
