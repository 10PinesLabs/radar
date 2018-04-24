angular.module('ruben-radar')
    .directive('axisChart', function () {
        return {
            restrict: 'E',
            replace: false,
            scope: {

            },
            link: function (scope, element) {
                var ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['1', '2', '3', '4', '5'],
                        datasets: [{
                            label: 'apples',
                            data: [12, 19, 3, 17, 6, 3, 7],
                            backgroundColor: "rgba(26,129,102,0.2)",
                            borderColor: "#3cba9f",
                            //fill:false
                        }, {
                            label: 'oranges',
                            data: [2, 29, 5, 5, 2, 3, 10],
                            backgroundColor: "rgba(255,153,0,0.2)",
                            borderColor: "rgba(179,11,198,1)",
                            //fill:false
                        }]
                    }
                });
            }

        };
    });