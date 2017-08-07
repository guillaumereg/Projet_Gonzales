angular.module('myOffersController', ['offerServices', 'authServices','userServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
    .controller('myOffersCtrl', function($location, Offer, Auth, User, Evaluation, $route, $scope) {   //add factory User !!!! pour utiliser ce factory du module  userservices

      var currentUser;
      $scope.showProfile=false;
      $scope.showEvaluation=false;
      $scope.profile={};
      $scope.evaluations={};
        Auth.getUser().then(function(data){
            Offer.getOffersByUsername({username: data.data.username}) //get all offers from user from database
            .then(function(data){
                $scope.profile={};
                $scope.evaluations={};
                $scope.showProfile=false;
                $scope.showEvaluation=false;
                if (data.data.success) {
                    $scope.offers = data.data.offers;
                } else {
                    console.log(data.data.message);
                }
            });
        });

        $scope.deleteOffer = function(offer) {
            Offer.removeOffer({offerId: $scope.offers[ $scope.offers.indexOf(offer) ]._id})
            .then(function(data){
                $scope.offers.splice($scope.offers.indexOf(offer),1);
                if (!data.data.success) {
                    console.log(data.data.message);
                }
            });
        }

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
            Evaluation.getEvaluationByUsername({username: currentUser})
            .then(function(data){
                if (data.data.success) {
                    $scope.showEvaluation=true;
                    $scope.evaluations=data.data.evaluations;

                }
                else{
                    console.log(data.data.message);
                }
            });
        }
    });
