angular.module('ruben-radar')
    .controller('ResultsController', function ($scope, $window, _, CSVService, radar, result, draw) {
        $scope.radar = radar;
        $scope.axes = radar.axes;
        $scope.result = result;
        $scope.selectedRepresentation = draw || "circles";
        var blob = new Blob([resultToCSV()], { type: 'text/plain' });
        var url = $window.URL;
        $scope.fileCSVUrl = url.createObjectURL(blob);


        function resultToCSV() {
            return CSVService.createCSVWithResultsOf($scope.radar)

        }

        // function axesRows() {
        //     var axisRow = ""
        //     for (var i = 0; i < $scope.axes.length; i++) {
        //         var axis = $scope.axes[i];
        //         axisRow = axisRow + axis.description + amountsOfVotes(axis) + "\n";
        //
        //     }
        //     return axisRow
        // }
        //
        // function amountsOfVotes(axis) {
        //     var votes = ""
        //     for (var n = 1; n <= 5; n++) {
        //         votes = votes + amountOfPeopleThatVoted(axis.answers, n)
        //     }
        //     return votes;
        // }
        //
        // function amountOfPeopleThatVoted(answers, n) {
        //     var answersWithPointN =  _.filter(answers, function (answer) {return answer.points === n})
        //     return "; " + _.size(answersWithPointN)
        // }


    });

