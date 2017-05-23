app.controller("controller1", ['$scope','$resource',
	function($scope, $resource){
		var Meetup = $resource('/api/meetups');  //=base URL of restful service
		//object can use methods get, save, query, remove and delete
		Meetup.query(function(results){  //GET: all meetups   results come from res.json
			$scope.meetups = results;   //data returned by the server
		});

		$scope.meetups = [];

		$scope.createMeetup = function(){ 
			var meetup = new Meetup();   //instance of resource class Meetup
			meetup.name = $scope.meetupName;
			meetup.$save(function(result){ //POST: meetup   result comes from res.json
				$scope.meetups.push(result);  //add new meetup to our collection 
				$scope.meetupName = '';
			});
		}
	}
]);
