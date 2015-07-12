angular.module('starter.services', [])

.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}])

.factory('Username', function($q) {
  var username;
  return {
    getUsername: function() {
      return username;
    },
    setUsername: function(name) {
      username = name;
    }
  }
})

.factory('CameraImage', function($q) {
  var cameraImage;
  return {
    getCameraImage: function() {
      return cameraImage;
    },
    setCameraImage: function(image) {
      cameraImage = image;
    }
  }
});
