angular.module('userServices', [])

	.factory('User', function($http) {   //user = nom de notre factory

		var userFactory = {}; // Create the User object

		userFactory.create = function(regData) {
			return $http.post('/api/profile', regData); // Return data from end point to controller
		};

		userFactory.getUserByUsername = function(username) {
			return $http.post('/api/getProfile', username); // Return data from end point to controller
		};
		userFactory.changeMyProfil = function(regData,currentUser) {
			return $http.post('/api/changeProfile', regData,currentUser); // Return data from end point to controller
		};
		return userFactory;
	});
