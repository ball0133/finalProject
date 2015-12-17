angular.module('finali0S')
.factory('LocalStorageService',function($localStorage) {
    return {
        set : function(key, value) {
            $localStorage[key] = value;
        },
        get : function(key) {
            return $localStorage[key];
        }
    };
});