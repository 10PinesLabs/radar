angular.module('ruben-radar')
    .controller('VoteController', function ($location, $scope, _, VoteService, radar, ngToast) {
        $scope.radar = radar;
        $scope.vote = VoteService.newVote(radar);
        $scope.options = _.range(1, 6);

        $scope.allAxesAnswered = function () {
            return _.every($scope.vote.answers, function (answer) {
                return answer.points !== undefined;
            });
        };

        $scope.submit = function submit() {
            VoteService.createVote($scope.vote).then(function () {
                $location.path('/successfulVote');
            }).catch(function (errors) {
                _.forEach(errors, function(error){
                    ngToast.danger(error);
                });
            });
        };
    })
;
