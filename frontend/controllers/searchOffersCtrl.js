angular.module('searchOffersController', ['offerServices', 'authServices','evaluationService']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
    .controller('searchOffersCtrl', function($location, Offer, Auth, $route, $scope, User, Evaluation) {   //add factory User !!!! pour utiliser ce factory du module  userservices

        var currentUser;
        $scope.showResults=false;
        $scope.showProfile=false;
        $scope.showEvaluation=false;
        $scope.profile={};
        $scope.evaluations={};
        $scope.results={};
        $scope.findOffers = function() {
            $scope.results={};
            $scope.profile={};
            $scope.evaluations={};
            $scope.showProfile=false;
            $scope.showEvaluation=false;
            if($scope.searchData === undefined || $scope.searchData === null){  // l'utilisateur n'a rien spécifié
                $scope.searchData=null;
            }
            else{
                if($scope.searchData.brand ===""){  // marque non spécifiée
                    delete $scope.searchData.brand;
                }
                if($scope.searchData.model ===""){ //modèle non spécifié
                    delete $scope.searchData.model;
                }
                if($scope.searchData.city ===""){ //modèle non spécifié
                    delete $scope.searchData.city;
                }
            }
            Offer.searchOffers($scope.searchData).then(function(data){
                if (data.data.success) {  // rediriger vers la page de login en cas de succes
                    $scope.showResults=true;
                    $scope.results=data.data.offers;
                } else {
                    console.log(data.data.message);
                }
            });
        };
        $scope.goToProfile = function(username){
            $scope.profile={};
            $scope.evaluations={};
            $scope.showEvaluation=false;
            $scope.showResults=false;
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
        $scope.selectOffer = function(result) {
          Auth.getUser().then(function(data){
            Offer.selectMyOffer({offerId: $scope.results[ $scope.results.indexOf(result) ]._id},{username: data.data.username} )
            .then(function(data){
                if (!data.data.success) {
                    console.log(data.data.message);
                }else{
                  $location.path('/myProfil');
                }
            });
          });
        }

    });
