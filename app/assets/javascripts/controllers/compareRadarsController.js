angular.module('ruben-radar')
    .controller('CompareRadarsController', function ($scope, _, beforeResult, afterResult) {
        $scope.beforeResult = beforeResult;
        $scope.afterResult = afterResult;
    })
;
