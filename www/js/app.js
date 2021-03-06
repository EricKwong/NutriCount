require('../lib/ionic/js/ionic.bundle.min.js');

require('./controllers');
require('./services');

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ui.router'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('diet', {
    url: '/diet',
    templateUrl: 'templates/diet.html',
    controller: 'DietCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    controller: 'StatusCtrl',
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.status', {
    url: '/status',
    views: {
      'tab-status': {
        templateUrl: 'templates/tab-status.html'
      }
    }
  })

  .state('tab.camera', {
    url: '/camera',
    views: {
      'tab-camera': {
        templateUrl: 'templates/tab-camera.html',
        controller: 'CameraCtrl'
      }
    }
  })

  .state('image', {
    url: '/image',
    templateUrl: 'templates/image.html',
    controller: 'CameraImageCtrl',
    resolve: {
      cameraImage: function(CameraImage) {
        return CameraImage.getCameraImage();
      }
    }
  })

  .state('nutrition', {
    url: '/nutrition',
    templateUrl: 'templates/nutrition.html',
    controller: 'NutritionCtrl',
    resolve: {
      nutrients: function() {
        
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});

