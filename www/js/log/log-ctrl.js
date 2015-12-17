angular.module('finali0S')

.controller('LogsCtrl', function ($scope, LocalStorageService) {
    
    for (var i = 0, len = localStorage.length; i < len; i++) {
        $scope.logs = localStorage.getItem(localStorage.key(i));
        console.log(localStorage.getItem(localStorage.key(i)));
    }
//    var logId = 0;
//    //    $scope.logs = LocalStorageService.get(logId++);
////    $scope.logs = {
////        log: LocalStorageService.get(logId++),
////        name: LocalStorageService.get(logId++),
////        reason: LocalStorageService.get(logId++)
////    }
//    
//    $scope.logs = LocalStorageService.get(logId++);


});