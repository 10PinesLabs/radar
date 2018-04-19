angular.module('ruben-radar')
    .factory('radarFactory', function () {

        function Radar() {
            this.description = '';
            this.axes = [];
        }

        Radar.prototype.addAxis = function addAxis(axis){
            this.axes.push({description: axis});
        };

        Radar.prototype.removeAxis = function removeAxis(axis){
            var index = this.axes.indexOf(axis);
            if(index != -1){
                this.axes.splice(index, 1);
            }
        };

        return {
            newRadar() {
                return new Radar();
            }
        };
    });

