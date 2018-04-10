angular.module('ruben-radar')
    .factory('radarFactory', function () {

        function Radar() {
            this.description = '';
            this.axes = [];
        }

        Radar.prototype.addAxis = function addAxis(axis){
            this.axes.push({description: axis});
        };

        return {
            nuevoRadar() {
                return new Radar();
            }
        };
    });

