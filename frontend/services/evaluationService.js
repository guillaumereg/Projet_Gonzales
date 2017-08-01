angular.module('evaluationService', [])

	.factory('Evaluation', function($http) {   //Evaluation = nom de notre factory

		var evaluationFactory = {}; // Create the evaluation object

		evaluationFactory.create = function(evaluationData) {
			return $http.post('/api/evaluation', evaluationData); // Return data from end point to controller
		};

		evaluationFactory.removeEvaluation = function(evaluationId) {
			return $http.post('/api/removeEvaluation', evaluationId); // Return data from end point to controller
		};

		evaluationFactory.getEvaluationByAuthor = function(author) {
			return $http.post('/api/evaluationByAuthor', author); // Return data from end point to controller
		};

		evaluationFactory.getEvaluationByUsername = function(username) {
			return $http.post('/api/evaluationByUsername', username); // Return data from end point to controller
		};

		return evaluationFactory;
	});
