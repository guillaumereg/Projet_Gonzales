angular.module('offerServices', [])

	.factory('Offer', function($http) {   //offer = nom de notre factory

		var offerFactory = {}; // Create the offer object

		offerFactory.create = function(offerData) {
			return $http.post('/api/offer', offerData); // Return data from end point to controller
		};
		return offerFactory;
	});
