angular.module('myProfilController', ['evaluationService','authServices','userServices','offerServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
  .controller('myProfilCtrl', function($location, Evaluation, User, Auth, Offer, $route, $scope) {   //add factory User !!!! pour utiliser ce factory du module  userservices


    $scope.showProfile=false;
    $scope.showEvaluation=false;
    $scope.profile={};
    $scope.evaluations={};
    var currentUser={};
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
      Offer.getOffersByUsernameSelect({usernameSelect: data.data.username}) //get all offers from user from database
        .then(function(data){
            $scope.profile={};
            $scope.showProfile=false;
            if (data.data.success) {
                $scope.offers = data.data.offers;
            } else {
                console.log(data.data.message);
            }
        });
    });


    $scope.goToProfile = function(username){
        $scope.profile={};
        $scope.evaluations={};
        $scope.showEvaluation=false;
        currentUser=username;
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

    $scope.goToEval = function(){
        $scope.evaluations={};
        Evaluation.getEvaluationByUsername({username: currentUser}).then(function(data){
            if (data.data.success) {
                $scope.showEvaluation=true;
                $scope.evaluations=data.data.evaluations;
            }
            else{
                console.log(data.data.message);
            }
        });
    }

    $scope.deleteOffer = function(offer) {
        Offer.unselectOffer({offerId: $scope.offers[ $scope.offers.indexOf(offer) ]._id})
        .then(function(data){
            $scope.offers.splice($scope.offers.indexOf(offer),1);
            if (!data.data.success) {
                console.log(data.data.message);
            }
        });
    }

    $scope.changeProfil = function(user) {
        $location.path('/changeProfil');
    }
    $scope.maskProfil = function() {
      $scope.showProfile=false;
      $scope.profile={};
    }

  });
