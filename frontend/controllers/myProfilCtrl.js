angular.module('myProfilController', ['evaluationService','authServices','userServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
  .controller('myProfilCtrl', function($location, User, Auth, $route, $scope) {   //add factory User !!!! pour utiliser ce factory du module  userservices


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
        Evaluation.getEvaluationByEvaluation({username: data.data.username}) //get all evaluations from user from database
        .then(function(data){
            if (data.data.success) {
                $scope.evaluations = data.data.evaluations;
            } else {
                console.log(data.data.message);
            }
        });
    });

    $scope.changeProfil = function(user) {
        $location.path('/changeProfil');
    }

  });
