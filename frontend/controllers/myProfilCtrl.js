angular.module('myProfilController', ['evaluationService','authServices','userServices','offerServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
  .controller('myProfilCtrl', function($location, Evaluation, User, Auth, Offer, $route, $scope) {   //add factory User !!!! pour utiliser ce factory du module  userservices


    $scope.showOtherProfile=false;
    $scope.showEvaluation2=false;
    $scope.OtherProfile={};
    $scope.evaluations={};
    $scope.evaluations2={};
    $scope.user = {};
    $scope.currentUser={};


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
        $scope.evaluations2={};
        currentUser=username;
        User.getUserByUsername({username: currentUser}).then(function(data){
            if (data.data.success) {
                $scope.showOtherProfile=true;
                $scope.OtherProfile=data.data.user;
            }
            else{
                console.log(data.data.message);
            }
        });
    }

    $scope.goToEval = function(){
        Evaluation.getEvaluationByUsername({username: currentUser}).then(function(data){
            if (data.data.success) {
                $scope.showEvaluation2=true;
                $scope.evaluations2=data.data.evaluations;
            }
            else{
                console.log(data.data.message);
            }
        });
    }

    $scope.maskProfil = function() {
      $scope.showOtherProfile=false;
      $scope.OtherProfile={};
    }

    $scope.maskEval = function() {
      $scope.showEvaluation2=false;
      $scope.evaluations2={};
    }








    $scope.changeProfil = function(user) {
        $location.path('/changeProfil');
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

  });
