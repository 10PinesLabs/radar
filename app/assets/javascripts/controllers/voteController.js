angular.module('ruben-radar')
    .controller('VoteController', function ($location, $scope, _, VoteService, radar, ngToast) {
        $scope.radar = radar;
        $scope.vote = VoteService.newVote(radar);
        $scope.options = _.range(1, 6);

        $scope.submit = function submit() {
            VoteService.createVote($scope.vote).then(function () {
                $location.path('/successfulVote');
            }).catch(function (response) {
                _.forEach(response.data.errors, function(error){
                    ngToast.danger(error);
                });
            });
        };
    })
;