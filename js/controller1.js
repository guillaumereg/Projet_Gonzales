app.controller("controller1", ['$scope','$resource',
	function($scope, $resource){
		$scope.meetups = [
			{name: "MEAN SF Developers"},
			{name: "Some other meetups"}
		]

		$scope.createMeetup = function(){ //rentre pas
			$scope.meetups.push({name: $scope.meetupName});
			$scope.meetupName = "";
		}
	}
]);
