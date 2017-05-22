app.controller("controller1", ['$scope','$resource',
	function($scope, $resource){
		var Meetup = $resource('/api/meetups');  // -> create get route

		Meetup.query(function(results){  //find meetups
			$scope.meetups = results;
		});

		$scope.createMeetup = function(){ //rentre pas
			var meetup = new Meetup();
			meetup.name = $scope.meetupName;
			meetup.$save(function(result){ //server->database->collection
				$scope.meetups.push(result);  //add new meetup to our collection 
				$scope.meetupName = '';
			});
		}
	}
]);
