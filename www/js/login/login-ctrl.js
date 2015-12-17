angular.module('finali0S')
.controller('LoginCtrl', function($scope, $auth, $ionicPopup, $rootScope, LocalStorageService, LogService) {
  $scope.closeLogin = function(){
    $rootScope.modal.hide();
  };
    
    $scope.loginData = {
        username: '',
        password: ''
    };
    
    $scope.validationFail = false;
    
    $scope.doLogin = function(){
        if (validateUserName($scope.loginData.username) && validatePassword($scope.loginData.password)){
            $rootScope.$broadcast('authentication-success');
        } else {
            $scope.validationFail = true;
            
            LogService.add({
                data: new Date(),
                name: 'Authenticate Failed',
                reason: 'Invalid Credentials'
            });
        }
    };
    
    function validateUserName(userName){
        return (userName && userName.toLowerCase() !== 'guest')
    };
    
    function validatePassword(password){
        return (password && password.length > 4)
    };
    
    $scope.authenticate = function (provider) {
        $auth.authenticate(provider).then(function(){
            $ionicPopup.alert({
                title: 'Success',
                content: 'You have successfully logged in!'
                
            })
        })
        .catch(function(response){
            $ionicPopup.alert({
                title: 'Error',
                content: response.data ? response.data || response.data.message : response
            })
        });
    };
    $scope.isAuthenticated = function(){
        return $auth.isAuthenticated();
    };
    $scope.logout = function(){
        return $auth.logout();
    };   
});
