angular.module('ruben-radar')
    .controller('ResultsController', function ($scope, _, radar, answers) {
        $scope.radar = radar;
        $scope.answers = answers;
    })
;
