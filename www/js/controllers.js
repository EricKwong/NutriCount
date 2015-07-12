var request = require('superagent');
var config = require('../../conf.json');

angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, Username, UserDb) {
  $scope.username = '';
  $scope.checkUser = function(username) {
    request
      .post('https://api-us.clusterpoint.com/100785/NutriCount-Users/_search.json')
      .send({ query: '<username>' + username + '</username>' })
      .set('Authorization', 'Basic ' + btoa(config.user + ':' + config.password))
      .end(function (err, res) {
        if (res.ok) {
          Username.setUsername(username);
          if (res.body.documents) {
            $state.go('tab.status');
          } else {
            $state.go('diet');
          }
        }
      });
  };
})

.controller('DietCtrl', function($scope, $state, username) {
  $scope.userData = {
    username: username,
    dietId: null
  };

  $scope.goToStatus = function() {
    $state.go('tab.status');
  };

  $scope.updateDiet = function(id) {
    $scope.userData.dietId = id;
    // Create User in Database with $scope.userData
    // created user callback
    // navigate to stats page with template
    $scope.goToStatus();
  };
})

.controller('CameraCtrl', function($scope, Camera) {
  $scope.getPhoto = function() {
    console.log('Getting camera');
    Camera.getPicture({
      quality: 100,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    }).then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    });
  };
})

.controller('NutritionCtrl', function($scope) {

});