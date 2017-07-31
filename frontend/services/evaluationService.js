angular.module('evaluationService', [])

	.factory('Evaluation', function($http) {   //offer = nom de notre factory

		var evaluationFactory = {}; // Create the offer object

		evaluationFactory.create = function(evaluationData) {
			return $http.post('/api/evaluation', evaluationData); // Return data from end point to controller
		};

		evaluationFactory.getEvaluationByUsername = function(username) {
			return $http.post('/api/myEvaluation', username); // Return data from end point to controller
		};

		return evaluationFactory;
	});
