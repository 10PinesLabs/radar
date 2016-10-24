angular.module('ruben-radar')
    .controller('VoteController', function ($location, $scope, radar, _, VoteService) {
        $scope.radar = radar;
        $scope.options = _.range(1, 6);
        $scope.vote = VoteService.newVote(radar.axes);

        this.submit = function submit() {
            VoteService.createVote($scope.vote).then(function () {
                $location.path('/successfulVote');
            });
        };
    })
;