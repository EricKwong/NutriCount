angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, Username) {
  $scope.username = '';
  $scope.checkUser = function(username) {
    Username.setUsername(username);
    // if (user exists) {
    //   // get user stats
    //   $state.go('tab.dash');
    // } else {
      $state.go('diet');
    // }
  };
})

.controller('DietCtrl', function($scope, $state, username) {
  $scope.userData = {
    username: username,
    dietId: null
  };

  $scope.goToDash = function() {
    $state.go('tab.dash');
  };

  $scope.updateDiet = function(id) {
    $scope.userData.dietId = id;
    // Create User in Database with $scope.userData
    // created user callback
    // navigate to stats page with template
    $scope.goToDash();
  };
})

.controller('CameraCtrl', function($scope, Camera) {
  $scope.getPhoto = function() {
    console.log('Getting camera');
    Camera.getPicture({
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    }).then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    });
  };
});