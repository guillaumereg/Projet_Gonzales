angular.module('offerServices', [])

	.factory('Offer', function($http) {   //offer = nom de notre factory

		var offerFactory = {}; // Create the offer object

		offerFactory.create = function(offerData) {
			return $http.post('/api/offer', offerData); // Return data from end point to controller
		};

		offerFactory.getByUsername = function(username) {
			return $http.post('/api/myOffers', username); // Return data from end point to controller
		};

		offerFactory.removeOffer = function(offerId) {
			return $http.post('/api/removeOffer', offerId); // Return data from end point to controller
		};

		return offerFactory;
	});
