angular.module('ruben-radar')
    .service('CSVService', function () {
        this.createCSVWithResultsOf = function createCSVWithResultsOf(radar) {
            return "Arista; 1; 2; 3; 4; 5\n" + axesRows(radar.axes);
        };

        function axesRows(axes) {
            var axisRow = ""
            for (var i = 0; i < axes.length; i++) {
                var axis = axes[i];
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
            var answersWithPointN = _.filter(answers, function (answer) {
                return answer.points === n
            })
            return "; " + _.size(answersWithPointN)
        }

    });