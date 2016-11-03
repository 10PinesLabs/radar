angular.module('ruben-radar')
    .controller('VoteController', function ($location, $scope, _, VoteService, radar, ngToast) {
        $scope.radar = radar;
        $scope.answers = _.map(radar.axes, function (axis) {
            return {axis: axis, points: undefined};
        });
        $scope.options = _.range(1, 6);

        $scope.allAxesAnswered = function () {
            return _.every($scope.answers, function (answer) {
                return answer.points !== undefined;
            });
        };

        $scope.submit = function submit() {
            var vote = VoteService.newVote(radar, $scope.answers);
            VoteService.createVote(vote).then(function () {
                $location.path('/successfulVote');
            }).catch(function (errors) {
                _.forEach(errors, function(error){
                    ngToast.danger(error);
                });
            });
        };
    })
;
