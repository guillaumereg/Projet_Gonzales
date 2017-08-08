angular.module('offerServices', [])

	.factory('Offer', function($http) {   //offer = nom de notre factory

		var offerFactory = {}; // Create the offer object

		offerFactory.create = function(offerData) {
			return $http.post('/api/offer', offerData); // Return data from end point to controller
		};

		offerFactory.getOffersByUsername = function(username) {
			return $http.post('/api/myOffers', username); // Return data from end point to controller
		};

		offerFactory.getOffersByUsernameSelect = function(usernameSelect) {
			return $http.post('/api/yourOffers', usernameSelect); // Return data from end point to controller
		};

		offerFactory.removeOffer = function(offerId) {
			return $http.post('/api/removeOffer', offerId); // Return data from end point to controller
		};
		offerFactory.unselectOffer = function(offerId) {
			return $http.post('/api/unselectOffer', offerId); // Return data from end point to controller
		};

		offerFactory.selectMyOffer = function(selectData) {
			return $http.post('/api/selectOffer',selectData); // Return data from end point to controller
		};

		offerFactory.searchOffers = function(searchData) {
			return $http.post('/api/searchOffer', searchData); // Return data from end point to controller
		};

		return offerFactory;
	});
