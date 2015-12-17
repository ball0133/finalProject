angular.module('finali0S')

.factory('LogService', function(LocalStorageService) {
    var logId = 0;
    return {
        add : function(log){
            LocalStorageService.set(logId++, log);
        }
    };
});