var request = require('superagent');
var config = require('../../conf.json');
var shortId = require('shortid');

var diets = require('../data/diets.json');
var cps = require('cps-api');

angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, User) {
  $scope.username = '';
  $scope.checkUser = function(username) {
    request
      .post('https://api-us.clusterpoint.com/100785/NutriCount-Users/_search.json')
      .send({ query: cps.Term(username, 'username') })
      .set('Authorization', 'Basic ' + btoa(config.user + ':' + config.password))
      .end(function (err, res) {
        if (res.ok) {
          if (res.body.documents) {
            User.setInfo(res.body.documents[0]);
            $state.go('tab.status');
          } else {
            User.setInfo({ username: username });
            $state.go('diet');
          }
        }
      });
  };
})

.controller('DietCtrl', function($scope, $state, User) {
  $scope.userData = User.getInfo();

  if (!$scope.userData) {
    $state.go('login');
    return;
  }

  $scope.updateDiet = function(id) {
    $scope.userData.dietId = id;
    $scope.userData.id = shortId.generate();

    User.setInfo($scope.userData);

    request
      .post('https://api-us.clusterpoint.com/100785/NutriCount-Users/_insert.json')
      .send({ id: $scope.userData.id, username: $scope.userData.username, dietId: $scope.userData.dietId })
      .set('Authorization', 'Basic ' + btoa(config.user + ':' + config.password))
      .end(function (err, res) {
        if (res.ok) {
          if (res.body) {
            console.log(res.body);
            $state.go('tab.status');
            return;
          }
        }
      });
  };
})

.controller('StatusCtrl', function($scope, $state, User) {
  $scope.userData = User.getInfo();

  if (!$scope.userData) {
    $state.go('login');
    return;
  }
  $scope.userNutrition = {
    calories: 0,
    sugars: 0,
    protein: 0,
    totalFat: 0
  };

  $scope.template = diets[$scope.userData.dietId].nutrition;

  var aggregation = 'sum(calories) as calories, ' +
                    'sum(sugars) as sugars, ' +
                    'sum(protein) as protein, ' +
                    'sum(totalFat) as totalFat';

  // Make agg search
  request
    .post('https://api-us.clusterpoint.com/100785/NutriCount-FoodLog/_search.json')
    .send({ query: cps.Term($scope.userData.id, 'userId'), aggregate: aggregation })
    .set('Authorization', 'Basic ' + btoa(config.user + ':' + config.password))
    .end(function (err, res) {
      if (res.ok) {
        if (res.body.aggregate[0].data[0]) {
          $scope.userNutrition = res.body.aggregate[0].data[0];
          $scope.$apply();
        }
      }
    });
})

.controller('CameraCtrl', function($scope, $state, Camera, CameraImage) {
  $scope.getPhoto = function() {
    console.log('Getting camera');
    Camera.getPicture({
      quality: 100,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    }).then(function(imageURI) {
      console.log(imageURI);
      CameraImage.setCameraImage(imageURI);
      $state.go('image');
    }, function(err) {
      console.err(err);
    });
  };
})

.controller('CameraImageCtrl', function($scope, $ionicHistory, CameraImage) {
  $scope.cameraImage = CameraImage.getCameraImage();
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.submitImage = function() {
    
  };
})

.controller('NutritionCtrl', function($scope) {

});