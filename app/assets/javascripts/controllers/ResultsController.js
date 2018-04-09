angular.module('ruben-radar')
    .controller('ResultsController', function ($scope, $window, _, radar, result, draw) {
        $scope.radar = radar;
        $scope.axes = radar.axes;
        $scope.result = result;
        $scope.selectedRepresentation = draw || "circles";
        var blob = new Blob([cosasParaElCSV()], { type: 'text/plain' });
            url = $window.URL;
        $scope.fileUrl = url.createObjectURL(blob);


        function cosasParaElCSV() {
            return "Arista; 1; 2; 3; 4; 5\n" + axesRows()
        }

        function axesRows() {
            var axisRow = ""
            for (var i = 0; i < $scope.axes.length; i++) {
                var axis = $scope.axes[i];
                axisRow = axisRow + axis.description + amountsOfVotes(axis) + "\n";

            }
            return axisRow
        }

        function amountsOfVotes(axis) {
            var votes = ""
            for (var n = 1; n <= 5; n++) {
                votes = votes + amountOfPeopleThatVoted(axis.answers, n)

            }
            return votes;
        }

        function amountOfPeopleThatVoted(answers, n) {
            debugger;
            return "; " + _.filter(answers, function (answer) {debugger; answer.points === n}).length
        }



        function answerIsOne(answer) {
            return answer.points === 1
        }



        function amountOfVotesFor1(axis) {
            return "; " + axis.answers.filter(answerIsOne).length;
        }

        function answerIsTwo(answer) {
            return answer.points === 2
        }

        function amountOfVotesFor2(axis) {
            return "; " + axis.answers.filter(answerIsTwo).length;
        }

        function answerIsThree(answer) {
            return answer.points === 3
        }

        function amountOfVotesFor3(axis) {
            return "; " + axis.answers.filter(answerIsThree).length;
        }

        function answerIsFour(answer) {
            return answer.points === 4
        }

        function amountOfVotesFor4(axis) {
            return "; " + axis.answers.filter(answerIsFour).length;
        }

        function answerIsFive(answer) {
            return answer.points === 5
        }

        function amountOfVotesFor5(axis) {
            return "; " + axis.answers.filter(answerIsFive).length;
        }


    });

