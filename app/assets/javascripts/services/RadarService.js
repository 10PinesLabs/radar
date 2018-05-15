angular.module('ruben-radar')
    .service('RadarService', function (Radar, RadarResult) {
        var self = this;
        // No se puede hacer un extract method del radar vacío porque da error la página.
        self.radar = {
            name: '',
            description: '',
            axes: ''
        };

        self.getRadar = function getRadar(radar_id) {
            return Radar.get({id: radar_id}).$promise;
        };

        self.getResult = function getResults (radar_id) {
            return Radar.result({id: radar_id}).$promise.then(function (result) {
                return new RadarResult(result);
            });
        };

        self.createRadar = function createRadar(newRadar) {
            return Radar.create(newRadar).$promise;
        };

        self.closeRadar = function closeRadar(radar) {
            return radar.$close();
        };

        self.getAll = function getAll() {
            return Radar.query().$promise;
        };

        self.getActiveRadars = function getActiveRadar(){
            return self.Radar.getAll().filter(radar => radar.active);
        };

        self.isLoggedIn = function isLoggedIn(){
            return Radar.isLoggedIn().$promise;
        };

        self.isNotLoggedIn = function isLoggedIn(){
            return Radar.isNotLoggedIn().$promise;
        };

        self.login = function login(admin){
            return Radar.login(admin).$promise;
        };

        self.signOut = function signOut(){
            return Radar.signOut().$promise;
        };

        self.setRadarToCopy = function setRadarToCopy(radar){
            self.radar = radar;
        };

        self.getRadarToCopy = function getRadarToCopy(){
            var radarToCopy = self.radar;
            self.radar = {
                name: '',
                description: '',
                axes: ''
            };
            return radarToCopy;
        };
    });
