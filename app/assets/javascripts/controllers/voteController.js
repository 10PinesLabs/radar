angular.module('ruben-radar')
    .controller('VoteController', function ($location, $scope, _, VoteService, radar, ngToast) {
        $scope.radar = radar;
        $scope.vote = VoteService.newVote(radar);
        $scope.options = _.rangeRight(1, 6);

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
