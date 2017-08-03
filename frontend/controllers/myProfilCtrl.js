angular.module('myProfilController', ['evaluationService','authServices','userServices','offerServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
  .controller('myProfilCtrl', function($location, Evaluation, User, Auth,Offer, $route, $scope) {   //add factory User !!!! pour utiliser ce factory du module  userservices


    $scope.showProfile=false;
    $scope.profile={};
    Auth.getUser().then(function(data){
        User.getUserByUsername({username: data.data.username}) //get user from database
        .then(function(data){
            if (data.data.success) {
                $scope.user = data.data.user;
            } else {
                console.log(data.data.message);
            }
        });
    });

    Auth.getUser().then(function(data){
        Evaluation.getEvaluationByUsername({username: data.data.username}) //get all evaluations from user from database
        .then(function(data){
            if (data.data.success) {
                $scope.evaluations = data.data.evaluations;
            } else {
                console.log(data.data.message);
            }
        });
    });

    Auth.getUser().then(function(data){
      Offer.getEvaluationByUsernameSelect({username: data.data.username}) //get all evaluations from user from database
        .then(function(data){
            if (data.data.success) {
                $scope.evaluations = data.data.evaluations;
            } else {
                console.log(data.data.message);
            }
        });
    });

    $scope.goToProfile = function(username){
        User.getUserByUsername({username: username}).then(function(data){
            if (data.data.success) {
                $scope.showProfile=true;
                $scope.profile=data.data.user;
            }
            else{
                console.log(data.data.message);
            }
        });
    }

    $scope.changeProfil = function(user) {
        $location.path('/changeProfil');
    }

  });
