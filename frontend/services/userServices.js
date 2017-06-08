angular.module('userServices', [])

	.factory('User', function($http) {   //user = nom de notre factory

		var userFactory = {}; // Create the User object

		userFactory.create = function(regData) {
			return $http.post('/api/users', regData); // Return data from end point to controller
		};
		return userFactory;
	});
