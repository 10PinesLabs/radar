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
            return "Arista;1;2;3;4;5\n" + axesRows()
        }

        function axesRows() {
            var axisRow
            for (var i = 0; i < $scope.axes.length; i++) {
                var axis = $scope.axes[1];
                for (var n = 1; n < 5; n++) {
                    axisRow = axis.description + amountOfPeopleThatVoted(axis.answers, n)
                }

            }
            return axisRow + "\n"
        }

        function amountOfPeopleThatVoted(answers, n) {
            return "; " + _.filter(answers, function (answer) {answer.points === n}).length
        }

    });

