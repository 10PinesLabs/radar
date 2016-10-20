angular.module('ruben-radar')
    .controller('VoteController', function ($location, $scope, radar, _) {
        $scope.radar = radar;
        $scope.vote = {
            radar_id: radar.id,
            answers: _.map(radar.axes, function (axis) {
                return {axis: axis, points: undefined};
            })
        };
        $scope.options = _.range(1, 6);

        this.submit = function submit() {
            VoteService.createVote($scope.vote).then(function () {
                $location.path('/votoCorrectobower');
            });
        };
    })
;