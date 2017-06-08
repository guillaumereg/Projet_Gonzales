angular.module('authServices', [])

	.factory('Auth', function($http) {   //user = nom de notre factory

		var authFactory = {}; // Create the User object

		authFactory.login = function(logData) {
			return $http.post('/api/authenticate', logData); // Return data from end point to controller
		};
		return authFactory;
	});
