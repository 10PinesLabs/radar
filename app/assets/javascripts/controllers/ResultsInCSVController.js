angular.module('ruben-radar')
    .controller('ResultsInCSVController', function ($scope, _, radar) {
        $scope.radar = radar;
        $scope.axes = radar.axes;

        function answerIsOne(answer) {
            return answer.points === 1
        }



        $scope.amountOfVotesFor1 = function (axis) {
            return "," + axis.answers.filter(answerIsOne).length;
        }

        function answerIsTwo(answer) {
            return answer.points === 2
        }

        $scope.amountOfVotesFor2 = function (axis) {
            return "," + axis.answers.filter(answerIsTwo).length;
        }

        function answerIsThree(answer) {
            return answer.points === 3
        }

        $scope.amountOfVotesFor3 = function (axis) {
            return "," + axis.answers.filter(answerIsThree).length;
        }

        function answerIsFour(answer) {
            return answer.points === 4
        }

        $scope.amountOfVotesFor4 = function (axis) {
            return "," + axis.answers.filter(answerIsFour).length;
        }

        function answerIsFive(answer) {
            return answer.points === 5
        }

        $scope.amountOfVotesFor5 = function (axis) {
            return "," + axis.answers.filter(answerIsFive).length;
        }

    });
