// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('finali0S', ['ionic', 'satellizer', 'ngStorage'])

.run(function ($ionicPlatform, $ionicModal, $rootScope, LocalStorageService) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
    
 

    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $rootScope
    }).then(function (modal) {
        $rootScope.modal = modal;

        if (!LocalStorageService.get('isAuthenticated')) {
            $rootScope.modal.show();
        } else {
            LocalStorageService.set('isAuthenticated', true);
        }
    });

    $rootScope.$on('authentication-failed', function () {
        $rootScope.modal.show();
    });

    $rootScope.$on('authentication-success', function () {
        $rootScope.modal.hide();
        LocalStorageService.set('isAuthenticated', true);
    });

})



.config(function ($authProvider) {
    $authProvider.facebook({
        clientId: '1640466952874984',
        scope: 'email, public_profile, user_photos, user_friends',
        responseType: 'token'
    });
})


.config(function ($stateProvider, $urlRouterProvider, $authProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.search', {
        url: '/search',
        views: {
            'tab-search': {
                templateUrl: 'templates/tab-search.html',
                controller: 'SearchCtrl',
                resolve: {
                    search: function ($q, $rootScope, FacebookService) {
                        var deferred = $q.defer();

                        FacebookService.search().success(function (data) {
                            $rootScope.userId = data.id;
                            deferred.resolve(data);
                        }).error(function (errorData) {
                            deferred.reject(errorData);
                        });
                        return deferred.promise;
                    }
                }
            }
        }
    })

    .state('tab.stores', {
            url: '/stores',
            views: {
                'tab-stores': {
                    templateUrl: 'templates/tab-stores.html',
                    controller: 'StoresCtrl',
                    resolve: {
                        stores: function ($q, $rootScope, FacebookService) {
                            var deferred = $q.defer();

                            FacebookService.stores().success(function (data) {
                                $rootScope.userId = data.id;
                                deferred.resolve(data);
                            }).error(function (errorData) {
                                deferred.reject(errorData);
                            });
                            return deferred.promise;
                        }
                    }
                }
            }
        })

    .state('tab.logs', {
        url: '/logs',
        views: {
            'tab-logs': {
                templateUrl: 'templates/tab-logs.html',
                controller: 'LogsCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/logs');

});